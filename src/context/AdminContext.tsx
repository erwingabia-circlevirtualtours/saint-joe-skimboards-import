import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CmsProduct, CmsOrder, OrderState, SkimboardProductSchema } from '../types/cms';
import { INITIAL_CMS_PRODUCTS, INITIAL_CMS_ORDERS } from '../data/cmsInitialData';
import { z } from 'zod';

const SESSION_KEY = 'saint_joe_staff_session';
const CATALOG_KEY = 'saint_joe_cms_catalog';
const ORDERS_KEY = 'saint_joe_cms_orders';
const MASTER_PIN = 'saintjoe2026';
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

interface StaffSession {
  authenticated: boolean;
  expiresAt: number;
  staffName: string;
}

interface AdminContextType {
  // Auth & Access
  isAuthenticated: boolean;
  sessionExpiresAt: number | null;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (pin: string, staffName?: string) => { success: boolean; message: string };
  logout: () => void;
  isAdminPortalOpen: boolean;
  setIsAdminPortalOpen: (open: boolean) => void;
  staffName: string;

  // Products & Catalog
  products: CmsProduct[];
  addProduct: (productData: Omit<CmsProduct, 'id' | 'updatedAt'>) => { success: boolean; errors?: string[] };
  updateProduct: (id: string, updates: Partial<CmsProduct>) => { success: boolean; errors?: string[] };
  deleteProduct: (id: string) => boolean;
  resetCatalogToFactory: () => void;
  exportCatalogJson: () => void;
  importCatalogJson: (jsonString: string) => { success: boolean; message: string; count?: number };

  // Orders & GCash FSM
  orders: CmsOrder[];
  updateOrderStatus: (orderId: string, nextStatus: OrderState, notes?: string) => void;
  verifyGcashPayment: (orderId: string, gcashRef?: string) => void;
  updateOrderLogistics: (orderId: string, courierName: string, trackingNumber: string) => void;
  createStorefrontOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: { street: string; city: string; province: string; postalCode: string; country: string };
    destinationSpot?: string;
    items: any[];
    subtotalPHP: number;
    shippingPHP: number;
    totalPHP: number;
    paymentMethod: 'gcash' | 'maya' | 'bank_transfer' | 'card_online';
    gcashReference?: string;
    gcashAccountName?: string;
  }) => string;
  deleteOrder: (orderId: string) => void;

  // Workshop Packing Slip
  activeSlipOrder: CmsOrder | null;
  openWorkshopSlip: (order: CmsOrder) => void;
  closeWorkshopSlip: () => void;

  // Non-intrusive Toast
  adminToast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showAdminToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (!saved) return false;
      const session: StaffSession = JSON.parse(saved);
      if (Date.now() < session.expiresAt) {
        return session.authenticated;
      }
      localStorage.removeItem(SESSION_KEY);
      return false;
    } catch {
      return false;
    }
  });

  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (!saved) return null;
      const session: StaffSession = JSON.parse(saved);
      return Date.now() < session.expiresAt ? session.expiresAt : null;
    } catch {
      return null;
    }
  });

  const [staffName, setStaffName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (!saved) return 'Tacloban Bay Staff';
      const session: StaffSession = JSON.parse(saved);
      return session.staffName || 'Tacloban Bay Staff';
    } catch {
      return 'Tacloban Bay Staff';
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [activeSlipOrder, setActiveSlipOrder] = useState<CmsOrder | null>(null);
  const [adminToast, setAdminToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showAdminToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setAdminToast({ message, type });
    setTimeout(() => {
      setAdminToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  // Products State
  const [products, setProducts] = useState<CmsProduct[]>(() => {
    try {
      const saved = localStorage.getItem(CATALOG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not load saved catalog, using defaults', e);
    }
    return INITIAL_CMS_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CATALOG_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to sync catalog to localStorage', e);
    }
  }, [products]);

  // Orders State
  const [orders, setOrders] = useState<CmsOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not load saved orders, using defaults', e);
    }
    return INITIAL_CMS_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders to localStorage', e);
    }
  }, [orders]);

  // Global Keyboard Shortcuts (Ctrl+Shift+A or Cmd+Shift+A or pressing "/")
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea or contentEditable
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // Ctrl+Shift+A or Cmd+Shift+A anywhere
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAuthenticated) {
          setIsAdminPortalOpen((prev) => !prev);
        } else {
          setIsLoginModalOpen(true);
        }
        return;
      }

      // Quick slash key when not in an input
      if (!isInput && e.key === '/' && !e.ctrlKey && !e.metaKey) {
        // Only open if staff has previously logged in
        if (isAuthenticated) {
          e.preventDefault();
          setIsAdminPortalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  // Auth Methods
  const login = (pin: string, name = 'Erwin G. (Shaper)') => {
    if (pin.trim() === MASTER_PIN) {
      const expiresAt = Date.now() + TWELVE_HOURS_MS;
      const sessionData: StaffSession = {
        authenticated: true,
        expiresAt,
        staffName: name,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      setIsAuthenticated(true);
      setSessionExpiresAt(expiresAt);
      setStaffName(name);
      setIsLoginModalOpen(false);
      setIsAdminPortalOpen(true);
      showAdminToast(`Welcome, ${name}! Staff session unlocked (12 Hours Active).`);
      return { success: true, message: 'Authentication successful' };
    } else {
      return { success: false, message: 'Invalid Staff PIN. Check credentials.' };
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setSessionExpiresAt(null);
    setIsAdminPortalOpen(false);
    showAdminToast('Staff session terminated. Portal locked.', 'info');
  };

  // Product CRUD with Zod Validation
  const addProduct = (productData: Omit<CmsProduct, 'id' | 'updatedAt'>) => {
    const newId = `sj-${productData.category}-${Date.now().toString(36)}`;
    const fullProduct: CmsProduct = {
      ...productData,
      id: newId,
      updatedAt: new Date().toISOString(),
    };

    const validation = SkimboardProductSchema.safeParse(fullProduct);
    if (!validation.success) {
      const errors = validation.error.issues.map((err) => `${err.path.join('.')}: ${err.message}`);
      showAdminToast(`Validation error: ${errors[0]}`, 'error');
      return { success: false, errors };
    }

    setProducts((prev) => [validation.data, ...prev]);
    showAdminToast(`"${validation.data.name}" added to catalog.`);
    return { success: true };
  };

  const updateProduct = (id: string, updates: Partial<CmsProduct>) => {
    const existing = products.find((p) => p.id === id);
    if (!existing) {
      showAdminToast('Board not found', 'error');
      return { success: false, errors: ['Board not found'] };
    }

    const merged = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const validation = SkimboardProductSchema.safeParse(merged);
    if (!validation.success) {
      const errors = validation.error.issues.map((err) => `${err.path.join('.')}: ${err.message}`);
      showAdminToast(`Validation error: ${errors[0]}`, 'error');
      return { success: false, errors };
    }

    setProducts((prev) => prev.map((p) => (p.id === id ? validation.data : p)));
    showAdminToast(`"${validation.data.name}" updated successfully.`);
    return { success: true };
  };

  const deleteProduct = (id: string) => {
    const existing = products.find((p) => p.id === id);
    if (!existing) return false;

    setProducts((prev) => prev.filter((p) => p.id !== id));
    showAdminToast(`"${existing.name}" removed from catalog.`, 'info');
    return true;
  };

  const resetCatalogToFactory = () => {
    setProducts(INITIAL_CMS_PRODUCTS);
    localStorage.setItem(CATALOG_KEY, JSON.stringify(INITIAL_CMS_PRODUCTS));
    showAdminToast('Catalog reset to factory defaults.', 'info');
  };

  const exportCatalogJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `saint-joe-skimboards-catalog-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showAdminToast('Catalog JSON exported. Ready for S3 sync.');
  };

  const importCatalogJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        return { success: false, message: 'Invalid JSON: root must be an array of products' };
      }

      const validatedProducts: CmsProduct[] = [];
      for (const item of parsed) {
        const res = SkimboardProductSchema.safeParse(item);
        if (res.success) {
          validatedProducts.push(res.data);
        }
      }

      if (validatedProducts.length === 0) {
        return { success: false, message: 'No valid skimboard products found in JSON file' };
      }

      setProducts(validatedProducts);
      showAdminToast(`Successfully imported ${validatedProducts.length} boards.`);
      return { success: true, message: `Imported ${validatedProducts.length} boards`, count: validatedProducts.length };
    } catch (e: any) {
      return { success: false, message: `JSON Parse error: ${e.message}` };
    }
  };

  // Orders & GCash FSM Logic
  const updateOrderStatus = (orderId: string, nextStatus: OrderState, notes?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;

        const auditEntry = {
          timestamp: new Date().toISOString(),
          author: staffName,
          action: `STATUS_CHANGED_TO_${nextStatus.toUpperCase()}`,
          details: notes || `Order status updated to ${nextStatus.toUpperCase()}`,
        };

        return {
          ...ord,
          status: nextStatus,
          shapingBayNotes: notes || ord.shapingBayNotes,
          auditLog: [auditEntry, ...ord.auditLog],
        };
      })
    );

    showAdminToast(`Order ${orderId} moved to ${nextStatus.toUpperCase()}.`);
  };

  const verifyGcashPayment = (orderId: string, gcashRef?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;

        const ref = gcashRef || ord.gcashReference || 'CONFIRMED_BY_STAFF';
        const auditEntry = {
          timestamp: new Date().toISOString(),
          author: staffName,
          action: 'GCASH_VERIFIED',
          details: `GCash Reference #${ref} verified for ₱${ord.totalPHP.toLocaleString()} PHP.`,
        };

        return {
          ...ord,
          isPaymentVerified: true,
          gcashReference: ref,
          verifiedAt: new Date().toISOString(),
          verifiedBy: staffName,
          // Move from pending to verified
          status: ord.status === 'pending' ? 'verified' : ord.status,
          auditLog: [auditEntry, ...ord.auditLog],
        };
      })
    );

    showAdminToast('GCash payment verified and stamped.');
  };

  const updateOrderLogistics = (orderId: string, courierName: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;

        const auditEntry = {
          timestamp: new Date().toISOString(),
          author: staffName,
          action: 'LOGISTICS_UPDATED',
          details: `Dispatched with ${courierName}. Tracking: ${trackingNumber}`,
        };

        return {
          ...ord,
          courierName,
          trackingNumber,
          status: 'dispatched',
          auditLog: [auditEntry, ...ord.auditLog],
        };
      })
    );

    showAdminToast(`Logistics updated: ${courierName} #${trackingNumber}`);
  };

  const createStorefrontOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: { street: string; city: string; province: string; postalCode: string; country: string };
    destinationSpot?: string;
    items: any[];
    subtotalPHP: number;
    shippingPHP: number;
    totalPHP: number;
    paymentMethod: 'gcash' | 'maya' | 'bank_transfer' | 'card_online';
    gcashReference?: string;
    gcashAccountName?: string;
  }) => {
    const generatedNum = `SJ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: CmsOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: generatedNum,
      createdAt: new Date().toISOString(),
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      deliveryAddress: orderData.deliveryAddress,
      destinationSpot: orderData.destinationSpot || 'Philippine Shorebreak Wave Spot',
      items: orderData.items,
      subtotalPHP: orderData.subtotalPHP,
      shippingPHP: orderData.shippingPHP,
      totalPHP: orderData.totalPHP,
      paymentMethod: orderData.paymentMethod,
      gcashReference: orderData.gcashReference,
      gcashAccountName: orderData.gcashAccountName,
      isPaymentVerified: false,
      status: 'pending',
      shapingBayNotes: 'New web order placed. Awaiting initial shaping bay queue allocation.',
      auditLog: [
        {
          timestamp: new Date().toISOString(),
          author: 'Storefront Checkout',
          action: 'ORDER_CREATED',
          details: `Order placed via ${orderData.paymentMethod.toUpperCase()}${
            orderData.gcashReference ? ` with Reference #${orderData.gcashReference}` : ''
          }`,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    return generatedNum;
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showAdminToast('Order deleted from local database.', 'info');
  };

  const openWorkshopSlip = (order: CmsOrder) => {
    setActiveSlipOrder(order);
  };

  const closeWorkshopSlip = () => {
    setActiveSlipOrder(null);
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        sessionExpiresAt,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        login,
        logout,
        isAdminPortalOpen,
        setIsAdminPortalOpen,
        staffName,

        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalogToFactory,
        exportCatalogJson,
        importCatalogJson,

        orders,
        updateOrderStatus,
        verifyGcashPayment,
        updateOrderLogistics,
        createStorefrontOrder,
        deleteOrder,

        activeSlipOrder,
        openWorkshopSlip,
        closeWorkshopSlip,

        adminToast,
        showAdminToast,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
