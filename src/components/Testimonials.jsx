import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, Quote, CheckCircle } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#faf9f5] border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-bold uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5 text-[#2d6a4f]" />
            <span>Verified Customer Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b4332]">
            What Our Clients Say
          </h2>
          <p className="text-xs sm:text-sm text-[#52796f]">
            From retail consumers and dermatologists to wholesale grain aggregators across Nigeria and West Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 rounded-3xl border border-[#e5e1d5] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#d97706]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#b7e4c7]" />
                </div>

                <p className="text-xs sm:text-sm text-[#405646] leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#f1efe7]">
                <div className="font-bold text-sm text-[#1b4332]">{t.name}</div>
                <div className="text-xs text-[#52796f]">{t.role}</div>
                <div className="text-[11px] font-semibold text-[#2d6a4f] mt-1">
                  Product: {t.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
