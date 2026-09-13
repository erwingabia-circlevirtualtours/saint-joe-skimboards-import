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
              <span>Engineered Lineup</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight uppercase text-slate-900">
              EXPLORE THE <span className="text-gradient-cyan">SAINT JOE</span> QUIVER
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            From World Championship Double Carbon to our award-winning Custom Studio, select your discipline and dominate the shorebreak.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const isCustom = cat.id === 'custom';

            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (isCustom) {
                    onOpenCustomizer();
                  } else {
                    onSelectCategory(cat.id);
                    const catalogElement = document.getElementById('catalog');
                    catalogElement?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`relative group rounded-3xl p-7 cursor-pointer overflow-hidden border transition-all duration-300 ${
                  isCustom
                    ? 'bg-gradient-to-br from-white via-sky-50/40 to-white border-sky-300 hover:border-sky-500 hover:shadow-lg'
                    : 'bg-white hover:bg-slate-50/60 border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-md'
                } hover:-translate-y-1`}
              >
                {/* Subtle Background Glow */}
                <div
                  className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl transition-opacity opacity-0 group-hover:opacity-20`}
                  style={{ backgroundColor: cat.accentColor }}
                />

                {/* Card Top Pill & Count */}
                <div className="flex items-center justify-between mb-6">
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

                {/* Card Content */}
                <div className="space-y-2 mb-6">
                  <h3 className="font-display font-black text-2xl uppercase text-slate-900 group-hover:text-sky-600 transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Highlight */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">
                    {isCustom ? 'Interactive 3D/2D Visualizer' : 'In-Stock Ready to Ship'}
                  </span>
                  <span className="font-bold text-slate-900 group-hover:text-sky-600 group-hover:underline flex items-center gap-1">
                    {isCustom ? 'Start Build' : 'View Models'} →
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
