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
});

export type CmsProduct = z.infer<typeof SkimboardProductSchema>;

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
