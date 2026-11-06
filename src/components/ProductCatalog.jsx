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
    <section id="shop" className="py-16 bg-[#faf9f5] border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading directly inspired by labukagro.com */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-bold uppercase tracking-wider">
            <span>Farm Sourced & Certified Pure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight">
            Our Agro Products & Farm Store
          </h2>
          <p className="text-sm sm:text-base text-[#405646]">
            Browse our farm-fresh commodities, therapeutic cold-pressed castor and neem oils, unheated forest honey, and sun-dried organic spices.
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
                    ? 'bg-[#1b4332] text-white shadow-md'
                    : 'bg-white text-[#52796f] border border-[#e5e1d5] hover:border-[#1b4332] hover:text-[#1b4332]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort By Controls */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#52796f]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white text-xs sm:text-sm font-semibold text-[#1b4332] border border-[#e5e1d5] rounded-xl px-3 py-2 focus:outline-hidden focus:border-[#1b4332] cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Product Count / Search notice */}
        {searchTerm && (
          <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-[#52796f] bg-white p-3 rounded-xl border border-[#e5e1d5]">
            <span>Showing results for "<strong className="text-[#1b4332]">{searchTerm}</strong>"</span>
            <span className="font-bold text-[#1b4332]">{filteredProducts.length} items found</span>
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
            <AlertCircle className="w-12 h-12 text-[#d97706] mx-auto" />
            <h3 className="text-lg font-bold text-[#1b4332]">No matching agro products found</h3>
            <p className="text-sm text-[#52796f] max-w-md mx-auto">
              We couldn't find any products matching "{searchTerm}". Try clearing your search query or choosing another category.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All Products');
              }}
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
