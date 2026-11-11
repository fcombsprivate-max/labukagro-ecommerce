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
    subtotalNGN,
    finalTotalNGN,
    discountPercent,
    discountCode,
    discountAmountNGN,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    setIsCheckoutOpen
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 flex justify-end animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#e5e1d5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e5e1d5] flex items-center justify-between bg-[#faf9f5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1b4332]" strokeWidth={1.75} />
            <h3 className="font-extrabold text-stone-900 text-lg">Your Cart</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#d8f3dc] text-[#1b4332] tabular-nums">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#f4f2eb] px-5 py-3 border-b border-[#e5e1d5] text-xs">
          <div className="flex items-center justify-between font-semibold text-stone-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#2d6a4f]" strokeWidth={1.75} />
              {progressPercent >= 100 ? (
                <span className="text-[#2d6a4f] font-bold">Free Nationwide Delivery qualified</span>
              ) : (
                <span>
                  Add <strong className="tabular-nums">₦{amountRemaining.toLocaleString('en-NG')}</strong> more for Free Delivery
                </span>
              )}
            </span>
            <span className="font-bold tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full bg-stone-300 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#2d6a4f] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#faf9f5] flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8" strokeWidth={1.75} />
              </div>
              <h4 className="font-bold text-stone-900 text-base">Your cart is empty</h4>
              <p className="text-xs text-stone-600 max-w-xs mx-auto font-normal">
                Select your pure cold-pressed oils, wild raw honey, or certified seeds.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#1b4332] text-white text-xs font-bold hover:bg-[#2d6a4f] cursor-pointer"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.key}
                /* Inner radius rule: outer rounded-2xl (16px), padding p-3 (12px) -> inner img rounded (4px) */
                className="flex gap-3 p-3 rounded-2xl bg-[#faf9f5] border border-[#e5e1d5] items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded object-cover bg-white shrink-0 border border-[#e5e1d5]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-stone-600 font-medium">
                    {item.variant.size}
                  </div>
                  <div className="text-xs font-extrabold text-[#1b4332] mt-0.5 tabular-nums">
                    {formatPrice(item.variant.priceNGN * item.quantity)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1 bg-white border border-[#e5e1d5] rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.key, -1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-stone-900 hover:bg-stone-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-stone-900 tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.key, 1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-stone-900 hover:bg-stone-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.key)}
                  className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#e5e1d5] bg-[#faf9f5] space-y-4">
            
            {/* Promo Code: Mono font specifically for promo code */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              {discountPercent > 0 ? (
                <div className="flex items-center justify-between bg-[#d8f3dc] px-3 py-1.5 rounded-xl border border-[#b7e4c7] text-xs">
                  <span className="flex items-center gap-1.5 text-[#1b4332] font-semibold">
                    <Tag className="w-3.5 h-3.5 text-[#2d6a4f]" strokeWidth={1.75} />
                    <span>Coupon: <span className="font-mono font-bold tracking-wider">{discountCode}</span> ({discountPercent}% OFF)</span>
                  </span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-red-600 font-bold hover:underline cursor-pointer"
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
                    placeholder="Coupon code (e.g. LABUK10)"
                    className="flex-1 bg-white border border-[#e5e1d5] rounded-xl px-3 py-1.5 text-xs text-stone-900 font-mono uppercase focus:outline-hidden focus:border-[#1b4332]"
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

            {/* Calculations: Tabular numbers */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-[#e5e1d5] pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {formatPrice(subtotalNGN)}
                </span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-[#2d6a4f] font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="tabular-nums">-{formatPrice(discountAmountNGN)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-stone-900">
                  {progressPercent >= 100 ? (
                    <span className="text-[#2d6a4f] font-bold">FREE</span>
                  ) : (
                    'Calculated at checkout'
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-[#143224] pt-2 border-t border-[#e5e1d5]">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(finalTotalNGN)}</span>
              </div>
            </div>

            {/* Checkout Action: Emphasized CTA */}
            <button
              type="button"
              onClick={handleCheckoutClick}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2d6a4f]" strokeWidth={1.75} />
              <span>Certified NAFDAC Standard Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
