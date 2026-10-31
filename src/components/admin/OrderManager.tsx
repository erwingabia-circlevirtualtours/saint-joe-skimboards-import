import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CmsOrder, OrderState } from '../../types/cms';
import {
  Search,
  Filter,
  ShieldCheck,
  Printer,
  Truck,
  Hammer,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  Trash2
} from 'lucide-react';

const STATUS_CONFIG: Record<
  OrderState,
  { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  pending: {
    label: 'Awaiting GCash',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    icon: Clock,
  },
  verified: {
    label: 'GCash Verified',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    icon: ShieldCheck,
  },
  shaping: {
    label: 'In Shaping Bay',
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    border: 'border-sky-500/30',
    icon: Hammer,
  },
  ready: {
    label: 'Cured & Packed',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    icon: Package,
  },
  dispatched: {
    label: 'In Courier Transit',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    icon: Truck,
  },
  completed: {
    label: 'Delivered / Closed',
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    border: 'border-slate-500/30',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Voided / Refunded',
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    icon: XCircle,
  },
};

export const OrderManager: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    verifyGcashPayment,
    updateOrderLogistics,
    openWorkshopSlip,
    deleteOrder,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderState>('all');
  const [selectedOrder, setSelectedOrder] = useState<CmsOrder | null>(null);

  // Modals for Actions
  const [verifyingOrderId, setVerifyingOrderId] = useState<string | null>(null);
  const [verificationRefInput, setVerificationRefInput] = useState('');

  const [dispatchingOrderId, setDispatchingOrderId] = useState<string | null>(null);
  const [courierNameInput, setCourierNameInput] = useState('J&T Express Cargo');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');

  // Filter and search logic
  const filteredOrders = orders.filter((order) => {
    const matchesFilter = statusFilter === 'all' || order.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      order.orderNumber.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerEmail.toLowerCase().includes(query) ||
      order.customerPhone.includes(query) ||
      (order.gcashReference && order.gcashReference.toLowerCase().includes(query)) ||
      (order.destinationSpot && order.destinationSpot.toLowerCase().includes(query)) ||
      order.deliveryAddress.city.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const handleOpenVerifyModal = (order: CmsOrder) => {
    setVerifyingOrderId(order.id);
    setVerificationRefInput(order.gcashReference || '');
  };

  const handleConfirmVerification = () => {
    if (!verifyingOrderId) return;
    verifyGcashPayment(verifyingOrderId, verificationRefInput.trim());
    setVerifyingOrderId(null);
  };

  const handleOpenDispatchModal = (order: CmsOrder) => {
    setDispatchingOrderId(order.id);
    setCourierNameInput(order.courierName || 'J&T Express Cargo');
    setTrackingNumberInput(order.trackingNumber || `JT-${Date.now().toString().slice(-8)}-PH`);
  };

  const handleConfirmDispatch = () => {
    if (!dispatchingOrderId) return;
    updateOrderLogistics(dispatchingOrderId, courierNameInput.trim(), trackingNumberInput.trim());
    setDispatchingOrderId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Search & Status Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search order number, rider, GCash ref, beach spot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Stats Count Bar */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Total Orders: <strong className="text-white">{orders.length}</strong></span>
          <span>•</span>
          <span>
            Pending GCash:{' '}
            <strong className="text-amber-400 font-bold">
              {orders.filter((o) => o.status === 'pending').length}
            </strong>
          </span>
          <span>•</span>
          <span>
            In Bay:{' '}
            <strong className="text-sky-400 font-bold">
              {orders.filter((o) => o.status === 'shaping').length}
            </strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
            statusFilter === 'all'
              ? 'bg-sky-600 text-white font-bold border-sky-500 shadow-sm'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
          }`}
        >
          All Orders ({orders.length})
        </button>
        {(['pending', 'verified', 'shaping', 'ready', 'dispatched', 'completed'] as OrderState[]).map((st) => {
          const cfg = STATUS_CONFIG[st];
          const count = orders.filter((o) => o.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                statusFilter === st
                  ? `${cfg.bg} ${cfg.text} font-bold ${cfg.border} shadow-sm`
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{cfg.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Order Cards List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 font-mono text-xs">
            No orders match the selected filter or query.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusCfg = STATUS_CONFIG[order.status];
            const StatusIcon = statusCfg.icon;

            return (
              <div
                key={order.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-lg text-white tracking-wide">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      <span>{statusCfg.label}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                {/* Main Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  {/* Customer & Beach Spot */}
                  <div className="space-y-1">
                    <div className="font-sans font-bold text-sm text-white">{order.customerName}</div>
                    <div className="text-slate-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>{order.customerPhone}</span>
                    </div>
                    <div className="text-sky-400 flex items-center gap-1 text-[11px] pt-1">
                      <MapPin className="w-3 h-3 text-sky-500 shrink-0" />
                      <span className="truncate">{order.destinationSpot || order.deliveryAddress.city}</span>
                    </div>
                  </div>

                  {/* Items Ordered */}
                  <div className="space-y-1">
                    <div className="text-slate-400 text-[11px] uppercase">Quiver Build Items:</div>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-slate-200 truncate">
                        • {item.quantity}x {item.name}{' '}
                        {item.selectedSize && <span className="text-slate-400">({item.selectedSize})</span>}
                      </div>
                    ))}
                    <div className="text-emerald-400 font-bold text-sm pt-1">
                      Total: ₱{order.totalPHP.toLocaleString()} PHP
                    </div>
                  </div>

                  {/* GCash Payment Verification Status */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 uppercase">Payment ({order.paymentMethod}):</span>
                        {order.isPaymentVerified ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
                          </span>
                        ) : (
                          <span className="text-amber-400 font-bold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> UNVERIFIED
                          </span>
                        )}
                      </div>

                      <div className="font-mono text-xs text-white truncate mt-1">
                        Ref: <strong className="text-cyan-300">{order.gcashReference || 'Awaiting Ref'}</strong>
                      </div>
                    </div>

                    {!order.isPaymentVerified && (
                      <button
                        onClick={() => handleOpenVerifyModal(order)}
                        className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-bold transition-all shadow-sm flex items-center justify-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Confirm GCash Ref</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Shaping Bay Notes or Courier Info */}
                {(order.shapingBayNotes || order.trackingNumber) && (
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                    <span className="truncate">
                      {order.shapingBayNotes ? (
                        <>
                          <strong className="text-slate-400">Shaping Bay:</strong> {order.shapingBayNotes}
                        </>
                      ) : (
                        <>
                          <strong className="text-slate-400">Courier:</strong> {order.courierName} •{' '}
                          <span className="text-sky-300">{order.trackingNumber}</span>
                        </>
                      )}
                    </span>
                  </div>
                )}

                {/* State Machine Transition Actions & Workshop Slip */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  {/* FSM Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500">Advance State:</span>

                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleOpenVerifyModal(order)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 font-mono text-xs font-semibold transition-all"
                      >
                        Verify GCash
                      </button>
                    )}

                    {order.status === 'verified' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'shaping', 'Sent to Tacloban rocker vacuum table')}
                        className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/30 font-mono text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <Hammer className="w-3.5 h-3.5" /> Move to Shaping Bay
                      </button>
                    )}

                    {order.status === 'shaping' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready', 'Cured, traction pads applied, and boxed')}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 font-mono text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <Package className="w-3.5 h-3.5" /> Mark Cured &amp; Packed
                      </button>
                    )}

                    {order.status === 'ready' && (
                      <button
                        onClick={() => handleOpenDispatchModal(order)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 font-mono text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <Truck className="w-3.5 h-3.5" /> Enter Courier Dispatch
                      </button>
                    )}

                    {order.status === 'dispatched' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed', 'Rider acknowledged delivery')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 font-mono text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Delivered
                      </button>
                    )}

                    {order.status !== 'completed' && order.status !== 'cancelled' && (
                      <button
                        onClick={() => {
                          if (confirm(`Void or cancel order ${order.orderNumber}?`)) {
                            updateOrderStatus(order.id, 'cancelled', 'Order voided by staff');
                          }
                        }}
                        className="text-[11px] font-mono text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>

                  {/* Workshop Slip & Delete */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openWorkshopSlip(order)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700"
                    >
                      <Printer className="w-3.5 h-3.5 text-sky-400" />
                      <span>Print Shaping Slip</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete ${order.orderNumber} permanently from local records?`)) {
                          deleteOrder(order.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL 1: GCash Verification Modal */}
      {verifyingOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 text-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-display font-black text-base uppercase text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Confirm GCash Payment</span>
              </h3>
              <button onClick={() => setVerifyingOrderId(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              Verify that the transaction reference matches your GCash merchant statement before stamping this order as paid.
            </p>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                GCash 13-Digit Reference Number
              </label>
              <input
                type="text"
                value={verificationRefInput}
                onChange={(e) => setVerificationRefInput(e.target.value)}
                placeholder="e.g. 9012384910283"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-cyan-300 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setVerifyingOrderId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmVerification}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-md"
              >
                Confirm &amp; Stamp Paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Courier Dispatch Modal */}
      {dispatchingOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 text-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-display font-black text-base uppercase text-cyan-400 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                <span>Courier Dispatch Details</span>
              </h3>
              <button onClick={() => setDispatchingOrderId(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 uppercase block mb-1">Carrier Name</label>
                <input
                  type="text"
                  value={courierNameInput}
                  onChange={(e) => setCourierNameInput(e.target.value)}
                  placeholder="e.g. J&T Express Cargo / LBC"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 uppercase block mb-1">Tracking / Waybill Number</label>
                <input
                  type="text"
                  value={trackingNumberInput}
                  onChange={(e) => setTrackingNumberInput(e.target.value)}
                  placeholder="e.g. JT-90182471-PH"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sky-300"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDispatchingOrderId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDispatch}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-md"
              >
                Mark Dispatched
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
