import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HighlightBanners from './components/HighlightBanners';
import ProductCatalog from './components/ProductCatalog';
import HealthRemediesGallery from './components/HealthRemediesGallery';
import AboutSection from './components/AboutSection';
import WholesaleSection from './components/WholesaleSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ConsultationModal from './components/ConsultationModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { CheckCircle2 } from 'lucide-react';

function StoreLayout() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Products');
  const { toastMessage } = useCart();

  const handleShopClick = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWholesaleClick = () => {
    const el = document.getElementById('wholesale');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShopCastorClick = () => {
    setActiveCategory('Cold-Pressed Oils');
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-stone-900 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#1b4332] text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" strokeWidth={1.75} />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Hero Section */}
      <Hero
        onShopClick={handleShopClick}
        onWholesaleClick={handleWholesaleClick}
      />

      {/* Signature Highlight Banners */}
      <HighlightBanners onShopCastorClick={handleShopCastorClick} />

      {/* E-Commerce Product Catalog */}
      <ProductCatalog
        searchTerm={searchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Educational Infographics & Health Remedies Guide */}
      <HealthRemediesGallery />

      {/* About Us & Executive Leadership (The Woman CEO & The Man COO) */}
      <AboutSection />

      {/* Wholesale Commodities (B2B) */}
      <WholesaleSection />

      {/* Verified Reviews */}
      <Testimonials />

      {/* Footer */}
      <Footer
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          handleShopClick();
        }}
        onWholesaleClick={handleWholesaleClick}
      />

      {/* Extreme End Notice */}
      <div className="bg-[#0b1c15] text-stone-400 py-3.5 px-4 text-center text-xs sm:text-sm font-medium border-t border-white/10 tracking-wide">
        An LTC technologies demo website this isn't live and shouldn't be treated as such
      </div>

      {/* Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <ConsultationModal />

      {/* Direct WhatsApp Widget */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreLayout />
    </CartProvider>
  );
}
