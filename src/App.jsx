import React, { useState, useEffect } from 'react';
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
import OrderSuccessModal from './components/OrderSuccessModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import AdminOrdersModal from './components/AdminOrdersModal';
import { CheckCircle2 } from 'lucide-react';

function StoreLayout() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Products');
  const { toastMessage } = useCart();

  // Payment Callback & Verification State
  const [successRef, setSuccessRef] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Customer Tracking Modal State
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingInitialId, setTrackingInitialId] = useState('');
  const [trackingInitialVerify, setTrackingInitialVerify] = useState('');

  // Admin Order Management State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check URL parameters for Paystack payment return callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('reference') || params.get('trxref');
    const isCallback = params.get('payment_callback') === 'true' || !!ref;

    if (ref && isCallback) {
      setSuccessRef(ref);
      setIsSuccessOpen(true);
      // Clean query parameters from URL smoothly without refreshing
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#portal') {
        setIsAdminOpen(true);
      } else if (hash === '#track') {
        setIsTrackingOpen(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

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
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-stone-900 relative w-full overflow-x-hidden">
      {/* Toast Notification: Responsive positioning for mobile & desktop */}
      {toastMessage && (
        <div className="fixed top-16 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 z-50 bg-[#1b4332] text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 max-w-sm sm:max-w-md mx-auto sm:mx-0">
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
        onOpenTracking={() => setIsTrackingOpen(true)}
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
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Extreme End Notice */}
      <div className="bg-[#0b1c15] text-stone-400 py-3.5 px-4 text-center text-xs sm:text-sm font-medium border-t border-white/10 tracking-wide break-words">
        An LTC technologies demo website this isn't live and shouldn't be treated as such
      </div>

      {/* Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <ConsultationModal />

      {/* Verified Payment Success Confirmation Modal */}
      <OrderSuccessModal
        reference={successRef}
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onTrackOrder={(id, email) => {
          setIsSuccessOpen(false);
          setTrackingInitialId(id);
          setTrackingInitialVerify(email);
          setIsTrackingOpen(true);
        }}
      />

      {/* Customer-Facing Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialTrackingId={trackingInitialId}
        initialVerify={trackingInitialVerify}
      />

      {/* Staff Administrative Orders Portal Modal */}
      <AdminOrdersModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

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
