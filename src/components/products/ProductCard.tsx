import React, { useState } from 'react';
import { BoardProduct } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Star, ShoppingBag, Heart, Eye, ArrowRight, ShieldCheck, Zap, Gift } from 'lucide-react';

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
      image: product.image || '/saintjoeskim_logo_black.png',
      selectedSize: selectedSize,
      selectedColor: activeColorway.name,
      quantity: 1,
    });
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-sky-400 rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl cursor-pointer hover:-translate-y-1.5"
    >
      {/* Top Card Bar: Badge & Wishlist */}
      <div className="flex items-center justify-between z-10">
        {product.badge ? (
          <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 tracking-wider">
            {product.badge}
          </span>
        ) : (
          <span className="text-[10px] font-mono text-slate-400 uppercase">
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
              ? 'bg-rose-50 border-rose-200 text-rose-500'
              : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Center Visual Skimboard Rendering */}
      <div className="relative py-8 my-2 flex items-center justify-center min-h-[260px] overflow-hidden bg-slate-50/80 rounded-2xl border border-slate-100">
        
        {/* Glow backdrop based on active color */}
        <div
          className="absolute w-36 h-56 rounded-full blur-2xl opacity-15 transition-all duration-500"
          style={{ backgroundColor: activeColorway.accentHex }}
        />

        {/* Board Shape Representation */}
        <div className="relative z-10 w-28 sm:w-32 h-60 sm:h-64 flex items-center justify-center p-2 transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-1">
          <img
            src={product.image && product.image.startsWith('/') ? product.image : '/saint_joe_foamy.png'}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain filter drop-shadow-xl"
          />
        </div>

        {/* Quick View Floating Action */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 rounded-xl bg-white text-sky-700 border border-sky-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg hover:bg-sky-50 transition-all"
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
            <p className="text-[10px] font-mono text-sky-700 font-bold uppercase tracking-wider mb-0.5">
              ★ {product.signatureRider} Pro Model
            </p>
          )}
          <h3 className="font-display font-black text-lg text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{product.subtitle}</p>
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
                    ? 'ring-2 ring-sky-500 scale-110 border-white'
                    : 'border-slate-300 hover:scale-105'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${cw.hex} 0%, ${cw.accentHex} 100%)`
                }}
              />
            ))}
          </div>
        </div>

        {/* Free Inclusions Banner if provided */}
        {product.freeInclusions && (
          <div className="bg-sky-50 border border-sky-200 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 text-[11px] font-mono text-sky-800 font-bold">
            <Gift className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="line-clamp-1">{product.freeInclusions}</span>
          </div>
        )}

        {/* Rating & In-Stock Count */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-bold text-slate-900">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
          </div>

          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {product.stockCount} IN STOCK
          </span>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Price</span>
              {product.localPricePhp && (
                <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded uppercase">
                  PH Local
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-xl text-slate-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs font-mono text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.localPricePhp && (
              <span className="text-[11px] font-mono text-emerald-700 font-bold block -mt-0.5">
                ≈ {product.localPricePhp}
              </span>
            )}
          </div>

          <button
            onClick={handleDirectAdd}
            className="flex-1 max-w-[140px] px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>

    </div>
  );
};
