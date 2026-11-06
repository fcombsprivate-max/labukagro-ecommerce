import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Eye, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, formatPrice, setQuickViewProduct } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  return (
    <div 
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-3xl p-4 sm:p-5 border border-[#e8e4d9] hover:border-[#2d6a4f]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#f4f2e9] mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Top badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {product.badge && (
              <span className="bg-[#1b4332] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Quick View Button */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#1b4332] shadow-md hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#52796f] uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#d97706]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-[#1c241d] text-xs">{product.rating}</span>
              <span className="text-[#8d99ae] text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-[#1b4332] text-base sm:text-lg group-hover:text-[#2d6a4f] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#52796f] font-medium line-clamp-1">
            {product.tagline}
          </p>
        </div>
      </div>

      {/* Footer: Variant Selector & Price & Add to Cart */}
      <div className="pt-4 mt-3 border-t border-[#f1efe7] space-y-3">
        {/* Size / Variant Pills */}
        <div className="flex flex-wrap gap-1.5">
          {product.variants.map((v) => (
            <button
              key={v.size}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVariant(v);
              }}
              className={`text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                selectedVariant.size === v.size
                  ? 'bg-[#1b4332] text-white border-[#1b4332]'
                  : 'bg-[#faf9f5] text-[#52796f] border-[#e5e1d5] hover:border-[#1b4332]'
              }`}
            >
              {v.size}
            </button>
          ))}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div>
            <div className="text-[10px] text-[#52796f] font-semibold uppercase tracking-wider">Price</div>
            <div className="text-base sm:text-lg font-extrabold text-[#1b4332]">
              {formatPrice(selectedVariant.priceNGN)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              addedAnim 
                ? 'bg-[#2d6a4f] text-white scale-95' 
                : 'bg-[#1b4332] text-white hover:bg-[#2d6a4f] hover:shadow-md'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
