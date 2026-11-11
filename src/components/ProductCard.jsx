import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Eye, Check, Loader2 } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, formatPrice, setQuickViewProduct } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [buttonState, setButtonState] = useState('idle'); // 'idle' | 'loading' | 'added'

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (buttonState !== 'idle') return;
    
    setButtonState('loading');
    setTimeout(() => {
      addToCart(product, selectedVariant, 1);
      setButtonState('added');
      setTimeout(() => {
        setButtonState('idle');
      }, 1200);
    }, 280);
  };

  return (
    <div 
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-3xl p-3.5 xs:p-4 border border-[#e5e1d5] hover:border-[#1b4332]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer w-full"
    >
      <div>
        {/* Inner radius = outer (24px) - padding (16px) = 8px (rounded-lg) */}
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#f7f5ef] mb-3 sm:mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Quick View Button: Visible on hover on desktop, easy tap on touch */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="absolute bottom-2.5 right-2.5 min-w-[36px] min-h-[36px] rounded-full bg-white text-stone-800 shadow-md hover:bg-stone-50 hover:text-stone-950 flex items-center justify-center transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
            title="View product details"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Product Details */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-600 text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" strokeWidth={1.75} />
              <span className="font-bold text-stone-900 text-xs tabular-nums">{product.rating}</span>
              <span className="text-stone-500 text-[11px] tabular-nums">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-stone-900 text-sm xs:text-base group-hover:text-[#1b4332] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 font-normal line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>
      </div>

      {/* Footer: Variant Pills & Price & Add to Cart */}
      <div className="pt-3.5 sm:pt-4 mt-3 border-t border-[#f1efe7] space-y-3">
        {/* Size / Variant Pills: Mobile Touch Friendly */}
        <div className="flex flex-wrap gap-1.5">
          {product.variants.map((v) => (
            <button
              key={v.size}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVariant(v);
              }}
              className={`min-h-[30px] text-[11px] font-semibold px-2 xs:px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                selectedVariant.size === v.size
                  ? 'bg-[#1b4332] text-white border-[#1b4332]'
                  : 'bg-[#faf9f5] text-stone-700 border-[#e5e1d5] hover:border-stone-400'
              }`}
            >
              {v.size}
            </button>
          ))}
        </div>

        {/* Price & Add to Cart Action */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="text-base xs:text-lg font-extrabold text-[#143224] tabular-nums">
            {formatPrice(selectedVariant.priceNGN)}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={buttonState === 'loading'}
            className={`min-w-[84px] min-h-[38px] px-3.5 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              buttonState === 'added'
                ? 'bg-[#2d6a4f] text-white'
                : buttonState === 'loading'
                ? 'bg-[#1b4332]/80 text-white cursor-wait'
                : 'bg-[#1b4332] text-white hover:bg-[#2d6a4f] active:scale-[0.98] shadow-xs'
            }`}
          >
            {buttonState === 'loading' && (
              <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
            )}
            {buttonState === 'added' && (
              <>
                <Check className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Added!</span>
              </>
            )}
            {buttonState === 'idle' && (
              <>
                <ShoppingCart className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
