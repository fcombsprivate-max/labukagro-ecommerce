import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, Check, ShoppingBag, ShieldCheck, HelpCircle, Phone, ArrowRight } from 'lucide-react';

export default function ProductModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, formatPrice, setIsCartOpen } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedVariant(quickViewProduct.variants[0]);
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !selectedVariant) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#e5e1d5] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Image & Cert Badges */}
            <div className="space-y-4">
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#f4f2e9] border border-[#e8e4d9] relative">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-3 left-3 bg-[#1b4332] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {quickViewProduct.badge || "Verified Pure"}
                </span>
              </div>

              {/* Technical Specifications */}
              {quickViewProduct.specs && (
                <div className="bg-[#faf9f5] p-4 rounded-2xl border border-[#e5e1d5] text-xs space-y-2">
                  <div className="font-bold text-[#1b4332] uppercase tracking-wider border-b border-[#e5e1d5] pb-1">
                    Quality & Extraction Specs
                  </div>
                  {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-[#52796f]">
                      <span className="capitalize">{key}:</span>
                      <span className="font-bold text-[#1c241d]">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#52796f]">
                  {quickViewProduct.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] mt-1">
                  {quickViewProduct.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-[#d97706]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#1c241d]">{quickViewProduct.rating}</span>
                  <span className="text-xs text-[#8d99ae]">({quickViewProduct.reviewCount} customer reviews)</span>
                </div>
              </div>

              <p className="text-sm text-[#405646] leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Key Benefits */}
              {quickViewProduct.benefits && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1b4332]">
                    Key Benefits & Features:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#405646]">
                    {quickViewProduct.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Usage Instructions */}
              {quickViewProduct.usage && (
                <div className="bg-[#f1efe7] p-3 rounded-xl border border-[#e5e1d5] text-xs text-[#2d6a4f]">
                  <strong>Recommended Usage:</strong> {quickViewProduct.usage}
                </div>
              )}

              {/* Variant Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#1b4332] uppercase tracking-wider">Select Size / Quantity:</span>
                  <span className="text-[#52796f]">Stock Available</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        selectedVariant.size === v.size
                          ? 'border-[#1b4332] bg-[#1b4332] text-white shadow-sm'
                          : 'border-[#e5e1d5] bg-white text-[#1c241d] hover:border-[#1b4332]'
                      }`}
                    >
                      <div>{v.size}</div>
                      <div className="text-[11px] opacity-80 mt-0.5">
                        {formatPrice(v.priceNGN)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Quantity Controls */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#52796f] font-semibold uppercase">Total Price</div>
                  <div className="text-2xl font-extrabold text-[#1b4332]">
                    {formatPrice(selectedVariant.priceNGN * quantity)}
                  </div>
                </div>

                {/* Quantity Buttons */}
                <div className="flex items-center border border-[#e5e1d5] rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-[#f1efe7] text-[#1b4332] font-bold text-sm flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#1b4332]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg hover:bg-[#f1efe7] text-[#1b4332] font-bold text-sm flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    addedSuccess
                      ? 'bg-[#2d6a4f] text-white'
                      : 'bg-[#1b4332] text-white hover:bg-[#2d6a4f]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-3.5 px-4 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* WhatsApp Quick Inquiry Link */}
              <div className="text-center pt-2">
                <a
                  href={`https://wa.me/2348060551016?text=Hello%20Labuk%20Agro,%20I%20have%20an%20inquiry%20regarding%20${encodeURIComponent(quickViewProduct.name)}%20(${selectedVariant.size})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#2d6a4f] hover:text-[#1b4332] underline font-semibold inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Ask a Question on WhatsApp about this Product</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
