import React, { useState } from 'react';
import { BoardProduct } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Star, ShoppingBag, Heart, Eye, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ProductCardProps {
  product: BoardProduct;
  onQuickView: (product: BoardProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.specs.sizes[1]?.size || product.specs.sizes[0]?.size);

  const activeColorway = product.colorways[selectedColorIdx] || product.colorways[0];
  const isWishlisted = isInWishlist(product.id);

  const handleDirectAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      isCustom: false,
      name: product.name,
      price: product.price,
      image: '/saint-joe-logo.jpg',
      selectedSize: selectedSize,
      selectedColor: activeColorway.name,
      quantity: 1,
    });
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-brand-surface hover:bg-brand-surfaceAlt border border-brand-border/80 hover:border-brand-cyan/50 rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1.5"
    >
      {/* Top Card Bar: Badge & Wishlist */}
      <div className="flex items-center justify-between z-10">
        {product.badge ? (
          <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 tracking-wider">
            {product.badge}
          </span>
        ) : (
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            {product.specs.tailShape.split(' ')[0]} TAIL
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Add to Wishlist"
          className={`p-2 rounded-xl border transition-all ${
            isWishlisted
              ? 'bg-brand-sunset/20 border-brand-sunset text-brand-sunset'
              : 'bg-brand-dark/60 border-brand-border text-slate-400 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-brand-sunset' : ''}`} />
        </button>
      </div>

      {/* Center Visual Skimboard Rendering */}
      <div className="relative py-8 my-2 flex items-center justify-center min-h-[260px] overflow-hidden">
        
        {/* Glow backdrop based on active color */}
        <div
          className="absolute w-36 h-56 rounded-full blur-2xl opacity-20 transition-all duration-500"
          style={{ backgroundColor: activeColorway.accentHex }}
        />

        {/* Board Shape Representation */}
        <div
          className="relative w-28 sm:w-32 h-60 sm:h-64 rounded-[42px] border-2 border-brand-border shadow-2xl flex flex-col items-center justify-between p-3.5 transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-1"
          style={{
            background: `linear-gradient(180deg, ${activeColorway.hex} 0%, ${activeColorway.accentHex} 100%)`,
          }}
        >
          {/* Carbon Weave Texture overlay */}
          <div className="absolute inset-0 rounded-[40px] opacity-35 carbon-bg" />

          {/* Grip Pad Simulation */}
          <div className="relative z-10 w-16 h-12 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center">
            <span className="text-[8px] font-mono text-white/70 font-bold">GRIP</span>
          </div>

          {/* Saint Joe Deck Stamp */}
          <div className="relative z-10 w-10 h-10 rounded-full bg-white p-0.5 shadow-md border border-black/20 flex items-center justify-center overflow-hidden">
            <img src="/saint-joe-logo.jpg" alt="Saint Joe" className="w-full h-full object-cover" />
          </div>

          {/* Kick Tail Pad Simulation */}
          <div className="relative z-10 w-20 h-14 rounded-b-[32px] bg-black/70 border-t border-brand-cyan/60 flex items-center justify-center">
            <span className="text-[8px] font-mono text-brand-cyan font-bold">TAIL KICK</span>
          </div>
        </div>

        {/* Quick View Floating Action */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 rounded-xl bg-brand-dark/95 text-brand-cyan border border-brand-cyan/40 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xl hover:bg-brand-cyan hover:text-brand-dark transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Quick Specs
          </button>
        </div>
      </div>

      {/* Card Info & Details */}
      <div className="space-y-3">
        
        {/* Title & Signature Rider */}
        <div>
          {product.signatureRider && (
            <p className="text-[10px] font-mono text-brand-volt font-bold uppercase tracking-wider mb-0.5">
              ★ {product.signatureRider} Pro Model
            </p>
          )}
          <h3 className="font-display font-black text-lg text-white group-hover:text-brand-cyan transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{product.subtitle}</p>
        </div>

        {/* Colorway Swatches */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] font-mono text-slate-500">Colorway:</span>
          <div className="flex items-center gap-1.5">
            {product.colorways.map((cw, idx) => (
              <button
                key={cw.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIdx(idx);
                }}
                title={cw.name}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColorIdx === idx
                    ? 'ring-2 ring-brand-cyan scale-110 border-white'
                    : 'border-white/30 hover:scale-105'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${cw.hex} 0%, ${cw.accentHex} 100%)`
                }}
              />
            ))}
          </div>
        </div>

        {/* Rating & In-Stock Count */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1 border-t border-white/5">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-bold text-white">{product.rating}</span>
            <span className="text-[11px] text-slate-500">({product.reviewCount})</span>
          </div>

          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {product.stockCount} IN STOCK
          </span>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-slate-500 block uppercase">Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-xl text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs font-mono text-slate-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleDirectAdd}
            className="flex-1 max-w-[140px] px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue hover:brightness-110 text-brand-dark font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>

    </div>
  );
};
