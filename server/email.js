// Email Notification Engine for Labuk Agro Orders
// Dispatches branded customer confirmation and administrator notifications.
// Pluggable: Supports standard SMTP / Nodemailer when configured, with graceful fallback logging.

export async function sendOrderConfirmationEmail(order) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'orders@labukagro.com';
  const customerEmail = order.customer.email;

  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e1d5; font-size: 13px; color: #292524;">
        <strong>${item.name}</strong> (${item.size})
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e1d5; font-size: 13px; color: #292524; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e1d5; font-size: 13px; color: #143224; font-weight: bold; text-align: right;">
        ₦${(item.unitPriceNGN * item.quantity).toLocaleString()}
      </td>
    </tr>
  `).join('');

  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Received — Labuk Agro Ltd</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf9f5; margin: 0; padding: 24px; color: #292524;">
      <table align="center" width="100%" max-width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e1d5; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Header -->
        <tr>
          <td style="background-color: #1b4332; padding: 28px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px;">LABUK AGRO LTD</h1>
            <p style="color: #d8f3dc; margin: 6px 0 0 0; font-size: 13px;">Sustainable Agro-Processing & Farm Produce • Ado-Ekiti</p>
          </td>
        </tr>
        
        <!-- Status Banner -->
        <tr>
          <td style="padding: 24px 24px 16px 24px;">
            <div style="background-color: #d8f3dc; border: 1px solid #b7e4c7; border-radius: 12px; padding: 16px; text-align: center;">
              <h2 style="color: #1b4332; margin: 0 0 6px 0; font-size: 18px;">Payment Received & Verified</h2>
              <p style="color: #2d6a4f; margin: 0; font-size: 13px; line-height: 1.5;">
                Thank you for shopping with Labuk Agro. Your payment has been successfully received and verified. Your order has been confirmed, and we will process it for delivery.
              </p>
            </div>
          </td>
        </tr>

        <!-- Tracking ID Callout -->
        <tr>
          <td style="padding: 0 24px 16px 24px;">
            <div style="background-color: #faf9f5; border: 1px dashed #2d6a4f; border-radius: 12px; padding: 18px; text-align: center;">
              <div style="font-size: 11px; text-transform: uppercase; color: #57534e; font-weight: bold; letter-spacing: 0.5px;">Your Unique Order Tracking ID</div>
              <div style="font-size: 22px; font-weight: 800; color: #1b4332; font-family: monospace; letter-spacing: 2px; margin: 8px 0;">
                ${order.trackingId}
              </div>
              <p style="color: #78716c; font-size: 11px; margin: 0; line-height: 1.4;">
                Please keep your tracking ID safe. You can use it to track your order online or contact our support team regarding your purchase.
              </p>
            </div>
          </td>
        </tr>

        <!-- Order Summary -->
        <tr>
          <td style="padding: 0 24px 20px 24px;">
            <h3 style="color: #143224; font-size: 14px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #f4f1ea; padding-bottom: 6px;">
              Order Summary (${order.orderReference})
            </h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              <thead>
                <tr style="text-align: left; font-size: 11px; color: #78716c; text-transform: uppercase;">
                  <th style="padding-bottom: 8px;">Product</th>
                  <th style="padding-bottom: 8px; text-align: center;">Qty</th>
                  <th style="padding-bottom: 8px; text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding-top: 10px; font-size: 13px; color: #57534e;">Subtotal</td>
                  <td style="padding-top: 10px; font-size: 13px; color: #292524; font-weight: bold; text-align: right;">₦${order.subtotalNGN.toLocaleString()}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 6px 0; font-size: 13px; color: #57534e;">Shipping Dispatch</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #292524; font-weight: bold; text-align: right;">₦${order.shippingCostNGN.toLocaleString()}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 12px 0 0 0; font-size: 16px; color: #143224; font-weight: 800; border-top: 2px solid #1b4332;">Total Paid</td>
                  <td style="padding: 12px 0 0 0; font-size: 16px; color: #143224; font-weight: 800; text-align: right; border-top: 2px solid #1b4332;">₦${order.grandTotalNGN.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </td>
        </tr>

        <!-- Delivery Destination -->
        <tr>
          <td style="padding: 0 24px 24px 24px;">
            <div style="background-color: #faf9f5; border-radius: 12px; padding: 14px; font-size: 12px; color: #57534e;">
              <strong style="color: #143224; display: block; margin-bottom: 4px;">Delivery Destination:</strong>
              ${order.customer.fullName}<br>
              ${order.customer.address}, ${order.customer.city}, ${order.customer.state}<br>
              Phone: ${order.customer.phone}
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f7f5ef; padding: 20px 24px; text-align: center; font-size: 11px; color: #78716c; border-top: 1px solid #e5e1d5;">
            Labuk Agro Ltd • Unit 22, Technology Incubation Center (TIC), Ajilosun Ikere Road, Ado-Ekiti, Nigeria.<br>
            Direct Helpline: 0806 055 1016 • Email: info@labukagro.com
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Log email payload for dev/audit
  console.log(`[EMAIL DISPATCH] Triggered Order Confirmation for ${order.trackingId}`);
  console.log(`[EMAIL] To Customer: ${customerEmail}`);
  console.log(`[EMAIL] To Admin: ${adminEmail}`);

  // In production, if SMTP credentials are provided, dispatch via nodemailer:
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = await import('nodemailer').catch(() => null);
      if (nodemailer) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || '"Labuk Agro Ltd" <orders@labukagro.com>',
          to: customerEmail,
          subject: `Payment Received: Order ${order.trackingId} Confirmed`,
          html: customerHtml
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || '"Labuk Agro Ltd" <orders@labukagro.com>',
          to: adminEmail,
          subject: `[NEW ORDER] ${order.trackingId} — ₦${order.grandTotalNGN.toLocaleString()}`,
          html: customerHtml
        });

        console.log(`[EMAIL] Successfully sent live emails for ${order.trackingId}`);
        return { success: true, live: true };
      }
    } catch (err) {
      console.error('[EMAIL ERROR] Failed to send via SMTP:', err);
    }
  }

  // Gracefully return logged status
  return { success: true, live: false, logged: true };
}
