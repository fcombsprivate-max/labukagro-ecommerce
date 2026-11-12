// Universal API Router for Labuk Agro Ltd
// Works seamlessly in Node.js (Vite middleware, Express) and Serverless (Netlify Functions)
import { OrderService } from './orderService.js';

/**
 * Handles incoming HTTP requests for `/api/*` endpoints.
 * @param {Object} req Standard Node.js IncomingMessage or compatible request object
 * @param {Object} res Standard Node.js ServerResponse or compatible response object
 */
export async function handleApiRequest(req, res) {
  // CORS & Content-Type Headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-paystack-signature');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/^\/api/, ''); // Normalize /api/... to /...

  try {
    // 1. POST /payment/initialize
    if (pathname === '/payment/initialize' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const origin = req.headers.origin || `http://${req.headers.host}`;
      const result = await OrderService.initializeOrder({
        ...body,
        originUrl: origin
      });
      res.statusCode = 200;
      res.end(JSON.stringify(result));
      return;
    }

    // 2. GET /payment/verify?reference=...
    if (pathname === '/payment/verify' && req.method === 'GET') {
      const reference = url.searchParams.get('reference');
      if (!reference) {
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, message: 'Missing transaction reference parameter.' }));
        return;
      }
      const result = await OrderService.verifyAndFinalizePayment(reference);
      res.statusCode = result.success ? 200 : 400;
      res.end(JSON.stringify(result));
      return;
    }

    // 3. POST /payment/webhook
    if (pathname === '/payment/webhook' && req.method === 'POST') {
      const rawBody = await readRawBody(req);
      const signature = req.headers['x-paystack-signature'] || '';
      const result = await OrderService.processWebhook(rawBody, signature);
      res.statusCode = 200;
      res.end(JSON.stringify({ status: 'success', data: result }));
      return;
    }

    // 4. POST /orders/track
    if (pathname === '/orders/track' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const { trackingId, verificationValue } = body;
      const order = await OrderService.trackOrder(trackingId, verificationValue);
      if (!order) {
        res.statusCode = 404;
        res.end(JSON.stringify({ 
          success: false, 
          message: 'No matching order found. Please check your Tracking ID and verification details.' 
        }));
        return;
      }
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, order }));
      return;
    }

    // 5. POST /admin/login
    if (pathname === '/admin/login' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const result = OrderService.adminLogin(body.password);
      res.statusCode = result.success ? 200 : 401;
      res.end(JSON.stringify(result));
      return;
    }

    // 6. GET /admin/orders
    if (pathname === '/admin/orders' && req.method === 'GET') {
      const isAuth = OrderService.validateAdmin(req.headers.authorization);
      if (!isAuth) {
        res.statusCode = 401;
        res.end(JSON.stringify({ success: false, message: 'Unauthorized. Admin authentication required.' }));
        return;
      }

      const query = url.searchParams.get('q') || '';
      const paymentStatus = url.searchParams.get('paymentStatus') || '';
      const deliveryStatus = url.searchParams.get('deliveryStatus') || '';

      const { OrderDB } = await import('./db.js');
      const orders = await OrderDB.search({ query, paymentStatus, deliveryStatus });
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, count: orders.length, orders }));
      return;
    }

    // 7. POST /admin/orders/status
    if (pathname === '/admin/orders/status' && req.method === 'POST') {
      const isAuth = OrderService.validateAdmin(req.headers.authorization);
      if (!isAuth) {
        res.statusCode = 401;
        res.end(JSON.stringify({ success: false, message: 'Unauthorized. Admin authentication required.' }));
        return;
      }

      const body = await parseJsonBody(req);
      const { orderId, deliveryStatus, notes, adminUser } = body;
      const updated = await OrderService.adminUpdateDeliveryStatus(orderId, deliveryStatus, notes, adminUser);
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, order: updated }));
      return;
    }

    // Route not found
    res.statusCode = 404;
    res.end(JSON.stringify({ success: false, message: `Endpoint not found: ${pathname}` }));
  } catch (err) {
    console.error(`[API ERROR] ${pathname}:`, err);
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, message: err.message || 'Internal server error.' }));
  }
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      if (data.length > 1e6) { // 1MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
