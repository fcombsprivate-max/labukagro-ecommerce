import React, { useState, useEffect } from 'react';
import { X, Search, Lock, ShieldCheck, CheckCircle2, Clock, AlertCircle, RefreshCw, ChevronRight, Filter, User, MapPin, Package, FileText, Check } from 'lucide-react';

const DELIVERY_STATUSES = [
  'Order Received',
  'Processing',
  'Ready for Dispatch',
  'Dispatched',
  'Delivered',
  'Cancelled',
  'Refunded'
];

export default function AdminOrdersModal({ isOpen, onClose }) {
  const [token, setToken] = useState(() => localStorage.getItem('labuk_admin_token') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Status updating state
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');

  // Fetch orders when authenticated and opened
  useEffect(() => {
    if (isOpen && token) {
      fetchOrders();
    }
  }, [isOpen, token, searchQuery, paymentFilter, deliveryFilter]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (res.ok && data.success && data.token) {
        setToken(data.token);
        localStorage.setItem('labuk_admin_token', data.token);
        setPassword('');
      } else {
        setLoginError(data.message || 'Invalid administrative password.');
      }
    } catch (err) {
      setLoginError(err.message || 'Failed to authenticate.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('labuk_admin_token');
    setSelectedOrder(null);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (paymentFilter) params.set('paymentStatus', paymentFilter);
      if (deliveryFilter) params.set('deliveryStatus', deliveryFilter);

      const res = await fetch(`/api/admin/orders?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setOrders(data.orders || []);
        // Refresh selectedOrder if currently open
        if (selectedOrder) {
          const updatedSelected = (data.orders || []).find(o => o.id === selectedOrder.id);
          if (updatedSelected) setSelectedOrder(updatedSelected);
        }
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error('Failed to fetch admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedOrder || !newStatus) return;

    setUpdating(true);
    setUpdateMsg('');

    try {
      const res = await fetch('/api/admin/orders/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          deliveryStatus: newStatus,
          notes: statusNotes,
          adminUser: 'Admin Staff'
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.order) {
        setSelectedOrder(data.order);
        setUpdateMsg('Delivery status updated with audit log.');
        setStatusNotes('');
        fetchOrders();
        setTimeout(() => setUpdateMsg(''), 3000);
      } else {
        setUpdateMsg(`Error: ${data.message}`);
      }
    } catch (err) {
      setUpdateMsg(`Error: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-6xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#e5e1d5] overflow-hidden my-2 sm:my-6 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="p-4 sm:p-5 border-b border-[#e5e1d5] bg-[#1b4332] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-300" strokeWidth={1.75} />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                Labuk Agro Ltd — Internal Order Management Portal
              </h3>
              <p className="text-[11px] text-emerald-200">
                Authorized Personnel Only • Audit Logged & Secure
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {token && (
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-emerald-100 transition-colors"
              >
                Log Out
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center p-1 rounded-full hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Portal Content */}
        {!token ? (
          /* Login Screen */
          <div className="p-6 sm:p-12 text-center max-w-md mx-auto my-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#faf9f5] border border-[#e5e1d5] text-[#1b4332] flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-7 h-7 text-[#2d6a4f]" strokeWidth={1.75} />
            </div>
            <h4 className="text-xl font-bold text-stone-900">
              Administrator Authentication
            </h4>
            <p className="text-xs text-stone-600">
              Enter your administrative credentials to manage store orders and fulfillments.
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2 text-left">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Administrative Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full min-h-[42px] bg-[#faf9f5] border border-[#e5e1d5] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                />
              </div>

              {loginError && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full min-h-[44px] rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                {loggingIn ? 'Authenticating...' : 'Sign In to Portal'}
              </button>
            </form>
          </div>
        ) : (
          /* Orders Dashboard Layout */
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            
            {/* Left Column: Orders List & Filters */}
            <div className={`w-full ${selectedOrder ? 'hidden md:flex md:w-1/2 lg:w-5/12' : 'flex'} flex-col border-r border-[#e5e1d5] bg-[#faf9f5]`}>
              {/* Search & Filters */}
              <div className="p-3.5 sm:p-4 border-b border-[#e5e1d5] bg-white space-y-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" strokeWidth={1.75} />
                  <input
                    type="text"
                    placeholder="Search by Tracking ID, Ref, Name, Email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf9f5] border border-[#e5e1d5] rounded-xl focus:outline-hidden focus:border-[#1b4332]"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="flex-1 py-1.5 px-2 text-[11px] bg-[#faf9f5] border border-[#e5e1d5] rounded-lg text-stone-800"
                  >
                    <option value="">All Payments</option>
                    <option value="PAID">Paid Only</option>
                    <option value="PENDING">Pending Only</option>
                    <option value="FAILED">Failed</option>
                  </select>

                  <select
                    value={deliveryFilter}
                    onChange={(e) => setDeliveryFilter(e.target.value)}
                    className="flex-1 py-1.5 px-2 text-[11px] bg-[#faf9f5] border border-[#e5e1d5] rounded-lg text-stone-800"
                  >
                    <option value="">All Delivery Stages</option>
                    {DELIVERY_STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={fetchOrders}
                    title="Refresh"
                    className="p-1.5 rounded-lg border border-[#e5e1d5] hover:bg-stone-100 text-stone-600"
                  >
                    <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>

              {/* Order List */}
              <div className="overflow-y-auto flex-1 divide-y divide-[#e5e1d5]">
                {loading ? (
                  <div className="p-8 text-center text-stone-500 text-xs">
                    Loading orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-8 text-center text-stone-500 text-xs">
                    No orders match your search criteria.
                  </div>
                ) : (
                  orders.map((ord) => {
                    const isSelected = selectedOrder?.id === ord.id;
                    const dateStr = new Date(ord.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

                    return (
                      <div
                        key={ord.id}
                        onClick={() => {
                          setSelectedOrder(ord);
                          setNewStatus(ord.deliveryStatus);
                        }}
                        className={`p-3.5 sm:p-4 cursor-pointer transition-colors ${
                          isSelected ? 'bg-emerald-50/80 border-l-4 border-l-[#1b4332]' : 'hover:bg-white bg-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-mono font-bold text-stone-900">
                            {ord.trackingId || ord.orderReference}
                          </span>
                          <span className="text-[11px] text-stone-500 tabular-nums">{dateStr}</span>
                        </div>

                        <div className="text-xs font-semibold text-stone-800 line-clamp-1">
                          {ord.customer.fullName}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1">
                          <span className="font-extrabold text-xs text-[#143224] tabular-nums">
                            ₦{ord.grandTotalNGN?.toLocaleString()}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              ord.paymentStatus === 'PAID' ? 'bg-emerald-100 text-[#1b4332]' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {ord.paymentStatus}
                            </span>
                            <span className="text-[10px] font-semibold bg-stone-200 text-stone-800 px-2 py-0.5 rounded-full line-clamp-1">
                              {ord.deliveryStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Order Details & Fulfillment Controls */}
            <div className={`w-full ${selectedOrder ? 'flex' : 'hidden md:flex'} md:w-1/2 lg:w-7/12 flex-col bg-white overflow-y-auto p-4 sm:p-6`}>
              {selectedOrder ? (
                <div className="space-y-6">
                  {/* Top Bar for Mobile Back */}
                  <div className="flex items-center justify-between border-b border-[#e5e1d5] pb-3">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(null)}
                      className="md:hidden text-xs font-bold text-[#1b4332] flex items-center gap-1"
                    >
                      ← Back to list
                    </button>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-stone-500">Selected Order</div>
                      <div className="font-mono font-bold text-sm text-stone-900">{selectedOrder.orderReference}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      selectedOrder.paymentStatus === 'PAID' ? 'bg-emerald-100 text-[#1b4332]' : 'bg-amber-100 text-amber-800'
                    }`}>
                      Payment: {selectedOrder.paymentStatus}
                    </span>
                  </div>

                  {/* Tracking ID Callout */}
                  <div className="p-4 rounded-xl bg-[#faf9f5] border border-[#e5e1d5] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-stone-500">Customer Tracking ID</div>
                      <div className="font-mono text-lg font-black text-[#1b4332] tabular-nums">
                        {selectedOrder.trackingId || 'Pending Payment'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-stone-500">Paystack Ref</div>
                      <div className="font-mono text-xs text-stone-600">{selectedOrder.paystackReference || 'N/A'}</div>
                    </div>
                  </div>

                  {/* Customer & Destination */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl border border-[#e5e1d5] space-y-1 bg-[#faf9f5]">
                      <div className="font-bold text-stone-900 uppercase text-[10px] flex items-center gap-1.5 pb-1 border-b border-[#e5e1d5]">
                        <User className="w-3.5 h-3.5 text-[#2d6a4f]" strokeWidth={1.75} />
                        <span>Customer Contact</span>
                      </div>
                      <div className="font-bold text-stone-900 text-sm mt-1">{selectedOrder.customer.fullName}</div>
                      <div>Email: <a href={`mailto:${selectedOrder.customer.email}`} className="text-blue-700">{selectedOrder.customer.email}</a></div>
                      <div>Phone: <strong className="tabular-nums">{selectedOrder.customer.phone}</strong></div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-[#e5e1d5] space-y-1 bg-[#faf9f5]">
                      <div className="font-bold text-stone-900 uppercase text-[10px] flex items-center gap-1.5 pb-1 border-b border-[#e5e1d5]">
                        <MapPin className="w-3.5 h-3.5 text-[#2d6a4f]" strokeWidth={1.75} />
                        <span>Delivery Destination</span>
                      </div>
                      <div className="text-stone-800 mt-1">{selectedOrder.customer.address}</div>
                      <div>{selectedOrder.customer.city}, {selectedOrder.customer.state}</div>
                      <div>Method: <strong className="capitalize">{selectedOrder.customer.shippingMethod || 'Standard'}</strong></div>
                    </div>
                  </div>

                  {/* Items Ordered Table */}
                  <div className="border border-[#e5e1d5] rounded-xl overflow-hidden text-xs">
                    <div className="bg-[#faf9f5] px-3.5 py-2 font-bold text-stone-900 uppercase text-[11px] border-b border-[#e5e1d5]">
                      Ordered Products ({selectedOrder.items?.length || 0})
                    </div>
                    <table className="w-full text-left">
                      <thead className="bg-[#f7f5ef] text-[10px] uppercase text-stone-600">
                        <tr>
                          <th className="p-2.5">Item</th>
                          <th className="p-2.5">Size</th>
                          <th className="p-2.5 text-center">Qty</th>
                          <th className="p-2.5 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e5e1d5]">
                        {selectedOrder.items?.map((it, i) => (
                          <tr key={i}>
                            <td className="p-2.5 font-semibold text-stone-900">{it.name}</td>
                            <td className="p-2.5 text-stone-600">{it.size}</td>
                            <td className="p-2.5 text-center font-bold tabular-nums">{it.quantity}</td>
                            <td className="p-2.5 text-right font-bold text-[#143224] tabular-nums">₦{(it.unitPriceNGN * it.quantity).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-[#faf9f5] font-bold text-stone-900 border-t border-[#e5e1d5]">
                        <tr>
                          <td colSpan={3} className="p-2.5 text-right">Grand Total Paid:</td>
                          <td className="p-2.5 text-right font-extrabold text-[#143224] text-sm tabular-nums">₦{selectedOrder.grandTotalNGN?.toLocaleString()}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Delivery Status Management (Section 7 Requirement) */}
                  <div className="p-4 rounded-xl border border-[#1b4332]/40 bg-[#d8f3dc]/20 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#143224]">
                      Update Order Fulfillment Status
                    </h4>
                    <p className="text-[11px] text-stone-600">
                      Changing fulfillment progress updates the customer's tracking view and writes to the permanent audit trail without altering payment status.
                    </p>

                    <form onSubmit={handleUpdateStatus} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">New Delivery Stage</label>
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="w-full min-h-[38px] bg-white border border-[#e5e1d5] rounded-lg px-2.5 py-1.5 text-xs text-stone-900 font-semibold focus:outline-hidden focus:border-[#1b4332]"
                          >
                            {DELIVERY_STATUSES.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Audit Notes / Dispatch Waybill</label>
                          <input
                            type="text"
                            placeholder="e.g. Waybill #9821 via Logistics Hub"
                            value={statusNotes}
                            onChange={(e) => setStatusNotes(e.target.value)}
                            className="w-full min-h-[38px] bg-white border border-[#e5e1d5] rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-hidden focus:border-[#1b4332]"
                          />
                        </div>
                      </div>

                      {updateMsg && (
                        <div className="text-xs text-[#1b4332] font-semibold flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>{updateMsg}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={updating || newStatus === selectedOrder.deliveryStatus}
                        className="min-h-[40px] px-5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {updating ? 'Recording...' : 'Update & Record Status'}
                      </button>
                    </form>
                  </div>

                  {/* Audit Trail & Order History Log */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-stone-600" />
                      <span>Order Audit History Log</span>
                    </h4>
                    <div className="border border-[#e5e1d5] rounded-xl overflow-hidden divide-y divide-[#e5e1d5] bg-[#faf9f5] text-[11px]">
                      {selectedOrder.auditLog && selectedOrder.auditLog.length > 0 ? (
                        selectedOrder.auditLog.map((log, idx) => (
                          <div key={idx} className="p-3 space-y-0.5">
                            <div className="flex items-center justify-between font-semibold text-stone-900">
                              <span>{log.action} {log.newStatus ? `→ ${log.newStatus}` : ''}</span>
                              <span className="text-stone-500 font-normal tabular-nums">
                                {new Date(log.timestamp).toLocaleString('en-GB')}
                              </span>
                            </div>
                            <div className="text-stone-600">
                              Recorded by: <strong className="text-stone-800">{log.user || 'System'}</strong>
                              {log.notes && <span className="italic block text-stone-500 mt-0.5">"{log.notes}"</span>}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-stone-500">No audit log entries recorded.</div>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="m-auto text-center p-8 text-stone-400 space-y-2">
                  <Package className="w-10 h-10 mx-auto text-stone-300" strokeWidth={1.5} />
                  <p className="text-xs">Select an order from the list to view complete details, customer delivery address, and update fulfillment progress.</p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
