import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle2, LineChart, Phone, Loader2 } from 'lucide-react';

export default function ConsultationModal() {
  const { isConsultationOpen, setIsConsultationOpen } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Castor Plantation Setup & Outgrower Farming',
    format: 'Virtual (WhatsApp / Zoom)',
    date: '',
    message: ''
  });

  if (!isConsultationOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Labuk Agro, I would like to book an Agricultural Consultation:\nName: ${formData.name}\nTopic: ${formData.topic}\nFormat: ${formData.format}\nPreferred Date: ${formData.date}\nNotes: ${formData.message}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#e5e1d5] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e5e1d5] flex items-center justify-between bg-[#faf9f5]">
          <div className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-[#2d6a4f]" strokeWidth={1.75} />
            <h3 className="font-extrabold text-stone-900 text-lg">
              Agribusiness Consultation & Training
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsConsultationOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#2d6a4f]" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-stone-900">Consultation Booked</h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto font-normal">
                Our lead agronomist will reach out via WhatsApp at <strong className="text-stone-900 tabular-nums">{formData.phone}</strong> to confirm your appointment.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/2348060551016?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#25d366] text-white font-bold text-xs shadow-sm inline-flex items-center justify-center gap-2 hover:bg-[#20ba5a]"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.75} />
                  <span>Connect with Agronomist on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-800 font-semibold text-xs hover:bg-stone-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Consult directly with our agricultural specialists on castor plantation establishment, oil expeller calibration, and crop density optimization.
              </p>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Olatunji"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone (WhatsApp)</label>
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
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="farmer@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Area of Focus</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                >
                  <option value="Castor Plantation Setup & Outgrower Farming">Castor Plantation Setup & Seed Sourcing</option>
                  <option value="Commercial Grain Farming (Maize/Soybeans)">Commercial Grain Farming (Maize / Soybeans)</option>
                  <option value="Agro-Processing & Oil Expeller Setup">Cold-Press Extraction & Expeller Setup</option>
                  <option value="Organic Farming & Pest Defense (Neem)">Organic Pest Management (Neem Based)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Format</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                  >
                    <option value="Virtual (WhatsApp / Zoom)">Virtual (WhatsApp / Zoom)</option>
                    <option value="In-Person at TIC Ado-Ekiti">In-Person at TIC Ado-Ekiti</option>
                    <option value="On-Site Farm Inspection">On-Site Farm Inspection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 tabular-nums focus:outline-hidden focus:border-[#1b4332]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Project Notes (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Planning to cultivate 5 hectares of castor beans in Ekiti..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                    <span>Booking Consultation...</span>
                  </>
                ) : (
                  <span>Confirm Consultation Request</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
