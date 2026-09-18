import React from 'react';
import { CATEGORIES } from '../../data/products';
import { ArrowUpRight, Flame, Layers, Sliders, Shield, Sparkles } from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (catId: string) => void;
  onOpenCustomizer: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  onOpenCustomizer,
}) => {
  return (
    <section id="categories" className="py-20 bg-slate-50 relative border-b border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-sky-600 mb-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>The 3 Core Quivers</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight uppercase text-slate-900">
              OUR THREE CATALOGS: <span className="text-gradient-cyan">WOODY, FOAMY & CARBON</span>
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Handcrafted in Tacloban, Leyte. Three purpose-built constructions engineered for every level—from sand-sliding to world-title shorebreak riding.
          </p>
        </div>

        {/* The 3 Core Catalogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {CATEGORIES.filter(c => c.id !== 'custom').map((cat) => {
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const catalogElement = document.getElementById('catalog');
                  catalogElement?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative group rounded-3xl p-6 sm:p-7 cursor-pointer overflow-hidden border border-slate-200 bg-white hover:border-sky-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Subtle Background Glow */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl transition-opacity opacity-10 group-hover:opacity-30"
                  style={{ backgroundColor: cat.accentColor }}
                />

                <div>
                  {/* Card Top Pill & Count */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full border tracking-wider"
                      style={{
                        backgroundColor: `${cat.accentColor}15`,
                        color: cat.accentColor,
                        borderColor: `${cat.accentColor}40`,
                      }}
                    >
                      {cat.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      {cat.count}
                    </span>
                  </div>

                  {/* Visual Board Image Preview */}
                  <div className="h-44 sm:h-48 w-full rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 mb-5 group-hover:bg-slate-100/70 transition-colors overflow-hidden relative">
                    <img
                      src={cat.image}
                      alt={`${cat.name} Skimboard Catalog`}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Title & Description */}
                  <div className="space-y-2 mb-4">
                    <h3 className="font-display font-black text-2xl uppercase text-slate-900 group-hover:text-sky-600 transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono mt-auto">
                  <span className="text-slate-500">
                    Handcrafted in Tacloban
                  </span>
                  <span className="font-bold text-slate-900 group-hover:text-sky-600 group-hover:underline flex items-center gap-1">
                    Explore {cat.name} →
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Custom Studio Banner */}
        <div
          onClick={onOpenCustomizer}
          className="relative rounded-3xl p-6 sm:p-8 cursor-pointer overflow-hidden border border-sky-300 bg-gradient-to-r from-sky-50 via-white to-sky-50/50 hover:border-sky-500 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 group"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform">
              <Sliders className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                  Interactive Studio
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  Custom Shaper Bay
                </span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl uppercase text-slate-900 group-hover:text-sky-600 transition-colors">
                Need a Custom Build in Woody, Foamy or Carbon Fiber?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Choose your exact length, tail outline (Pro Shape or Fishtail), core material, resin tint colors, and custom rider name stamp.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs uppercase tracking-wider group-hover:bg-sky-600 transition-colors shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Launch Customizer</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
