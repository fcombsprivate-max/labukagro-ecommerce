import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Phone, Menu, X } from 'lucide-react';

export default function Navbar({ searchTerm, setSearchTerm, activeCategory, setActiveCategory }) {
  const { totalItemCount, setIsCartOpen, setIsConsultationOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f5]/95 backdrop-blur-md border-b border-[#e5e1d5] transition-all">
      {/* Top Utility Bar */}
      <div className="bg-[#1b4332] text-emerald-100 text-xs py-2 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>NAFDAC Certified Cold-Pressed Castor Oil & Farm Commodities</span>
            <span className="hidden md:inline text-emerald-300">• Unit 22, TIC, Ado-Ekiti</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:+2348060551016" 
              className="flex items-center gap-1.5 hover:text-white transition-colors tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0" strokeWidth={1.75} />
              <span>0806 055 1016</span>
            </a>
            <span className="hidden sm:inline text-emerald-600">|</span>
            <span className="hidden sm:inline text-emerald-200">Direct Farm Gate</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none" 
          onClick={() => scrollToSection('hero')}
        >
          <img 
            src="/images/IMG-20261106-WA0029.jpg" 
            alt="Labuk Agro Ltd" 
            className="h-10 sm:h-11 w-auto object-contain rounded-lg border border-[#e5e1d5]"
            onError={(e) => {
              e.currentTarget.src = "https://labukagro.com/wp-content/uploads/2024/12/cropped-LABUK-LOGO.png";
            }}
          />
          <div>
            <div className="text-xl font-bold tracking-tight text-[#143224] flex items-center gap-1.5 leading-none">
              <span>LABUK AGRO</span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-[#d8f3dc] text-[#1b4332]">
                LTD
              </span>
            </div>
            <p className="text-[11px] text-stone-600 tracking-wide font-normal mt-0.5">Nature • Nurture • Sustain</p>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-6 relative">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search castor oil, neem oil, honey, maize..."
              className="w-full bg-[#f4f2eb] text-stone-900 text-sm pl-10 pr-12 py-2 rounded-xl border border-transparent focus:border-[#1b4332] focus:bg-white focus:outline-hidden transition-all placeholder-stone-500"
            />
            {searchTerm && (
              <button 
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-stone-700">
          <button 
            type="button"
            onClick={() => scrollToSection('shop')} 
            className="hover:text-[#1b4332] transition-colors cursor-pointer"
          >
            Store
          </button>
          <button 
            type="button"
            onClick={() => {
              setActiveCategory('Cold-Pressed Oils');
              scrollToSection('shop');
            }} 
            className="hover:text-[#1b4332] transition-colors cursor-pointer"
          >
            Castor & Neem
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('wholesale')} 
            className="hover:text-[#1b4332] transition-colors cursor-pointer"
          >
            Wholesale
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('about')} 
            className="hover:text-[#1b4332] transition-colors cursor-pointer"
          >
            About & Leadership
          </button>
          <button 
            type="button"
            onClick={() => setIsConsultationOpen(true)} 
            className="text-[#1b4332] hover:text-[#2d6a4f] transition-colors cursor-pointer font-bold"
          >
            Consultation
          </button>
        </nav>

        {/* Cart Trigger Button */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setIsCartOpen(true)} 
            className="relative px-3.5 py-2 rounded-xl bg-[#1b4332] text-white hover:bg-[#2d6a4f] active:scale-[0.98] transition-all shadow-xs cursor-pointer flex items-center gap-2 group"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-105" strokeWidth={1.75} />
            <span className="text-xs font-bold">Cart</span>
            {totalItemCount > 0 && (
              <span className="ml-1 bg-amber-600 text-white text-[11px] font-extrabold px-1.5 py-0.2 rounded-full tabular-nums">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="xl:hidden p-2 text-stone-700 hover:text-stone-950 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1.75} /> : <Menu className="w-6 h-6" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#faf9f5] border-t border-[#e5e1d5] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in fade-in duration-200">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#f4f2eb] text-sm pl-9 pr-4 py-2 rounded-xl border border-[#e5e1d5] focus:outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-3 font-semibold text-stone-900 text-base">
            <button 
              type="button"
              onClick={() => scrollToSection('shop')} 
              className="text-left py-1 hover:text-[#1b4332] transition-colors"
            >
              Shop All Products
            </button>
            <button 
              type="button"
              onClick={() => {
                setActiveCategory('Cold-Pressed Oils');
                scrollToSection('shop');
              }} 
              className="text-left py-1 hover:text-[#1b4332] transition-colors"
            >
              Cold-Pressed Castor & Neem Oils
            </button>
            <button 
              type="button"
              onClick={() => scrollToSection('wholesale')} 
              className="text-left py-1 hover:text-[#1b4332] transition-colors"
            >
              Wholesale Commodities
            </button>
            <button 
              type="button"
              onClick={() => scrollToSection('about')} 
              className="text-left py-1 hover:text-[#1b4332] transition-colors"
            >
              About & Executive Leadership
            </button>
            <button 
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsConsultationOpen(true);
              }} 
              className="text-left py-1 text-[#1b4332] hover:text-[#2d6a4f] transition-colors font-bold"
            >
              Book Agricultural Consultation & Training
            </button>
          </div>

          <div className="pt-2 border-t border-[#e5e1d5] flex items-center justify-between text-xs text-stone-600">
            <span>Direct WhatsApp / Call:</span>
            <a href="tel:+2348060551016" className="font-bold text-[#1b4332] tabular-nums">
              0806 055 1016
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
