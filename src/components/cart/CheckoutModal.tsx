import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, CheckCircle2, ShieldCheck, CreditCard, Lock, ArrowRight, Sparkles, Truck, PackageCheck } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, total, cart, completeCheckout } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    firstName: 'Shane',
    lastName: 'McConkey',
    email: 'shane.mcconkey@gmail.com',
    address: '2240 S Coast Hwy',
    city: 'Laguna Beach',
    state: 'CA',
    zip: '92651',
    country: 'United States',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
  });

  if (!isCheckoutOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      const generatedOrder = `SJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      await completeCheckout(formData);
      setLoading(false);
      setStep('success');
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0">
            <img src="/saintjoeskim_logo_black.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="font-display font-black text-xl text-slate-900 uppercase">
              {step === 'success' ? 'Order Confirmed' : 'Saint Joe Express Checkout'}
            </h3>
            <p className="text-xs font-mono text-slate-500">
              {step === 'details' && 'Step 1 of 2: Shipping & Rider Destination'}
              {step === 'payment' && 'Step 2 of 2: Payment Authorization'}
              {step === 'success' && 'Factory Production Queued'}
            </p>
          </div>
        </div>

        {/* Step 1: Shipping Details */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-slate-700 block mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase text-slate-700 block mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-700 block mb-1">Delivery Street Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-mono uppercase text-slate-700 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase text-slate-700 block mb-1">State / Prov</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase text-slate-700 block mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Total Indicator & Next Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-sm font-mono text-slate-600">Total: <b className="text-slate-900 text-lg">${total.toFixed(2)}</b></span>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-slate-900 text-white font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-slate-800 transition-colors shadow-md"
              >
                <span>Continue to Payment</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method */}
        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-sky-600" />
                <div>
                  <span className="text-xs font-mono text-slate-900 font-bold block">Credit Card / Apple Pay</span>
                  <span className="text-[10px] text-slate-500 font-mono">256-Bit Encrypted Secure Channel</span>
                </div>
              </div>
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-700 block mb-1">Card Number</label>
              <input
                type="text"
                required
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-slate-700 block mb-1">Expiration (MM/YY)</label>
                <input
                  type="text"
                  required
                  value={formData.expDate}
                  onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase text-slate-700 block mb-1">Security Code (CVV)</label>
                <input
                  type="text"
                  required
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs font-mono text-slate-600 hover:text-slate-900"
              >
                ← Back to Shipping
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-xl bg-slate-900 text-white font-display font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-md hover:bg-slate-800 transition-all"
              >
                {loading ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 stroke-[2.5]" />
                    <span>Pay ${total.toFixed(2)} USD</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-6 animate-scale">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600">
              <PackageCheck className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold bg-sky-100 text-sky-800 px-3 py-1 rounded-full uppercase">
                Order #{orderNumber}
              </span>
              <h3 className="font-display font-black text-3xl text-slate-900 uppercase mt-3">
                SHAPER PRODUCTION QUEUED!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <b className="text-slate-900">{formData.firstName}</b>! A confirmation receipt has been dispatched to <b className="text-sky-700">{formData.email}</b>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="text-slate-900">{formData.address}, {formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Production Facility:</span>
                <span className="text-slate-900 font-semibold">Tacloban City, Philippines, 6500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="text-sky-700 font-bold">10-14 Business Days</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 rounded-xl bg-slate-900 text-white font-display font-black text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-md"
            >
              Return to Quiver Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
