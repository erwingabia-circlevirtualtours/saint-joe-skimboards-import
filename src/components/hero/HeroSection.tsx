import React from 'react';
import { ArrowRight, Sliders, ShieldCheck, Zap, Sparkles, ChevronDown, Award } from 'lucide-react';

interface HeroSectionProps {
  onOpenCustomizer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCustomizer }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-brand-dark pt-8 pb-16">
      
      {/* Background Action Ocean Overlay & Ambient Lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero-skim.jpg"
          alt="Saint Joe Shorebreak Action"
          className="w-full h-full object-cover object-center opacity-35 scale-105 filter brightness-90 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/65 to-transparent" />
        
        {/* Glow Spheres */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-brand-volt/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-cyan/40 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-cyan">
                2026 PRO CARBON SERIES NOW LIVE
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-xs font-mono text-slate-300">
                SAN CLEMENTE, CA
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl tracking-tighter uppercase text-white leading-[0.95]">
              ENGINEERED FOR <br />
              <span className="text-gradient-cyan drop-shadow-lg">
                SHOREBREAK
              </span> <br />
              DOMINANCE.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Aerospace-grade Toray 3K carbon fiber vacuum-fused over ultra-dense closed-cell structural PVC. Hand-tuned rails built for explosive wraps, heavy shorebreak barrels, and world-title speed.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-brand-dark hover:bg-slate-100 font-display font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] group"
              >
                <span>Shop In-Stock Boards</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-blue" />
              </a>

              <button
                onClick={onOpenCustomizer}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-surface/90 hover:bg-brand-surface text-white border border-brand-cyan/40 hover:border-brand-cyan font-display font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-xl hover:glow-cyan hover:scale-[1.02]"
              >
                <Sliders className="w-4 h-4 text-brand-cyan" />
                <span>Custom Builder Studio</span>
                <span className="text-[10px] font-mono font-bold bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded border border-brand-cyan/40">
                  NEW
                </span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-border/60 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-300">Lifetime Delam Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-volt flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-300">Double Carbon 3K</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-sunset flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-300">15x World Titles</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Board / Brand Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Glow Aura */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-brand-blue/30 via-brand-cyan/20 to-brand-volt/20 rounded-full blur-3xl animate-pulse" />

            {/* Showcase Card */}
            <div className="relative w-full max-w-md bg-brand-surface/80 border border-brand-border/80 rounded-3xl p-6 backdrop-blur-xl shadow-2xl overflow-hidden group">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/saint-joe-logo.jpg"
                    alt="Saint Joe Icon"
                    className="w-10 h-10 rounded-lg object-cover bg-white p-0.5 border border-brand-cyan/30"
                  />
                  <div>
                    <h3 className="font-display font-black text-sm uppercase text-white tracking-wider">
                      SAINT APEX PRO CARBON
                    </h3>
                    <p className="text-[11px] font-mono text-brand-cyan">Lucas Fink Signature Shape</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-brand-volt/15 border border-brand-volt/40 text-brand-volt text-[10px] font-mono font-black uppercase rounded-full">
                  $649 USD
                </span>
              </div>

              {/* Board Graphic Simulation */}
              <div className="py-6 flex items-center justify-center">
                <div className="relative w-44 h-80 rounded-[50px] bg-gradient-to-b from-[#0e121a] via-[#1a2130] to-[#0a0c10] border-2 border-brand-cyan/50 shadow-2xl flex flex-col items-center justify-between p-4 overflow-hidden transform group-hover:rotate-1 group-hover:scale-105 transition-all duration-500">
                  
                  {/* Top Deck Carbon Fiber Weave Texture */}
                  <div className="absolute inset-0 opacity-40 carbon-bg" />
                  
                  {/* Neon Cyan Resin Fade Line */}
                  <div className="absolute inset-x-0 top-1/3 h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent shadow-[0_0_15px_#00f0ff]" />
                  <div className="absolute inset-x-0 top-2/3 h-1 bg-gradient-to-r from-transparent via-brand-volt to-transparent shadow-[0_0_15px_#ccff00]" />

                  {/* Top Grip */}
                  <div className="relative z-10 w-24 h-16 rounded-xl bg-brand-dark/90 border border-white/15 flex flex-col items-center justify-center text-[9px] font-mono text-slate-400">
                    <span className="text-brand-cyan font-bold">ARCH GRIP</span>
                    <span>EVA 5mm</span>
                  </div>

                  {/* Brand Stamp on Board */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white p-1 shadow-lg border border-brand-cyan flex items-center justify-center overflow-hidden">
                    <img src="/saint-joe-logo.jpg" alt="Saint Joe Stamp" className="w-full h-full object-cover" />
                  </div>

                  {/* Kick Tail Pad */}
                  <div className="relative z-10 w-28 h-20 rounded-b-[40px] bg-brand-dark/90 border-t-2 border-brand-volt flex flex-col items-center justify-center text-[9px] font-mono text-brand-volt font-bold">
                    <span>3-PIECE KICK TAIL</span>
                    <span className="text-slate-400 text-[8px]">PRO PIN 45°</span>
                  </div>

                </div>
              </div>

              {/* Card Footer Quick Specs */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center font-mono text-[10px]">
                <div className="bg-brand-dark/60 p-2 rounded-lg border border-brand-border">
                  <span className="text-slate-500 block">CORE</span>
                  <span className="text-white font-bold">PVC 75kg/m³</span>
                </div>
                <div className="bg-brand-dark/60 p-2 rounded-lg border border-brand-border">
                  <span className="text-slate-500 block">LAYUP</span>
                  <span className="text-brand-cyan font-bold">3K Toray Carbon</span>
                </div>
                <div className="bg-brand-dark/60 p-2 rounded-lg border border-brand-border">
                  <span className="text-slate-500 block">WEIGHT</span>
                  <span className="text-brand-volt font-bold">3.95 LBS</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer flex flex-col items-center gap-1 z-10">
        <a href="#categories" aria-label="Scroll down">
          <ChevronDown className="w-5 h-5 animate-bounce text-brand-cyan" />
        </a>
      </div>

    </section>
  );
};
