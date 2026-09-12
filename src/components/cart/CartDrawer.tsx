import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Tag, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    discount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    shipping,
    freeShippingThreshold,
    total,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoStatus(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const progressToFreeShip = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-charcoal border-l border-brand-border shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-brand-border bg-brand-surface flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white uppercase">Your Quiver</h3>
                <p className="text-xs font-mono text-slate-400">{cart.length} unique models selected</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-brand-surfaceAlt transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3.5 bg-brand-dark border-b border-brand-border">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-brand-cyan" />
                {amountNeeded === 0 ? (
                  <span className="text-brand-volt font-bold">You qualify for Free Domestic Freight!</span>
                ) : (
                  <span>Add <b className="text-brand-cyan">${amountNeeded}</b> more for Free Freight</span>
                )}
              </span>
              <span className="text-slate-400 font-bold">{progressToFreeShip}%</span>
            </div>
            
            <div className="w-full h-1.5 bg-brand-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-cyan to-brand-volt transition-all duration-500"
                style={{ width: `${progressToFreeShip}%` }}
              />
            </div>
          </div>

          {/* Cart Items Scroll Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Your quiver is currently empty.</p>
                  <p className="text-xs text-slate-400 mt-1">Explore our Pro Series or customize your own board.</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-brand-cyan text-brand-dark font-bold text-xs uppercase font-mono hover:bg-cyan-300 transition-colors"
                >
                  Explore Boards
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-brand-surface border border-brand-border rounded-2xl space-y-3 relative group"
                >
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-center p-1 overflow-hidden flex-shrink-0">
                      <img src="/saint-joe-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display font-bold text-sm text-white leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Custom Specs Pills */}
                      {item.isCustom && item.customConfig ? (
                        <div className="flex flex-wrap gap-1 mt-1.5 text-[10px] font-mono">
                          <span className="bg-brand-dark px-1.5 py-0.5 rounded border border-white/5 text-brand-cyan">
                            {item.customConfig.coreMaterial}
                          </span>
                          <span className="bg-brand-dark px-1.5 py-0.5 rounded border border-white/5 text-slate-300">
                            {item.customConfig.thickness}
                          </span>
                          <span className="bg-brand-dark px-1.5 py-0.5 rounded border border-white/5 text-brand-volt">
                            {item.customConfig.deckStyle}
                          </span>
                          {item.customConfig.riderNameStamp && (
                            <span className="bg-brand-dark px-1.5 py-0.5 rounded border border-white/5 text-amber-300">
                              Stamp: {item.customConfig.riderNameStamp}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-400">
                          <span>Size: {item.selectedSize}</span>
                          {item.selectedColor && <span>• {item.selectedColor}</span>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                    <div className="flex items-center bg-brand-dark rounded-lg border border-brand-border p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-bold text-white text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-display font-black text-base text-white">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Promo & Totals */}
          {cart.length > 0 && (
            <div className="p-6 bg-brand-surface border-t border-brand-border space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-brand-cyan/15 border border-brand-cyan/40 rounded-xl text-xs font-mono">
                    <span className="text-brand-cyan font-bold flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Code '{appliedPromo}' applied
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-slate-400 hover:text-white text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SAINT10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-brand-dark border border-brand-border rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-surfaceAlt hover:bg-brand-border border border-brand-border text-white text-xs font-mono font-bold rounded-xl"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoStatus && !appliedPromo && (
                  <p className={`text-[11px] font-mono mt-1 ${promoStatus.success ? 'text-brand-cyan' : 'text-red-400'}`}>
                    {promoStatus.message}
                  </p>
                )}
              </div>

              {/* Order Calculations */}
              <div className="space-y-1.5 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-brand-volt">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>Freight Shipping</span>
                  <span>{shipping === 0 ? <span className="text-brand-volt font-bold">FREE</span> : `$${shipping}`}</span>
                </div>

                <div className="flex items-center justify-between text-base font-display font-black text-white pt-2 border-t border-white/10">
                  <span>ESTIMATED TOTAL</span>
                  <span className="text-brand-cyan">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Master Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue hover:brightness-110 text-brand-dark font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
                <span>256-Bit SSL Encrypted Factory Direct Order</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
