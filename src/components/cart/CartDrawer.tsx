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
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-slate-900 uppercase">Your Quiver</h3>
                <p className="text-xs font-mono text-slate-500">{cart.length} unique models selected</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-700 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-sky-600" />
                {amountNeeded === 0 ? (
                  <span className="text-emerald-700 font-bold">You qualify for Free Domestic Freight!</span>
                ) : (
                  <span>Add <b className="text-sky-700">${amountNeeded}</b> more for Free Freight</span>
                )}
              </span>
              <span className="text-slate-500 font-bold">{progressToFreeShip}%</span>
            </div>
            
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${progressToFreeShip}%` }}
              />
            </div>
          </div>

          {/* Cart Items Scroll Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900">Your quiver is currently empty.</p>
                  <p className="text-xs text-slate-500 mt-1">Explore our Saint Joe Double Carbon or customize your own board.</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase font-mono hover:bg-slate-800 transition-colors"
                >
                  Explore Boards
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group"
                >
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0 shadow-sm">
                      <img src={item.image || '/saintjoeskim_logo_black.png'} alt="Product" className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display font-bold text-sm text-slate-900 leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Custom Specs Pills */}
                      {item.isCustom && item.customConfig ? (
                        <div className="flex flex-wrap gap-1 mt-1.5 text-[10px] font-mono">
                          <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-sky-700 font-semibold">
                            {item.customConfig.coreMaterial}
                          </span>
                          <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">
                            {item.customConfig.thickness}
                          </span>
                          <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">
                            {item.customConfig.deckStyle}
                          </span>
                          {item.customConfig.riderNameStamp && (
                            <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-amber-700 font-semibold">
                              Stamp: {item.customConfig.riderNameStamp}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1 mt-1">
                          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600">
                            <span>Size: {item.selectedSize}</span>
                            {item.selectedColor && <span>• {item.selectedColor}</span>}
                          </div>
                          {item.id === 'saint-joe-woody' && (
                            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold inline-block">
                              ✓ Free Archbar & Traction Pad Included
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-mono">
                    <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-500 hover:text-slate-900"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-bold text-slate-900 text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-500 hover:text-slate-900"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-display font-black text-base text-slate-900">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Promo & Totals */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-sky-50 border border-sky-200 rounded-xl text-xs font-mono">
                    <span className="text-sky-800 font-bold flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Code '{appliedPromo}' applied
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-slate-500 hover:text-slate-800 text-[11px] underline"
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
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold rounded-xl"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoStatus && !appliedPromo && (
                  <p className={`text-[11px] font-mono mt-1 ${promoStatus.success ? 'text-sky-700' : 'text-red-600'}`}>
                    {promoStatus.message}
                  </p>
                )}
              </div>

              {/* Order Calculations */}
              <div className="space-y-1.5 font-mono text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>Freight Shipping</span>
                  <span>{shipping === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `$${shipping}`}</span>
                </div>

                <div className="flex items-center justify-between text-base font-display font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>ESTIMATED TOTAL</span>
                  <span className="text-sky-700">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Master Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>256-Bit SSL Encrypted Factory Direct Order</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
