import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle2, ShieldCheck, CreditCard, Building2, Download, MessageSquare, Loader2 } from 'lucide-react';

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    finalTotalNGN,
    formatPrice
  } = useCart();

  const [step, setStep] = useState('form'); // 'form' or 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  if (!isCheckoutOpen) return null;

  const shippingCostNGN = formData.shippingMethod === 'express' ? 4500 : (formData.shippingMethod === 'pickup' ? 0 : 2500);
  const grandTotalNGN = finalTotalNGN + shippingCostNGN;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          shippingMethod: formData.shippingMethod
        },
        items: cart.map(item => ({
          productId: item.product.id,
          size: item.variant.size,
          quantity: item.quantity
        })),
        shippingMethod: formData.shippingMethod,
        paymentMethod: formData.paymentMethod
      };

      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to initialize payment.');
      }

      if (formData.paymentMethod === 'paystack' && data.authorizationUrl) {
        // Clear cart and redirect to Paystack hosted checkout
        clearCart();
        window.location.href = data.authorizationUrl;
        return;
      }

      // If bank transfer or fallback
      if (formData.paymentMethod === 'bank') {
        const generatedOrder = {
          orderId: data.orderReference,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          items: [...cart],
          customer: { ...formData },
          totalNGN: data.grandTotalNGN,
          bankDetails: data.bankDetails
        };
        setOrderSummary(generatedOrder);
        setIsSubmitting(false);
        setStep('success');
        clearCart();
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Unable to process checkout. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#e5e1d5] overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e5e1d5] flex items-center justify-between bg-[#faf9f5]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2d6a4f]" strokeWidth={1.75} />
            <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
              {step === 'form' ? 'Checkout & Farm Dispatch' : 'Order Confirmed'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 xs:p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              
              {/* Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Contact Information</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Omolara Adeleke"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      placeholder="0806 055 1016"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 tabular-nums focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="client@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3 pt-2 border-t border-[#f1efe7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Delivery Destination</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Building number, street, landmark"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">State / Region</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                    >
                      <option value="Ekiti">Ekiti State (Local Hub)</option>
                      <option value="Lagos">Lagos State</option>
                      <option value="Abuja">Abuja (FCT)</option>
                      <option value="Oyo">Oyo State (Ibadan)</option>
                      <option value="Ondo">Ondo State</option>
                      <option value="Rivers">Rivers (Port Harcourt)</option>
                      <option value="Kano">Kano State</option>
                      <option value="Ogun">Ogun State</option>
                      <option value="Ghana">Accra, Ghana (West Africa)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">City / Town</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ado-Ekiti, Ikeja, Garki"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                    />
                  </div>
                </div>

                {/* Shipping Speed Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <label 
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all min-h-[52px] ${
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
                      />
                      <span className="text-xs font-bold text-stone-900">Standard Dispatch</span>
                    </div>
                    <div className="text-[11px] text-stone-600 mt-1">2-4 Business Days</div>
                    <div className="text-xs font-bold text-[#1b4332] mt-1 tabular-nums">{formatPrice(2500)}</div>
                  </label>

                  <label 
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all min-h-[52px] ${
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
                      />
                      <span className="text-xs font-bold text-stone-900">Priority Express</span>
                    </div>
                    <div className="text-[11px] text-stone-600 mt-1">24-48 Hours</div>
                    <div className="text-xs font-bold text-[#1b4332] mt-1 tabular-nums">{formatPrice(4500)}</div>
                  </label>

                  <label 
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all min-h-[52px] ${
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
                      />
                      <span className="text-xs font-bold text-stone-900">TIC Pickup</span>
                    </div>
                    <div className="text-[11px] text-stone-600 mt-1">Unit 22, TIC Ado-Ekiti</div>
                    <div className="text-xs font-bold text-[#1b4332] mt-1">FREE</div>
                  </label>
                </div>
              </div>

              {/* Payment Method Simulation */}
              <div className="space-y-3 pt-2 border-t border-[#f1efe7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Payment Method</span>
                </h4>
                
                <div className="space-y-2">
                  <label 
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all min-h-[52px] ${
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
                        <div className="text-xs font-bold text-stone-900">Card / Paystack / USSD</div>
                        <div className="text-[11px] text-stone-600">Automated payment receipt verification</div>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-[#1b4332] shrink-0" strokeWidth={1.75} />
                  </label>

                  <label 
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all min-h-[52px] ${
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
                        <div className="text-xs font-bold text-stone-900">Corporate Bank Transfer</div>
                        <div className="text-[11px] text-stone-600">Labuk Agro Ltd corporate account</div>
                      </div>
                    </div>
                    <Building2 className="w-5 h-5 text-[#1b4332] shrink-0" strokeWidth={1.75} />
                  </label>
                </div>
              </div>

              {/* Order Final Summary Box */}
              <div className="bg-[#faf9f5] p-3.5 sm:p-4 rounded-2xl border border-[#e5e1d5] space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{formatPrice(finalTotalNGN)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping Dispatch</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{formatPrice(shippingCostNGN)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-[#143224] pt-2 border-t border-[#e5e1d5]">
                  <span>Total Due</span>
                  <span className="tabular-nums">{formatPrice(grandTotalNGN)}</span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button with Loading State */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] py-3.5 sm:py-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                    <span>{formData.paymentMethod === 'paystack' ? 'Connecting to Paystack Secure Checkout...' : 'Processing Order...'}</span>
                  </>
                ) : (
                  <span>
                    {formData.paymentMethod === 'paystack' ? 'Pay via Paystack' : 'Place Order'} • <span className="tabular-nums">{formatPrice(grandTotalNGN)}</span>
                  </span>
                )}
              </button>

            </form>
          ) : (
            /* Order Success Receipt Screen */
            <div className="space-y-5 sm:space-y-6 text-center py-2 sm:py-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#2d6a4f]" strokeWidth={1.75} />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
                  Thank You, {orderSummary.customer.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-1 font-normal">
                  Your order has been recorded at Labuk Agro Ltd. Dispatch details have been sent to <strong className="text-stone-900 tabular-nums">{orderSummary.customer.phone}</strong>.
                </p>
              </div>

              {/* Receipt Card: Monospace tracking number used strictly here */}
              <div className="bg-[#faf9f5] border border-[#e5e1d5] rounded-2xl p-4 sm:p-5 text-left space-y-3 sm:space-y-4 max-w-lg mx-auto text-xs">
                <div className="flex justify-between items-center border-b border-[#e5e1d5] pb-3">
                  <div>
                    <div className="text-[10px] text-stone-500 uppercase font-bold">Order Tracking ID</div>
                    <div className="font-mono font-bold text-sm text-[#1b4332] tabular-nums tracking-wider">{orderSummary.orderId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-stone-500 uppercase font-bold">Date</div>
                    <div className="font-semibold text-xs text-stone-900 tabular-nums">{orderSummary.date}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-stone-900 uppercase">Items Ordered</div>
                  {orderSummary.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-stone-700">
                      <span>
                        <span className="tabular-nums">{item.quantity}</span>x {item.product.name} ({item.variant.size})
                      </span>
                      <span className="font-bold text-stone-900 tabular-nums">
                        {formatPrice(item.variant.priceNGN * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#e5e1d5] pt-3 flex justify-between font-extrabold text-sm text-[#143224]">
                  <span>Total Amount Paid / Due</span>
                  <span className="tabular-nums">{formatPrice(orderSummary.totalNGN)}</span>
                </div>

                <div className="border-t border-[#e5e1d5] pt-2 text-[11px] text-stone-600 font-normal">
                  <strong className="text-stone-900 font-semibold">Delivery Address:</strong> {orderSummary.customer.address}, {orderSummary.customer.city}, {orderSummary.customer.state}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center justify-center gap-2.5 sm:gap-3 pt-2">
                <a
                  href={`https://wa.me/2348060551016?text=Hello%20Labuk%20Agro,%20I%20just%20placed%20order%20${orderSummary.orderId}%20for%20${encodeURIComponent(orderSummary.customer.fullName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full xs:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#25d366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#20ba5a]"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  <span>Notify via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full xs:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-white border border-[#e5e1d5] text-stone-900 font-bold text-xs flex items-center justify-center gap-2 hover:bg-stone-50 cursor-pointer"
                >
                  <Download className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full xs:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1b4332] text-white font-bold text-xs hover:bg-[#2d6a4f] cursor-pointer flex items-center justify-center"
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
