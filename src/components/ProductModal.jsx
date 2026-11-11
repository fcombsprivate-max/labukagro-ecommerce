import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, Check, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';

export default function ProductModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, formatPrice, setIsCartOpen } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addState, setAddState] = useState('idle'); // 'idle' | 'loading' | 'added'

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedVariant(quickViewProduct.variants[0]);
      setQuantity(1);
      setAddState('idle');
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !selectedVariant) return null;

  const handleAddToCart = () => {
    if (addState !== 'idle') return;
    setAddState('loading');
    setTimeout(() => {
      addToCart(quickViewProduct, selectedVariant, quantity);
      setAddState('added');
      setTimeout(() => {
        setAddState('idle');
      }, 1200);
    }, 280);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#e5e1d5] overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md transition-all cursor-pointer"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" strokeWidth={1.75} />
        </button>

        <div className="overflow-y-auto p-4 xs:p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            
            {/* Left: Product Image & Extraction Specs */}
            <div className="space-y-3.5 sm:space-y-4">
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#f7f5ef] border border-[#e5e1d5] relative">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Extraction Specs */}
              {quickViewProduct.specs && (
                <div className="bg-[#faf9f5] p-3.5 sm:p-4 rounded-xl border border-[#e5e1d5] text-xs space-y-2">
                  <div className="font-bold text-stone-900 uppercase tracking-wider border-b border-[#e5e1d5] pb-1">
                    Quality & Extraction Specs
                  </div>
                  {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-stone-600">
                      <span className="capitalize">{key}</span>
                      <span className="font-semibold text-stone-900">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="space-y-4 sm:space-y-5">
              <div>
                <span className="text-xs font-semibold text-stone-500">
                  {quickViewProduct.category}
                </span>
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-[#143224] mt-1 leading-tight">
                  {quickViewProduct.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" strokeWidth={1.75} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-stone-900 tabular-nums">{quickViewProduct.rating}</span>
                  <span className="text-xs text-stone-500 tabular-nums">({quickViewProduct.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                {quickViewProduct.description}
              </p>

              {/* Key Benefits */}
              {quickViewProduct.benefits && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Benefits & Verification
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {quickViewProduct.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Usage Instructions */}
              {quickViewProduct.usage && (
                <div className="bg-[#f4f2eb] p-3 rounded-xl border border-[#e5e1d5] text-xs text-stone-800 font-normal">
                  <strong className="text-stone-950 font-semibold">Recommended Usage:</strong> {quickViewProduct.usage}
                </div>
              )}

              {/* Variant Selector: Touch friendly buttons */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-900">Select Volume</span>
                  <span className="text-stone-500 font-medium tabular-nums">{selectedVariant.stock} in stock</span>
                </div>
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.size}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`min-h-[44px] p-2 sm:p-2.5 rounded-lg text-xs font-semibold border transition-all text-center cursor-pointer ${
                        selectedVariant.size === v.size
                          ? 'border-[#1b4332] bg-[#1b4332] text-white shadow-xs'
                          : 'border-[#e5e1d5] bg-white text-stone-900 hover:border-stone-400'
                      }`}
                    >
                      <div className="truncate">{v.size}</div>
                      <div className="text-[11px] opacity-80 mt-0.5 tabular-nums">
                        {formatPrice(v.priceNGN)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Quantity Controls */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="text-xl sm:text-2xl font-extrabold text-[#143224] tabular-nums">
                  {formatPrice(selectedVariant.priceNGN * quantity)}
                </div>

                {/* Quantity Buttons */}
                <div className="flex items-center border border-[#e5e1d5] rounded-lg bg-white p-0.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-md hover:bg-stone-100 text-stone-900 font-bold text-sm flex items-center justify-center cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-9 text-center font-bold text-sm text-stone-900 tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-md hover:bg-stone-100 text-stone-900 font-bold text-sm flex items-center justify-center cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions: Primary CTA and Amber Accent CTA */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={addState === 'loading'}
                  className={`min-h-[48px] py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                    addState === 'added'
                      ? 'bg-[#2d6a4f] text-white'
                      : addState === 'loading'
                      ? 'bg-[#1b4332]/80 text-white cursor-wait'
                      : 'bg-[#1b4332] text-white hover:bg-[#2d6a4f] active:scale-[0.98]'
                  }`}
                >
                  {addState === 'loading' && (
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                  )}
                  {addState === 'added' && (
                    <>
                      <Check className="w-4 h-4" strokeWidth={2} />
                      <span>Added to Cart!</span>
                    </>
                  )}
                  {addState === 'idle' && (
                    <>
                      <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="min-h-[48px] py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
