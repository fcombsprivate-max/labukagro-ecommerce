import React from 'react';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Award, Leaf, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero({ onShopClick, onWholesaleClick }) {
  const { setIsConsultationOpen } = useCart();

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#f3f0e6] to-[#faf9f5] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#e5e1d5]">
      {/* Decorative backdrop elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#d8f3dc]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#faedcd]/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d8f3dc] border border-[#b7e4c7] text-[#1b4332] text-xs font-bold tracking-wide">
              <Leaf className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span>NATURE • NURTURE • SUSTAIN — LABUK AGRO LTD</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1b4332] leading-[1.12]">
              Nature’s Golden Drop. <br />
              <span className="text-[#2d6a4f] relative">
                Pure Cold-Pressed
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#d97706]/40 fill-current" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span> Castor Oil Solutions.
            </h1>

            <p className="text-base sm:text-lg text-[#405646] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Direct from <strong className="text-[#1b4332] font-semibold">Unit 22, Technology Incubation Center, Ado-Ekiti</strong>. Experience NAFDAC-certified Nigerian cold-pressed castor oils (Edible Food Grade & Topical Non-Edible), pure neem essential oil pouches, raw forest honey, and high-yield agro commodities.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={onShopClick}
                className="px-7 py-3.5 rounded-xl bg-[#1b4332] text-white font-bold text-sm sm:text-base hover:bg-[#2d6a4f] hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 shadow-md"
              >
                <span>Shop Agro Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={onWholesaleClick}
                className="px-7 py-3.5 rounded-xl bg-white text-[#1b4332] font-bold text-sm sm:text-base border-2 border-[#1b4332] hover:bg-[#f1efe7] transition-all cursor-pointer shadow-xs"
              >
                Wholesale Commodities
              </button>

              <button 
                onClick={() => setIsConsultationOpen(true)}
                className="px-5 py-3 rounded-xl text-[#2d6a4f] font-semibold text-sm hover:text-[#1b4332] hover:bg-[#e8e4d9] transition-all cursor-pointer underline underline-offset-4"
              >
                Agro Consultation & Training
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#e2dec9] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#2d6a4f] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#1b4332]">NAFDAC Certified</div>
                  <div className="text-[11px] text-[#52796f]">Lab Verified Purity</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Leaf className="w-5 h-5 text-[#2d6a4f] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#1b4332]">100% Natural</div>
                  <div className="text-[11px] text-[#52796f]">Zero Mineral Additives</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#2d6a4f] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#1b4332]">TIC Ado-Ekiti</div>
                  <div className="text-[11px] text-[#52796f]">Federal Incubation Hub</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#2d6a4f] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#1b4332]">Nationwide & Export</div>
                  <div className="text-[11px] text-[#52796f]">Nigeria & West Africa</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Visual Showcase directly with Labuk Agro's real photos */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Card with Real Official Poster */}
              <div className="bg-white p-4 rounded-3xl shadow-xl border border-[#e5e1d5] overflow-hidden transform transition-transform hover:scale-[1.01]">
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#f4f2e9]">
                  <img 
                    src="/images/IMG-20261106-WA0044.jpg" 
                    alt="Labuk Agro Nature's Golden Drop Castor Oil" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 bg-[#1b4332] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    <span>Official Product Line</span>
                  </div>
                </div>

                {/* Mini thumbnails strip of other Labuk Agro products */}
                <div className="grid grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-[#f1efe7]">
                  <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                    <img 
                      src="/images/IMG-20261106-WA0032.jpg" 
                      alt="Neem Oil Pouch" 
                      className="w-10 h-10 rounded-lg object-cover" 
                    />
                    <div className="truncate">
                      <div className="text-[11px] font-bold text-[#1b4332] truncate">Neem Oil</div>
                      <div className="text-[10px] text-[#52796f]">Spout Pouch</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                    <img 
                      src="/images/IMG-20261106-WA0030.jpg" 
                      alt="1L Castor Oil" 
                      className="w-10 h-10 rounded-lg object-cover" 
                    />
                    <div className="truncate">
                      <div className="text-[11px] font-bold text-[#1b4332] truncate">Castor 1L</div>
                      <div className="text-[10px] text-[#52796f]">₦17,000</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                    <img 
                      src="/images/IMG-20261106-WA0033.jpg" 
                      alt="Castor Seeds" 
                      className="w-10 h-10 rounded-lg object-cover" 
                    />
                    <div className="truncate">
                      <div className="text-[11px] font-bold text-[#1b4332] truncate">Seeds</div>
                      <div className="text-[10px] text-[#52796f]">High-Yield</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating verified satisfaction badge */}
              <div className="absolute -bottom-5 -left-5 bg-white py-2.5 px-4 rounded-2xl shadow-xl border border-[#e5e1d5] flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-full bg-[#d8f3dc] flex items-center justify-center text-[#1b4332]">
                  <CheckCircle2 className="w-6 h-6 text-[#2d6a4f]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1b4332]">Over 50,000+ Units Sold</div>
                  <div className="text-[10px] text-[#52796f]">Dispatched across Nigeria & West Africa</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
