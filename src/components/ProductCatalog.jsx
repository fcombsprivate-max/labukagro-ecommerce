import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { SlidersHorizontal, AlertCircle } from 'lucide-react';

export default function ProductCatalog({ searchTerm, activeCategory, setActiveCategory }) {
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'All Products' || product.category === activeCategory;
      const matchesSearch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.variants[0].priceNGN - b.variants[0].priceNGN;
      }
      if (sortBy === 'price-high') {
        return b.variants[0].priceNGN - a.variants[0].priceNGN;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // default featured
    });
  }, [searchTerm, activeCategory, sortBy]);

  return (
    <section id="shop" className="py-16 sm:py-20 bg-[#faf9f5] border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Specific, Balanced & Clean */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-4xl font-extrabold text-[#143224] tracking-tight"
          >
            Labuk Agro Store: Certified Oils, Honey & Farm Seeds
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            Cold-pressed expeller castor and neem oils, unheated raw forest honey, and certified high-germination planting seeds sourced directly from Ekiti.
          </p>
        </div>

        {/* Categories Bar & Sorting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1b4332] text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-[#e5e1d5] hover:border-[#1b4332] hover:text-[#1b4332]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort By Controls */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-stone-600" strokeWidth={1.75} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white text-xs sm:text-sm font-semibold text-stone-900 border border-[#e5e1d5] rounded-xl px-3 py-2 focus:outline-hidden focus:border-[#1b4332] cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Product Count / Search notice */}
        {searchTerm && (
          <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-stone-700 bg-white p-3.5 rounded-xl border border-[#e5e1d5]">
            <span>Showing results for "<strong className="text-stone-950">{searchTerm}</strong>"</span>
            <span className="font-bold text-[#1b4332] tabular-nums">{filteredProducts.length} items found</span>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#e5e1d5] p-8 space-y-4">
            <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" strokeWidth={1.75} />
            <h3 className="text-lg font-bold text-stone-900">No matching agro products found</h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              We couldn't find any products matching "{searchTerm}". Try clearing your search query or selecting another category.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('All Products')}
              className="px-5 py-2.5 rounded-xl bg-[#1b4332] text-white text-xs font-bold hover:bg-[#2d6a4f] cursor-pointer"
            >
              View All Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
