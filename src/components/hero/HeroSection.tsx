import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenCustomizer?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 border-b border-slate-200 scroll-mt-20">
      
      {/* Background Action Ocean Wave Photo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero-skim.jpg"
          alt="Saint Joe Skimboards in Action"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
        />
        {/* Subtle Dark Vignette for Pristine Text Readability */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
      </div>

      {/* Centered Minimal Content Overlay */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center py-20">
        <div className="space-y-6 max-w-3xl mx-auto">
          
          <div>
            <p className="text-sm sm:text-base md:text-lg font-sans font-semibold uppercase tracking-[0.3em] text-white/90 drop-shadow-md mb-2 sm:mb-3">
              Welcome
            </p>
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white drop-shadow-2xl">
              SAINT JOE SKIMBOARDS
            </h1>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-center pt-2">
            <a
              href="#catalog"
              className="px-10 py-3.5 rounded-lg border-2 border-white bg-white/15 hover:bg-white hover:text-slate-900 text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest backdrop-blur-md transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 text-center"
            >
              SHOP
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Cue / See More */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 hover:text-white transition-colors cursor-pointer flex flex-col items-center gap-1 z-10">
        <a
          href="#pro-spots-stack"
          aria-label="Scroll down to Philippine Pro Spots"
          className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-xs font-mono tracking-wider uppercase text-slate-200 hover:text-white transition-all shadow-lg hover:border-sky-400"
        >
          <span>SEE MORE: PRO SPOTS</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-sky-400 group-hover:text-cyan-300" />
        </a>
      </div>

    </section>
  );
};
