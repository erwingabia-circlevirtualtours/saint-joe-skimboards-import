export type BoardCategory = 'all' | 'pro' | 'hybrid' | 'carbon' | 'grom' | 'accessories';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro Rider';

export type ThicknessOption = '5/8" (Responsive & Light)' | '3/4" (Maximum Float & Glide)' | 'Tapered (3/4" Center to 5/8" Rails)';

export interface BoardProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'pro' | 'hybrid' | 'carbon' | 'grom';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  specs: {
    core: string;
    layup: string;
    rocker: string;
    tailShape: string;
    sizes: {
      size: string;
      dimensions: string;
      riderWeight: string;
    }[];
  };
  image: string;
  colorways: {
    name: string;
    hex: string;
    accentHex: string;
  }[];
  signatureRider?: string;
}

export interface CustomBoardConfig {
  shapeId: string;
  shapeName: string;
  tailShape: 'Pin Tail' | 'Squash Tail' | 'Fish Tail' | 'Diamond Tail';
  size: 'Small (48")' | 'Medium (51.5")' | 'Large (53")' | 'X-Large (55")' | 'Grom (44")';
  thickness: '5/8"' | '3/4"' | 'Tapered (3/4" to 5/8")';
  coreMaterial: 'Double Carbon Epoxy' | 'Kevlar Pro Weave' | 'Aerospace E-Glass' | 'Carbon Hybrid';
  deckStyle: 'Solid Color' | 'Laguna Resin Swirl' | 'Acid Wash Gradient' | 'Stealth Carbon Matrix' | 'Neon Saint Fade';
  deckColor: string;
  deckAccentColor: string;
  bottomColor: string;
  railColor: string;
  carbonRails: boolean;
  carbonStringer: boolean;
  rocker: 'Standard Ocean Rocker' | 'Pro Low Rocker' | 'Shorebreak Steep Rocker';
  tractionPadType: 'Full Deck Combo' | 'Arch Bar + 3-Piece Tail' | 'Tail Pad Only' | 'Bare Wax Ready';
  tractionColor: string;
  riderNameStamp: string;
  includeSaintJoeLogo: boolean;
  rushBuild: boolean;
  notes: string;
}

export interface CartItem {
  id: string;
  isCustom: boolean;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  customConfig?: CustomBoardConfig;
}

export interface TeamRider {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  location: string;
  stance: 'Regular' | 'Goofy';
  titles: string[];
  bio: string;
  signatureBoardId: string;
  signatureBoardName: string;
  quote: string;
  actionShot: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  boardModel: string;
  title: string;
  comment: string;
  verified: boolean;
  riderWeight?: string;
}
