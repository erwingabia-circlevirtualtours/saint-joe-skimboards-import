import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Compass,
  Waves,
  Sun,
  Navigation,
  DollarSign,
  AlertTriangle,
  Footprints,
  Sparkles,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import {
  PUKA_BEACH_LOCATIONS,
  PUKA_BEACH_CONTEXT,
  PukaMapLocation
} from '../../data/pukaBeachMapData';

interface PukaBeachMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (category: 'carbon' | 'foamy' | 'woody') => void;
}

export const PukaBeachMapModal: React.FC<PukaBeachMapModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  const [activeLocationId, setActiveLocationId] = useState<string>('puka-beach-main');
  const [activeTab, setActiveTab] = useState<'map' | 'sand' | 'vibe' | 'routes' | 'tips'>('map');

  const selectedLocation =
    PUKA_BEACH_LOCATIONS.find((loc) => loc.id === activeLocationId) || PUKA_BEACH_LOCATIONS[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="puka-map-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] my-auto">
        
        {/* Header Bar */}
        <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/70 p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4">
          <div>
            {/* Colorized Category Badge requested by user */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                Key Locations at Puka Beach (Aqua)
              </span>

              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
                <Compass className="w-3 h-3 text-cyan-400" />
                11.9961° N, 121.9167° E
              </span>

              <span className="text-[11px] font-mono text-slate-400 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10 hidden sm:inline-flex">
                Northern Tip • Boracay Island
              </span>
            </div>

            <h3 id="puka-map-title" className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
              Puka Beach Interactive Map &amp; Spot Guide
            </h3>
            <p className="text-xs sm:text-sm text-cyan-200/80 mt-1 max-w-2xl font-light">
              Yapak Beach • Raw uncommercialized paradise, steep azure shore-breaks, and naturally crushed Puka shells.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors border border-white/10 shrink-0"
            aria-label="Close interactive map modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 px-5 py-3 bg-slate-950/60 border-b border-white/10 overflow-x-auto scrollbar-none text-xs font-mono">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'map'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Interactive Map Widget</span>
          </button>

          <button
            onClick={() => setActiveTab('sand')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'sand'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>The Sand &amp; Water</span>
          </button>

          <button
            onClick={() => setActiveTab('vibe')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'vibe'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>The Vibe &amp; Sunset</span>
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'routes'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>How to Get There (15-20 min)</span>
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'tips'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Essential Tips</span>
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

          {/* Tab 1: Interactive Map Widget */}
          {activeTab === 'map' && (
            <div className="space-y-6">
              
              {/* Interactive Vector / Cartographic Map Canvas */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-b from-sky-950 via-slate-950 to-emerald-950/40 shadow-inner group">
                
                {/* Cartographic Water Grid & Shoreline Contours */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="puka-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="1" />
                    </pattern>
                    <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#082f49" stopOpacity="0.8" />
                      <stop offset="40%" stopColor="#0369a1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0f766e" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  {/* Ocean Base */}
                  <rect width="100%" height="100%" fill="url(#puka-grid)" />
                  
                  {/* Contour Wave Lines for Puka Beach Ledge */}
                  <path
                    d="M 0,160 Q 200,90 400,120 T 800,100 T 1200,140"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    className="opacity-60"
                  />
                  <path
                    d="M 0,200 Q 250,140 500,170 T 1000,150 T 1400,190"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    className="opacity-70"
                  />
                  
                  {/* Coarse Beach Sand Ledge */}
                  <path
                    d="M 0,240 C 260,190 480,230 720,210 C 960,190 1200,240 1400,230 L 1400,400 L 0,400 Z"
                    fill="rgba(245, 158, 11, 0.08)"
                    stroke="rgba(245, 158, 11, 0.3)"
                    strokeWidth="1.5"
                  />

                  {/* Deep Azure Drop-Off Shelf Annotation */}
                  <text x="30" y="50" fill="#38bdf8" fontSize="11" fontFamily="monospace" letterSpacing="2">
                    DEEP AZURE VISAYAN SEA SHELF (RAPID DROP-OFF)
                  </text>
                  <text x="30" y="70" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    Swell Direction: NNW / Amihan Shorebreak
                  </text>
                </svg>

                {/* Subtle Map Compass Rose */}
                <div className="absolute top-4 right-4 bg-slate-950/80 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md flex flex-col items-center pointer-events-none text-[10px] font-mono text-slate-300 shadow-md">
                  <span className="font-bold text-cyan-400">N</span>
                  <div className="w-5 h-5 my-0.5 relative flex items-center justify-center">
                    <div className="w-0.5 h-full bg-cyan-400/60" />
                    <div className="w-full h-0.5 bg-slate-600 absolute" />
                  </div>
                  <span className="text-slate-500">S</span>
                </div>

                {/* Depth drop indicator */}
                <div className="absolute bottom-4 left-4 bg-slate-950/80 border border-cyan-500/30 rounded-xl px-3 py-1.5 text-[11px] font-mono text-cyan-300 backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Steep Shorebreak Shelf: 0m → 4m drop in 5-8 paces</span>
                </div>

                {/* Interactive Clickable Pins (Positioned using mapPosition coordinates) */}
                {PUKA_BEACH_LOCATIONS.map((loc, idx) => {
                  const isSelected = loc.id === activeLocationId;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setActiveLocationId(loc.id)}
                      style={{
                        left: `${loc.mapPosition.x}%`,
                        top: `${loc.mapPosition.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`absolute z-20 group/pin transition-all duration-300 focus:outline-none`}
                      aria-label={`Select ${loc.name}`}
                    >
                      {/* Pulse Wave */}
                      <span
                        className={`absolute -inset-3 rounded-full opacity-60 transition-transform ${
                          isSelected
                            ? 'bg-cyan-400/40 animate-ping'
                            : 'group-hover/pin:bg-cyan-400/20 scale-75'
                        }`}
                      />

                      {/* Pin Circle */}
                      <div
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-xl backdrop-blur-md transition-all ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 border-cyan-300 scale-110 font-bold'
                            : 'bg-slate-950/90 text-cyan-300 border-cyan-500/40 hover:bg-slate-900 hover:border-cyan-400 hover:scale-105'
                        }`}
                      >
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                        <span className="text-xs font-mono font-semibold whitespace-nowrap">
                          0{idx + 1}. {loc.name.replace(' (Puka Shell Beach)', '')}
                        </span>
                      </div>
                    </button>
                  );
                })}

              </div>

              {/* Colorized Category Selector Cards: Key Locations at Puka Beach (Aqua) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                    Key Locations at Puka Beach (Aqua Category)
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Click pin or card to inspect
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {PUKA_BEACH_LOCATIONS.map((loc, idx) => {
                    const isSelected = loc.id === activeLocationId;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => setActiveLocationId(loc.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
                            : 'bg-slate-950/50 border-white/10 hover:border-cyan-500/40 hover:bg-slate-950'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono text-cyan-400 font-bold">
                              0{idx + 1} • AQUA
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                            )}
                          </div>
                          <h4 className="font-display font-bold text-sm text-white mb-0.5">
                            {loc.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
                            {loc.subName}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-cyan-300">
                          <span>{loc.coordinates.lat.toFixed(4)}° N</span>
                          <span>{loc.coordinates.lng.toFixed(4)}° E</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Location Detail Panel */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono font-bold uppercase">
                        Active Location
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {selectedLocation.subName}
                      </span>
                    </div>
                    <h4 className="font-display font-black text-xl text-white">
                      {selectedLocation.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {selectedLocation.coordinates.lat}° N, {selectedLocation.coordinates.lng}° E
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {selectedLocation.description}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 mr-1">Spot Traits:</span>
                  {selectedLocation.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-xs font-mono flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: The Sand & Water */}
          {activeTab === 'sand' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/30">
                <div className="flex items-center gap-2.5 mb-3">
                  <Waves className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-display font-black text-xl text-white uppercase">
                    The Sand &amp; Water Dynamics
                  </h4>
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6 font-light">
                  {PUKA_BEACH_CONTEXT.sandAndWater}
                </p>

                {/* Contrast Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                    <span className="text-amber-400 font-bold block uppercase tracking-wider text-[11px]">
                      Puka Beach (Yapak) Ledge
                    </span>
                    <ul className="space-y-1.5 text-slate-300">
                      <li>• Coarser sand mixed with naturally crushed Puka shells</li>
                      <li>• Steep rapid drop-off into deep intense azure blue</li>
                      <li>• Stronger pulling shore-break dumps favored by skimboarders</li>
                      <li>• Firmer run-up surface for high-momentum board drops</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                    <span className="text-slate-400 font-bold block uppercase tracking-wider text-[11px]">
                      White Beach (Contrasting Zone)
                    </span>
                    <ul className="space-y-1.5 text-slate-400">
                      <li>• Ultra fine powder-soft talcum sand</li>
                      <li>• Very gradual, shallow shelf extending hundreds of meters</li>
                      <li>• Gentle flat shore-wash without shorebreak punch</li>
                      <li>• Heavy tourist swimmer density</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recommended Board Pairing */}
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                    Ideal Weapon for Puka Beach
                  </span>
                  <h5 className="font-display font-black text-lg text-white">
                    Saint Joe Foamy Fiberglass ($155 USD)
                  </h5>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">
                    High buoyant lift to effortlessly glide across shell-textured sand and punch into steep azure shore-breaks.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onSelectCategory?.('foamy');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
                >
                  View Foamy Setup →
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: The Vibe & Sunset */}
          {activeTab === 'vibe' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* The Vibe Card */}
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      The Raw Tropical Vibe
                    </span>
                  </div>
                  <h4 className="font-display font-black text-xl text-white">
                    Uncommercialized Island Paradise
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {PUKA_BEACH_CONTEXT.vibe}
                  </p>
                  <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                    <span className="bg-white/5 px-2.5 py-1 rounded-lg">🥥 Fresh Young Coconuts</span>
                    <span className="bg-white/5 px-2.5 py-1 rounded-lg">🥭 Fresh Fruit Shakes</span>
                    <span className="bg-white/5 px-2.5 py-1 rounded-lg">🪵 Hand-Carved Souvenirs</span>
                  </div>
                </div>

                {/* The Sunset Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-950 to-cyan-950/30 border border-amber-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Sun className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      North-Northwest Horizon
                    </span>
                  </div>
                  <h4 className="font-display font-black text-xl text-white">
                    Intimate Golden Hour Arena
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {PUKA_BEACH_CONTEXT.sunset}
                  </p>
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-amber-300/80">
                    <span>Best Session Time: 3:30 PM - 6:00 PM (Sunset Golden Wave Hour)</span>
                  </div>
                </div>
              </div>

              {/* Full Overview Quote */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/10">
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{PUKA_BEACH_CONTEXT.overview}"
                </p>
              </div>

              {/* Authentic Photo Showcase */}
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 group shadow-xl">
                <img
                  src="/puka_beach_boracay.jpg"
                  alt="Puka Beach Yapak Boracay turquoise shoreline and palm shacks"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-cyan-200">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Puka Shell Strand • Uncommercialized Paradise (Yapak, Boracay)
                  </span>
                  <span className="text-[11px] text-slate-300 bg-black/60 px-2 py-0.5 rounded border border-white/10 hidden sm:inline">
                    11.9961° N, 121.9167° E
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: How to Get There */}
          {activeTab === 'routes' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <h4 className="font-display font-black text-xl text-white uppercase">
                    Getting to Puka Beach
                  </h4>
                  <p className="text-xs font-mono text-cyan-300 mt-0.5">
                    Estimated Transit: {PUKA_BEACH_CONTEXT.travelTime}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono font-bold">
                  Northern Tip Gateway
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PUKA_BEACH_CONTEXT.transportRoutes.map((route, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{route.icon}</span>
                        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
                          {route.fare}
                        </span>
                      </div>
                      <h5 className="font-display font-bold text-base text-white">
                        {route.mode}
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed mt-2 font-light">
                        {route.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Essential Tips */}
          {activeTab === 'tips' && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-white/10">
                <h4 className="font-display font-black text-xl text-white uppercase">
                  Essential Field Guide Tips
                </h4>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Prepare before your session at Puka Beach (Yapak)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PUKA_BEACH_CONTEXT.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <h5 className="font-display font-bold text-base text-white">
                        {idx + 1}. {tip.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {tip.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Puka Beach • Spot 05 of 05 in Saint Joe Philippine Pro Radar</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono transition-colors"
            >
              Close Guide
            </button>
            <button
              onClick={() => {
                onClose();
                document.getElementById('puka-beach-boracay')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold transition-colors"
            >
              Jump to Puka Beach Hero Slide
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
