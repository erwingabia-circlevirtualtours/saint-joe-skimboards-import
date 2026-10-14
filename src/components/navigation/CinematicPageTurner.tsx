import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Sliders,
  Layers,
  MapPin,
  Star,
  Compass,
  ArrowUp,
  LayoutGrid,
  X,
  Sparkles
} from 'lucide-react';

export interface PageChapter {
  id: string;
  num: string;
  shortTitle: string;
  fullTitle: string;
  tagline: string;
  icon?: React.FC<{ className?: string }>;
}

export const CHAPTERS: PageChapter[] = [
  {
    id: 'hero',
    num: '01',
    shortTitle: 'Welcome',
    fullTitle: 'Saint Joe Skimboards',
    tagline: 'Handcrafted in Leyte since 2009',
    icon: Sparkles
  },
  {
    id: 'pro-spots-stack',
    num: '02',
    shortTitle: 'Pro Spots',
    fullTitle: 'Philippine Pro Spots',
    tagline: 'Tanauan, San Joaquin, Puka Beach',
    icon: MapPin
  },
  {
    id: 'categories',
    num: '03',
    shortTitle: 'Shapes',
    fullTitle: '3 Core Catalogs',
    tagline: 'Woody, Foamy & Carbon',
    icon: LayoutGrid
  },
  {
    id: 'custom-builder',
    num: '04',
    shortTitle: 'Custom Studio',
    fullTitle: 'Custom Board Builder',
    tagline: 'Precision 3D Customizer',
    icon: Sliders
  },
  {
    id: 'catalog',
    num: '05',
    shortTitle: 'Shop',
    fullTitle: 'Performance Catalog',
    tagline: 'Handcrafted In-Stock Quiver',
    icon: Compass
  },
  {
    id: 'tech-anatomy',
    num: '06',
    shortTitle: 'Tech',
    fullTitle: 'Technology & Anatomy',
    tagline: 'Airex foam core & carbon matrix',
    icon: Layers
  },
  {
    id: 'size-finder',
    num: '07',
    shortTitle: 'Size Finder',
    fullTitle: 'Sizing & Weight Engine',
    tagline: 'Hydrodynamic weight calculator',
    icon: Sliders
  },
  {
    id: 'team-showcase',
    num: '08',
    shortTitle: 'Spot Guide',
    fullTitle: 'Riders & Spot Quivers',
    tagline: 'Philippine surf breaks & weapons',
    icon: MapPin
  },
  {
    id: 'reviews',
    num: '09',
    shortTitle: 'Reviews',
    fullTitle: 'Rider Reviews',
    tagline: 'Community feedback & wave ratings',
    icon: Star
  },
  {
    id: 'footer',
    num: '10',
    shortTitle: 'Workshop',
    fullTitle: 'Connect & Order',
    tagline: 'Direct workshop visit & S3 deploy',
    icon: Compass
  }
];

export const CinematicPageTurner: React.FC = () => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const isNavigatingRef = useRef(false);

  // Cinematic scroll slide to specific chapter index
  const slideToPage = useCallback((index: number) => {
    if (index < 0 || index >= CHAPTERS.length) return;
    const target = CHAPTERS[index];
    const el = document.getElementById(target.id);

    if (el) {
      isNavigatingRef.current = true;
      setIsNavigating(true);
      setActivePageIndex(index);
      setIsChapterMenuOpen(false);

      const navOffset = index === 0 ? 0 : 68; // offset for sticky navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, y),
        behavior: 'smooth'
      });

      setTimeout(() => {
        isNavigatingRef.current = false;
        setIsNavigating(false);
      }, 700);
    }
  }, []);

  const slideToNextPage = useCallback(() => {
    if (activePageIndex < CHAPTERS.length - 1) {
      slideToPage(activePageIndex + 1);
    } else {
      // Loop or go back to top
      slideToPage(0);
    }
  }, [activePageIndex, slideToPage]);

  const slideToPrevPage = useCallback(() => {
    if (activePageIndex > 0) {
      slideToPage(activePageIndex - 1);
    }
  }, [activePageIndex, slideToPage]);

  // Track scroll position & active section (IntersectionObserver + Scrollspy)
  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress (0-100%)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
        setScrollProgress(pct);
      }

      if (isNavigatingRef.current) return;

      // Find section currently in the viewport's primary focal zone
      const middleY = window.innerHeight * 0.35;
      let closestIdx = 0;
      let minDistance = Infinity;

      CHAPTERS.forEach((chapter, idx) => {
        const el = document.getElementById(chapter.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Distance from middleY to top of section
          const dist = Math.abs(rect.top - middleY);
          if (rect.top <= middleY && rect.bottom >= middleY) {
            closestIdx = idx;
            minDistance = -1; // exact match within bounds
          } else if (minDistance !== -1 && dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        }
      });

      setActivePageIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation support: ArrowDown / PageDown / Space (when not typing)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable) {
        return;
      }

      if (e.key === 'PageDown' || (e.key === 'ArrowDown' && e.altKey)) {
        e.preventDefault();
        slideToNextPage();
      } else if (e.key === 'PageUp' || (e.key === 'ArrowUp' && e.altKey)) {
        e.preventDefault();
        slideToPrevPage();
      } else if (e.key === 'Home' && e.altKey) {
        e.preventDefault();
        slideToPage(0);
      } else if (e.key === 'End' && e.altKey) {
        e.preventDefault();
        slideToPage(CHAPTERS.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideToNextPage, slideToPrevPage, slideToPage]);

  const currentChapter = CHAPTERS[activePageIndex] || CHAPTERS[0];
  const nextChapter = activePageIndex < CHAPTERS.length - 1 ? CHAPTERS[activePageIndex + 1] : null;
  const isLastPage = activePageIndex === CHAPTERS.length - 1;

  return (
    <>
      {/* ======================================================== */}
      {/* 1. FLOATING CINEMATIC "SEE MORE" BOTTOM CONTROLLER HUD */}
      {/* ======================================================== */}
      <aside
        aria-label="Cinematic Page Turner"
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] transition-all duration-300"
      >
        <div className="relative group/hud">
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500/30 via-cyan-400/25 to-blue-600/30 rounded-full blur-md opacity-70 group-hover/hud:opacity-100 transition-opacity pointer-events-none" />

          {/* Main Floating Pill Capsule */}
          <div className="relative bg-slate-950/92 backdrop-blur-xl border border-white/20 text-white shadow-2xl rounded-full px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2 sm:gap-3.5">
            
            {/* Page Counter & Chapters Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsChapterMenuOpen(!isChapterMenuOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono font-bold transition-all"
              title="Click to view all chapters"
              aria-label={`Current chapter: Page ${currentChapter.num} of 10. Click to see all chapters.`}
            >
              <span className="text-sky-400">{currentChapter.num}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">{CHAPTERS.length < 10 ? `0${CHAPTERS.length}` : CHAPTERS.length}</span>
              <LayoutGrid className="w-3 h-3 text-slate-400 hover:text-white ml-0.5" />
            </button>

            {/* Current Chapter Label (Hidden on smallest mobile) */}
            <div className="hidden md:flex flex-col text-left pr-1 max-w-[130px] lg:max-w-[170px] truncate">
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 truncate">
                {currentChapter.shortTitle}
              </span>
              <span className="text-xs font-sans font-bold text-slate-100 truncate">
                {currentChapter.fullTitle}
              </span>
            </div>

            {/* Previous Page Chevron Button */}
            <button
              type="button"
              onClick={slideToPrevPage}
              disabled={activePageIndex === 0}
              aria-label="Previous Page"
              className={`p-1.5 sm:p-2 rounded-full transition-all ${
                activePageIndex === 0
                  ? 'text-slate-600 cursor-not-allowed opacity-40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 active:scale-90'
              }`}
              title="Previous Page (Alt+Up)"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            {/* PRIMARY "SEE MORE" CINEMATIC ACTION BUTTON */}
            <button
              type="button"
              onClick={slideToNextPage}
              aria-label={
                isLastPage
                  ? 'Back to Top of Saint Joe Skimboards'
                  : `See More: Turn to ${nextChapter?.fullTitle}`
              }
              className="group/btn relative px-4 sm:px-5 py-2 sm:py-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-sky-500/25 transition-all duration-200 hover:scale-[1.03] active:scale-95 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              {isLastPage ? (
                <>
                  <span className="tracking-wide">BACK TO TOP</span>
                  <ArrowUp className="w-4 h-4 animate-bounce" />
                </>
              ) : (
                <>
                  <span className="tracking-wide">SEE MORE</span>
                  {nextChapter && (
                    <span className="hidden sm:inline font-mono text-[11px] font-semibold text-sky-950/75 border-l border-sky-950/20 pl-2">
                      {nextChapter.shortTitle}
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4 animate-bounce text-slate-950" />
                </>
              )}
            </button>

            {/* Next Page Chevron Button (Step) */}
            <button
              type="button"
              onClick={slideToNextPage}
              disabled={isLastPage}
              aria-label="Next Page"
              className={`p-1.5 sm:p-2 rounded-full transition-all ${
                isLastPage
                  ? 'text-slate-600 cursor-not-allowed opacity-40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 active:scale-90'
              }`}
              title="Next Page (Alt+Down)"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

          </div>

          {/* Thin Progress Line along bottom edge of capsule */}
          <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* CHAPTER JUMP DRAWER / MODAL */}
        {/* ======================================================== */}
        {isChapterMenuOpen && (
          <div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[92vw] max-w-sm sm:max-w-md bg-slate-950/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-4 text-white animate-in fade-in slide-in-from-bottom-4 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">
                  Table of Chapters
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsChapterMenuOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close chapter menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
              {CHAPTERS.map((chapter, idx) => {
                const isActive = activePageIndex === idx;
                const Icon = chapter.icon || Compass;

                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => slideToPage(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-sky-500/25 border border-sky-400/50 text-white'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-xs font-mono font-bold ${isActive ? 'text-sky-300' : 'text-slate-500'}`}>
                        {chapter.num}
                      </span>
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                      <div className="min-w-0">
                        <div className="font-sans font-bold text-xs truncate">
                          {chapter.fullTitle}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 truncate">
                          {chapter.tagline}
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-mono uppercase bg-sky-400 text-slate-950 font-black px-2 py-0.5 rounded-full shrink-0 ml-2">
                        NOW
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
              <span>Scroll or click See More to glide</span>
              <span className="text-sky-400">Cinematic Slide</span>
            </div>
          </div>
        )}
      </aside>

      {/* ======================================================== */}
      {/* 2. DESKTOP RIGHT-SIDE CINEMATIC PAGE RAIL INDICATOR */}
      {/* ======================================================== */}
      <nav
        aria-label="Page chapter dots"
        className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 bg-slate-950/75 backdrop-blur-md px-2 py-3 rounded-full border border-white/15 shadow-2xl"
      >
        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest pb-1 border-b border-white/10">
          PAGE
        </span>

        {CHAPTERS.map((chapter, idx) => {
          const isActive = activePageIndex === idx;

          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => slideToPage(idx)}
              className="group/dot relative p-1 focus:outline-none"
              aria-label={`Turn to ${chapter.num} - ${chapter.fullTitle}`}
            >
              {/* Dot Shape */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3 h-5 bg-gradient-to-b from-sky-400 to-cyan-300 shadow-md shadow-sky-500/50'
                    : 'w-2 h-2 bg-slate-600 group-hover/dot:bg-slate-300 group-hover/dot:scale-125'
                }`}
              />

              {/* Floating Tooltip to the Left on Hover */}
              <div className="absolute right-7 top-1/2 -translate-y-1/2 hidden group-hover/dot:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md border border-white/20 text-white shadow-xl pointer-events-none whitespace-nowrap z-50">
                <span className="text-sky-400 font-mono text-xs font-bold">{chapter.num}</span>
                <span className="text-xs font-sans font-bold text-slate-200">{chapter.shortTitle}</span>
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => slideToPage(0)}
          className="text-slate-500 hover:text-white pt-1 border-t border-white/10 transition-colors"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </nav>
    </>
  );
};
