import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle2, ShieldCheck, CreditCard, Building2, Truck, Download, MessageSquare, ArrowLeft } from 'lucide-react';

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    finalTotalNGN,
    finalTotalUSD,
    formatPrice,
    currency
  } = useCart();

  const [step, setStep] = useState('form'); // 'form' or 'success'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Ekiti',
    shippingMethod: 'standard',
    paymentMethod: 'paystack',
    notes: ''
  });

  const [orderSummary, setOrderSummary] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const shippingCostNGN = formData.shippingMethod === 'express' ? 4500 : (formData.shippingMethod === 'pickup' ? 0 : 2500);

  const grandTotalNGN = finalTotalNGN + shippingCostNGN;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrder = {
        orderId: `LAB-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cart],
        customer: { ...formData },
        totalNGN: grandTotalNGN,
        currency: 'NGN'
      };

      setOrderSummary(generatedOrder);
      setIsSubmitting(false);
      setStep('success');
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#e5e1d5] overflow-hidden my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e5e1d5] flex items-center justify-between bg-[#faf9f5]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2d6a4f]" />
            <h3 className="font-extrabold text-[#1b4332] text-lg">
              {step === 'form' ? 'Checkout & Farm Dispatch' : 'Order Confirmed!'}
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#e5e1d5] text-[#52796f] hover:text-[#1c241d] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1b4332] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Contact Information</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#52796f] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Omolara Adeleke"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#52796f] mb-1">Phone Number (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0806 055 1016"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#52796f] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3 pt-2 border-t border-[#f1efe7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1b4332] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Delivery Destination</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#52796f] mb-1">Delivery Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="House / Office number, Street name, Landmark"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#52796f] mb-1">State / Region</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                    >
                      <option value="Ekiti">Ekiti State (Local Hub)</option>
                      <option value="Lagos">Lagos State</option>
                      <option value="Abuja">Abuja (FCT)</option>
                      <option value="Oyo">Oyo (Ibadan)</option>
                      <option value="Ondo">Ondo State</option>
                      <option value="Rivers">Rivers (Port Harcourt)</option>
                      <option value="Kano">Kano State</option>
                      <option value="Ogun">Ogun State</option>
                      <option value="Ghana">Accra, Ghana (West Africa Hub)</option>
                      <option value="International">International Export (DHL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#52796f] mb-1">City / Town</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ado-Ekiti, Ikeja, Garki"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs text-[#1c241d] focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>
                </div>

                {/* Shipping Speed Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <label 
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      formData.shippingMethod === 'standard' 
                        ? 'border-[#1b4332] bg-[#d8f3dc]/30' 
                        : 'border-[#e5e1d5] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                        className="text-[#1b4332]"
                      />
                      <span className="text-xs font-bold text-[#1b4332]">Standard Dispatch</span>
                    </div>
                    <div className="text-[11px] text-[#52796f] mt-1">2-4 Business Days</div>
                    <div className="text-xs font-bold text-[#2d6a4f] mt-1">{formatPrice(2500)}</div>
                  </label>

                  <label 
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      formData.shippingMethod === 'express' 
                        ? 'border-[#1b4332] bg-[#d8f3dc]/30' 
                        : 'border-[#e5e1d5] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                        className="text-[#1b4332]"
                      />
                      <span className="text-xs font-bold text-[#1b4332]">Express Priority</span>
                    </div>
                    <div className="text-[11px] text-[#52796f] mt-1">24-48 Hours</div>
                    <div className="text-xs font-bold text-[#2d6a4f] mt-1">{formatPrice(4500)}</div>
                  </label>

                  <label 
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      formData.shippingMethod === 'pickup' 
                        ? 'border-[#1b4332] bg-[#d8f3dc]/30' 
                        : 'border-[#e5e1d5] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        value="pickup"
                        checked={formData.shippingMethod === 'pickup'}
                        onChange={() => setFormData({ ...formData, shippingMethod: 'pickup' })}
                        className="text-[#1b4332]"
                      />
                      <span className="text-xs font-bold text-[#1b4332]">Hub Pickup</span>
                    </div>
                    <div className="text-[11px] text-[#52796f] mt-1">TIC Ado-Ekiti</div>
                    <div className="text-xs font-bold text-[#2d6a4f] mt-1">FREE</div>
                  </label>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 pt-2 border-t border-[#f1efe7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1b4332] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Payment Method Simulation</span>
                </h4>
                
                <div className="space-y-2">
                  <label 
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      formData.paymentMethod === 'paystack' 
                        ? 'border-[#1b4332] bg-[#d8f3dc]/30' 
                        : 'border-[#e5e1d5] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="paystack"
                        checked={formData.paymentMethod === 'paystack'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'paystack' })}
                      />
                      <div>
                        <div className="text-xs font-bold text-[#1b4332]">Paystack / Debit Card / USSD</div>
                        <div className="text-[11px] text-[#52796f]">Instant automatic payment confirmation</div>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-[#1b4332]" />
                  </label>

                  <label 
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      formData.paymentMethod === 'bank' 
                        ? 'border-[#1b4332] bg-[#d8f3dc]/30' 
                        : 'border-[#e5e1d5] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                      />
                      <div>
                        <div className="text-xs font-bold text-[#1b4332]">Direct Corporate Bank Transfer</div>
                        <div className="text-[11px] text-[#52796f]">Labuk Agro Ltd corporate account</div>
                      </div>
                    </div>
                    <Building2 className="w-5 h-5 text-[#1b4332]" />
                  </label>
                </div>
              </div>

              {/* Order Final Summary Box */}
              <div className="bg-[#faf9f5] p-4 rounded-2xl border border-[#e5e1d5] space-y-2 text-xs">
                <div className="flex justify-between text-[#52796f]">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-[#1c241d]">{formatPrice(finalTotalNGN)}</span>
                </div>
                <div className="flex justify-between text-[#52796f]">
                  <span>Shipping Fee:</span>
                  <span className="font-semibold text-[#1c241d]">{formatPrice(shippingCostNGN)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-[#1b4332] pt-2 border-t border-[#e5e1d5]">
                  <span>Total Due:</span>
                  <span>{formatPrice(grandTotalNGN)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Labuk Agro Order...</span>
                ) : (
                  <span>Place Order • {formatPrice(grandTotalNGN)}</span>
                )}
              </button>

            </form>
          ) : (
            /* Order Success Receipt Screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-[#2d6a4f]" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider">
                  Order Successfully Placed!
                </span>
                <h3 className="text-2xl font-extrabold text-[#1b4332] mt-1">
                  Thank You, {orderSummary.customer.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-[#52796f] max-w-md mx-auto mt-1">
                  Your order has been recorded at Labuk Agro Ltd. A confirmation SMS & WhatsApp notice has been dispatched to <strong>{orderSummary.customer.phone}</strong>.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-[#faf9f5] border border-[#e5e1d5] rounded-2xl p-5 text-left space-y-4 max-w-lg mx-auto text-xs">
                <div className="flex justify-between items-center border-b border-[#e5e1d5] pb-3">
                  <div>
                    <div className="text-[10px] text-[#52796f] uppercase font-bold">Order Tracking ID</div>
                    <div className="font-extrabold text-sm text-[#1b4332]">{orderSummary.orderId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#52796f] uppercase font-bold">Date</div>
                    <div className="font-semibold text-xs text-[#1c241d]">{orderSummary.date}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-[#1b4332] uppercase">Items Ordered:</div>
                  {orderSummary.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[#52796f]">
                      <span>
                        {item.quantity}x {item.product.name} ({item.variant.size})
                      </span>
                      <span className="font-bold text-[#1c241d]">
                        {formatPrice(item.variant.priceNGN * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#e5e1d5] pt-3 flex justify-between font-extrabold text-sm text-[#1b4332]">
                  <span>Total Amount Paid / Due:</span>
                  <span>{formatPrice(orderSummary.totalNGN)}</span>
                </div>

                <div className="border-t border-[#e5e1d5] pt-2 text-[11px] text-[#52796f]">
                  <strong>Delivery to:</strong> {orderSummary.customer.address}, {orderSummary.customer.city}, {orderSummary.customer.state}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/2348060551016?text=Hello%20Labuk%20Agro,%20I%20just%20placed%20order%20${orderSummary.orderId}%20for%20${encodeURIComponent(orderSummary.customer.fullName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#25d366] text-white font-bold text-xs flex items-center gap-2 shadow-md hover:bg-[#20ba5a]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e5e1d5] text-[#1b4332] font-bold text-xs flex items-center gap-2 hover:bg-[#e8e4d9]"
                >
                  <Download className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#1b4332] text-white font-bold text-xs hover:bg-[#2d6a4f]"
                >
                  Return to Store
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
