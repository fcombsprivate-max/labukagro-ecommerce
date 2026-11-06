import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Phone, ChevronDown, Menu, X, CheckCircle } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#fbfbfa]/95 backdrop-blur-md border-b border-[#e5e1d5] shadow-xs transition-all">
      {/* Top Notice Bar */}
      <div className="bg-[#1b4332] text-[#d8f3dc] text-xs py-2 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#52b788] animate-pulse"></span>
            <span>NAFDAC Certified Cold-Pressed Castor Oil & Farm Fresh Commodities</span>
            <span className="hidden md:inline text-[#74c69d]">• Unit 22, TIC, Ado-Ekiti, Nigeria</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:+2348060551016" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#52b788]" />
              <span>0806 055 1016 / 0805 713 9999</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-[#b7e4c7]">Direct Farm Gate</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <img 
            src="/images/IMG-20261106-WA0029.jpg" 
            alt="Labuk Agro Ltd" 
            className="h-10 sm:h-12 w-auto object-contain rounded-lg shadow-xs"
            onError={(e) => {
              // fallback if needed
              e.currentTarget.src = "https://labukagro.com/wp-content/uploads/2024/12/cropped-LABUK-LOGO.png";
            }}
          />
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#1b4332] flex items-center gap-1.5">
              <span>LABUK AGRO</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-[#d8f3dc] text-[#1b4332] border border-[#b7e4c7]">
                LTD
              </span>
            </div>
            <p className="text-[11px] text-[#52796f] tracking-wide font-medium">Nature • Nurture • Sustain</p>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-6 relative">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#52796f] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search castor oil, honey, neem oil, maize..."
              className="w-full bg-[#f1efe7] text-[#1c241d] text-sm pl-10 pr-4 py-2 rounded-full border border-transparent focus:border-[#2d6a4f] focus:bg-white focus:outline-hidden transition-all shadow-inner"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#52796f] hover:text-[#1b4332]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-[#2d6a4f]">
          <button 
            onClick={() => scrollToSection('shop')} 
            className="hover:text-[#1b4332] transition-colors cursor-pointer"
          >
            Store
          </button>
          <button 
            onClick={() => {
              setActiveCategory('Cold-Pressed Oils');
              scrollToSection('shop');
            }} 
            className="hover:text-[#1b4332] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Castor & Neem</span>
            <span className="text-[10px] bg-[#d97706]/15 text-[#92400e] px-1.5 py-0.2 rounded-full font-bold">Featured</span>
          </button>
          <button 
            onClick={() => scrollToSection('wholesale')} 
            className="hover:text-[#1b4332] transition-colors cursor-pointer"
          >
            Wholesale Grains
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="hover:text-[#1b4332] transition-colors cursor-pointer"
          >
            Leadership & About
          </button>
          <button 
            onClick={() => setIsConsultationOpen(true)} 
            className="text-[#1b4332] hover:text-[#2d6a4f] transition-colors cursor-pointer underline decoration-[#52b788] underline-offset-4"
          >
            Consultation
          </button>
        </nav>

        {/* Actions: Cart Button */}
        <div className="flex items-center gap-3">
          {/* Cart Trigger */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative p-2.5 rounded-full bg-[#1b4332] text-white hover:bg-[#2d6a4f] transition-all shadow-sm cursor-pointer flex items-center gap-2 group"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
            <span className="hidden sm:inline text-xs font-semibold pr-1">Cart</span>
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#d97706] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-bounce">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="xl:hidden p-2 text-[#2d6a4f] hover:text-[#1b4332] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fbfbfa] border-t border-[#e5e1d5] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in fade-in duration-200">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#52796f] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#f1efe7] text-sm pl-9 pr-4 py-2 rounded-lg border border-[#e5e1d5] focus:outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-3 font-semibold text-[#1b4332] text-base">
            <button 
              onClick={() => scrollToSection('shop')} 
              className="text-left py-1 hover:text-[#52b788] transition-colors"
            >
              Shop All Products
            </button>
            <button 
              onClick={() => {
                setActiveCategory('Cold-Pressed Oils');
                scrollToSection('shop');
              }} 
              className="text-left py-1 hover:text-[#52b788] transition-colors flex items-center justify-between"
            >
              <span>Cold-Pressed Castor & Neem Oils</span>
              <span className="text-xs bg-[#d97706]/15 text-[#92400e] px-2 py-0.5 rounded-full font-bold">Featured</span>
            </button>
            <button 
              onClick={() => scrollToSection('wholesale')} 
              className="text-left py-1 hover:text-[#52b788] transition-colors"
            >
              Wholesale Commodities (Maize, Soybeans)
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-left py-1 hover:text-[#52b788] transition-colors"
            >
              Leadership & Our Story
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsConsultationOpen(true);
              }} 
              className="text-left py-1 text-[#2d6a4f] hover:text-[#1b4332] transition-colors font-bold"
            >
              Book Agricultural Consultation & Training
            </button>
          </div>

          <div className="pt-2 border-t border-[#e5e1d5] flex items-center justify-between text-xs text-[#52796f]">
            <span>Direct WhatsApp / Call:</span>
            <a href="tel:+2348060551016" className="font-bold text-[#1b4332] underline">
              0806 055 1016
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
