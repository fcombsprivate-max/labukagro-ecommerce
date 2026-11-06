import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('labuk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState('NGN'); // Default and locked to Naira

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('labuk_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, variant, quantity = 1) => {
    const chosenVariant = variant || product.variants[0];
    setCart((prev) => {
      const itemKey = `${product.id}-${chosenVariant.size}`;
      const existing = prev.find((item) => item.key === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          product,
          variant: chosenVariant,
          quantity
        }
      ];
    });

    showToast(`Added ${quantity}x ${product.name} (${chosenVariant.size}) to cart!`);
  };

  const updateQuantity = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LABUK10' || clean === 'ORGANIC10') {
      setDiscountPercent(10);
      setDiscountCode(clean);
      return { success: true, message: '10% discount applied!' };
    }
    if (clean === 'FIRSTHARVEST') {
      setDiscountPercent(15);
      setDiscountCode(clean);
      return { success: true, message: '15% First Harvest discount applied!' };
    }
    return { success: false, message: 'Invalid or expired promo code.' };
  };

  const removePromoCode = () => {
    setDiscountCode('');
    setDiscountPercent(0);
  };

  // Pricing calculations
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalNGN = cart.reduce(
    (sum, item) => sum + item.variant.priceNGN * item.quantity,
    0
  );

  const subtotalUSD = cart.reduce(
    (sum, item) => sum + item.variant.priceUSD * item.quantity,
    0
  );

  const discountAmountNGN = (subtotalNGN * discountPercent) / 100;
  const discountAmountUSD = (subtotalUSD * discountPercent) / 100;

  const finalTotalNGN = Math.max(0, subtotalNGN - discountAmountNGN);
  const finalTotalUSD = Math.max(0, subtotalUSD - discountAmountUSD);

  const formatPrice = (ngnVal) => {
    return `₦${Number(ngnVal || 0).toLocaleString('en-NG')}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        currency,
        setCurrency,
        formatPrice,
        totalItemCount,
        subtotalNGN,
        subtotalUSD,
        discountPercent,
        discountCode,
        discountAmountNGN,
        discountAmountUSD,
        finalTotalNGN,
        finalTotalUSD,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isConsultationOpen,
        setIsConsultationOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
