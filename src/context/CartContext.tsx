import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CustomBoardConfig } from '../types';
import confetti from 'canvas-confetti';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  subtotal: number;
  discount: number;
  promoCode: string;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  shipping: number;
  freeShippingThreshold: number;
  total: number;
  totalItems: number;
  completeCheckout: (details: any) => Promise<boolean>;
  toastMessage: string | null;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('saint_joe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('saint_joe_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  };

  const hideToast = () => setToastMessage(null);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qty = item.quantity || 1;
    setCart(prevCart => {
      // If custom board, always treat as unique line item
      if (item.isCustom) {
        return [{ ...item, quantity: qty }, ...prevCart];
      }
      
      const existingIdx = prevCart.findIndex(
        i => i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [{ ...item, quantity: qty }, ...prevCart];
      }
    });

    showToast(`Added "${item.name}" to your quiver.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 250;

  // Promo code calculation
  let discount = 0;
  if (appliedPromo === 'SAINT10' || appliedPromo === 'EXILE10') {
    discount = subtotal * 0.10;
  } else if (appliedPromo === 'SHRED50') {
    discount = Math.min(subtotal, 50);
  } else if (appliedPromo === 'WORLDCHAMP') {
    discount = subtotal * 0.15;
  }

  const shipping = subtotal >= freeShippingThreshold || appliedPromo === 'FREESHIP' ? 0 : 28;
  const total = Math.max(0, subtotal - discount + shipping);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SAINT10' || clean === 'EXILE10') {
      setAppliedPromo(clean);
      return { success: true, message: '10% Saint Joe Welcome discount applied!' };
    } else if (clean === 'SHRED50') {
      if (subtotal < 300) {
        return { success: false, message: 'SHRED50 requires a minimum order of $300.' };
      }
      setAppliedPromo(clean);
      return { success: true, message: '$50 Shorebreak discount applied!' };
    } else if (clean === 'WORLDCHAMP') {
      setAppliedPromo(clean);
      return { success: true, message: '15% World Champion Pro discount applied!' };
    } else if (clean === 'FREESHIP') {
      setAppliedPromo(clean);
      return { success: true, message: 'Free Freight Shipping applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try SAINT10 or WORLDCHAMP' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const completeCheckout = async (details: any) => {
    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ccff00', '#0066ff', '#ffffff']
      });
    } catch {
      // fallback
    }
    clearCart();
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        subtotal,
        discount,
        promoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        shipping,
        freeShippingThreshold,
        total,
        totalItems,
        completeCheckout,
        toastMessage,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
