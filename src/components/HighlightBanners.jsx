import React from 'react';
import { useCart } from '../context/CartContext';
import { Sprout, LineChart, ArrowRight, PhoneCall } from 'lucide-react';

export default function HighlightBanners({ onShopCastorClick }) {
  const { setIsConsultationOpen } = useCart();

  return (
    <section className="py-12 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Castor Oil Products & Sales (Directly inspired by labukagro.com) */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white p-8 sm:p-10 shadow-xl overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#52b788]/20 border border-[#52b788]/40 flex items-center justify-center text-[#d8f3dc]">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d8f3dc] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Flagship Processing
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-white">
              Castor Oil Products & Sales
            </h2>

            <p className="text-[#d8f3dc]/90 text-sm sm:text-base leading-relaxed mb-8">
              Our detailed catalog for Castor beans and refined Castor products offers 100% natural, cold-pressed purity for cosmetic, hair growth, wellness, and industrial applications.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={onShopCastorClick}
                className="px-6 py-3 rounded-xl bg-white text-[#1b4332] font-bold text-sm hover:bg-[#d8f3dc] transition-all cursor-pointer flex items-center gap-2 shadow-md"
              >
                <span>Order Now!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="https://wa.me/2348060551016?text=Hello%20Labuk%20Agro,%20I%20am%20interested%20in%20ordering%20Castor%20Oil"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 transition-all"
              >
                WhatsApp Quick Order
              </a>
            </div>
          </div>

          {/* Card 2: Agricultural Consultation & Training (Directly inspired by labukagro.com) */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white p-8 sm:p-10 shadow-xl overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
                <LineChart className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-100 bg-black/10 px-3 py-1 rounded-full border border-white/10">
                Agribusiness Advisory
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-white">
              Agricultural Consultation & Training
            </h2>

            <p className="text-amber-50 text-sm sm:text-base leading-relaxed mb-8">
              We provide consulting services for individuals or businesses looking to start farming, establish castor plantations, optimize crop yield, and scale agro-processing ventures.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setIsConsultationOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#1b4332] text-white font-bold text-sm hover:bg-[#2d6a4f] transition-all cursor-pointer flex items-center gap-2 shadow-md"
              >
                <span>Consult Now!</span>
                <PhoneCall className="w-4 h-4" />
              </button>
              <a 
                href="tel:+2348060551016" 
                className="px-5 py-3 rounded-xl bg-white/15 text-white font-semibold text-sm hover:bg-white/25 border border-white/20 transition-all flex items-center gap-2"
              >
                <span>Call +234 806 055 1016</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
