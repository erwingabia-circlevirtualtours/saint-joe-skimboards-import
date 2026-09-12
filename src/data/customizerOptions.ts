export interface ShapeOption {
  id: string;
  name: string;
  badge?: string;
  description: string;
  recommendedFor: string;
  basePrice: number;
  outlineType: 'pro-pin' | 'hybrid-squash' | 'dude-fish' | 'diamond-speed';
}

export const SHAPES: ShapeOption[] = [
  {
    id: 'pro-shape',
    name: 'Saint Pro Shape (Pin Tail)',
    badge: 'WORLD CHAMPION',
    description: 'Narrower nose, continuous rail curve, and pin tail for unmatched rail bite and speed in heavy shorebreak.',
    recommendedFor: 'Advanced shorebreak riding, wrapping waves & technical tricks',
    basePrice: 599,
    outlineType: 'pro-pin',
  },
  {
    id: 'hybrid-shape',
    name: 'Saint Hybrid (Squash Tail)',
    badge: 'MOST VERSATILE',
    description: 'Wider nose for early planing speed combined with a responsive squash tail that holds lines through choppy sandbars.',
    recommendedFor: 'All-around shorebreak, side-slipping & long distance reach',
    basePrice: 579,
    outlineType: 'hybrid-squash',
  },
  {
    id: 'dude-cruise',
    name: 'Dude! Cruise (Fish / Swallow Tail)',
    badge: 'MAX FLOAT',
    description: 'Extra width across the chest with twin fish swallow tails for skatey, fast cruising and summer mush fun.',
    recommendedFor: 'Flatter beaches, smaller waves & effortless distance',
    basePrice: 549,
    outlineType: 'dude-fish',
  },
  {
    id: 'hornet-diamond',
    name: 'Hornet Diamond (Diamond Tail)',
    badge: 'AERIAL POP',
    description: 'Parallel center rails for pure down-the-line sprint speed with diamond release points for explosive pop off the lip.',
    recommendedFor: 'Speed runs, big air boosts & rapid rail-to-rail transitions',
    basePrice: 619,
    outlineType: 'diamond-speed',
  }
];

export const CORE_LAYUPS = [
  {
    id: 'double-carbon',
    name: 'Double Carbon 3K + Epoxy',
    subtitle: 'Full Carbon Fiber Top & Bottom Layup',
    price: 90,
    tag: 'PRO STIFFNESS',
    colorPreview: '#12141a',
    features: ['Max rigidity & instantaneous spring recoil', 'Toray 3K aerospace carbon weave', 'Sub-4.2 lbs total board weight']
  },
  {
    id: 'kevlar-weave',
    name: 'Kevlar Pro Carbon Hybrid',
    subtitle: 'Interwoven Kevlar & Carbon with Epoxy',
    price: 75,
    tag: 'EXTREME IMPACT',
    colorPreview: '#252932',
    features: ['Bulletproof puncture resistance on rocky sand', 'Damped chatter through chop', 'Ultra high durability']
  },
  {
    id: 'aerospace-s-glass',
    name: 'Aerospace S-Glass Epoxy',
    subtitle: 'High-Tensile S-Glass Shell with PVC Core',
    price: 0,
    tag: 'CLASSIC SNAP',
    colorPreview: '#384252',
    features: ['Smooth lively flex pattern for carving', 'Tested high-impact durability', 'Proven performance since 2002']
  }
];

export const RESIN_TINTS = [
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
