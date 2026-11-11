import React from 'react';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Award, Leaf, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero({ onShopClick, onWholesaleClick }) {
  const { setIsConsultationOpen } = useCart();

  return (
    <section id="hero" className="relative bg-[#faf9f5] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <h1 
              style={{ textWrap: 'balance' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#143224] leading-[1.12]"
            >
              Cold-Pressed Castor Oil & Certified Pure Agro Extracts
            </h1>

            <p className="text-base sm:text-lg text-stone-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Direct from <strong className="text-stone-900 font-semibold">Unit 22, Technology Incubation Center, Ado-Ekiti</strong>. Labuk Agro Ltd processes 100% hexane-free edible and topical castor oils, virgin neem seed oil in hygienic spout pouches, raw wild forest honey, and certified high-yield planting seeds.
            </p>

            {/* CTAs with Clear Visual Weight */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                type="button"
                onClick={onShopClick}
                className="px-8 py-4 rounded-xl bg-[#1b4332] text-white font-bold text-sm sm:text-base hover:bg-[#2d6a4f] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2.5 shadow-md"
              >
                <span>Shop Certified Products</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </button>

              <button 
                type="button"
                onClick={onWholesaleClick}
                className="px-7 py-4 rounded-xl bg-white text-[#1b4332] font-bold text-sm sm:text-base border border-[#e5e1d5] hover:border-[#1b4332] hover:bg-[#f5f3ec] active:scale-[0.98] transition-all cursor-pointer"
              >
                Wholesale Commodities
              </button>

              <button 
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="px-4 py-3 text-stone-700 hover:text-[#1b4332] font-semibold text-sm transition-colors cursor-pointer underline underline-offset-4 decoration-[#c28b38]"
              >
                Agro Consultation
              </button>
            </div>

            {/* Trust Features: Spacing Grouped with Consistent Icons */}
            <div className="pt-8 mt-4 border-t border-[#e5e1d5] grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <div className="text-xs font-bold text-stone-900">NAFDAC Certified</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Laboratory verified purity</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Leaf className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <div className="text-xs font-bold text-stone-900">100% Hexane-Free</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Mechanical cold expeller</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <div className="text-xs font-bold text-stone-900">TIC Ado-Ekiti</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Federal Incubation Hub</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <div className="text-xs font-bold text-stone-900">Nationwide Haulage</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Nigeria & West Africa</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Enlarge the Main Feature Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer card: rounded-3xl (24px), p-4 (16px) -> Inner media: rounded-lg (8px) */}
              <div className="bg-white p-4 rounded-3xl shadow-xl border border-[#e5e1d5]">
                
                {/* Main Product Feature: High-Impact Real Photography */}
                <div className="relative h-96 sm:h-[420px] lg:h-[460px] rounded-lg overflow-hidden bg-[#f7f5ef]">
                  <img 
                    src="/images/IMG-20261106-WA0044.jpg" 
                    alt="Labuk Agro Cold-Pressed Castor Oil Official Showcase" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Companion Products: rounded-xl (12px), p-2 (8px) -> inner img rounded (4px) */}
                <div className="grid grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-[#f1efe7]">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                    <img 
                      src="/images/IMG-20261106-WA0032.jpg" 
                      alt="Labuk Virgin Neem Oil Pouch" 
                      className="w-10 h-10 rounded object-cover shrink-0" 
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-stone-900 truncate">Neem Oil</div>
                      <div className="text-[11px] text-stone-600 tabular-nums">₦8,500</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                    <img 
                      src="/images/IMG-20261106-WA0039.jpg" 
                      alt="Labuk Castor Oil Edible" 
                      className="w-10 h-10 rounded object-cover shrink-0" 
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-stone-900 truncate">Castor Oil</div>
                      <div className="text-[11px] text-stone-600 tabular-nums">₦2,200</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                    <img 
                      src="/images/IMG-20261106-WA0033.jpg" 
                      alt="Labuk High-Yield Castor Seeds" 
                      className="w-10 h-10 rounded object-cover shrink-0" 
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-stone-900 truncate">Hybrid Seed</div>
                      <div className="text-[11px] text-stone-600 tabular-nums">₦12,000</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating verified satisfaction badge with tabular numbers */}
              <div className="absolute -bottom-5 -left-5 bg-white py-3 px-4 rounded-2xl shadow-xl border border-[#e5e1d5] flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-full bg-[#d8f3dc] flex items-center justify-center text-[#1b4332] shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#2d6a4f]" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 tabular-nums">50,000+ Units Dispatched</div>
                  <div className="text-[11px] text-stone-600">Across Nigerian States & West Africa</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
