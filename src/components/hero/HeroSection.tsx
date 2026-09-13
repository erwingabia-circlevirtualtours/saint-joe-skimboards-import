import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenCustomizer?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 border-b border-slate-200">
      
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
          
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white drop-shadow-xl">
            SAINT JOE SKIMBOARDS
          </h1>

          <p className="text-lg sm:text-2xl md:text-3xl text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Your quality Philippine made skimboards. We’ve been shaping boards since 2009.
          </p>

          {/* Action Buttons Inspired by Classic Pure Skim Aesthetics */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a
              href="#catalog"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg border-2 border-white/80 bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs uppercase tracking-widest backdrop-blur-sm transition-all shadow-md text-center"
            >
              Our Skimboards
            </a>
            <a
              href="#size-finder"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-display font-bold text-xs uppercase tracking-widest transition-all shadow-md text-center"
            >
              Board Buyer's Guide
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors cursor-pointer flex flex-col items-center gap-1 z-10">
        <a href="#categories" aria-label="Scroll down">
          <ChevronDown className="w-6 h-6 animate-bounce text-white drop-shadow" />
        </a>
      </div>

    </section>
  );
};
