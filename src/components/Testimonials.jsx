import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#faf9f5] border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <h2 
            style={{ textWrap: 'balance' }}
            className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#143224]"
          >
            Verified Client Reviews & Commercial Accounts
          </h2>
          <p className="text-xs xs:text-sm text-stone-600 font-normal">
            From retail consumers and dermatologists to wholesale grain aggregators across Nigeria and West Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-[#e5e1d5] flex flex-col justify-between"
            >
              <div className="space-y-3.5 sm:space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" strokeWidth={1.75} />
                  ))}
                </div>

                {/* Unitalicized, upright, clean typography */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3.5 sm:pt-4 mt-3.5 sm:mt-4 border-t border-[#f1efe7]">
                <div className="font-bold text-sm text-stone-900">{t.name}</div>
                <div className="text-xs text-stone-600">{t.role}</div>
                <div className="text-[11px] font-semibold text-[#2d6a4f] mt-1.5">
                  {t.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
