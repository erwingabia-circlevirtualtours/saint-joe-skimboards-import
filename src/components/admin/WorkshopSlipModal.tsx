import React from 'react';
import { CmsOrder } from '../../types/cms';
import { X, Printer, ShieldCheck, CheckSquare, Sparkles, MapPin, Phone, User, Calendar, Tag } from 'lucide-react';

interface WorkshopSlipModalProps {
  order: CmsOrder | null;
  onClose: () => void;
}

export const WorkshopSlipModal: React.FC<WorkshopSlipModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-300 print:border-none print:shadow-none print:m-0 print:p-0">
        
        {/* Top Screen Controls (Hidden on Print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">Tacloban Shaping Bay Production Ticket</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print Slip (Shaping Bay)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Body */}
        <div className="p-8 sm:p-10 space-y-6 bg-white font-sans text-slate-900">
          
          {/* Header Ticket Barcode & Brand */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 p-2 flex items-center justify-center">
                <img
                  src="/saintjoeskim_logo_white.png"
                  alt="Saint Joe"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-display font-black text-2xl tracking-tighter uppercase text-slate-900">
                  SAINT JOE SKiMBOARDS
                </h1>
                <p className="text-xs font-mono text-slate-600 uppercase tracking-widest font-semibold">
                  TACLOBAN FACTORY SHAPING SLIP // EST. 2009
                </p>
                <p className="text-[11px] font-mono text-slate-500">
                  Tacloban City, Leyte, Philippines 6500 • +63 915 479 2915
                </p>
              </div>
            </div>

            <div className="text-right sm:text-right font-mono">
              <div className="text-xs text-slate-500 uppercase">Order Routing Code</div>
              <div className="text-2xl font-black text-slate-900 font-display">{order.orderNumber}</div>
              <div className="text-xs text-slate-600">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>

          {/* Rider & Delivery Spot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1">
                Rider Information
              </span>
              <div className="font-display font-bold text-lg text-slate-900">
                {order.customerName}
              </div>
              <div className="text-xs font-mono text-slate-600 mt-0.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{order.customerPhone}</span>
              </div>
              <div className="text-xs text-slate-600">{order.customerEmail}</div>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1">
                Delivery Shorebreak Destination
              </span>
              <div className="font-bold text-sm text-sky-800 flex items-center gap-1.5 mb-1">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{order.destinationSpot || 'Philippine Wave Spot'}</span>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed font-mono">
                {order.deliveryAddress.street}, {order.deliveryAddress.city},{' '}
                {order.deliveryAddress.province} {order.deliveryAddress.postalCode}
              </div>
            </div>
          </div>

          {/* Items & Specifications for Shaper */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <span className="font-mono text-xs font-bold uppercase text-slate-900 tracking-wider">
                Shaper Build Queue &amp; Specifications
              </span>
              <span className="font-mono text-xs text-slate-500">
                Status: <strong className="uppercase text-sky-700">{order.status}</strong>
              </span>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="font-display font-black text-base text-slate-900 uppercase">
                      {item.name}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-600">
                      {item.selectedSize && (
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          Size: {item.selectedSize}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          Colorway: {item.selectedColor}
                        </span>
                      )}
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        Qty: <strong>{item.quantity}</strong>
                      </span>
                    </div>
                    {item.customSummary && (
                      <p className="text-xs text-sky-800 font-mono mt-1 italic">
                        Custom Specs: {item.customSummary}
                      </p>
                    )}
                  </div>

                  <div className="text-right font-mono font-bold text-sm text-slate-900">
                    ₱{(item.pricePHP * item.quantity).toLocaleString()} PHP
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GCash Verification Stamp & Logistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GCash Verification Stamp */}
            <div className="p-4 rounded-2xl border-2 border-emerald-600/60 bg-emerald-50/50 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-900">
                  GCash Payment Audit Stamp
                </span>
              </div>

              <div className="space-y-1 text-xs font-mono text-emerald-950">
                <div className="flex justify-between">
                  <span>Method:</span>
                  <strong className="uppercase">{order.paymentMethod}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Reference No:</span>
                  <strong className="font-bold text-emerald-800 text-sm">
                    {order.gcashReference || 'AWAITING REF'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Confirmed:</span>
                  <strong className="text-sm">₱{order.totalPHP.toLocaleString()} PHP</strong>
                </div>
                {order.isPaymentVerified && (
                  <div className="pt-2 mt-2 border-t border-emerald-200 text-[11px] text-emerald-800">
                    ✓ Verified by {order.verifiedBy || 'Staff'} at{' '}
                    {order.verifiedAt ? new Date(order.verifiedAt).toLocaleTimeString() : 'Bay'}
                  </div>
                )}
              </div>
            </div>

            {/* Logistics & Tracking */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-mono text-xs font-bold uppercase text-slate-700">
                Courier &amp; Packaging
              </div>
              <div className="text-xs font-mono space-y-1 text-slate-800">
                <div className="flex justify-between">
                  <span>Carrier:</span>
                  <strong>{order.courierName || 'J&T Express / LBC Door-to-Door'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Waybill / Tracking:</span>
                  <strong className="text-sky-700">{order.trackingNumber || 'PENDING PICKUP'}</strong>
                </div>
                {order.shapingBayNotes && (
                  <div className="pt-2 text-[11px] text-slate-600 italic">
                    Note: "{order.shapingBayNotes}"
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Workshop Physical Quality Checklist (For Shapers) */}
          <div className="p-4 rounded-2xl border border-dashed border-slate-400 bg-slate-50/70 space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
              Tacloban Bay Production Check-Off (Physical Quality Control)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-1.5">
                <input type="checkbox" className="rounded" />
                <span>1. Core Blank Cut</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input type="checkbox" className="rounded" />
                <span>2. Rocker Vacuum Table</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input type="checkbox" className="rounded" />
                <span>3. Toray Carbon Layup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input type="checkbox" className="rounded" />
                <span>4. Hotcoat &amp; Post-Bake</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input type="checkbox" className="rounded" />
                <span>5. 60/40 Rail Sanding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input type="checkbox" className="rounded" />
                <span>6. Traction Pad Bonding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input type="checkbox" className="rounded" />
                <span>7. Final Hydro QC Stamp</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input type="checkbox" className="rounded" />
                <span>8. Corrugated Box &amp; Wrap</span>
              </div>
            </div>
          </div>

          {/* Ticket Footer */}
          <div className="pt-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
            <span>Saint Joe Skimboards Manufacturing Division • Tacloban City, Leyte</span>
            <span>Printed via Saint Joe CMS Local S3 System</span>
          </div>

        </div>
      </div>
    </div>
  );
};
