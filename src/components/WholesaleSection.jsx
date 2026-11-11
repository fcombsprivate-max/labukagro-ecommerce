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
    <section id="wholesale" className="py-16 sm:py-20 bg-[#1b4332] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <h2 
              style={{ textWrap: 'balance' }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
            >
              Bulk Agro Commodities & Wholesale Procurement
            </h2>

            <p className="text-base text-emerald-100 leading-relaxed font-normal">
              Direct farm-gate supply for commercial feed millers, industrial cosmetics manufacturers, food processors, and export aggregators across Nigeria and West Africa.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-emerald-100">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <Truck className="w-4 h-4 text-emerald-300 shrink-0" strokeWidth={1.75} />
                <span>Full trailer truckloads & containerized export logistics</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" strokeWidth={1.75} />
                <span>Certified low moisture (&lt; 12%) and verified aflatoxin-free lab results</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <Package className="w-4 h-4 text-emerald-300 shrink-0" strokeWidth={1.75} />
                <span>200-Liter Castor & Neem oil drums available for cosmetics brands</span>
              </div>
            </div>
          </div>

          {/* Right Form Card: rounded-3xl (24px), p-6 sm:p-8 */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-stone-900 shadow-xl border border-white/10">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#2d6a4f]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">Quotation Request Received</h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto font-normal">
                    Our wholesale commodities manager will review your specifications and contact you at <strong className="text-stone-900 tabular-nums">{formData.phone}</strong> shortly.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/2348060551016?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25d366] text-white font-bold text-xs shadow-sm hover:bg-[#20ba5a]"
                    >
                      <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
                      <span>Speed Up via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 pb-2 border-b border-[#f1efe7]">
                    Request Bulk Commodity Quote
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Company / Business Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. GreenLife Foods Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
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
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
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
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 tabular-nums focus:outline-hidden focus:border-[#1b4332]"
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
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Commodity Required</label>
                      <select
                        value={formData.commodity}
                        onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                      >
                        <option value="Yellow Maize (Bulk Sacks)">Yellow Maize (50kg / 100kg Sacks)</option>
                        <option value="Raw Castor Seeds">High-Yield Castor Seeds</option>
                        <option value="Castor Oil (Drums)">Castor Oil (200L Drum)</option>
                        <option value="Neem Oil (Drums)">Neem Oil (200L Drum)</option>
                        <option value="Raw Honey (Bulk Tubs)">Raw Forest Honey (Bulk Tubs)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Estimated Volume</label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                      >
                        <option value="50 - 100 Bags">50 - 100 Bags (Trial Order)</option>
                        <option value="5 - 10 Metric Tons">5 - 10 Metric Tons</option>
                        <option value="20 - 30 Metric Tons (Full Trailer)">20 - 30 Metric Tons (Full Trailer)</option>
                        <option value="1 - 5 Drums (Oil)">1 - 5 Drums (200L Each)</option>
                        <option value="Containerized Export (FCL)">Containerized Export (FCL)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Delivery Destination / Port</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lagos Port, Ibadan, Kano, or Tema Port Ghana"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" strokeWidth={1.75} />
                        <span>Submit Wholesale Request</span>
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
