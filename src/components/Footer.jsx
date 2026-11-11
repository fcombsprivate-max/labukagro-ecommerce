import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Footer({ onCategorySelect, onWholesaleClick }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#122e23] text-emerald-100 pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-[#1b4332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Strip */}
        <div className="bg-[#1b4332] rounded-3xl p-5 xs:p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16 border border-[#2d6a4f]/50 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="text-center lg:text-left space-y-2 max-w-xl">
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white">
              Subscribe to Harvest Updates
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 font-normal">
              Direct notifications on seasonal crop harvesting, wholesale commodity pricing, and verified agro extraction updates.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#d8f3dc] text-[#1b4332] px-4 sm:px-5 py-3 rounded-xl font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#2d6a4f] shrink-0" strokeWidth={1.75} />
                <span>Thank you for subscribing to Labuk Agro updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 text-white placeholder-emerald-300/60 border border-white/20 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-hidden focus:border-emerald-300 flex-1 min-h-[44px]"
                />
                <button
                  type="submit"
                  className="min-h-[44px] px-6 py-2.5 sm:py-3 bg-white text-[#1b4332] font-bold text-xs sm:text-sm rounded-xl hover:bg-emerald-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 sm:pb-12 border-b border-[#1b4332]">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-2.5 xs:gap-3">
              <img 
                src="/images/IMG-20261106-WA0029.jpg" 
                alt="Labuk Agro" 
                className="h-9 xs:h-10 w-auto object-contain rounded-lg border border-white/10"
                loading="lazy"
              />
              <span className="text-xl xs:text-2xl font-extrabold text-white tracking-tight">
                LABUK AGRO
              </span>
            </div>

            <p className="text-xs text-emerald-200 leading-relaxed font-normal">
              Advancing Nigerian agriculture through sustainable agro-production, certified cold-pressed oil extraction, and commodity marketing. Nature • Nurture • Sustain.
            </p>

            <div className="pt-2 text-xs space-y-2 text-emerald-200 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.75} />
                <span>Unit 22, Technology Incubation Center, Ajilosun Ikere Road, Ado Ekiti, Ekiti State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.75} />
                <a href="tel:+2348060551016" className="hover:text-white tabular-nums min-h-[24px] flex items-center">
                  0806 055 1016 / 0805 713 9999
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.75} />
                <a href="mailto:info@labukagro.com" className="hover:text-white min-h-[24px] flex items-center">
                  info@labukagro.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-2.5 sm:space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Agro Store
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <button 
                  type="button"
                  onClick={() => {
                    onCategorySelect('Cold-Pressed Oils');
                    scrollToSection('shop');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer py-0.5 text-left"
                >
                  Castor Oil (Edible Grade)
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => {
                    onCategorySelect('Cold-Pressed Oils');
                    scrollToSection('shop');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer py-0.5 text-left"
                >
                  Castor Oil (Topical Grade)
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => {
                    onCategorySelect('Cold-Pressed Oils');
                    scrollToSection('shop');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer py-0.5 text-left"
                >
                  Virgin Neem Essential Oil
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => {
                    onCategorySelect('Honey & Extracts');
                    scrollToSection('shop');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer py-0.5 text-left"
                >
                  Pure Raw Forest Honey
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => {
                    onCategorySelect('All Products');
                    scrollToSection('shop');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer py-0.5 text-left"
                >
                  All Products
                </button>
              </li>
            </ul>
          </div>

          {/* Wholesale & Advisory */}
          <div className="lg:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Wholesale & Advisory
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <button 
                  type="button"
                  onClick={onWholesaleClick} 
                  className="hover:text-white transition-colors cursor-pointer py-0.5 text-left"
                >
                  Wholesale Yellow Maize Sacks
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={onWholesaleClick} 
                  className="hover:text-white transition-colors cursor-pointer py-0.5 text-left"
                >
                  High-Yield Castor Seeds
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={onWholesaleClick} 
                  className="hover:text-white transition-colors cursor-pointer py-0.5 text-left"
                >
                  200L Castor Oil Drums
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-white transition-colors cursor-pointer py-0.5 text-left"
                >
                  Agricultural Consultation
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-white transition-colors cursor-pointer py-0.5 text-left"
                >
                  Outgrower Scheme & Training
                </button>
              </li>
            </ul>
          </div>

          {/* Quality Assurance */}
          <div className="lg:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quality Assurance
            </h4>
            <p className="text-xs text-emerald-200 leading-relaxed font-normal">
              Every production batch is hygienically extracted under cold-pressed expeller conditions meeting NAFDAC and Technology Incubation Center standards.
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span>NAFDAC Certified</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span>100% Hexane-Free Extraction</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/80 gap-3 text-center sm:text-left">
          <div className="tabular-nums">
            © {new Date().getFullYear()} Labuk Agro Ltd. All Rights Reserved. (Unit 22, TIC, Ado-Ekiti, Nigeria)
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-emerald-200">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Trade</span>
            <span>•</span>
            <span>Export Documentation</span>
          </div>
        </div>

        {/* Extreme End Notice */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#1b4332] text-center">
          <div className="inline-block bg-[#0b1c15] text-[#a7f3d0] border border-[#2d6a4f] py-2.5 px-3.5 sm:px-5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide break-words max-w-full">
            An LTC technologies demo website this isn't live and shouldn't be treated as such
          </div>
        </div>

      </div>
    </footer>
  );
}
