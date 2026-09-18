import React, { useState } from 'react';
import { BoardProduct } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Zap, Layers, Check, Truck, ArrowRight, Gift } from 'lucide-react';

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
      image: product.image || '/saintjoeskim_logo_black.png',
      selectedSize: selectedSize,
      selectedColor: activeColorway.name,
      quantity: quantity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          
          {/* Left Column: Board Graphic Simulation */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-6 border border-slate-200 relative overflow-hidden">
            
            {/* Ambient Lighting */}
            <div
              className="absolute w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: activeColorway.accentHex }}
            />

            {/* Authentic Board Photography */}
            <div className="relative z-10 w-40 sm:w-48 h-72 sm:h-80 flex items-center justify-center p-2 my-4">
              <img
                src={product.image && product.image.startsWith('/') ? product.image : '/saint_joe_foamy.png'}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
              />
            </div>

            <div className="w-full pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Colorway: <b className="text-slate-900">{activeColorway.name}</b></span>
              <span className="text-sky-700 font-bold">100% Epoxy</span>
            </div>

          </div>

          {/* Right Column: Specifications & Configuration */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.badge && (
                  <span className="text-[10px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-full uppercase">
                    {product.badge}
                  </span>
                )}
                {product.signatureRider && (
                  <span className="text-[10px] font-mono text-sky-700 font-bold">
                    ★ {product.signatureRider} Pro Series
                  </span>
                )}
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{product.subtitle}</p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between pt-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-3xl text-slate-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm font-mono text-slate-400 line-through">${product.originalPrice}</span>
                    )}
                    {product.localPricePhp && (
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        {product.localPricePhp} (Philippine Local Price)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-amber-500 text-xs font-mono">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-slate-900 text-sm">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              {/* Free inclusions banner */}
              {product.freeInclusions && (
                <div className="mt-3 bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-200 rounded-xl p-3 flex items-center gap-2.5 text-xs font-mono text-slate-800">
                  <div className="p-1.5 bg-sky-500 text-white rounded-lg shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sky-900 block uppercase tracking-wider text-[11px]">
                      Special Local Inclusion Bundle
                    </span>
                    <span className="text-slate-700">{product.freeInclusions} ($45 USD Value)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Tech Specs Matrix */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">CORE</span>
                <span className="text-slate-800 font-bold">{product.specs.core}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">LAYUP</span>
                <span className="text-sky-700 font-bold">{product.specs.layup}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px]">ROCKER CURVE</span>
                <span className="text-slate-800">{product.specs.rocker}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Select Size & Dimensions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.specs.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
                      selectedSize === s.size
                        ? 'bg-sky-50 border-sky-500 text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="font-bold block text-slate-900">{s.size}</span>
                    <span className="text-[10px] text-sky-700 block">{s.riderWeight}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colorway Switcher */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Select Colorway
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colorways.map((cw, idx) => (
                  <button
                    key={cw.name}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 ${
                      selectedColorIdx === idx
                        ? 'bg-sky-50 border-sky-500 text-slate-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300"
                      style={{ background: `linear-gradient(135deg, ${cw.hex} 0%, ${cw.accentHex} 100%)` }}
                    />
                    <span>{cw.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
              <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg text-slate-600 hover:text-slate-900 flex items-center justify-center font-mono font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono font-bold text-slate-900 text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg text-slate-600 hover:text-slate-900 flex items-center justify-center font-mono font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span>Add To Quiver (${product.price * quantity})</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <Truck className="w-3.5 h-3.5" /> Free Express Shipping
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" /> Lifetime Warranty
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
