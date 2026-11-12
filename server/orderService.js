// Core Order Processing & Lifecycle Engine for Labuk Agro Ltd
import { OrderDB } from './db.js';
import { calculateOrderTotal } from './catalog.js';
import { generateOrderReference, generateTrackingId } from './tracking.js';
import { PaystackService } from './paystack.js';
import { sendOrderConfirmationEmail } from './email.js';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'labuk_agro_admin_sec_2026';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'LabukAgro@Admin2026';

export const OrderService = {
  /**
   * Initializes a new order and Paystack transaction.
   */
  async initializeOrder({ customer, items, shippingMethod = 'standard', paymentMethod = 'paystack', originUrl = '' }) {
    if (!customer || !customer.fullName || !customer.email || !customer.phone || !customer.address) {
      throw new Error('Please provide complete customer contact and delivery details.');
    }

    // 1. Calculate canonical total on server
    const { validatedItems, subtotalNGN, shippingCostNGN, grandTotalNGN } = calculateOrderTotal(items, shippingMethod);

    // 2. Generate unique order reference
    const orderReference = generateOrderReference();

    // 3. Create order record with PENDING status
    const order = await OrderDB.create({
      orderReference,
      paystackReference: orderReference,
      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city ? customer.city.trim() : 'Ado-Ekiti',
        state: customer.state ? customer.state.trim() : 'Ekiti',
        shippingMethod
      },
      items: validatedItems,
      subtotalNGN,
      shippingCostNGN,
      grandTotalNGN,
      paymentMethod,
      paymentStatus: 'PENDING'
    });

    // 4. Initialize Paystack Transaction if payment method is paystack
    if (paymentMethod === 'paystack') {
      const baseUrl = process.env.BASE_URL || originUrl || 'http://127.0.0.1:5173';
      const callbackUrl = `${baseUrl.replace(/\/$/, '')}/?payment_callback=true&reference=${encodeURIComponent(orderReference)}`;

      const paystackRes = await PaystackService.initialize({
        email: order.customer.email,
        amountNGN: grandTotalNGN,
        reference: orderReference,
        callbackUrl,
        metadata: {
          order_id: order.id,
          order_reference: orderReference,
          phone: order.customer.phone,
          customer_name: order.customer.fullName
        }
      });

      return {
        success: true,
        orderId: order.id,
        orderReference,
        authorizationUrl: paystackRes.authorization_url,
        accessCode: paystackRes.access_code,
        grandTotalNGN,
        isSandbox: paystackRes.isSandbox
      };
    }

    // For Bank Transfer fallback
    return {
      success: true,
      orderId: order.id,
      orderReference,
      grandTotalNGN,
      bankDetails: {
        bankName: 'First Bank of Nigeria',
        accountName: 'Labuk Agro Ltd',
        accountNumber: '2034981120'
      }
    };
  },

  /**
   * Independently verifies payment status with Paystack and finalizes order.
   * Completely idempotent: repeated calls safely return existing verified state.
   */
  async verifyAndFinalizePayment(reference) {
    if (!reference) {
      throw new Error('Reference is required for payment verification.');
    }

    const order = await OrderDB.getByReference(reference);
    if (!order) {
      throw new Error(`Order not found for transaction reference: ${reference}`);
    }

    // Idempotency: If order is already paid, return confirmed details immediately
    if (order.paymentStatus === 'PAID') {
      return {
        success: true,
        alreadyVerified: true,
        order
      };
    }

    // Server-side verification with Paystack
    const verification = await PaystackService.verify(reference);

    if (!verification.verified) {
      await OrderDB.update(order.id, {
        paymentStatus: 'FAILED'
      });
      await OrderDB.addAuditLog(order.id, {
        action: 'Payment Verification Failed',
        previousStatus: 'PENDING',
        newStatus: 'FAILED',
        user: 'Paystack Gateway',
        notes: verification.message || 'Payment was not successful or abandoned'
      });

      return {
        success: false,
        paymentStatus: 'FAILED',
        message: verification.message || 'Payment could not be verified by Paystack.',
        order: await OrderDB.getById(order.id)
      };
    }

    // Security check: Validate amount & currency
    if (verification.amountNGN !== null && Math.abs(verification.amountNGN - order.grandTotalNGN) > 1) {
      console.error(`[SECURITY ALERT] Payment amount mismatch for order ${order.id}: Expected ₦${order.grandTotalNGN}, received ₦${verification.amountNGN}`);
      await OrderDB.update(order.id, {
        paymentStatus: 'FAILED'
      });
      await OrderDB.addAuditLog(order.id, {
        action: 'Security Mismatch Alert',
        previousStatus: 'PENDING',
        newStatus: 'FAILED',
        user: 'Security Sentinel',
        notes: `Amount mismatch: Expected ₦${order.grandTotalNGN}, received ₦${verification.amountNGN}`
      });
      throw new Error('Payment amount does not match order total.');
    }

    // Generate permanent tracking ID if not already assigned
    let trackingId = order.trackingId;
    if (!trackingId) {
      trackingId = generateTrackingId();
    }

    // Mark order as PAID
    const updatedOrder = await OrderDB.update(order.id, {
      paymentStatus: 'PAID',
      trackingId,
      paystackPaidAt: verification.paidAt,
      paystackMetadata: {
        channel: verification.channel,
        gatewayResponse: verification.gatewayResponse || 'Successful',
        isSandbox: verification.isSandbox || false
      }
    });

    await OrderDB.addAuditLog(order.id, {
      action: 'Payment Verified & Confirmed',
      previousStatus: 'PENDING',
      newStatus: 'PAID',
      user: 'Paystack Verification',
      notes: `Verified via Paystack. Channel: ${verification.channel}. Assigned Tracking ID: ${trackingId}`
    });

    // Trigger order confirmation email once
    if (!updatedOrder.emailSent) {
      try {
        await sendOrderConfirmationEmail(updatedOrder);
        await OrderDB.update(order.id, { emailSent: true });
      } catch (e) {
        console.error('[EMAIL DISPATCH ERROR]:', e);
      }
    }

    return {
      success: true,
      alreadyVerified: false,
      order: await OrderDB.getById(order.id)
    };
  },

  /**
   * Processes Paystack Webhooks with signature validation and idempotency.
   */
  async processWebhook(rawBody, signature) {
    const isValid = PaystackService.validateWebhookSignature(rawBody, signature);
    if (!isValid) {
      throw new Error('Invalid webhook signature.');
    }

    const event = JSON.parse(rawBody.toString('utf-8'));
    console.log(`[PAYSTACK WEBHOOK] Received event: ${event.event} for reference: ${event.data?.reference}`);

    if (event.event === 'charge.success') {
      const reference = event.data.reference;
      return await this.verifyAndFinalizePayment(reference);
    }

    return { received: true, event: event.event };
  },

  /**
   * Customer-facing tracking query with identity verification check.
   */
  async trackOrder(trackingId, verificationValue) {
    if (!trackingId || !verificationValue) {
      throw new Error('Both Tracking ID and verification email/phone are required.');
    }

    const order = await OrderDB.findCustomerOrder(trackingId, verificationValue);
    if (!order) {
      return null;
    }

    // Return sanitized customer view (no internal tokens or gateway payloads)
    return {
      trackingId: order.trackingId,
      orderReference: order.orderReference,
      customerName: order.customer.fullName,
      maskedPhone: order.customer.phone.replace(/(\d{4})\d+(\d{3})/, '$1****$2'),
      deliveryAddress: `${order.customer.address}, ${order.customer.city}, ${order.customer.state}`,
      shippingMethod: order.customer.shippingMethod,
      items: order.items.map(i => ({
        name: i.name,
        size: i.size,
        quantity: i.quantity,
        unitPriceNGN: i.unitPriceNGN,
        lineTotalNGN: i.lineTotalNGN,
        image: i.image
      })),
      subtotalNGN: order.subtotalNGN,
      shippingCostNGN: order.shippingCostNGN,
      grandTotalNGN: order.grandTotalNGN,
      paymentStatus: order.paymentStatus,
      deliveryStatus: order.deliveryStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    };
  },

  /**
   * Admin Authentication
   */
  validateAdmin(authHeader) {
    if (!authHeader) return false;
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    return token === ADMIN_TOKEN || token === ADMIN_PASSWORD;
  },

  adminLogin(password) {
    if (password === ADMIN_PASSWORD) {
      return { success: true, token: ADMIN_TOKEN };
    }
    return { success: false, message: 'Invalid administrative password.' };
  },

  /**
   * Updates order fulfillment status with audit logging. Never alters payment status.
   */
  async adminUpdateDeliveryStatus(orderId, newDeliveryStatus, notes = '', adminUser = 'Admin') {
    const validStatuses = [
      'Order Received',
      'Processing',
      'Ready for Dispatch',
      'Dispatched',
      'Delivered',
      'Cancelled',
      'Refunded'
    ];

    if (!validStatuses.includes(newDeliveryStatus)) {
      throw new Error(`Invalid delivery status: ${newDeliveryStatus}`);
    }

    const order = await OrderDB.getById(orderId);
    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    const oldStatus = order.deliveryStatus;
    const updated = await OrderDB.update(orderId, {
      deliveryStatus: newDeliveryStatus
    });

    await OrderDB.addAuditLog(orderId, {
      action: 'Delivery Status Updated',
      previousStatus: oldStatus,
      newStatus: newDeliveryStatus,
      user: adminUser,
      notes: notes || `Delivery status progressed to ${newDeliveryStatus}`
    });

    return await OrderDB.getById(orderId);
  }
};
