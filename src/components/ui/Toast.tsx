import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, hideToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
      <div className="bg-brand-charcoal border border-brand-cyan/40 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md glow-cyan">
        <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan flex-shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">Quiver Updated</p>
          <p className="text-sm font-medium text-slate-200">{toastMessage}</p>
        </div>
        <button
          onClick={hideToast}
          className="ml-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
