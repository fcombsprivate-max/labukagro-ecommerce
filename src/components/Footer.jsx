import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

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
    <footer className="bg-[#122e23] text-[#d8f3dc] pt-16 pb-12 border-t border-[#1b4332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Strip (Directly inspired by labukagro.com) */}
        <div className="bg-[#1b4332] rounded-3xl p-8 sm:p-10 mb-16 border border-[#2d6a4f]/50 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center lg:text-left space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#52b788]">
              Stay Connected With Labuk Agro
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Subscribe to our Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-[#b7e4c7]">
              Get seasonal harvest updates, wholesale market price trends, and exclusive organic wellness tips.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#d8f3dc] text-[#1b4332] px-5 py-3 rounded-xl font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                <span>Thank you for subscribing to Labuk Agro updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-hidden focus:border-[#52b788] flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#52b788] hover:bg-[#40916c] text-[#122e23] font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1b4332]">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/IMG-20261106-WA0029.jpg" 
                alt="Labuk Agro" 
                className="h-12 w-auto object-contain rounded-lg"
              />
              <span className="text-2xl font-extrabold text-white tracking-tight">
                LABUK AGRO
              </span>
            </div>

            <p className="text-xs text-[#b7e4c7] leading-relaxed">
              Advancing Nigerian agriculture through sustainable agro-production, certified cold-pressed oil extraction, and commodity marketing. Nature • Nurture • Sustain.
            </p>

            <div className="pt-2 text-xs space-y-2 text-[#b7e4c7]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#52b788] shrink-0 mt-0.5" />
                <span>Unit 22, Technology Incubation Center, Ajilosun Ikere Road, Ado Ekiti, Ekiti State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#52b788] shrink-0" />
                <a href="tel:+2348060551016" className="hover:text-white underline">
                  0806 055 1016 / 0805 713 9999
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#52b788] shrink-0" />
                <a href="mailto:info@labukagro.com" className="hover:text-white underline">
                  info@labukagro.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Agro Store
            </h4>
            <ul className="space-y-2 text-xs text-[#b7e4c7]">
              <li>
                <button 
                  onClick={() => {
                    onCategorySelect('Cold-Pressed Oils');
                    scrollToSection('shop');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Castor Oil (Edible Grade)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onCategorySelect('Cold-Pressed Oils');
                    scrollToSection('shop');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Castor Oil (Non-Edible)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onCategorySelect('Cold-Pressed Oils');
                    scrollToSection('shop');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Neem Essential Oil Pouch
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onCategorySelect('Honey & Extracts');
                    scrollToSection('shop');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pure Raw Natural Honey
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onCategorySelect('All Products');
                    scrollToSection('shop');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Farm Catalog
                </button>
              </li>
            </ul>
          </div>

          {/* Wholesale & Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              B2B & Advisory
            </h4>
            <ul className="space-y-2 text-xs text-[#b7e4c7]">
              <li>
                <button 
                  onClick={onWholesaleClick} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wholesale Yellow Maize Sacks
                </button>
              </li>
              <li>
                <button 
                  onClick={onWholesaleClick} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  High-Yield Castor Seeds
                </button>
              </li>
              <li>
                <button 
                  onClick={onWholesaleClick} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  200L Castor Oil Drums
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Agricultural Consultation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Outgrower Scheme & Training
                </button>
              </li>
            </ul>
          </div>

          {/* Certifications & Purity */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Quality Assurance
            </h4>
            <p className="text-xs text-[#b7e4c7] leading-relaxed">
              Every production batch is hygienically extracted under cold-pressed conditions meeting NAFDAC and Federal Technology Incubation Center standards.
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 text-[#52b788] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>NAFDAC Certified</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#52b788] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Hexane-Free Expeller</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#74c69d] gap-4 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Labuk Agro Ltd. All Rights Reserved. (Unit 22, TIC, Ado-Ekiti, Nigeria)
          </div>
          <div className="flex items-center gap-4 text-[#b7e4c7]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Trade</span>
            <span>•</span>
            <span>Export Documentation</span>
          </div>
        </div>

        {/* Extreme End Notice */}
        <div className="mt-8 pt-6 border-t border-[#1b4332] text-center">
          <div className="inline-block bg-[#0b1c15] text-[#a7f3d0] border border-[#2d6a4f] py-2.5 px-5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
            An LTC technologies demo website this isn't live and shouldn't be treated as such
          </div>
        </div>

      </div>
    </footer>
  );
}
