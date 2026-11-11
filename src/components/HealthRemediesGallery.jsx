import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

export default function HealthRemediesGallery() {
  const [selectedPoster, setSelectedPoster] = useState(null);

  const guides = [
    {
      title: "Castor Oil Grades: Edible vs Non-Edible",
      subtitle: "Official formulation guide distinguishing internal food-grade wellness from topical dermal care",
      image: "/images/IMG-20261106-WA0044.jpg"
    },
    {
      title: "Women's Health & Castor Oil Packs",
      subtitle: "Step-by-step warm compress guide for fibroids relief, pelvic pain, and lymphatic circulation",
      image: "/images/IMG-20261106-WA0024.jpg"
    },
    {
      title: "Therapeutic Power & Biological Applications",
      subtitle: "Digestive detox, joint inflammation reduction, and ricinoleic acid healing mechanisms",
      image: "/images/IMG-20261106-WA0025.jpg"
    },
    {
      title: "Certified Packaging & Verification Guide",
      subtitle: "Official product shelf layout and UV amber bottle standards at Technology Incubation Centre",
      image: "/images/IMG-20261106-WA0035.jpg"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#faf9f5] border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <h2 
            style={{ textWrap: 'balance' }}
            className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#143224] tracking-tight"
          >
            Therapeutic Castor Oil Guides & Clinical Infographics
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-stone-700 font-normal leading-relaxed">
            Official educational infographics created by Labuk Agro Ltd detailing therapeutic applications, women's wellness rituals, and proper castor pack usage.
          </p>
        </div>

        {/* Gallery Grid: 1 col on mobile, 2 col on sm (480px), 4 col on lg (1024px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
          {guides.map((g, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPoster(g)}
              className="group bg-white rounded-3xl p-3.5 xs:p-4 border border-[#e5e1d5] hover:border-[#1b4332]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Inner radius = 24px - 16px = 8px (rounded-lg) */}
              <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-[#f7f5ef] mb-3 sm:mb-3.5">
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>View Guide</span>
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm group-hover:text-[#1b4332] transition-colors leading-snug">
                  {g.title}
                </h4>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed font-normal">
                  {g.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Poster Modal */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedPoster(null)}
        >
          <div 
            className="relative bg-white max-w-2xl w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-[#e5e1d5] mb-3 sm:mb-4 gap-2">
              <div className="min-w-0">
                <h3 className="text-sm xs:text-base sm:text-lg font-bold text-stone-900 truncate">
                  {selectedPoster.title}
                </h3>
                <p className="text-xs text-stone-600 font-normal line-clamp-1">
                  {selectedPoster.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPoster(null)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="max-h-[70vh] sm:max-h-[75vh] overflow-y-auto rounded-xl">
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
