import React from 'react';
import { useCart } from '../context/CartContext';
import { Sprout, LineChart, ArrowRight, PhoneCall } from 'lucide-react';

export default function HighlightBanners({ onShopCastorClick }) {
  const { setIsConsultationOpen } = useCart();

  return (
    <section className="py-12 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Castor Oil Products & Sales */}
          <div className="rounded-3xl bg-[#1b4332] text-white p-8 sm:p-10 shadow-lg border border-[#2d6a4f]/60 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-200 mb-6">
                <Sprout className="w-6 h-6" strokeWidth={1.75} />
              </div>

              <h2 
                style={{ textWrap: 'balance' }}
                className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-white"
              >
                Pure Cold-Pressed Castor Oil
              </h2>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-8">
                NAFDAC-certified food-grade edible castor oil and intensive topical castor oil packs. Extracted via mechanical expellers at the Technology Incubation Centre with zero hexane or chemical dilution.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                type="button"
                onClick={onShopCastorClick}
                className="px-6 py-3.5 rounded-xl bg-white text-[#1b4332] font-bold text-sm hover:bg-[#d8f3dc] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>Shop Castor Oil</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <a 
                href="https://wa.me/2348060551016?text=Hello%20Labuk%20Agro,%20I%20am%20interested%20in%20ordering%20Castor%20Oil"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 transition-all"
              >
                WhatsApp Order
              </a>
            </div>
          </div>

          {/* Card 2: Agricultural Consultation & Training */}
          <div className="rounded-3xl bg-[#b45309] text-white p-8 sm:p-10 shadow-lg border border-amber-600/50 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white mb-6">
                <LineChart className="w-6 h-6" strokeWidth={1.75} />
              </div>

              <h2 
                style={{ textWrap: 'balance' }}
                className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-white"
              >
                Agribusiness Consultation & Outgrower Schemes
              </h2>

              <p className="text-amber-100 text-sm sm:text-base leading-relaxed mb-8">
                Practical agronomy advisory for commercial castor plantation setup, oil expeller machinery calibration, crop density optimization, and outgrower cluster development.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-[#1b4332] text-white font-bold text-sm hover:bg-[#2d6a4f] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>Book Consultation</span>
                <PhoneCall className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <a 
                href="tel:+2348060551016" 
                className="px-5 py-3.5 rounded-xl bg-white/15 text-white font-semibold text-sm hover:bg-white/25 border border-white/20 transition-all tabular-nums"
              >
                Call 0806 055 1016
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
