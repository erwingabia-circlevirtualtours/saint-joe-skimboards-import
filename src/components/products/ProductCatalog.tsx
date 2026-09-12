import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/products';
import { BoardProduct } from '../../types';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { Filter, SlidersHorizontal, Sparkles, Compass, Check } from 'lucide-react';

interface ProductCatalogProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedCategory || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<BoardProduct | null>(null);

  // Sync prop changes
  React.useEffect(() => {
    if (selectedCategory) {
      setActiveTab(selectedCategory);
    }
  }, [selectedCategory]);

  const tabs = [
    { id: 'all', label: 'All Quiver' },
    { id: 'pro', label: 'Pro Carbon Series' },
    { id: 'hybrid', label: 'Hybrid Shapes' },
    { id: 'carbon', label: 'Full 3K Carbon' },
    { id: 'grom', label: 'Grom & Junior' },
  ];

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      if (activeTab !== 'all' && p.category !== activeTab) {
        return false;
      }
      if (inStockOnly && !p.inStock) {
        return false;
      }
      return true;
    });

    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        return list;
    }
  }, [activeTab, sortBy, inStockOnly]);

  return (
    <section id="catalog" className="py-20 bg-brand-dark relative border-b border-brand-border/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-cyan/40 text-xs font-mono font-bold uppercase tracking-widest text-brand-cyan mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>In-Stock & Precision Shaped</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
              PERFORMANCE <span className="text-gradient-cyan">CATALOG</span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Handcrafted with aerospace epoxy and vacuum-bagged carbon weave. Ready to ship directly from our San Clemente factory.
          </p>
        </div>

        {/* Filter and Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-3 bg-brand-surface rounded-2xl border border-brand-border mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  onSelectCategory(tab.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-cyan text-brand-dark shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Sort & Stock Filter */}
          <div className="flex items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
            
            {/* In-Stock Toggle */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                inStockOnly
                  ? 'bg-brand-volt/15 border-brand-volt text-brand-volt'
                  : 'bg-brand-dark/50 border-brand-border text-slate-400 hover:text-white'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${inStockOnly ? 'bg-brand-volt text-brand-dark border-brand-volt' : 'border-slate-600'}`}>
                {inStockOnly && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>In-Stock Only</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-brand-dark px-3 py-1.5 rounded-xl border border-brand-border text-xs font-mono text-slate-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-cyan" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-brand-charcoal text-white">Featured</option>
                <option value="price-asc" className="bg-brand-charcoal text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-brand-charcoal text-white">Price: High to Low</option>
                <option value="rating" className="bg-brand-charcoal text-white">Top Rated</option>
              </select>
            </div>

          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-brand-surface/40 rounded-3xl border border-brand-border p-8">
            <p className="text-lg font-bold text-white">No skimboards match your selected filter.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setInStockOnly(false);
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-brand-cyan text-brand-dark font-bold text-xs uppercase font-mono"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </section>
  );
};
