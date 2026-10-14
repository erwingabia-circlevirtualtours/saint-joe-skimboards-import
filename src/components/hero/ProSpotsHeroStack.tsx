import React, { useEffect, useState, useRef } from 'react';
import { PRO_SPOTS } from '../../data/proSpots';
import {
  Compass,
  MapPin,
  Map,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Waves,
  Wind,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PukaBeachMapModal } from '../spots/PukaBeachMapModal';

interface ProSpotsHeroStackProps {
  onSelectCategory?: (category: string) => void;
  onOpenCustomizer?: () => void;
}

export const ProSpotsHeroStack: React.FC<ProSpotsHeroStackProps> = ({
  onSelectCategory,
  onOpenCustomizer
}) => {
  const [activeSpotIndex, setActiveSpotIndex] = useState(0);
  const [isPukaMapOpen, setIsPukaMapOpen] = useState(false);
  const [isStackInView, setIsStackInView] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // IntersectionObserver to detect which spot hero is currently in view
  useEffect(() => {
    const spotElements = PRO_SPOTS.map((spot) => document.getElementById(spot.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = PRO_SPOTS.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) {
              setActiveSpotIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    spotElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Track if entire stack is in view to show/hide the local RADAR HUD
    const stackEl = document.getElementById('pro-spots-stack');
    const stackObserver = new IntersectionObserver(
      ([entry]) => {
        setIsStackInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (stackEl) stackObserver.observe(stackEl);

    return () => {
      observer.disconnect();
      stackObserver.disconnect();
    };
  }, []);

  const scrollToSpot = (spotId: string) => {
    const el = document.getElementById(spotId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNextSpot = (currentIndex: number) => {
    if (currentIndex < PRO_SPOTS.length - 1) {
      scrollToSpot(PRO_SPOTS[currentIndex + 1].id);
    } else {
      const el = document.getElementById('catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPrevSpot = (currentIndex: number) => {
    if (currentIndex > 0) {
      scrollToSpot(PRO_SPOTS[currentIndex - 1].id);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard navigation between spots
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate if not typing in an input/textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') return;

      const stackEl = document.getElementById('pro-spots-stack');
      if (!stackEl) return;
      const rect = stackEl.getBoundingClientRect();
      const isInStackZone = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isInStackZone) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (activeSpotIndex < PRO_SPOTS.length - 1) {
          e.preventDefault();
          scrollToSpot(PRO_SPOTS[activeSpotIndex + 1].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (activeSpotIndex > 0) {
          e.preventDefault();
          scrollToSpot(PRO_SPOTS[activeSpotIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSpotIndex]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent, currentIndex: number) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const SWIPE_THRESHOLD = 60;
    if (diff > SWIPE_THRESHOLD) {
      // Swipe left -> Next spot
      scrollToNextSpot(currentIndex);
    } else if (diff < -SWIPE_THRESHOLD) {
      // Swipe right -> Prev spot
      scrollToPrevSpot(currentIndex);
    }
    touchStartX.current = null;
  };

  return (
    <div id="pro-spots-stack" className="relative w-full bg-slate-950 text-white scroll-mt-20">
      {/* Anchor for Navbar & Footer links */}
      <div id="pro-spots-radar" className="absolute -top-16 pointer-events-none" />

      {/* Floating Side Spot HUD Navigator (Desktop & Tablet) - Only visible when exploring Pro Spots */}
      <aside
        aria-label="Pro Spot Radar Navigator"
        className={`fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-2.5 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 ${
          isStackInView
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 pb-2 border-b border-white/10 px-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">
            RADAR HUD
          </span>
        </div>

        <nav aria-label="Spot navigation" className="flex flex-col gap-1.5">
          {PRO_SPOTS.map((spot, idx) => {
            const isActive = activeSpotIndex === idx;
            return (
              <button
                key={spot.id}
                onClick={() => scrollToSpot(spot.id)}
                className={`group flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl text-left text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-sky-500/20 text-white border border-sky-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                aria-label={`Jump to ${spot.name}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] ${isActive ? 'text-sky-400 font-bold' : 'text-slate-500'}`}>
                    0{idx + 1}
                  </span>
                  <span className="font-sans font-medium text-xs truncate max-w-[110px]">
                    {spot.name.replace(' Beach', '').replace(' Shorebreak', '')}
                  </span>
                </div>
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isActive ? 'bg-sky-400 scale-125' : 'bg-slate-600 group-hover:bg-slate-400'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="pt-2 border-t border-white/10 px-1 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setIsPukaMapOpen(true)}
            className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left py-0.5 group"
            title="Open Puka Beach Interactive Map Widget"
          >
            <Map className="w-3 h-3 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">Puka Map Widget</span>
          </button>
          <a
            href="#catalog"
            className="text-[10px] font-mono text-slate-400 hover:text-white transition-colors block py-0.5"
          >
            ↓ Quiver Catalog
          </a>
        </div>
      </aside>

      {/* Stacked Full-Bleed Heroes */}
      {PRO_SPOTS.map((spot, index) => {
        const spotNumber = `0${index + 1}`;
        const totalSpots = `0${PRO_SPOTS.length}`;
        const bgImage = spot.heroImage || spot.image;

        return (
          <section
            key={spot.id}
            id={spot.id}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, index)}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden border-b border-slate-900/80 bg-slate-950 py-20 lg:py-16"
          >
            {/* Background Action Photo */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={bgImage}
                alt={`${spot.name} Shorebreak - Saint Joe Skimboards`}
                className="w-full h-full object-cover object-center filter brightness-100 contrast-100"
                loading={index === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
              />

              {/* Lightened Contrast Overlay: Keeps background wave photo bright and clearly visible */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />
            </div>

            {/* Quick Floating Prev / Next Arrow Controls */}
            {index > 0 && (
              <button
                type="button"
                onClick={() => scrollToPrevSpot(index)}
                aria-label={`Previous spot: ${PRO_SPOTS[index - 1].name}`}
                className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white items-center justify-center backdrop-blur-md transition-all hover:scale-105"
              >
                <ChevronLeft className="w-6 h-6 text-slate-300 hover:text-white" />
              </button>
            )}
            {index < PRO_SPOTS.length - 1 && (
              <button
                type="button"
                onClick={() => scrollToNextSpot(index)}
                aria-label={`Next spot: ${PRO_SPOTS[index + 1].name}`}
                className="hidden lg:flex absolute right-20 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white items-center justify-center backdrop-blur-md transition-all hover:scale-105"
              >
                <ChevronRight className="w-6 h-6 text-slate-300 hover:text-white" />
              </button>
            )}

            {/* Central Grounded Brand & Spot Content Container */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center my-auto">
              
              {/* Prominent Grounded Brand Banner - Stable across all slides */}
              <div className="mb-4 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md mb-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-display font-black text-xs uppercase tracking-widest text-white">
                    SAINT JOE SKIMBOARDS
                  </span>
                </div>
                <span className="text-[11px] font-mono tracking-wider text-slate-300 uppercase">
                  Handcrafted in Tacloban City, Leyte since 2009
                </span>
              </div>

              {/* Telemetry Radar & Location Kicker */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-mono text-slate-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-white font-bold tracking-wider">
                    PRO SPOT {spotNumber} / {totalSpots}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 backdrop-blur-md text-[11px] font-mono text-sky-200">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{spot.location}</span>
                </div>

                {spot.coordinates && (
                  <div className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-400">
                    <Compass className="w-3 h-3 text-slate-400" />
                    <span>{spot.coordinates}</span>
                  </div>
                )}
              </div>

              {/* Spot Name Headline */}
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] mb-2">
                {spot.name}
              </h2>

              {/* Spot Crown Subtitle & Tagline */}
              <p className="text-sm sm:text-lg md:text-xl text-sky-200 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-4">
                <span className="font-bold text-white bg-sky-500/30 px-2.5 py-0.5 rounded-full border border-sky-400/40 backdrop-blur-sm">
                  {spot.tag}
                </span>{' '}
                • <span className="text-white drop-shadow-md">{spot.waveType}</span>
              </p>

              {/* Spot Narrative Blurb */}
              <p className="text-xs sm:text-sm md:text-base text-white max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] mb-6 font-medium">
                "{spot.blurb}"
              </p>

              {/* Spot Wave Highlights Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-3xl">
                {spot.highlights.map((highlight, hIdx) => (
                  <span
                    key={hIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 hover:bg-black/75 border border-white/20 backdrop-blur-md text-xs font-mono text-white shadow-md"
                  >
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    <span>{highlight}</span>
                  </span>
                ))}
              </div>

              {/* Interactive Map Widget Trigger for Spots with Map Context (Puka Beach Boracay) */}
              {spot.hasMapWidget && (
                <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPukaMapOpen(true)}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400/60 text-cyan-200 hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg shadow-cyan-500/20 backdrop-blur-md group hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Open Puka Beach Interactive Map Widget & Guide"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                    </span>
                    <span>🗺️ Open Interactive Map Widget: Key Locations (Aqua)</span>
                    <span className="text-[10px] bg-cyan-400/25 px-2 py-0.5 rounded-full text-cyan-200 border border-cyan-400/30 font-mono">
                      4 Pins &amp; Field Guide
                    </span>
                  </button>
                </div>
              )}

              {/* Glassmorphic Grounded Board Weapon HUD Card */}
              <div className="w-full max-w-2xl bg-slate-900/85 border border-white/15 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl text-left mb-6 flex items-center justify-between gap-5">
                
                {/* Recommended Board Details */}
                <div className="flex items-center gap-4 sm:gap-5 w-full">
                  {spot.boardImage && (
                    <div className="w-16 h-24 sm:w-20 sm:h-28 bg-white/5 border border-white/10 rounded-2xl p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={spot.boardImage}
                        alt={spot.recommendedBoardName}
                        className="w-full h-full object-contain filter drop-shadow-lg"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2.5 py-0.5 rounded-full font-bold">
                        WEAPON OF CHOICE
                      </span>
                      {spot.recommendedPrice && (
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full">
                          ${spot.recommendedPrice} USD
                        </span>
                      )}
                    </div>

                    <h4 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                      {spot.recommendedBoardName}
                    </h4>

                    {spot.waveSpecs && (
                      <p className="text-xs font-mono text-slate-300 flex items-center gap-2.5 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <Wind className="w-3.5 h-3.5 text-sky-400" /> {spot.waveSpecs.swellDirection}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="flex items-center gap-1.5">
                          <Waves className="w-3.5 h-3.5 text-sky-400" /> {spot.waveSpecs.breakType}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Direct Pricing Badges: Fast-Access Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono">
                <span className="text-white text-[11px] uppercase tracking-wider font-semibold drop-shadow">
                  Direct Pricing Badges:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory?.('woody');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md shadow-sm transition-all flex items-center gap-1.5 hover:scale-105"
                >
                  <span>Woody</span>
                  <span className="text-emerald-400 font-bold">$75 USD</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory?.('foamy');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md shadow-sm transition-all flex items-center gap-1.5 hover:scale-105"
                >
                  <span>Foamy</span>
                  <span className="text-emerald-400 font-bold">$155 USD</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory?.('carbon');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md shadow-sm transition-all flex items-center gap-1.5 hover:scale-105"
                >
                  <span>Carbon</span>
                  <span className="text-emerald-400 font-bold">$220 USD</span>
                </button>
              </div>

            </div>

            {/* Bottom Scroll Cue */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors cursor-pointer flex flex-col items-center gap-1 z-20">
              <button
                type="button"
                onClick={() => scrollToNextSpot(index)}
                className="flex flex-col items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                aria-label={
                  index < PRO_SPOTS.length - 1
                    ? `Scroll to ${PRO_SPOTS[index + 1].name}`
                    : 'Scroll to Catalog'
                }
              >
                <span>
                  {index < PRO_SPOTS.length - 1
                    ? `Next: ${PRO_SPOTS[index + 1].name}`
                    : 'Explore Full Quiver & Builder'}
                </span>
                <ChevronDown className="w-5 h-5 animate-bounce text-sky-400" />
              </button>
            </div>

            {/* Workshop Heritage Seal Stamp (Subtle) */}
            <div className="absolute top-6 left-6 hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-400 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>HANDCRAFTED IN TACLOBAN CITY SINCE 2009</span>
            </div>

          </section>
        );
      })}

      {/* Puka Beach Interactive Map Widget & Guide Modal */}
      <PukaBeachMapModal
        isOpen={isPukaMapOpen}
        onClose={() => setIsPukaMapOpen(false)}
        onSelectCategory={onSelectCategory as any}
      />
    </div>
  );
};

