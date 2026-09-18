export interface ShapeOption {
  id: string;
  name: string;
  badge?: string;
  description: string;
  recommendedFor: string;
  basePrice: number;
  outlineType: 'pro-shape' | 'fishtail';
  image?: string;
}

export const SHAPES: ShapeOption[] = [
  {
    id: 'pro-shape',
    name: 'Saint Joe Pro Shape',
    badge: 'PRO SHAPE',
    description: 'Elongated tapered nose, forward wide point (+2.5" forward), and responsive pro shape rails for unmatched rail bite, wrapping power, and high-speed hold in heavy shorebreak.',
    recommendedFor: 'Advanced shorebreak riding, wrapping waves & technical tricks',
    basePrice: 599,
    outlineType: 'pro-shape',
    image: '/saint_joe_foamy.png',
  },
  {
    id: 'fishtail',
    name: 'Saint Joe Fishtail',
    badge: 'NEW WORKSHOP SHAPE',
    description: 'Authentic Saint Joe Fishtail shape with twin fish tail points and hydrodynamic center V-notch. Wide forward chest outline for maximum planing lift and skatey, rapid-fire rail transitions.',
    recommendedFor: 'Maximum planing speed, flatter sandbars & rapid wave wrapping',
    basePrice: 569,
    outlineType: 'fishtail',
    image: '/saint_joe_fishtail.png',
  }
];

export const CORE_LAYUPS = [
  {
    id: 'double-carbon',
    name: 'Carbon Fiber (Double Carbon 3K)',
    subtitle: 'Dual-Layer Aerospace Carbon Top & Bottom',
    price: 90,
    tag: 'PRO STIFFNESS',
    colorPreview: '#12141a',
    features: ['Max rigidity & instantaneous spring recoil', 'Toray 3K aerospace carbon weave', 'Sub-4.2 lbs total board weight']
  },
  {
    id: 'foamy-core',
    name: 'Foamy Core (High-Density PVC + E-Glass)',
    subtitle: 'Closed-Cell Foam Core with Double 6oz E-Glass',
    price: 0,
    tag: 'MAX BUOYANCY',
    colorPreview: '#c026d3',
    features: ['Exceptional float & early planing lift', 'Forgiving rail carves on mushy waves', 'Vibrant resin color saturation']
  },
  {
    id: 'woody-marine',
    name: 'Woody Core (Marine Hardwood + Glass)',
    subtitle: 'Multi-Ply Philippine Hardwood Composite',
    price: -40,
    tag: 'LOCAL FAVORITE',
    colorPreview: '#0284c7',
    features: ['Natural wood inertia & momentum', 'Extra scratch & sand impact resistance', 'Includes free arch bar & traction pad']
  },
  {
    id: 'kevlar-weave',
    name: 'Kevlar Carbon Pro Hybrid',
    subtitle: 'Interwoven Kevlar & Carbon with Epoxy',
    price: 75,
    tag: 'EXTREME IMPACT',
    colorPreview: '#252932',
    features: ['Bulletproof puncture resistance on rocky sand', 'Damped chatter through chop', 'Ultra high durability']
  }
];

export const RESIN_TINTS = [
  {
    id: 'foamy-turquoise-blue',
    name: 'Foamy Turquoise Blue Pro (Signature)',
    deckColor: '#0891b2',
    deckAccentColor: '#06b6d4',
    bottomColor: '#0e7490',
    type: 'Solid Color' as const,
  },
  {
    id: 'foamy-magenta-white',
    name: 'Foamy Magenta Purple & White Rails (Workshop Original)',
    deckColor: '#c026d3',
    deckAccentColor: '#ffffff',
    bottomColor: '#c026d3',
    type: 'Solid Color' as const,
  },
  {
    id: 'foamy-orange-white',
    name: 'Foamy Sunburst Orange & White Rails (Workshop Original)',
    deckColor: '#ea580c',
    deckAccentColor: '#ffffff',
    bottomColor: '#ea580c',
    type: 'Solid Color' as const,
  },
  {
    id: 'saint-pro-dahican-anime',
    name: 'Dahican Sky & Deep Ocean (Anime Edition)',
    deckColor: '#38bdf8',
    deckAccentColor: '#0284c7',
    bottomColor: '#075985',
    type: 'Laguna Resin Swirl' as const,
  },
  {
    id: 'stealth-black',
    name: 'Stealth Carbon Black',
    deckColor: '#0c0e14',
    deckAccentColor: '#1e2433',
    bottomColor: '#0a0c10',
    type: 'Solid Color' as const,
  },
  {
    id: 'laguna-sunset',
    name: 'Laguna Sunset Acid Swirl',
    deckColor: '#ff5e3a',
    deckAccentColor: '#ffd166',
    bottomColor: '#0066ff',
    type: 'Laguna Resin Swirl' as const,
  },
  {
    id: 'electric-cyan-fade',
    name: 'Electric Cyan & Volt Fade',
    deckColor: '#0066ff',
    deckAccentColor: '#00f0ff',
    bottomColor: '#ccff00',
    type: 'Acid Wash Gradient' as const,
  },
  {
    id: 'saint-neon-volt',
    name: 'Saint Volt Matrix',
    deckColor: '#ccff00',
    deckAccentColor: '#0a0c10',
    bottomColor: '#00f0ff',
    type: 'Neon Saint Fade' as const,
  },
  {
    id: 'emerald-ocean-acid',
    name: 'Emerald Laguna Wash',
    deckColor: '#06d6a0',
    deckAccentColor: '#0077b6',
    bottomColor: '#12141a',
    type: 'Laguna Resin Swirl' as const,
  },
  {
    id: 'lava-crush',
    name: 'Lava Crimson Swirl',
    deckColor: '#e63946',
    deckAccentColor: '#f77f00',
    bottomColor: '#11141b',
    type: 'Laguna Resin Swirl' as const,
  },
  {
    id: 'pure-white-clean',
    name: 'Crisp White & Carbon Stringer',
    deckColor: '#f8f9fa',
    deckAccentColor: '#adb5bd',
    bottomColor: '#0d1017',
    type: 'Solid Color' as const,
  }
];

export const SIZES = [
  {
    id: 'small',
    name: 'Small (48")',
    dimensions: '48.0" x 19.5"',
    riderWeight: '100 - 145 lbs (45 - 65 kg)',
    price: 0
  },
  {
    id: 'medium',
    name: 'Medium (51.5")',
    dimensions: '51.5" x 20.25"',
    riderWeight: '140 - 175 lbs (63 - 80 kg)',
    price: 15
  },
  {
    id: 'large',
    name: 'Large (53")',
    dimensions: '53.0" x 20.75"',
    riderWeight: '170 - 210 lbs (77 - 95 kg)',
    price: 25
  },
  {
    id: 'xlarge',
    name: 'X-Large (55")',
    dimensions: '55.0" x 21.25"',
    riderWeight: '200+ lbs (90+ kg)',
    price: 35
  }
];

export const THICKNESS_OPTIONS = [
  {
    id: '5-8',
    name: '5/8" (Responsive & Thin)',
    description: 'Quickest rail engagement, razor sharp carves, ideal for heavy hollow shorebreak.',
    price: 0
  },
  {
    id: '3-4',
    name: '3/4" (Maximum Float & Glide)',
    description: 'Extra volume for long distance runs and effortless glide across fat water.',
    price: 20
  },
  {
    id: 'tapered',
    name: 'Tapered Foil (3/4" center -> 5/8" rails)',
    description: 'Best of both worlds: float under your chest with ultra-thin biting rails.',
    price: 35
  }
];

export const ROCKER_OPTIONS = [
  {
    id: 'ocean',
    name: 'Standard Ocean Rocker (2.15")',
    description: 'The golden balance for sandbar transitions, steep shorebreak drops, and speed.',
    price: 0
  },
  {
    id: 'pro-flat',
    name: 'Pro Low Flat Rocker (1.85")',
    description: 'Pure flatland glide and maximum sandbar sprint speed with minimal drag.',
    price: 15
  },
  {
    id: 'steep-shorebreak',
    name: 'Shorebreak Extreme Scoop (2.40")',
    description: 'High nose kick engineered to prevent nose-diving into steep dumping sand shelves.',
    price: 20
  }
];

export const TRACTION_COMBOS = [
  {
    id: 'combo',
    name: 'Full Deck Arch Bar + 3-Piece Kick Tail Combo',
    price: 65,
    tag: 'MOST POPULAR'
  },
  {
    id: 'tail-only',
    name: '3-Piece Kick Tail Pad Only',
    price: 45,
    tag: 'MINIMALIST'
  },
  {
    id: 'arch-only',
    name: 'Center Traction Arch Bar Only',
    price: 35,
    tag: 'ARCH GRIP'
  },
  {
    id: 'none',
    name: 'Bare Deck (Wax Ready)',
    price: 0,
    tag: 'TRADITIONAL'
  }
];

export const TRACTION_COLORS = [
  { name: 'Stealth Black', hex: '#11141b' },
  { name: 'Saint Hyper Volt', hex: '#ccff00' },
  { name: 'Laguna Cyan', hex: '#00f0ff' },
  { name: 'Fire Orange', hex: '#ff5e3a' },
  { name: 'Pure White', hex: '#ffffff' },
];
