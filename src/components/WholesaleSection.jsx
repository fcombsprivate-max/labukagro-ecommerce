import React, { useState } from 'react';
import { Package, Send, CheckCircle2, MessageSquare, Truck, ShieldCheck } from 'lucide-react';

export default function WholesaleSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    commodity: 'Yellow Maize (Bulk Sacks)',
    quantity: '5 - 10 Metric Tons',
    destination: 'Lagos, Nigeria'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Labuk Agro, I would like to request a wholesale quotation:\nCompany: ${formData.companyName}\nContact: ${formData.contactPerson}\nCommodity: ${formData.commodity}\nVolume: ${formData.quantity}\nDestination: ${formData.destination}`
  );

  return (
    <section id="wholesale" className="py-16 bg-[#1b4332] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#52b788]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#d97706]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d8f3dc]/15 text-[#d8f3dc] border border-[#d8f3dc]/20 text-xs font-bold uppercase tracking-wider">
              <Package className="w-3.5 h-3.5 text-[#52b788]" />
              <span>B2B & Bulk Commodities</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Are you looking for wholesale farm produce?
            </h2>

            <p className="text-sm sm:text-base text-[#d8f3dc]/90 leading-relaxed">
              We supply commercial food manufacturers, feed millers, industrial cosmetics labs, and export commodity aggregators across Nigeria, West Africa, and abroad.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#d8f3dc]">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Truck className="w-4 h-4 text-[#52b788] shrink-0" />
                <span>Full trailer truckloads & containerized export logistics</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-[#52b788] shrink-0" />
                <span>Certified low moisture & verified aflatoxin-free lab results</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Package className="w-4 h-4 text-[#52b788] shrink-0" />
                <span>200-Liter Castor & Neem oil drums available for cosmetics brands</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-[#1c241d] shadow-2xl border border-white/10">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#2d6a4f]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1b4332]">Quotation Request Received</h3>
                  <p className="text-xs text-[#52796f] max-w-sm mx-auto">
                    Our wholesale commodities manager will review your specs and contact you at <strong>{formData.phone}</strong> within 2 hours.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/2348060551016?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25d366] text-white font-bold text-xs shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Speed Up via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-[#1b4332] pb-1 border-b border-[#f1efe7]">
                    Request Bulk Commodity Quote
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#52796f] mb-1">Company / Business Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. GreenLife Foods Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#52796f] mb-1">Contact Representative</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ibrahim Bello"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#52796f] mb-1">WhatsApp / Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 800 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#52796f] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. procurement@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#52796f] mb-1">Commodity Required</label>
                      <select
                        value={formData.commodity}
                        onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                      >
                        <option value="Yellow Maize (Bulk Sacks)">Yellow Maize (50kg / 100kg Sacks)</option>
                        <option value="Soybeans (Bulk Sacks)">Soybeans (Export Non-GMO)</option>
                        <option value="Raw Castor Seeds">High-Yield Castor Seeds</option>
                        <option value="Castor Oil (Drums)">Castor Oil (200L Steel Drum)</option>
                        <option value="Neem Oil (Drums)">Neem Oil (200L Drum)</option>
                        <option value="Raw Honey (Bulk Tubs)">Raw Forest Honey (Bulk Buckets)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#52796f] mb-1">Estimated Quantity</label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                      >
                        <option value="50 - 100 Bags">50 - 100 Bags (Trial Order)</option>
                        <option value="5 - 10 Metric Tons">5 - 10 Metric Tons</option>
                        <option value="20 - 30 Metric Tons (Full Trailer)">20 - 30 Metric Tons (Full Trailer)</option>
                        <option value="1 - 5 Drums (Oil)">1 - 5 Drums (200L Each)</option>
                        <option value="Containerized Export (FCL)">Containerized Export (20ft / 40ft FCL)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#52796f] mb-1">Delivery Destination / Port</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lagos Port, Kano, Ibadan, or Tema Port Ghana"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Wholesale Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
