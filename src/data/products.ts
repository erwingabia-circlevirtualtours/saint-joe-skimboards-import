import { BoardProduct } from '../types';

export const PRODUCTS: BoardProduct[] = [
  {
    id: 'saint-apex-pro',
    name: 'SAINT APEX PRO CARBON',
    subtitle: 'The Pinnacle World-Title Shorebreak Weapon',
    category: 'pro',
    price: 649,
    originalPrice: 699,
    rating: 4.98,
    reviewCount: 142,
    badge: 'WORLD CHAMPION CHOICE',
    isBestSeller: true,
    inStock: true,
    stockCount: 5,
    description: 'Engineered in collaboration with world champion shorebreak riders. The Saint Apex Pro utilizes our proprietary aerospace-grade Double Carbon 3K weave vacuum-infused with ultra-tough epoxy resin over a high-density Divinycell PVC core. Crisp, razor-sharp rails with seamless wrap transition provide unmatched pop and speed out of the shorebreak pocket.',
    features: [
      'Double Carbon 3K Fiber Deck & Bottom Layup',
      'Ultra-Rigid High-Density High-Impact PVC Core',
      'Continuous Progressive Nose Rocker with Zero-Drag Flat Tail',
      'Reinforced Kevlar Rail Impact Zones',
      'Handcrafted & Hand-Laminated in California'
    ],
    specs: {
      core: 'High-Density 75kg/m³ Closed-Cell Structural PVC',
      layup: 'Double Layer Aerospace 3K Toray Carbon Fiber + Epoxy Resin',
      rocker: '2.15" Progressive Shorebreak Nose Rocker, 0.1" Flat Tail',
      tailShape: 'Pin Tail for precision pocket carves',
      sizes: [
        { size: 'Small (50.5" x 19.8")', dimensions: '50.5" x 19.8" x 5/8"', riderWeight: '100 - 145 lbs' },
        { size: 'Medium (52.2" x 20.3")', dimensions: '52.2" x 20.3" x 5/8"', riderWeight: '140 - 175 lbs' },
        { size: 'Large (53.8" x 20.8")', dimensions: '53.8" x 20.8" x 3/4"', riderWeight: '170 - 210 lbs' },
        { size: 'XL (55.0" x 21.2")', dimensions: '55.0" x 21.2" x 3/4"', riderWeight: '200+ lbs' },
      ]
    },
    image: 'apex-pro',
    colorways: [
      { name: 'Stealth Carbon / Neon Volt', hex: '#12141a', accentHex: '#ccff00' },
      { name: 'Laguna Cyan / Deep Navy', hex: '#0066ff', accentHex: '#00f0ff' },
      { name: 'Saint Red Acid / Carbon', hex: '#e63946', accentHex: '#12141a' },
    ],
    signatureRider: 'Lucas "The Flash" Fink',
  },
  {
    id: 'miracle-worker-hybrid',
    name: 'THE MIRACLE WORKER HYBRID',
    subtitle: 'Maximum Glide & High-Speed Wrap Performance',
    category: 'hybrid',
    price: 589,
    rating: 4.95,
    reviewCount: 98,
    badge: 'BEST ALL-AROUND',
    isNew: true,
    inStock: true,
    stockCount: 8,
    description: 'The Miracle Worker combines the glide of a wide nose cruiser with the aggressive responsiveness of a pro pin tail. Built with Hybrid Carbon-Glass reinforcement, this board lets you plane across flat water at blistering speed and connect with waves you thought were out of reach.',
    features: [
      'Hybrid Carbon Deck Stringer + S-Glass Shell',
      'Wide Point Forward for Instant Planing Float',
      'Tapered Foil Rail (3/4" center tapering to 5/8" rails)',
      'Tough Shorebreak Nose Bumper Guard',
      'Smooth Ocean Entry Rocker'
    ],
    specs: {
      core: 'Closed-Cell Precision Shaped Structural Core',
      layup: 'Carbon Center Stringer + Double 6oz Aerospace S-Glass',
      rocker: '2.05" Smooth Continuous Rocker',
      tailShape: 'Squash Tail / Diamond Option',
      sizes: [
        { size: 'Small (50.0" x 20.0")', dimensions: '50.0" x 20.0" x 3/4" tap', riderWeight: '110 - 150 lbs' },
        { size: 'Medium (51.8" x 20.5")', dimensions: '51.8" x 20.5" x 3/4" tap', riderWeight: '145 - 180 lbs' },
        { size: 'Large (53.5" x 21.0")', dimensions: '53.5" x 21.0" x 3/4" tap', riderWeight: '175 - 215 lbs' },
      ]
    },
    image: 'miracle-hybrid',
    colorways: [
      { name: 'Ocean Acid Swirl', hex: '#0077b6', accentHex: '#00f0ff' },
      { name: 'Sunset Orange Blaze', hex: '#ff5e3a', accentHex: '#ffd166' },
      { name: 'Clean White / Saint Black', hex: '#f8f9fa', accentHex: '#0a0c10' },
    ],
  },
  {
    id: 'holy-roller-dude',
    name: 'HOLY ROLLER "DUDE" CRUISER',
    subtitle: 'Extra Float for Smaller Days & Flatland Slashes',
    category: 'hybrid',
    price: 529,
    rating: 4.91,
    reviewCount: 64,
    badge: 'FUN & FORGIVING',
    inStock: true,
    stockCount: 12,
    description: 'Designed for effortless side-slipping, speed maintenance over shallow sand bars, and turning mushy gutless waves into your personal skatepark. With extra surface area and maximum 3/4" thickness, the Holy Roller keeps you on top of the water even on low-tide days.',
    features: [
      'Full 3/4" Float Thickness Throughout',
      'Wide Round Nose Outline for Effortless Recovery',
      'Kevlar Reinforced Tail Block',
      'Vibrant Resin Art Infusion',
      'Traction Arch-Bar Ready'
    ],
    specs: {
      core: 'High-Float Closed-Cell Core',
      layup: 'Epoxy Infused Structural E-Glass with Carbon Tail Patches',
      rocker: '1.85" Easy-Glide Rocker',
      tailShape: 'Wide Fish Tail',
      sizes: [
        { size: 'Medium (51.0" x 20.8")', dimensions: '51.0" x 20.8" x 3/4"', riderWeight: '130 - 170 lbs' },
        { size: 'Large (53.0" x 21.4")', dimensions: '53.0" x 21.4" x 3/4"', riderWeight: '165 - 205 lbs' },
        { size: 'XL (54.5" x 21.8")', dimensions: '54.5" x 21.8" x 3/4"', riderWeight: '195 - 235 lbs' },
      ]
    },
    image: 'holy-roller',
    colorways: [
      { name: 'Sunburst Yellow / Coral', hex: '#ffd166', accentHex: '#ff5e3a' },
      { name: 'Laguna Emerald / Lime', hex: '#06d6a0', accentHex: '#ccff00' },
      { name: 'Classic Saint Monochrome', hex: '#11141b', accentHex: '#ffffff' },
    ],
  },
  {
    id: 'sanctuary-carbon-magnet',
    name: 'SANCTUARY FULL CARBON 3K',
    subtitle: 'Ultra-Stiff Reactive Flex for Huge Airs',
    category: 'carbon',
    price: 689,
    originalPrice: 729,
    rating: 4.99,
    reviewCount: 187,
    badge: 'FLAGSHIP SPEED',
    isBestSeller: true,
    inStock: true,
    stockCount: 3,
    description: 'Our top-of-the-line flagship skimboard. Every square inch of the Sanctuary is wrapped in precision spread-tow 3K carbon fiber. Unyielding torsional rigidity translates 100% of your pumping energy directly into wave-slashing forward thrust. Features the signature Saint Joe Deck Lamination.',
    features: [
      '100% Bi-Axial Toray Spread-Tow Carbon Fiber',
      'Vacuum-Bagged High-Heat Epoxy Cure',
      'Precision Hand-Tuned Beveled Rails',
      'Saint Joe Iconic Brand Shield Stamped',
      'Ultra-Low Weight Ratio (sub 4.2 lbs)'
    ],
    specs: {
      core: 'Ultra-Dense Marine Grade PVC Structural Core',
      layup: 'Dual 3K Spread-Tow Carbon Fiber Top & Bottom',
      rocker: '2.25" High Performance Progressive Rocker',
      tailShape: 'Diamond Tail with Beveled Release Channels',
      sizes: [
        { size: 'Small (50.5" x 19.9")', dimensions: '50.5" x 19.9" x 5/8"', riderWeight: '110 - 150 lbs' },
        { size: 'Medium (52.3" x 20.4")', dimensions: '52.3" x 20.4" x 5/8"', riderWeight: '145 - 185 lbs' },
        { size: 'Large (54.0" x 20.9")', dimensions: '54.0" x 20.9" x 3/4"', riderWeight: '175 - 220 lbs' },
      ]
    },
    image: 'sanctuary-carbon',
    colorways: [
      { name: 'Raw Stealth Carbon / Cyan', hex: '#0d1017', accentHex: '#00f0ff' },
      { name: 'Carbon / Hyper Volt', hex: '#0a0c10', accentHex: '#ccff00' },
      { name: 'Carbon / Gold Resin Ribbon', hex: '#171922', accentHex: '#ffd166' },
    ],
  },
  {
    id: 'apostle-shorebreak-special',
    name: 'APOSTLE SHOREBREAK SPECIAL',
    subtitle: 'Aggressive Thin-Rail Technical Precision',
    category: 'pro',
    price: 619,
    rating: 4.93,
    reviewCount: 76,
    badge: 'TECHNICAL SHRED',
    inStock: true,
    stockCount: 6,
    description: 'Built for riders who demand instant rail engagement and radical redirection in heavy shorebreak barrels. The Apostle features a 5/8" thin profile throughout with razor-sharp tail rails for locked-in control at Mach 1 speeds.',
    features: [
      'Full 5/8" Thin Razor Rail Profile',
      'Double Carbon Top with S-Glass Impact Bottom',
      'Accentuated Nose Scoop to Eliminate Pearling',
      'High-Grip Micro-Textured Deck Finish',
      'Custom Pin Tail Release'
    ],
    specs: {
      core: 'High-Density Structural PVC Core',
      layup: '3K Carbon Top + S-Glass Rail Wrap & Bottom',
      rocker: '2.30" Extreme Shorebreak Scoop',
      tailShape: 'Narrow Pin Tail',
      sizes: [
        { size: 'Small (50.0" x 19.5")', dimensions: '50.0" x 19.5" x 5/8"', riderWeight: '100 - 140 lbs' },
        { size: 'Medium (52.0" x 20.1")', dimensions: '52.0" x 20.1" x 5/8"', riderWeight: '135 - 175 lbs' },
        { size: 'Large (53.5" x 20.6")', dimensions: '53.5" x 20.6" x 5/8"', riderWeight: '165 - 200 lbs' },
      ]
    },
    image: 'apostle-pro',
    colorways: [
      { name: 'Laguna Matte Black / Ice Blue', hex: '#151922', accentHex: '#48cae4' },
      { name: 'Lava Red / Charcoal', hex: '#d90429', accentHex: '#212529' },
    ],
  },
  {
    id: 'disciple-grom-junior',
    name: 'DISCIPLE GROM SERIES',
    subtitle: 'Real Epoxy Performance Scaled for Next-Gen Rippers',
    category: 'grom',
    price: 389,
    originalPrice: 429,
    rating: 4.97,
    reviewCount: 52,
    badge: 'GROM / YOUTH',
    inStock: true,
    stockCount: 15,
    description: 'No plastic toys here. The Disciple Grom is built with the exact same aerospace epoxy and high-density foam as our Pro team boards, scaled into proportions that young rippers (under 120 lbs) can throw around with effortless control.',
    features: [
      'True Epoxy & E-Glass Handcrafted Construction',
      'Lightweight Scaled Foil for Easy Sand Running',
      'Impact Resistant Polyurethane Nose Bumper',
      'Vibrant High-Visibility Graphic Tints',
      'Lifetime Structural Delamination Warranty'
    ],
    specs: {
      core: 'Closed-Cell Lightweight Core',
      layup: 'Double 4oz E-Glass with Carbon Tail Reinforcement',
      rocker: '1.9" Easy Learning Nose Curve',
      tailShape: 'Wide Rounded Squash Tail',
      sizes: [
        { size: 'Micro Grom (44" x 18.5")', dimensions: '44" x 18.5" x 5/8"', riderWeight: '45 - 85 lbs' },
        { size: 'Junior (47" x 19.2")', dimensions: '47" x 19.2" x 5/8"', riderWeight: '75 - 120 lbs' },
      ]
    },
    image: 'disciple-grom',
    colorways: [
      { name: 'Neon Volt / Cyan Splatter', hex: '#ccff00', accentHex: '#00f0ff' },
      { name: 'Hot Pink / Electric Blue', hex: '#ff007f', accentHex: '#0066ff' },
    ],
  }
];

export const CATEGORIES = [
  {
    id: 'pro',
    name: 'Pro Series Carbon',
    count: '6 Models',
    description: 'World-championship winning double carbon shorebreak weapons.',
    tag: 'TEAM CHOICE',
    gradient: 'from-blue-600/30 to-cyan-500/10',
    accentColor: '#00f0ff',
  },
  {
    id: 'hybrid',
    name: 'Hybrid Shapes',
    count: '8 Models',
    description: 'The sweet spot of ultra-glide speed and razor-sharp rail carves.',
    tag: 'MOST POPULAR',
    gradient: 'from-amber-600/30 to-orange-500/10',
    accentColor: '#ff5e3a',
  },
  {
    id: 'custom',
    name: 'Custom Builder Studio',
    count: 'Infinite Builds',
    description: 'Hand-tailor your dream shape, resin tint, carbon wrap & deck stamp.',
    tag: 'HANDCRAFTED',
    gradient: 'from-emerald-600/30 to-teal-500/10',
    accentColor: '#ccff00',
  },
  {
    id: 'grom',
    name: 'Grom & Junior',
    count: '4 Models',
    description: 'Pro-grade epoxy construction built for the next generation of rippers.',
    tag: 'YOUTH SPEC',
    gradient: 'from-purple-600/30 to-pink-500/10',
    accentColor: '#a855f7',
  },
  {
    id: 'traction',
    name: 'Traction & Gear',
    count: '24 Items',
    description: 'Ultra-grip arch bars, 3-piece kick tails, board bags, and wax.',
    tag: 'ACCESSORIES',
    gradient: 'from-slate-600/30 to-zinc-500/10',
    accentColor: '#94a3b8',
  },
  {
    id: 'apparel',
    name: 'Saint Joe Apparel',
    count: '16 Items',
    description: 'Heavyweight tees, UV sun hoodies, snapbacks & beach towels.',
    tag: 'STREET & SURF',
    gradient: 'from-sky-600/30 to-indigo-500/10',
    accentColor: '#38bdf8',
  }
];
