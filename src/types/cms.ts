import { z } from 'zod';

export type CmsCategory =
  | 'foamcore'
  | 'woodcore'
  | 'carbon-pro'
  | 'wave-skim'
  | 'traction-pads'
  | 'wax-gear'
  | 'apparel';

export const CATEGORY_LABELS: Record<CmsCategory, string> = {
  'foamcore': 'Foamcore Pro Wave',
  'woodcore': 'Woodcore Flatland',
  'carbon-pro': 'Carbon Pro High-Tensile',
  'wave-skim': 'Wave Skim Pintail/Fish',
  'traction-pads': 'Traction Pads & Arch Bars',
  'wax-gear': 'Wax & Travel Accessories',
  'apparel': 'Apparel & Surf Wear',
};

// Zod Runtime Validation Schema for Skimboards
export const SkimboardProductSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(3, 'Board name must be at least 3 characters'),
  subtitle: z.string().min(5, 'Subtitle/summary must be at least 5 characters'),
  category: z.enum(['foamcore', 'woodcore', 'carbon-pro', 'wave-skim', 'traction-pads', 'wax-gear', 'apparel']),
  sku: z.string().min(3, 'SKU must be at least 3 characters').regex(/^[A-Z0-9-]+$/i, 'SKU must only contain letters, numbers, and dashes'),
  pricePHP: z.number().int().positive('Price in PHP must be a positive number'),
  compareAtPricePHP: z.number().int().positive('Compare price must be positive').optional().nullable(),
  inStock: z.boolean(),
  stockQty: z.number().int().min(0, 'Stock cannot be negative'),
  featured: z.boolean(),
  bestSeller: z.boolean(),
  image: z.string().min(1, 'Product image is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  
  // Custom Skimboard Shape & Construction Specs
  specs: z.object({
    lengthInches: z.string().min(1, 'Length is required (e.g. 50" Standard or 48"-54")'),
    widthInches: z.string().min(1, 'Width is required (e.g. 20.0" or 20.5")'),
    thicknessInches: z.string().min(1, 'Thickness is required (e.g. 5/8" or 3/4")'),
    weightCapacityKg: z.string().min(1, 'Rider weight is required (e.g. Up to 75 kg)'),
    rockerProfile: z.string().min(3, 'Rocker profile description is required'),
    coreMaterial: z.string().min(3, 'Core material is required'),
    lamination: z.string().min(3, 'Layup / lamination details required'),
    railContour: z.string().min(3, 'Rail shape required (e.g. 60/40 Boxy or Tapered Foil)'),
  }),
  freeInclusions: z.string().optional(),
  signatureRider: z.string().optional(),
  updatedAt: z.string(),
}).refine((data) => {
  // Enforce stock consistency: if stockQty is 0, inStock must be false.
  // If inStock is true, stockQty must be > 0.
  if (data.stockQty === 0 && data.inStock) return false;
  if (data.stockQty > 0 && !data.inStock) return false;
  return true;
}, {
  message: 'inStock toggle must strictly match stockQty: inStock requires stockQty > 0, and 0 stock must be marked Out of Stock',
  path: ['inStock']
});

export type CmsProduct = z.infer<typeof SkimboardProductSchema>;

// GCash Reference Sanitization & Validation Helpers (12 to 13 Digits)
export const cleanGCashRef = (raw: string): string => raw.replace(/\D/g, '');

export const isValidGCashRef = (cleaned: string): boolean => {
  return /^\d{12,13}$/.test(cleaned);
};

// Factory Asset Image Presets for Instant 1-Click Selection
export interface FactoryImagePreset {
  id: string;
  name: string;
  category: string;
  url: string;
  tagline: string;
}

export const FACTORY_IMAGE_PRESETS: FactoryImagePreset[] = [
  {
    id: 'preset-apex-carbon',
    name: 'Saint Apex Pro Toray Carbon',
    category: 'carbon-pro',
    url: '/saint_apex_pro_carbon.png',
    tagline: 'Flagship 3K Carbon Competition Foil'
  },
  {
    id: 'preset-double-carbon',
    name: 'Saint Joe Double Carbon Pintail',
    category: 'carbon-pro',
    url: '/saint_joe_double_carbon.png',
    tagline: 'Dual Toray 3K Carbon High-Tensile Weave'
  },
  {
    id: 'preset-foamy-turquoise',
    name: 'Saint Joe Foamy Pro Turquoise',
    category: 'foamcore',
    url: '/saint_joe_foamy.png',
    tagline: 'Closed-Cell Foamcore & Double E-Glass'
  },
  {
    id: 'preset-woody-50x20',
    name: 'Saint Joe Woody 50x20 Standard',
    category: 'woodcore',
    url: '/saintjoeskim_woody_png.png',
    tagline: 'Marine Hardwood Core & Cyan Rail Foil'
  },
  {
    id: 'preset-fishtail-wave',
    name: 'Saint Joe Speed Fishtail Wave Skim',
    category: 'wave-skim',
    url: '/saint_joe_fishtail.png',
    tagline: 'Swallow Tail Outline & High Surface Planning'
  },
  {
    id: 'preset-pin-tail-carbon',
    name: 'Saint Pro Shape Pintail Carbon',
    category: 'carbon-pro',
    url: '/saintjoeskim_pin_tail_product_carbon.png',
    tagline: 'Streamlined Pintail for Hollow Wave Hold'
  },
  {
    id: 'preset-traction-combo',
    name: 'Saint Joe Pro Deck Traction & Arch Bar',
    category: 'traction-pads',
    url: '/saintjoeskim_woody_50x20.png',
    tagline: '10mm Center Arch + 30mm Kick Tail Pad'
  },
  {
    id: 'preset-onedrop-poster',
    name: 'One Drop Slide Official Event Poster',
    category: 'apparel',
    url: '/onedropslide_blog.jpg',
    tagline: 'Official Zambales Skimboard Competition'
  }
];

// Deterministic Order Management FSM
export type OrderState =
  | 'pending'     // Awaiting GCash payment or proof
  | 'verified'    // GCash reference confirmed by staff
  | 'shaping'     // In shaping bay / lamination / sanding
  | 'ready'       // Cured & packed with traction, ready for courier pickup
  | 'dispatched'  // In transit via courier (J&T, LBC, Bus Cargo)
  | 'completed'   // Delivered and confirmed
  | 'cancelled';  // Voided / Refunded

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  pricePHP: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  isCustom?: boolean;
  customSummary?: string;
}

export interface AuditLogEntry {
  timestamp: string;
  author: string;
  action: string;
  details: string;
}

export interface CmsOrder {
  id: string;
  orderNumber: string; // e.g. SJ-839201
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  destinationSpot?: string; // e.g. "Dahican, Mati", "San Antonio, Zambales", "Siargao"
  items: OrderItem[];
  subtotalPHP: number;
  shippingPHP: number;
  totalPHP: number;
  
  // Payment Details
  paymentMethod: 'gcash' | 'maya' | 'bank_transfer' | 'card_online';
  gcashReference?: string;
  gcashAccountName?: string;
  isPaymentVerified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
  
  // Production & Logistics State
  status: OrderState;
  shapingBayNotes?: string;
  courierName?: string; // e.g. "J&T Express", "LBC", "Philtranco Cargo"
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  
  // Audit Trail
  auditLog: AuditLogEntry[];
}
