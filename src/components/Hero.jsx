import React from 'react';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Award, Leaf, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero({ onShopClick, onWholesaleClick }) {
  const { setIsConsultationOpen } = useCart();

  return (
    <section id="hero" className="relative bg-[#faf9f5] pt-8 sm:pt-12 lg:pt-20 pb-12 sm:pb-16 lg:pb-24 border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            <h1 
              style={{ textWrap: 'balance' }}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#143224] leading-[1.15] sm:leading-[1.12]"
            >
              Cold-Pressed Castor Oil & Certified Pure Agro Extracts
            </h1>

            <p className="text-sm xs:text-base sm:text-lg text-stone-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Operating since 2016 from <strong className="text-stone-900 font-semibold">Unit 22, Technology Incubation Center, Ado-Ekiti</strong>. Labuk Agro Ltd specializes in quality agro-processing (NAFDAC-certified edible & external castor oils, virgin neem oil), pure original honey from our own apiary, and reliable bulk agricultural produce supply.
            </p>

            {/* CTAs with Mobile-First Full-Width & Desktop Inline Rhythm */}
            <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <button 
                type="button"
                onClick={onShopClick}
                className="w-full xs:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#1b4332] text-white font-bold text-sm sm:text-base hover:bg-[#2d6a4f] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-md"
              >
                <span>Shop Certified Products</span>
                <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              </button>

              <button 
                type="button"
                onClick={onWholesaleClick}
                className="w-full xs:w-auto min-h-[48px] px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-white text-[#1b4332] font-bold text-sm sm:text-base border border-[#e5e1d5] hover:border-[#1b4332] hover:bg-[#f5f3ec] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
              >
                Wholesale & Bulk Supply
              </button>

              <button 
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="w-full xs:w-auto min-h-[40px] px-3 sm:px-4 py-2 sm:py-3 text-stone-700 hover:text-[#1b4332] font-semibold text-xs sm:text-sm transition-colors cursor-pointer underline underline-offset-4 decoration-[#c28b38] flex items-center justify-center text-center"
              >
                Agro Consultation
              </button>
            </div>

            {/* Trust Features: 2x2 on Mobile, 4 columns on Tablet/Desktop */}
            <div className="pt-6 sm:pt-8 mt-2 sm:mt-4 border-t border-[#e5e1d5] grid grid-cols-2 sm:grid-cols-4 gap-3.5 xs:gap-4 sm:gap-6 text-left">
              <div className="flex items-start gap-2 xs:gap-3 min-w-0">
                <ShieldCheck className="w-4 h-4 xs:w-5 xs:h-5 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-900 leading-tight">NAFDAC Certified</div>
                  <div className="text-[10px] xs:text-[11px] text-stone-600 mt-0.5 leading-tight truncate xs:overflow-visible">Lab verified purity</div>
                </div>
              </div>

              <div className="flex items-start gap-2 xs:gap-3 min-w-0">
                <Leaf className="w-4 h-4 xs:w-5 xs:h-5 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-900 leading-tight">100% Hexane-Free</div>
                  <div className="text-[10px] xs:text-[11px] text-stone-600 mt-0.5 leading-tight truncate xs:overflow-visible">Cold expeller</div>
                </div>
              </div>

              <div className="flex items-start gap-2 xs:gap-3 min-w-0">
                <Award className="w-4 h-4 xs:w-5 xs:h-5 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-900 leading-tight">TIC Ado-Ekiti</div>
                  <div className="text-[10px] xs:text-[11px] text-stone-600 mt-0.5 leading-tight truncate xs:overflow-visible">Federal Hub</div>
                </div>
              </div>

              <div className="flex items-start gap-2 xs:gap-3 min-w-0">
                <Truck className="w-4 h-4 xs:w-5 xs:h-5 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-900 leading-tight">Nationwide Haulage</div>
                  <div className="text-[10px] xs:text-[11px] text-stone-600 mt-0.5 leading-tight truncate xs:overflow-visible">Nigeria & West Africa</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Mobile-Optimized Feature Showcase */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer card: rounded-3xl (24px), p-3.5 xs:p-4 -> Inner media: rounded-lg (8px) */}
              <div className="bg-white p-3 xs:p-4 rounded-3xl shadow-xl border border-[#e5e1d5]">
                
                {/* Main Product Feature: High-Impact Real Photography */}
                <div className="relative h-72 xs:h-80 sm:h-[400px] lg:h-[460px] rounded-lg overflow-hidden bg-[#f7f5ef]">
                  <img 
                    src="/images/IMG-20261106-WA0044.jpg" 
                    alt="Labuk Agro Cold-Pressed Castor Oil Official Showcase" 
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                </div>

                {/* Companion Products: rounded-xl (12px), p-1.5 xs:p-2 -> inner img rounded (4px) */}
                <div className="grid grid-cols-3 gap-1.5 xs:gap-2.5 mt-2.5 xs:mt-3 pt-2.5 xs:pt-3 border-t border-[#f1efe7]">
                  <div className="flex items-center gap-1.5 xs:gap-2 p-1.5 xs:p-2 rounded-xl bg-[#faf9f5] border border-[#e5e1d5] min-w-0">
                    <img 
                      src="/images/IMG-20261106-WA0032.jpg" 
                      alt="Labuk Virgin Neem Oil Pouch" 
                      className="w-8 h-8 xs:w-10 xs:h-10 rounded object-cover shrink-0" 
                      loading="lazy"
                    />
                    <div className="min-w-0 truncate">
                      <div className="text-[10px] xs:text-xs font-bold text-stone-900 truncate">Neem Oil</div>
                      <div className="text-[9px] xs:text-[11px] text-stone-600 tabular-nums">₦8,500</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 xs:gap-2 p-1.5 xs:p-2 rounded-xl bg-[#faf9f5] border border-[#e5e1d5] min-w-0">
                    <img 
                      src="/images/IMG-20261106-WA0039.jpg" 
                      alt="Labuk Castor Oil Edible" 
                      className="w-8 h-8 xs:w-10 xs:h-10 rounded object-cover shrink-0" 
                      loading="lazy"
                    />
                    <div className="min-w-0 truncate">
                      <div className="text-[10px] xs:text-xs font-bold text-stone-900 truncate">Castor Oil</div>
                      <div className="text-[9px] xs:text-[11px] text-stone-600 tabular-nums">₦2,200</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 xs:gap-2 p-1.5 xs:p-2 rounded-xl bg-[#faf9f5] border border-[#e5e1d5] min-w-0">
                    <img 
                      src="/images/IMG-20261106-WA0033.jpg" 
                      alt="Labuk High-Yield Castor Seeds" 
                      className="w-8 h-8 xs:w-10 xs:h-10 rounded object-cover shrink-0" 
                      loading="lazy"
                    />
                    <div className="min-w-0 truncate">
                      <div className="text-[10px] xs:text-xs font-bold text-stone-900 truncate">Hybrid Seed</div>
                      <div className="text-[9px] xs:text-[11px] text-stone-600 tabular-nums">₦12,000</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating verified satisfaction badge: safely bounded to avoid mobile horizontal scroll */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-5 bg-white py-2.5 xs:py-3 px-3.5 xs:px-4 rounded-2xl shadow-md sm:shadow-xl border border-[#e5e1d5] flex items-center gap-2.5 xs:gap-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-[#d8f3dc] flex items-center justify-center text-[#1b4332] shrink-0">
                  <CheckCircle2 className="w-5 h-5 xs:w-6 xs:h-6 text-[#2d6a4f]" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-900 tabular-nums">50,000+ Units Dispatched</div>
                  <div className="text-[10px] xs:text-[11px] text-stone-600">Across Nigerian States & West Africa</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
