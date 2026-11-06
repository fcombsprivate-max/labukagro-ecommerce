import React, { useState } from 'react';
import { Eye, ShieldCheck, Heart, Leaf, X } from 'lucide-react';

export default function HealthRemediesGallery() {
  const [selectedPoster, setSelectedPoster] = useState(null);

  const guides = [
    {
      title: "Nature's Golden Drop (Two Grades)",
      subtitle: "Official Product Guide for Edible vs Non-Edible Castor Oil",
      image: "/images/IMG-20261106-WA0044.jpg",
      tag: "Product Grades"
    },
    {
      title: "Women's Health & Castor Oil Packs",
      subtitle: "Relief for Fibroids, Breast Lumps, Menstrual Cramps & Dermal Care",
      image: "/images/IMG-20261106-WA0024.jpg",
      tag: "Women's Health"
    },
    {
      title: "The Healing Power of Castor Oil",
      subtitle: "Joint Pain, Inflammation Relief, Digestion & Immune Health",
      image: "/images/IMG-20261106-WA0025.jpg",
      tag: "Therapeutic"
    },
    {
      title: "Official Product Shelf & Price Catalog",
      subtitle: "Verified Shelf Layout at Technology Incubation Centre, Ado-Ekiti",
      image: "/images/IMG-20261106-WA0035.jpg",
      tag: "Store Shelf"
    }
  ];

  return (
    <section className="py-16 bg-[#f4f2e9] border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-[#2d6a4f]" />
            <span>Health & Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight">
            The Natural Power & Benefits of Castor Oil
          </h2>
          <p className="text-sm sm:text-base text-[#405646]">
            Official educational infographics and guides created by Labuk Agro Ltd on therapeutic applications, women's wellness, and proper castor pack rituals.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((g, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPoster(g)}
              className="group bg-white rounded-3xl p-3.5 border border-[#e5e1d5] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-[#faf9f5] mb-3">
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#1b4332]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {g.tag}
                </span>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 text-[#1b4332] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Guide</span>
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#1b4332] text-sm group-hover:text-[#2d6a4f] transition-colors">
                  {g.title}
                </h4>
                <p className="text-[11px] text-[#52796f] mt-1 line-clamp-2">
                  {g.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Poster Modal */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedPoster(null)}
        >
          <div 
            className="relative bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-[#e5e1d5] mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1b4332]">
                  {selectedPoster.title}
                </h3>
                <p className="text-xs text-[#52796f]">
                  {selectedPoster.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedPoster(null)}
                className="p-1.5 rounded-full hover:bg-[#f1efe7] text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto rounded-xl">
              <img
                src={selectedPoster.image}
                alt={selectedPoster.title}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
