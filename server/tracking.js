// Secure, unique tracking ID generator for Labuk Agro Ltd orders
// Format: LAG-YYYYMMDD-XXXXXX (e.g. LAG-20261111-A8F42K)
import crypto from 'crypto';

/**
 * Generates a collision-resistant, readable Order Tracking ID.
 * @param {Date} [date] Optional date object, defaults to now.
 * @returns {string} Formatted tracking ID
 */
export function generateTrackingId(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  // Generate 6 uppercase alphanumeric characters excluding ambiguous letters (0, O, 1, I)
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let suffix = '';
  const randomBytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    suffix += chars[randomBytes[i] % chars.length];
  }

  return `LAG-${dateStr}-${suffix}`;
}

/**
 * Generates an internal order reference.
 * @returns {string}
 */
export function generateOrderReference() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `ORD-${timestamp}-${rand}`;
}
