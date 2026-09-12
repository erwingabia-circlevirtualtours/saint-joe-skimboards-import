import React, { useState } from 'react';
import { BoardProduct } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Zap, Layers, Check, Truck, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: BoardProduct | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.specs.sizes[0]?.size || '');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const activeColorway = product.colorways[selectedColorIdx] || product.colorways[0];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      isCustom: false,
      name: product.name,
      price: product.price,
      image: '/saint-joe-logo.jpg',
      selectedSize: selectedSize,
      selectedColor: activeColorway.name,
      quantity: quantity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-brand-charcoal border border-brand-border rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-brand-dark/80 hover:bg-brand-surface text-slate-400 hover:text-white border border-brand-border transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          
          {/* Left Column: Board Graphic Simulation */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-brand-surface/70 rounded-2xl p-6 border border-brand-border/60 relative overflow-hidden">
            
            {/* Ambient Lighting */}
            <div
              className="absolute w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: activeColorway.accentHex }}
            />

            {/* Board Simulation */}
            <div
              className="relative w-36 sm:w-44 h-72 sm:h-80 rounded-[48px] border-2 border-brand-border shadow-2xl flex flex-col items-center justify-between p-4 my-4"
              style={{
                background: `linear-gradient(180deg, ${activeColorway.hex} 0%, ${activeColorway.accentHex} 100%)`
              }}
            >
              <div className="absolute inset-0 rounded-[46px] opacity-35 carbon-bg" />
              
              {/* Traction Grip */}
              <div className="relative z-10 w-24 h-16 rounded-xl bg-black/70 border border-white/10 flex items-center justify-center">
                <span className="text-[9px] font-mono text-white/80 font-bold">PRO ARCH</span>
              </div>

              {/* Deck Stamp */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-white p-1 shadow-lg border border-black/20 flex items-center justify-center overflow-hidden">
                <img src="/saint-joe-logo.jpg" alt="Saint Joe" className="w-full h-full object-cover" />
              </div>

              {/* Tail Pad */}
              <div className="relative z-10 w-28 h-18 rounded-b-[38px] bg-black/80 border-t border-brand-cyan flex items-center justify-center">
                <span className="text-[9px] font-mono text-brand-cyan font-bold">KICK TAIL</span>
              </div>
            </div>

            <div className="w-full pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Colorway: <b className="text-white">{activeColorway.name}</b></span>
              <span className="text-brand-volt font-bold">100% Epoxy</span>
            </div>

          </div>

          {/* Right Column: Specifications & Configuration */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.badge && (
                  <span className="text-[10px] font-mono font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 px-2 py-0.5 rounded-full uppercase">
                    {product.badge}
                  </span>
                )}
                {product.signatureRider && (
                  <span className="text-[10px] font-mono text-brand-volt font-bold">
                    ★ {product.signatureRider} Pro Series
                  </span>
                )}
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{product.subtitle}</p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-3xl text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-slate-500 line-through">${product.originalPrice}</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-white text-sm">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} verified reviews)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Tech Specs Matrix */}
            <div className="grid grid-cols-2 gap-2 bg-brand-dark/70 p-3 rounded-xl border border-brand-border text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">CORE</span>
                <span className="text-slate-200 font-bold">{product.specs.core}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">LAYUP</span>
                <span className="text-brand-cyan font-bold">{product.specs.layup}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-white/5">
                <span className="text-slate-500 block text-[10px]">ROCKER CURVE</span>
                <span className="text-slate-200">{product.specs.rocker}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Select Size & Dimensions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.specs.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
                      selectedSize === s.size
                        ? 'bg-brand-cyan/20 border-brand-cyan text-white shadow-sm'
                        : 'bg-brand-surface border-brand-border text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="font-bold block text-white">{s.size}</span>
                    <span className="text-[10px] text-brand-cyan block">{s.riderWeight}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colorway Switcher */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Select Colorway
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colorways.map((cw, idx) => (
                  <button
                    key={cw.name}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 ${
                      selectedColorIdx === idx
                        ? 'bg-brand-surfaceAlt border-brand-cyan text-white'
                        : 'bg-brand-dark border-brand-border text-slate-400'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30"
                      style={{ background: `linear-gradient(135deg, ${cw.hex} 0%, ${cw.accentHex} 100%)` }}
                    />
                    <span>{cw.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="flex items-center gap-3 pt-3 border-t border-brand-border/60">
              <div className="flex items-center bg-brand-surface rounded-xl border border-brand-border p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg text-slate-400 hover:text-white flex items-center justify-center font-mono font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono font-bold text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg text-slate-400 hover:text-white flex items-center justify-center font-mono font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue hover:brightness-110 text-brand-dark font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span>Add To Quiver (${product.price * quantity})</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'bg-brand-sunset/20 border-brand-sunset text-brand-sunset'
                    : 'bg-brand-surface border-brand-border text-slate-400 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-brand-sunset' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <Truck className="w-3.5 h-3.5" /> Free Express Shipping
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" /> Lifetime Warranty
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
