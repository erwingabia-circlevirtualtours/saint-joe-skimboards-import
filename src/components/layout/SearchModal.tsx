import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../../data/products';
import { BoardProduct } from '../../types';
import { Search, X, ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: BoardProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim() === ''
    ? []
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.specs.core.toLowerCase().includes(query.toLowerCase()) ||
        (p.signatureRider && p.signatureRider.toLowerCase().includes(query.toLowerCase()))
      );

  const popularSearches = ['Double Carbon', 'Hybrid Squash', 'Grom Series', 'Pin Tail', '5/8 Thin Rail'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/50 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-sky-600 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Saint Joe skimboards, layups, riders, or specs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-base font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono font-bold uppercase tracking-wider bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 py-1 rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Search Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:text-sky-800 hover:bg-sky-50 hover:border-sky-300 border border-slate-200 text-xs font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-bold">Featured Board Quivers</p>
                <div className="space-y-2">
                  {PRODUCTS.slice(0, 3).map((board) => (
                    <div
                      key={board.id}
                      onClick={() => {
                        onSelectProduct(board);
                        onClose();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center font-bold text-xs text-sky-800">
                          SJ
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">{board.name}</p>
                          <p className="text-xs text-slate-500">{board.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono font-bold text-slate-900">${board.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                {results.length} Models Found for "{query}"
              </p>
              {results.map((board) => (
                <div
                  key={board.id}
                  onClick={() => {
                    onSelectProduct(board);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 cursor-pointer group transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {board.name}
                      </h4>
                      {board.badge && (
                        <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-mono font-bold">
                          {board.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{board.description}</p>
                    <p className="text-[11px] font-mono text-slate-500 mt-1">Core: {board.specs.core}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-base font-mono font-black text-slate-900">${board.price}</p>
                    <span className="text-xs text-slate-500 flex items-center gap-1 group-hover:text-sky-700">
                      View Specs <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-base font-semibold text-slate-700">No matching skimboards found</p>
              <p className="text-xs text-slate-500 mt-1">Try searching "Carbon", "Hybrid", or "5/8"</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono">
          <span>Need custom dimensions?</span>
          <a
            href="#custom-builder"
            onClick={onClose}
            className="text-sky-700 hover:underline font-bold flex items-center gap-1"
          >
            Launch Custom Studio <ChevronRight className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
};
