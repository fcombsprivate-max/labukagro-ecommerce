import React, { useState, useEffect } from 'react';
import { X, Search, Package, Clock, CheckCircle2, Truck, Home, AlertCircle, Loader2, ShieldCheck, MapPin } from 'lucide-react';

const STAGES = [
  { key: 'Order Received', label: 'Order Received', icon: Package },
  { key: 'Processing', label: 'Processing at Facility', icon: Clock },
  { key: 'Ready for Dispatch', label: 'Ready for Dispatch', icon: ShieldCheck },
  { key: 'Dispatched', label: 'In Transit / Dispatched', icon: Truck },
  { key: 'Delivered', label: 'Delivered', icon: Home }
];

export default function OrderTrackingModal({ isOpen, onClose, initialTrackingId = '', initialVerify = '' }) {
  const [trackingId, setTrackingId] = useState(initialTrackingId);
  const [verificationValue, setVerificationValue] = useState(initialVerify);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (initialTrackingId) setTrackingId(initialTrackingId);
    if (initialVerify) setVerificationValue(initialVerify);
  }, [initialTrackingId, initialVerify]);

  if (!isOpen) return null;

  const handleTrack = async (e) => {
    e?.preventDefault();
    if (!trackingId.trim() || !verificationValue.trim()) {
      setError('Please provide both your Tracking ID and the email or phone number used at checkout.');
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackingId: trackingId.trim(),
          verificationValue: verificationValue.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.success && data.order) {
        setOrder(data.order);
      } else {
        setError(data.message || 'No matching order found. Please check your Tracking ID and verification details.');
      }
    } catch (err) {
      setError(err.message || 'Network error while looking up order. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const currentStageIndex = order 
    ? STAGES.findIndex(s => s.key.toLowerCase() === (order.deliveryStatus || '').toLowerCase())
    : -1;

  const isCancelled = order?.deliveryStatus === 'Cancelled' || order?.deliveryStatus === 'Refunded';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#e5e1d5] overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e5e1d5] bg-[#faf9f5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#2d6a4f]" strokeWidth={1.75} />
            <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
              Track Your Labuk Agro Order
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 xs:p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Tracking Form */}
          <form onSubmit={handleTrack} className="bg-[#faf9f5] p-4 sm:p-5 rounded-2xl border border-[#e5e1d5] space-y-3">
            <p className="text-xs sm:text-sm text-stone-600 font-normal">
              Enter your unique Tracking ID and verification email or phone number to view live fulfillment progress.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Order Tracking ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LAG-20261111-A8F42K"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full min-h-[42px] bg-white border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 font-mono focus:outline-hidden focus:border-[#1b4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Verification Email or Phone</label>
                <input
                  type="text"
                  required
                  placeholder="Email or phone used at checkout"
                  value={verificationValue}
                  onChange={(e) => setVerificationValue(e.target.value)}
                  className="w-full min-h-[42px] bg-white border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[44px] py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                  <span>Looking up Order...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" strokeWidth={1.75} />
                  <span>Track Order</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.75} />
              <span>{error}</span>
            </div>
          )}

          {/* Order Results */}
          {order && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Order Status Badge & Topline */}
              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e5e1d5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">Tracking ID</div>
                  <div className="font-mono text-base sm:text-lg font-black text-[#1b4332] tabular-nums">
                    {order.trackingId}
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5">
                    Customer: <strong className="text-stone-900">{order.customerName}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    order.paymentStatus === 'PAID' ? 'bg-emerald-100 text-[#1b4332]' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Payment: {order.paymentStatus}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#1b4332] text-white">
                    {order.deliveryStatus}
                  </span>
                </div>
              </div>

              {/* Visual Multi-Stage Progress Tracker */}
              {!isCancelled ? (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Fulfillment Progress
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-2.5">
                    {STAGES.map((stage, idx) => {
                      const Icon = stage.icon;
                      const isPastOrCurrent = currentStageIndex >= idx;
                      const isCurrent = currentStageIndex === idx;

                      return (
                        <div
                          key={stage.key}
                          className={`p-3 rounded-xl border transition-all flex sm:flex-col items-center sm:text-center gap-2.5 sm:gap-2 ${
                            isCurrent
                              ? 'border-[#1b4332] bg-[#d8f3dc]/40 text-[#1b4332] font-bold shadow-xs'
                              : isPastOrCurrent
                              ? 'border-emerald-300 bg-emerald-50/50 text-[#2d6a4f]'
                              : 'border-[#e5e1d5] bg-white text-stone-400 opacity-60'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            isPastOrCurrent ? 'bg-[#1b4332] text-white' : 'bg-stone-200 text-stone-500'
                          }`}>
                            {isPastOrCurrent ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-300" strokeWidth={2} />
                            ) : (
                              <Icon className="w-4 h-4" strokeWidth={1.75} />
                            )}
                          </div>
                          <div className="text-[11px] leading-tight font-semibold">
                            {stage.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                  This order has been marked as <strong>{order.deliveryStatus}</strong>. Please reach out to Labuk Agro customer care for assistance.
                </div>
              )}

              {/* Order Items & Destination Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Items */}
                <div className="bg-[#faf9f5] p-4 rounded-2xl border border-[#e5e1d5] space-y-2">
                  <div className="font-bold text-stone-900 uppercase text-[11px] pb-1 border-b border-[#e5e1d5]">
                    Items in Order
                  </div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-stone-700">
                      <div>
                        <span className="font-bold text-stone-900 tabular-nums">{item.quantity}x</span> {item.name}
                        <span className="text-[10px] text-stone-500 block">{item.size}</span>
                      </div>
                      <span className="font-bold text-stone-900 tabular-nums">
                        ₦{(item.lineTotalNGN || (item.unitPriceNGN * item.quantity)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#e5e1d5] flex justify-between font-extrabold text-stone-900 text-sm">
                    <span>Total Amount</span>
                    <span className="tabular-nums">₦{order.grandTotalNGN.toLocaleString()}</span>
                  </div>
                </div>

                {/* Delivery Destination */}
                <div className="bg-[#faf9f5] p-4 rounded-2xl border border-[#e5e1d5] space-y-2">
                  <div className="font-bold text-stone-900 uppercase text-[11px] pb-1 border-b border-[#e5e1d5] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2d6a4f]" strokeWidth={1.75} />
                    <span>Destination Details</span>
                  </div>
                  <div className="text-stone-700 leading-relaxed">
                    <strong className="text-stone-900 block">{order.customerName}</strong>
                    <p className="mt-1">{order.deliveryAddress}</p>
                    <p className="mt-1 text-stone-500">Contact: {order.maskedPhone}</p>
                    <p className="mt-1 text-[11px] text-stone-500">Method: {order.shippingMethod || 'Standard Dispatch'}</p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
