import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Truck, ShieldCheck, Package, Loader2 } from 'lucide-react';

export default function WholesaleSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Labuk Agro, I would like to request a wholesale quotation:\nCompany: ${formData.companyName}\nContact: ${formData.contactPerson}\nCommodity: ${formData.commodity}\nVolume: ${formData.quantity}\nDestination: ${formData.destination}`
  );

  return (
    <section id="wholesale" className="py-12 sm:py-16 lg:py-20 bg-[#1b4332] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/20 text-[11px] sm:text-xs font-semibold text-emerald-200">
              <span>B2B, Commercial & Wholesale Supply</span>
            </div>

            <h2 
              style={{ textWrap: 'balance' }}
              className="text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
            >
              Wholesale & Bulk Supply
            </h2>

            <p className="text-base sm:text-lg font-semibold text-emerald-200 leading-snug">
              Are you a wholesaler, retailer, distributor or business looking for reliable agricultural produce in bulk?
            </p>

            <div className="space-y-3 text-sm xs:text-base text-emerald-100/90 leading-relaxed font-normal">
              <p>
                We supply agricultural products to individuals, businesses and organizations requiring larger quantities.
              </p>
              <p>
                Whether you need bulk quantities of our processed oils, natural honey or other available farm produce, we're ready to discuss your requirements.
              </p>
              <p className="text-emerald-50">
                <strong className="text-white font-semibold">Looking to place a bulk order or establish a supply partnership?</strong> Contact our team to discuss product availability, quantities, pricing and delivery arrangements.
              </p>
            </div>

            <div className="space-y-2.5 sm:space-y-3 pt-2 text-xs sm:text-sm text-emerald-100">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start text-left">
                <Package className="w-4 h-4 text-emerald-300 shrink-0" strokeWidth={1.75} />
                <span>Processed Oils: 200L drums of consumer-grade & external Castor Oil and virgin Neem Oil</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" strokeWidth={1.75} />
                <span>Natural Honey: 100% pure original honey sourced directly from our own apiary</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start text-left">
                <Truck className="w-4 h-4 text-emerald-300 shrink-0" strokeWidth={1.75} />
                <span>Bulk Farm Produce: Clean yellow maize, castor seeds, soya beans, and regional dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Form Card: rounded-3xl (24px), p-4.5 xs:p-6 sm:p-8 */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white rounded-3xl p-4.5 xs:p-6 sm:p-8 text-stone-900 shadow-xl border border-white/10">
              {submitted ? (
                <div className="text-center py-6 sm:py-8 space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-full bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 xs:w-8 xs:h-8 text-[#2d6a4f]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg xs:text-xl font-bold text-stone-900">Bulk Order Enquiry Received</h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto font-normal">
                    Thank you for reaching out. Our team will review your requirements and contact you at <strong className="text-stone-900 tabular-nums">{formData.phone}</strong> shortly to discuss product availability, bulk quantities, pricing and delivery arrangements.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/2348060551016?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#25d366] text-white font-bold text-xs shadow-sm hover:bg-[#20ba5a] w-full xs:w-auto"
                    >
                      <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
                      <span>Speed Up via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <div className="pb-2 border-b border-[#f1efe7]">
                    <h3 className="text-base sm:text-lg font-bold text-stone-900">
                      Enquire About Bulk Orders
                    </h3>
                    <p className="text-xs text-stone-500 font-normal mt-0.5">
                      Discuss product availability, bulk quantities, pricing and delivery arrangements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Company / Business / Individual Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. GreenLife Foods Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Contact Representative</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ibrahim Bello"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Phone (WhatsApp)</label>
                      <input
                        type="tel"
                        required
                        placeholder="0806 055 1016"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 tabular-nums focus:outline-hidden focus:border-[#1b4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="procurement@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Product / Produce Required</label>
                      <select
                        value={formData.commodity}
                        onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                        className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                      >
                        <option value="Castor Oil (Edible / External Drums)">Processed Oils: Castor Oil (200L Drum - Edible / External)</option>
                        <option value="Neem Oil (Drums / Bulk)">Processed Oils: Virgin Neem Oil (200L Drum / Bulk)</option>
                        <option value="Pure Apiary Honey (Bulk Tubs)">Natural Honey: Pure Apiary Honey (Bulk Tubs)</option>
                        <option value="Yellow Maize (Bulk Sacks)">Farm Produce: Yellow Maize (50kg / 100kg Sacks)</option>
                        <option value="Raw Castor Seeds (Bulk Sacks)">Farm Produce: High-Yield Castor Seeds</option>
                        <option value="Export Soya Beans (Bulk Sacks)">Farm Produce: Export Soya Beans</option>
                        <option value="Other Agricultural Produce">Other Agricultural Produce</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Estimated Quantity</label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                      >
                        <option value="50 - 100 Bags">50 - 100 Bags (Trial Order)</option>
                        <option value="5 - 10 Metric Tons">5 - 10 Metric Tons</option>
                        <option value="20 - 30 Metric Tons (Full Trailer)">20 - 30 Metric Tons (Full Trailer)</option>
                        <option value="1 - 5 Drums (Oil)">1 - 5 Drums (200L Each)</option>
                        <option value="Bulk Honey Tubs (50kg - 500kg)">Bulk Honey Tubs (50kg - 500kg)</option>
                        <option value="Containerized Export (FCL)">Containerized Export (FCL)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Delivery Destination / Port</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lagos Port, Ibadan, Abuja, Kano, or Tema Port Ghana"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] py-3.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" strokeWidth={1.75} />
                        <span>Enquire About Bulk Orders</span>
                      </>
                    )}
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
