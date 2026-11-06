import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotalNGN,
    subtotalUSD,
    finalTotalNGN,
    finalTotalUSD,
    discountPercent,
    discountCode,
    discountAmountNGN,
    discountAmountUSD,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    setIsCheckoutOpen,
    currency
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  // Free delivery threshold: ₦50,000
  const threshold = 50000;
  const currentTotal = subtotalNGN;
  const progressPercent = Math.min(100, Math.round((currentTotal / threshold) * 100));
  const amountRemaining = Math.max(0, threshold - currentTotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#e5e1d5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e5e1d5] flex items-center justify-between bg-[#faf9f5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1b4332]" />
            <h3 className="font-extrabold text-[#1b4332] text-lg">Your Farm Cart</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#d8f3dc] text-[#1b4332]">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#e5e1d5] text-[#52796f] hover:text-[#1c241d] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#f1efe7] px-5 py-3 border-b border-[#e5e1d5] text-xs">
          <div className="flex items-center justify-between font-semibold text-[#1b4332] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#2d6a4f]" />
              {progressPercent >= 100 ? (
                <span className="text-[#2d6a4f] font-bold">🎉 You qualify for FREE Nationwide Delivery!</span>
              ) : (
                <span>
                  Add{' '}
                  <strong>
                    ₦{amountRemaining.toLocaleString('en-NG')}
                  </strong>{' '}
                  more for FREE Delivery
                </span>
              )}
            </span>
            <span className="font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#e0ded6] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#2d6a4f] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#f1efe7] flex items-center justify-center mx-auto text-[#52796f]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-[#1b4332] text-base">Your cart is empty</h4>
              <p className="text-xs text-[#52796f] max-w-xs mx-auto">
                Discover our pure cold-pressed oils, wild raw honey, and farm-fresh spices.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#1b4332] text-white text-xs font-bold hover:bg-[#2d6a4f] cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.key}
                className="flex gap-3 p-3 rounded-2xl bg-[#faf9f5] border border-[#e5e1d5] items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-white shrink-0 border border-[#e5e1d5]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-[#1b4332] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-[#52796f] font-medium">
                    Size: <span className="font-bold text-[#1c241d]">{item.variant.size}</span>
                  </div>
                  <div className="text-xs font-extrabold text-[#2d6a4f] mt-0.5">
                    {formatPrice(item.variant.priceNGN * item.quantity)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1 bg-white border border-[#e5e1d5] rounded-lg p-0.5">
                  <button
                    onClick={() => updateQuantity(item.key, -1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-[#1b4332] hover:bg-[#f1efe7]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-[#1b4332]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.key, 1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-[#1b4332] hover:bg-[#f1efe7]"
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.key)}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#e5e1d5] bg-[#faf9f5] space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              {discountPercent > 0 ? (
                <div className="flex items-center justify-between bg-[#d8f3dc] px-3 py-1.5 rounded-xl border border-[#b7e4c7] text-xs">
                  <span className="flex items-center gap-1.5 text-[#1b4332] font-bold">
                    <Tag className="w-3.5 h-3.5 text-[#2d6a4f]" />
                    <span>Coupon: {discountCode} ({discountPercent}% OFF)</span>
                  </span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-red-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. LABUK10)"
                    className="flex-1 bg-white border border-[#e5e1d5] rounded-xl px-3 py-1.5 text-xs text-[#1c241d] uppercase focus:outline-hidden focus:border-[#1b4332]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#1b4332] text-white text-xs font-bold rounded-xl hover:bg-[#2d6a4f] cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && <p className="text-[11px] text-red-600 font-medium">{promoError}</p>}
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#52796f] border-t border-[#e5e1d5] pt-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-[#1c241d]">
                  {formatPrice(subtotalNGN)}
                </span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-[#2d6a4f] font-semibold">
                  <span>Discount ({discountPercent}%):</span>
                  <span>-{formatPrice(discountAmountNGN)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="font-semibold text-[#1c241d]">
                  {progressPercent >= 100 ? (
                    <span className="text-[#2d6a4f] font-bold">FREE</span>
                  ) : (
                    'Calculated at checkout'
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-[#1b4332] pt-2 border-t border-[#e5e1d5]">
                <span>Total Amount:</span>
                <span>{formatPrice(finalTotalNGN)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#52796f]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span>Secure Payment Simulation • Paystack & Card</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
