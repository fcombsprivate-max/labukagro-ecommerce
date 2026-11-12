import React, { useState, useEffect } from 'react';
import { CheckCircle2, Copy, Check, Download, MessageSquare, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function OrderSuccessModal({ reference, isOpen, onClose, onTrackOrder }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen || !reference) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    // Call server-side verification API
    fetch(`/api/payment/verify?reference=${encodeURIComponent(reference)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!isMounted) return;

        if (res.ok && data.success && data.order) {
          setOrder(data.order);
          setLoading(false);
        } else {
          setError(data.message || 'Payment could not be verified by Paystack.');
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Unable to connect to payment verification service.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, reference]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!order?.trackingId) return;
    navigator.clipboard.writeText(order.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formattedDate = order?.paystackPaidAt 
    ? new Date(order.paystackPaidAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : (order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#e5e1d5] overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#e5e1d5] bg-[#faf9f5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1b4332]"></span>
            <span className="font-extrabold text-stone-900 text-sm sm:text-base tracking-tight">
              Labuk Agro Store — Order Confirmation
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-stone-500 hover:text-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Close
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 xs:p-6 sm:p-8 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-12 sm:py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mx-auto shadow-sm">
                <Loader2 className="w-7 h-7 text-[#2d6a4f] animate-spin" strokeWidth={2} />
              </div>
              <h3 className="text-lg xs:text-xl font-bold text-stone-900">
                Verifying Payment with Paystack...
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed font-normal">
                Connecting to Paystack servers to verify your transaction status. Please keep this window open.
              </p>
            </div>
          ) : error ? (
            <div className="py-8 sm:py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg xs:text-xl font-bold text-stone-900">
                Payment Verification Notice
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-normal">
                {error}
              </p>
              <div className="pt-4 flex flex-col xs:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#1b4332] text-white font-bold text-xs hover:bg-[#2d6a4f] cursor-pointer"
                >
                  Return to Store
                </button>
                <a
                  href={`https://wa.me/2348060551016?text=Hello%20Labuk%20Agro,%20I%20have%20an%20issue%20with%20payment%20reference:%20${encodeURIComponent(reference)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white border border-[#e5e1d5] text-stone-900 font-bold text-xs flex items-center justify-center gap-2 hover:bg-stone-50"
                >
                  <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
                  <span>Contact Support via WhatsApp</span>
                </a>
              </div>
            </div>
          ) : order ? (
            <div className="space-y-6 text-center">
              {/* Prominent Success Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#2d6a4f]" strokeWidth={2} />
              </div>

              {/* Exact Required Messaging */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#143224] tracking-tight">
                  Payment Received!
                </h2>
                <p className="text-xs xs:text-sm sm:text-base text-stone-700 max-w-lg mx-auto leading-relaxed font-normal">
                  Thank you for shopping with Labuk Agro. Your payment has been successfully received and verified.
                </p>
                <p className="text-xs xs:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed font-normal">
                  Your order has been confirmed, and we will process it for delivery. Your order will get to you very soon.
                </p>
              </div>

              {/* Prominent Tracking ID Box */}
              <div className="bg-[#faf9f5] border-2 border-[#1b4332] rounded-2xl p-4 sm:p-5 text-center space-y-2 max-w-lg mx-auto shadow-xs">
                <div className="text-[11px] font-bold text-[#2d6a4f] uppercase tracking-wider">
                  Your Official Order Tracking ID
                </div>
                <div className="flex items-center justify-center gap-2.5 flex-wrap">
                  <span className="font-mono text-lg xs:text-xl sm:text-2xl font-black text-[#143224] tracking-wider tabular-nums bg-white px-3 py-1.5 rounded-xl border border-[#e5e1d5]">
                    {order.trackingId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" strokeWidth={2} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" strokeWidth={1.75} />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 font-medium pt-1">
                  Please keep your tracking ID safe. You can use it to track your order or contact our support team regarding your purchase.
                </p>
              </div>

              {/* Order Details Receipt Card */}
              <div className="bg-[#faf9f5] border border-[#e5e1d5] rounded-2xl p-4 sm:p-5 text-left space-y-3 sm:space-y-4 max-w-lg mx-auto text-xs">
                <div className="flex justify-between items-center border-b border-[#e5e1d5] pb-3 text-stone-700">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Order Reference</span>
                    <span className="font-mono font-bold text-stone-900">{order.orderReference}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Date of Payment</span>
                    <span className="font-semibold text-stone-900 tabular-nums">{formattedDate}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-[#e5e1d5] pb-3 text-stone-700">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Payment Method</span>
                    <span className="font-semibold text-stone-900 capitalize">
                      {order.paystackMetadata?.channel ? `Paystack (${order.paystackMetadata.channel})` : 'Paystack Verified'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Payment Status</span>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#1b4332]">
                      VERIFIED PAID
                    </span>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="space-y-2 border-b border-[#e5e1d5] pb-3">
                  <div className="text-[11px] font-bold text-stone-900 uppercase">Purchased Items</div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-stone-700">
                      <div>
                        <span className="font-bold tabular-nums text-stone-900">{item.quantity}x</span> {item.name}
                        <span className="text-stone-500 text-[11px] block">{item.size} • ₦{item.unitPriceNGN.toLocaleString()} each</span>
                      </div>
                      <span className="font-bold text-stone-900 tabular-nums">
                        ₦{(item.unitPriceNGN * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Totals */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900 tabular-nums">₦{order.subtotalNGN.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Delivery Dispatch ({order.customer.shippingMethod || 'Standard'})</span>
                    <span className="font-semibold text-stone-900 tabular-nums">₦{order.shippingCostNGN.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-extrabold text-[#143224] pt-2 border-t border-[#e5e1d5]">
                    <span>Total Amount Paid</span>
                    <span className="tabular-nums">₦{order.grandTotalNGN.toLocaleString()}</span>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="border-t border-[#e5e1d5] pt-2.5 text-[11px] text-stone-600">
                  <strong className="text-stone-900 font-semibold block mb-0.5">Delivery Address:</strong>
                  {order.customer.fullName} ({order.customer.phone})<br />
                  {order.customer.address}, {order.customer.city}, {order.customer.state}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center justify-center gap-2.5 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onTrackOrder) onTrackOrder(order.trackingId, order.customer.email);
                  }}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1b4332] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#2d6a4f] cursor-pointer"
                >
                  <span>Track Order Status</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </button>

                <a
                  href={`https://wa.me/2348060551016?text=${encodeURIComponent(`Hello Labuk Agro, I just completed payment for order ${order.trackingId} (Ref: ${order.orderReference}). Customer: ${order.customer.fullName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#25d366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#20ba5a]"
                >
                  <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
                  <span>Notify via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-[#e5e1d5] text-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-stone-50 cursor-pointer"
                >
                  <Download className="w-4 h-4" strokeWidth={1.75} />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e5e1d5] text-stone-700 font-bold text-xs hover:bg-stone-100 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
