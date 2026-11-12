// Netlify Serverless Function Handler for Labuk Agro API
import { OrderService } from '../../server/orderService.js';
import { OrderDB } from '../../server/db.js';

export async function handler(event, context) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-paystack-signature'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Normalize path: e.g. "/.netlify/functions/api/payment/verify" or "/api/payment/verify" -> "/payment/verify"
  let path = event.path
    .replace(/^\/\.netlify\/functions\/api/, '')
    .replace(/^\/api/, '');

  if (!path.startsWith('/')) path = '/' + path;

  try {
    const rawBody = event.body 
      ? (event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body)
      : '';
    const body = rawBody ? JSON.parse(rawBody) : {};

    // 1. POST /payment/initialize
    if (path === '/payment/initialize' && event.httpMethod === 'POST') {
      const origin = event.headers.origin || `https://${event.headers.host}`;
      const result = await OrderService.initializeOrder({
        ...body,
        originUrl: origin
      });
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    // 2. GET /payment/verify
    if (path === '/payment/verify' && event.httpMethod === 'GET') {
      const reference = event.queryStringParameters?.reference;
      if (!reference) {
        return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Missing reference parameter.' }) };
      }
      const result = await OrderService.verifyAndFinalizePayment(reference);
      return { statusCode: result.success ? 200 : 400, headers, body: JSON.stringify(result) };
    }

    // 3. POST /payment/webhook
    if (path === '/payment/webhook' && event.httpMethod === 'POST') {
      const signature = event.headers['x-paystack-signature'] || '';
      const result = await OrderService.processWebhook(Buffer.from(rawBody), signature);
      return { statusCode: 200, headers, body: JSON.stringify({ status: 'success', data: result }) };
    }

    // 4. POST /orders/track
    if (path === '/orders/track' && event.httpMethod === 'POST') {
      const { trackingId, verificationValue } = body;
      const order = await OrderService.trackOrder(trackingId, verificationValue);
      if (!order) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ success: false, message: 'No matching order found. Please check your Tracking ID and verification details.' })
        };
      }
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, order }) };
    }

    // 5. POST /admin/login
    if (path === '/admin/login' && event.httpMethod === 'POST') {
      const result = OrderService.adminLogin(body.password);
      return { statusCode: result.success ? 200 : 401, headers, body: JSON.stringify(result) };
    }

    // 6. GET /admin/orders
    if (path === '/admin/orders' && event.httpMethod === 'GET') {
      const isAuth = OrderService.validateAdmin(event.headers.authorization || event.headers.Authorization);
      if (!isAuth) {
        return { statusCode: 401, headers, body: JSON.stringify({ success: false, message: 'Unauthorized' }) };
      }
      const query = event.queryStringParameters?.q || '';
      const paymentStatus = event.queryStringParameters?.paymentStatus || '';
      const deliveryStatus = event.queryStringParameters?.deliveryStatus || '';
      const orders = await OrderDB.search({ query, paymentStatus, deliveryStatus });
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, count: orders.length, orders }) };
    }

    // 7. POST /admin/orders/status
    if (path === '/admin/orders/status' && event.httpMethod === 'POST') {
      const isAuth = OrderService.validateAdmin(event.headers.authorization || event.headers.Authorization);
      if (!isAuth) {
        return { statusCode: 401, headers, body: JSON.stringify({ success: false, message: 'Unauthorized' }) };
      }
      const { orderId, deliveryStatus, notes, adminUser } = body;
      const updated = await OrderService.adminUpdateDeliveryStatus(orderId, deliveryStatus, notes, adminUser);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, order: updated }) };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ success: false, message: `Endpoint not found: ${path}` })
    };
  } catch (err) {
    console.error('[NETLIFY API ERROR]:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: err.message || 'Server error' })
    };
  }
}
