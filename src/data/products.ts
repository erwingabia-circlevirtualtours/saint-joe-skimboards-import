import { BoardProduct } from '../types';

export const PRODUCTS: BoardProduct[] = [
  {
    id: 'saint-joe-woody',
    name: 'SAINT JOE WOODY',
    subtitle: '50x20 Fiberglass Woodcore • Philippine Local Market Quiver',
    category: 'woody',
    price: 75,
    originalPrice: 95,
    localPricePhp: '₱4,200 PHP',
    freeInclusions: 'FREE Archbar + 3-Piece Kick Tail Traction Pad Included',
    rating: 4.97,
    reviewCount: 89,
    badge: 'FREE ARCHBAR & TRACTION',
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 12,
    description: 'Specially engineered and priced for the Philippine skimming community (Leyte, Dahican, Mati, Zambales, Batangas). The Saint Joe Woody pairs an ultra-durable multi-ply marine hardwood core with reinforced structural fiberglass and waterproof epoxy resin. Shaped in a fast, responsive 50" x 20" pintail template with smooth continuous nose rocker for effortless sand sliding and pocket wraps. Every board comes standard with a full matching arch bar and 3-piece tail traction pad at no extra cost.',
    features: [
      'FREE Arch Bar + 3-Piece Kick Tail Traction Pad Included ($45 Value)',
      'Specially Priced for the Philippine Local Market (₱4,200 PHP)',
      'Multi-Ply Marine Grade Hardwood Core for Natural Flex & Momentum',
      'Reinforced E-Glass Fiberglass & High-Gloss Epoxy Lamination',
      'Continuous Progressive Rocker with Hand-Finished Cyan Pinstripe Rails',
      'Handcrafted with Pride in Tacloban City, Philippines, 6500'
    ],
    specs: {
      core: 'Multi-Ply Marine Hardwood Composite Core (High Inertia & Natural Pop)',
      layup: 'Heavy-Duty Reinforced E-Glass Fiberglass + UV-Stable Marine Epoxy',
      rocker: '1.9" Progressive Ocean Nose Rocker, Flat Speed Tail',
      tailShape: '50" x 20" Pro Shape with Tapered Foil Rails',
      sizes: [
        { size: '50" x 20" Standard', dimensions: '50.0" x 20.0" x 1/2"', riderWeight: '100 - 175 lbs' },
      ]
    },
    image: '/saintjoeskim_woody_png.png',
    colorways: [
      { name: 'Arctic Ice White / Ocean Cyan Stripe', hex: '#f0f9ff', accentHex: '#0284c7' },
      { name: 'Laguna Seafoam / White Stripe', hex: '#e0f2fe', accentHex: '#0ea5e9' },
    ],
  },
  {
    id: 'saint-joe-foamy',
    name: 'SAINT JOE FOAMY FIBERGLASS',
    subtitle: 'Turquoise Blue Pro Shape • High-Density Foam Core & Double E-Glass',
    category: 'foamy',
    price: 155,
    originalPrice: 185,
    rating: 4.98,
    reviewCount: 86,
    badge: 'SIGNATURE FOAMY',
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 10,
    description: 'The authentic Saint Joe Foamy Pro Shape — handcrafted with pride in Tacloban, Leyte. Built upon our lightweight, high-density closed-cell structural foam core and hand-laminated with double 6oz aerospace E-glass fiberglass and marine epoxy resin. Finished in a stunning deep turquoise blue resin tint with streamlined pro shape foil rails. Exceptional buoyancy, high speed on the flats, and forgiving rail control for effortless shorebreak wave wraps.',
    features: [
      'Authentic Saint Joe Pro Shape Outline with Symmetrical Tapered Rails',
      'High-Density Closed-Cell Structural Foam Core for Maximum Planing Lift',
      'Reinforced Double 6oz Aerospace-Grade E-Glass Shell & Marine Epoxy Lamination',
      'Signature Deep Turquoise Blue Workshop Resin Tint with Polished Gloss Topcoat',
      'Smooth Ocean Entry Rocker with Beveled Rails for Clean Wrap Transitions',
      'Handcrafted with Pride in Tacloban City, Philippines, 6500'
    ],
    specs: {
      core: 'High-Density 75kg/m³ Closed-Cell Structural PVC Foam Core',
      layup: 'Double 6oz E-Glass Fiberglass + UV-Stable Marine Epoxy Resin',
      rocker: '2.0" Progressive Ocean Entry Rocker, Flat Speed Tail',
      tailShape: 'Pro Shape with Tapered Foil Rails',
      sizes: [
        { size: 'Small (48.5" x 19.5")', dimensions: '48.5" x 19.5" x 5/8"', riderWeight: '100 - 145 lbs' },
        { size: 'Medium (51.5" x 20.25")', dimensions: '51.5" x 20.25" x 5/8" to 3/4" tap', riderWeight: '140 - 180 lbs' },
        { size: 'Large (53.5" x 20.75")', dimensions: '53.5" x 20.75" x 3/4"', riderWeight: '170 - 215 lbs' },
      ]
    },
    image: '/saint_joe_foamy.png',
    colorways: [
      { name: 'Turquoise Blue (Signature Colorway)', hex: '#0891b2', accentHex: '#06b6d4' },
      { name: 'Magenta Purple / White Rails (Workshop Original)', hex: '#c026d3', accentHex: '#ffffff' },
      { name: 'Sunburst Orange / White Rails (Workshop Original)', hex: '#ea580c', accentHex: '#ffffff' },
    ],
  },
  {
    id: 'sanctuary-carbon-magnet',
    name: 'SAINT JOE DOUBLE CARBON',
    subtitle: 'World-Championship Winning Double Carbon Shorebreak Weapon',
    category: 'carbon',
    price: 220,
    originalPrice: 260,
    rating: 4.99,
    reviewCount: 187,
    badge: 'FLAGSHIP SPEED',
    isBestSeller: true,
    inStock: true,
    stockCount: 3,
    description: 'Our world-championship winning flagship double carbon skimboard. Handcrafted with our signature Saint Joe 50x20 pro shape and wrapped in dual-layer aerospace 3K spread-tow carbon fiber. Unyielding torsional rigidity translates 100% of your pumping energy directly into wave-slashing forward thrust. Features the signature Saint Joe ocean blue racing stripe and deck lamination.',
    features: [
      'Dual-Layer Aerospace 3K Toray Carbon Fiber Wrap Top & Bottom',
      'Vacuum-Bagged High-Heat Epoxy Cure',
      'Precision Hand-Tuned Beveled Rails',
      'Saint Joe Iconic Brand Shield & Stencil Stamp',
      'Ultra-Low Weight Ratio (sub 4.2 lbs)'
    ],
    specs: {
      core: 'Ultra-Dense Marine Grade PVC Structural Core',
      layup: 'Dual 3K Spread-Tow Carbon Fiber Top & Bottom',
      rocker: '2.25" High Performance Progressive Rocker',
      tailShape: 'Pro Shape with Beveled Release Channels',
      sizes: [
        { size: '50" x 20" (Classic)', dimensions: '50.0" x 20.0" x 5/8"', riderWeight: '110 - 160 lbs' },
        { size: 'Medium (52.3" x 20.4")', dimensions: '52.3" x 20.4" x 5/8"', riderWeight: '145 - 185 lbs' },
        { size: 'Large (54.0" x 20.9")', dimensions: '54.0" x 20.9" x 3/4"', riderWeight: '175 - 220 lbs' },
      ]
    },
    image: '/saint_joe_double_carbon.png',
    colorways: [
      { name: 'Stealth 3K Double Carbon / Ocean Cyan', hex: '#0d1017', accentHex: '#0284c7' },
      { name: 'Double Carbon / Hyper Volt', hex: '#0a0c10', accentHex: '#ccff00' },
      { name: 'Double Carbon / Gold Resin Ribbon', hex: '#171922', accentHex: '#ffd166' },
    ],
  }
];

export const CATEGORIES = [
  {
    id: 'woody',
    name: 'Woody',
    count: '$75 USD • Woodcore Line',
    description: 'Multi-ply Philippine marine hardwood core with reinforced structural fiberglass & epoxy. Includes free matching archbar & 3-piece kick tail pad.',
    tag: '$75 USD',
    gradient: 'from-cyan-600/30 to-amber-500/10',
    accentColor: '#0284c7',
    image: '/saintjoeskim_woody_png.png',
  },
  {
    id: 'foamy',
    name: 'Foamy',
    count: '$155 USD • Fiberglass Foamcore',
    description: 'High-density closed-cell structural foam core wrapped in double 6oz E-glass with vibrant workshop resin tints (Turquoise Blue, Magenta Purple, Sunburst Orange). Maximum buoyancy & glide.',
    tag: '$155 USD',
    gradient: 'from-cyan-600/30 to-teal-500/10',
    accentColor: '#0891b2',
    image: '/saint_joe_foamy.png',
  },
  {
    id: 'carbon',
    name: 'Carbon Fiber',
    count: '$220 USD • Double Carbon Pro',
    description: 'Dual-layer aerospace 3K spread-tow Toray carbon fiber over structural PVC core. World championship speed, razor-sharp rails & unmatched rigidity.',
    tag: '$220 USD',
    gradient: 'from-blue-600/30 to-cyan-500/10',
    accentColor: '#00f0ff',
    image: '/saint_joe_double_carbon.png',
  },
  {
    id: 'custom',
    name: 'Custom Studio',
    count: 'Bespoke Orders',
    description: 'Custom shape (Pro Shape, Fishtail), tailored dimensions, custom resin colors, and shaper rider stamp.',
    tag: 'HANDCRAFTED',
    gradient: 'from-emerald-600/30 to-teal-500/10',
    accentColor: '#ccff00',
    image: '/saint_joe_double_carbon.png',
  }
];
