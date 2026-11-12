// Persistent JSON Database Engine with Atomic File Operations for Labuk Agro Orders
import fs from 'fs';
import path from 'path';

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = process.env.DATABASE_FILE || path.join(DB_DIR, 'orders.json');

// In-memory cache for fast lookups
let ordersCache = null;
let writePromise = Promise.resolve();

function ensureDbDirectory() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function loadOrders() {
  if (ordersCache) return ordersCache;
  ensureDbDirectory();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    ordersCache = JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Failed to parse orders database, initializing empty list:', err);
    ordersCache = [];
  }
  return ordersCache;
}

/**
 * Atomically persists orders cache to disk.
 */
function persistOrders() {
  ensureDbDirectory();
  const tempFile = `${DB_FILE}.${Date.now()}.${Math.random().toString(36).substring(7)}.tmp`;
  writePromise = writePromise.then(async () => {
    try {
      const data = JSON.stringify(ordersCache, null, 2);
      await fs.promises.writeFile(tempFile, data, 'utf-8');
      await fs.promises.rename(tempFile, DB_FILE);
    } catch (err) {
      console.error('Failed to write to orders database:', err);
      if (fs.existsSync(tempFile)) {
        try { fs.unlinkSync(tempFile); } catch (e) {}
      }
      throw err;
    }
  });
  return writePromise;
}

export const OrderDB = {
  async getAll() {
    return loadOrders();
  },

  async getById(id) {
    const orders = loadOrders();
    return orders.find(o => o.id === id) || null;
  },

  async getByReference(reference) {
    const orders = loadOrders();
    return orders.find(o => o.paystackReference === reference || o.orderReference === reference) || null;
  },

  async getByTrackingId(trackingId) {
    const orders = loadOrders();
    const cleanId = (trackingId || '').trim().toUpperCase();
    return orders.find(o => o.trackingId && o.trackingId.toUpperCase() === cleanId) || null;
  },

  async findCustomerOrder(trackingId, verificationValue) {
    const order = await this.getByTrackingId(trackingId);
    if (!order) return null;

    const cleanVerify = (verificationValue || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const emailMatch = order.customer.email.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanVerify;
    const phoneMatch = order.customer.phone.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanVerify;

    if (!emailMatch && !phoneMatch) {
      return null;
    }

    return order;
  },

  async create(orderData) {
    const orders = loadOrders();
    const newOrder = {
      id: orderData.id || `ord_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      orderReference: orderData.orderReference,
      trackingId: orderData.trackingId || null,
      customer: orderData.customer,
      items: orderData.items,
      subtotalNGN: orderData.subtotalNGN,
      shippingCostNGN: orderData.shippingCostNGN,
      grandTotalNGN: orderData.grandTotalNGN,
      currency: 'NGN',
      paymentMethod: orderData.paymentMethod || 'paystack',
      paymentStatus: orderData.paymentStatus || 'PENDING',
      paystackReference: orderData.paystackReference || null,
      paystackPaidAt: null,
      deliveryStatus: 'Order Received',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      auditLog: [
        {
          action: 'Order Created',
          previousStatus: null,
          newStatus: orderData.paymentStatus || 'PENDING',
          timestamp: new Date().toISOString(),
          user: 'Customer',
          notes: 'Checkout initialized'
        }
      ],
      emailSent: false
    };

    orders.unshift(newOrder);
    await persistOrders();
    return newOrder;
  },

  async update(id, updates) {
    const orders = loadOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new Error(`Order not found: ${id}`);
    }

    const current = orders[index];
    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    orders[index] = updated;
    await persistOrders();
    return updated;
  },

  async addAuditLog(id, logEntry) {
    const orders = loadOrders();
    const order = orders.find(o => o.id === id);
    if (!order) throw new Error(`Order not found: ${id}`);

    order.auditLog = order.auditLog || [];
    order.auditLog.push({
      action: logEntry.action,
      previousStatus: logEntry.previousStatus || null,
      newStatus: logEntry.newStatus || null,
      timestamp: new Date().toISOString(),
      user: logEntry.user || 'System',
      notes: logEntry.notes || ''
    });
    order.updatedAt = new Date().toISOString();

    await persistOrders();
    return order;
  },

  async search({ query = '', paymentStatus = '', deliveryStatus = '', sortBy = 'date', sortDir = 'desc' }) {
    let orders = [...loadOrders()];

    if (query) {
      const q = query.trim().toLowerCase();
      orders = orders.filter(o => 
        (o.trackingId && o.trackingId.toLowerCase().includes(q)) ||
        (o.orderReference && o.orderReference.toLowerCase().includes(q)) ||
        (o.paystackReference && o.paystackReference.toLowerCase().includes(q)) ||
        (o.customer.fullName && o.customer.fullName.toLowerCase().includes(q)) ||
        (o.customer.email && o.customer.email.toLowerCase().includes(q)) ||
        (o.customer.phone && o.customer.phone.toLowerCase().includes(q))
      );
    }

    if (paymentStatus) {
      orders = orders.filter(o => o.paymentStatus.toUpperCase() === paymentStatus.toUpperCase());
    }

    if (deliveryStatus) {
      orders = orders.filter(o => o.deliveryStatus.toLowerCase() === deliveryStatus.toLowerCase());
    }

    orders.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortDir === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return orders;
  }
};
