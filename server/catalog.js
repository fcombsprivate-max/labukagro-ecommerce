// Server-Side Canonical Product Catalog & Pricing Engine for Labuk Agro Ltd
// Strict security: Never trusts prices submitted by client; prices are verified against this catalog.

export const SERVER_PRODUCTS = {
  "castor-oil-edible": {
    name: "Labuk Castor Oil (Edible Grade)",
    category: "Cold-Pressed Oils",
    variants: {
      "100ml": 2200,
      "500ml": 8500,
      "1 Litre": 17000,
      "5 Litres Gallon": 80000
    }
  },
  "castor-oil-non-edible": {
    name: "Labuk Castor Oil (Topical / Non-Edible)",
    category: "Cold-Pressed Oils",
    variants: {
      "500ml": 8000,
      "1 Litre": 16000,
      "5 Litres Gallon": 75000
    }
  },
  "neem-essential-oil": {
    name: "Labuk Virgin Neem Essential Oil",
    category: "Cold-Pressed Oils",
    variants: {
      "500ml Spout Pouch": 8500,
      "1 Litre Handle Pouch": 16000
    }
  },
  "labuk-natural-honey": {
    name: "Labuk 100% Pure Natural Honey",
    category: "Honey & Extracts",
    variants: {
      "1 Litre Bottle": 8000,
      "500ml Bottle": 4500,
      "5 Litres Bulk Tub": 38000
    }
  },
  "castor-seeds-high-yield": {
    name: "Labuk Certified High-Yield Castor Seeds",
    category: "Bulk Farm Produce",
    variants: {
      "1kg Seed Pack": 10000,
      "5kg Seed Pack": 50000,
      "10kg Bag": 100000,
      "25kg Bag": 250000,
      "50kg Sack": 500000
    }
  },
  "wholesale-farm-grains": {
    name: "Labuk Clean Destoned Yellow Maize",
    category: "Bulk Farm Produce",
    variants: {
      "50kg Sack": 38000,
      "100kg Sack": 74000,
      "1 Metric Ton (20 Sacks)": 720000
    }
  }
};

export const SHIPPING_RATES = {
  standard: 2500,
  express: 4500,
  pickup: 0
};

/**
 * Validates and calculates order totals server-side using the canonical catalog.
 * @param {Array} rawItems Array of { product: { id }, variant: { size }, quantity }
 * @param {string} shippingMethod 'standard' | 'express' | 'pickup'
 * @returns {{ validatedItems: Array, subtotalNGN: number, shippingCostNGN: number, grandTotalNGN: number }}
 */
export function calculateOrderTotal(rawItems = [], shippingMethod = 'standard') {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error('Shopping cart cannot be empty.');
  }

  const validatedItems = [];
  let subtotalNGN = 0;

  for (const item of rawItems) {
    const productId = item.productId || item.product?.id;
    const size = item.size || item.variant?.size;
    const qty = parseInt(item.quantity, 10);

    if (!qty || qty < 1 || isNaN(qty)) {
      throw new Error(`Invalid quantity for item: ${productId}`);
    }

    const catalogProduct = SERVER_PRODUCTS[productId];
    if (!catalogProduct) {
      throw new Error(`Unknown product: ${productId}`);
    }

    const unitPrice = catalogProduct.variants[size];
    if (typeof unitPrice !== 'number') {
      throw new Error(`Unknown size "${size}" for product "${catalogProduct.name}"`);
    }

    const lineTotal = unitPrice * qty;
    subtotalNGN += lineTotal;

    validatedItems.push({
      productId,
      name: catalogProduct.name,
      category: catalogProduct.category,
      size,
      quantity: qty,
      unitPriceNGN: unitPrice,
      lineTotalNGN: lineTotal,
      image: item.product?.image || null
    });
  }

  const shippingCostNGN = SHIPPING_RATES[shippingMethod] !== undefined 
    ? SHIPPING_RATES[shippingMethod] 
    : SHIPPING_RATES.standard;

  const grandTotalNGN = subtotalNGN + shippingCostNGN;

  return {
    validatedItems,
    subtotalNGN,
    shippingCostNGN,
    grandTotalNGN
  };
}
