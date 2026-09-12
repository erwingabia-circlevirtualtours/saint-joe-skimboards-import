import React, { useState, useMemo } from 'react';
import { Gauge, Sliders, Waves, Compass, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const SizingCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(165);
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');
  const [waveType, setWaveType] = useState<'shorebreak' | 'sandbar' | 'flatland'>('shorebreak');
  const [skill, setSkill] = useState<'beginner' | 'intermediate' | 'pro'>('intermediate');

  // Normalise to lbs for calculation
  const weightLbs = unit === 'kg' ? Math.round(weight * 2.20462) : weight;

  const recommendation = useMemo(() => {
    let size = 'Medium (51.5" - 52.2")';
    let sizeCode = 'Medium';
    let thickness = '5/8" (Razor Thin Carve)';
    let recommendedModelId = 'saint-apex-pro';

    if (weightLbs < 120) {
      size = 'Grom / Micro (44" - 48")';
      sizeCode = 'Small';
      thickness = '5/8"';
      recommendedModelId = 'disciple-grom-junior';
    } else if (weightLbs < 150) {
      size = 'Small (48.0" - 50.5")';
      sizeCode = 'Small';
      thickness = waveType === 'flatland' ? '3/4"' : '5/8"';
      recommendedModelId = waveType === 'flatland' ? 'holy-roller-dude' : 'saint-apex-pro';
    } else if (weightLbs <= 185) {
      size = 'Medium (51.5" - 52.5")';
      sizeCode = 'Medium';
      thickness = waveType === 'shorebreak' ? '5/8"' : 'Tapered 3/4" to 5/8"';
      recommendedModelId = waveType === 'flatland' ? 'holy-roller-dude' : waveType === 'sandbar' ? 'miracle-worker-hybrid' : 'saint-apex-pro';
    } else if (weightLbs <= 215) {
      size = 'Large (53.0" - 54.0")';
      sizeCode = 'Large';
      thickness = '3/4" (Maximum Glide Float)';
      recommendedModelId = 'sanctuary-carbon-magnet';
    } else {
      size = 'X-Large (55.0"+)';
      sizeCode = 'XL';
      thickness = '3/4" Full Volume';
      recommendedModelId = 'sanctuary-carbon-magnet';
    }

    const matchedBoard = PRODUCTS.find(p => p.id === recommendedModelId) || PRODUCTS[0];

    return {
      size,
      sizeCode,
      thickness,
      board: matchedBoard,
      rocker: waveType === 'shorebreak' ? '2.15" Ocean Steep Nose' : '1.85" Low Drag Flatland',
      reason: `At ${weightLbs} lbs in ${waveType === 'shorebreak' ? 'heavy steep shorebreak' : waveType === 'sandbar' ? 'sloping wave wraps' : 'shallow flatland'}, this layup gives you ideal speed recovery without nose-diving.`,
    };
  }, [weightLbs, waveType, skill]);

  return (
    <section id="size-finder" className="py-20 bg-brand-dark relative border-b border-brand-border/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-volt/40 text-xs font-mono font-bold uppercase tracking-widest text-brand-volt">
            <Gauge className="w-3.5 h-3.5" />
            <span>Interactive Skimboard Fit Engine</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            FIND YOUR <span className="text-gradient-volt">EXACT SIZING</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A board that is too small sinks before reaching the wave; a board too large is hard to rail-turn. Dial in your exact dimensions below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls on Left */}
          <div className="lg:col-span-6 bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            {/* Rider Weight Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Rider Body Weight
                </label>
                
                {/* Unit Switcher */}
                <div className="flex items-center bg-brand-dark rounded-lg p-1 border border-brand-border text-xs font-mono">
                  <button
                    onClick={() => {
                      if (unit === 'kg') {
                        setWeight(Math.round(weight * 2.20462));
                        setUnit('lbs');
                      }
                    }}
                    className={`px-2.5 py-0.5 rounded ${unit === 'lbs' ? 'bg-brand-volt text-brand-dark font-bold' : 'text-slate-400'}`}
                  >
                    LBS
                  </button>
                  <button
                    onClick={() => {
                      if (unit === 'lbs') {
                        setWeight(Math.round(weight / 2.20462));
                        setUnit('kg');
                      }
                    }}
                    className={`px-2.5 py-0.5 rounded ${unit === 'kg' ? 'bg-brand-volt text-brand-dark font-bold' : 'text-slate-400'}`}
                  >
                    KG
                  </button>
                </div>
              </div>

              {/* Slider & Big Display */}
              <div className="flex items-center justify-between bg-brand-dark/70 p-4 rounded-2xl border border-brand-border mb-3">
                <span className="text-xs font-mono text-slate-400">Current Weight:</span>
                <span className="font-display font-black text-3xl text-brand-volt">
                  {weight} <span className="text-sm font-mono text-slate-400">{unit.toUpperCase()}</span>
                </span>
              </div>

              <input
                type="range"
                min={unit === 'lbs' ? 70 : 32}
                max={unit === 'lbs' ? 240 : 110}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-brand-dark rounded-lg appearance-none cursor-pointer accent-brand-volt"
              />
            </div>

            {/* Wave Conditions */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-3">
                Primary Beach Wave Conditions
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'shorebreak', name: 'Shorebreak', desc: 'Laguna / Cabo Dump' },
                  { id: 'sandbar', name: 'Sandbars', desc: 'Wraps & Liners' },
                  { id: 'flatland', name: 'Flatland / Mush', desc: 'Long Glide' },
                ].map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWaveType(w.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      waveType === w.id
                        ? 'bg-brand-surfaceAlt border-brand-cyan ring-1 ring-brand-cyan text-white'
                        : 'bg-brand-dark/50 border-brand-border text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold block text-white">{w.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{w.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Level */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-3">
                Rider Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'beginner', label: 'Beginner', desc: 'Learning Sand Run' },
                  { id: 'intermediate', label: 'Intermediate', desc: 'Turning on Waves' },
                  { id: 'pro', label: 'Pro / Expert', desc: 'Air & Barrel Attacks' },
                ].map((sk) => (
                  <button
                    key={sk.id}
                    onClick={() => setSkill(sk.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      skill === sk.id
                        ? 'bg-brand-surfaceAlt border-brand-volt ring-1 ring-brand-volt text-white'
                        : 'bg-brand-dark/50 border-brand-border text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold block text-white">{sk.label}</span>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{sk.desc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Recommendation Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-brand-surface via-brand-surfaceAlt to-brand-charcoal border border-brand-cyan/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            {/* Ambient Aura */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-volt/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border/60">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-volt" />
                  Your Optimal Setup
                </span>
                <span className="text-[10px] font-mono bg-brand-volt/20 text-brand-volt px-2 py-0.5 rounded font-bold">
                  PRECISION MATCH
                </span>
              </div>

              {/* Recommended Size Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-brand-dark/80 rounded-2xl border border-brand-border">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">RECOMMENDED LENGTH</span>
                  <span className="font-display font-black text-xl text-white block mt-1">{recommendation.size}</span>
                </div>

                <div className="p-4 bg-brand-dark/80 rounded-2xl border border-brand-border">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">FOIL THICKNESS</span>
                  <span className="font-display font-black text-xl text-brand-volt block mt-1">{recommendation.thickness}</span>
                </div>
              </div>

              {/* Shaper Rationale */}
              <div className="p-4 bg-brand-dark/60 rounded-2xl border border-brand-border/80">
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  <span className="text-brand-cyan font-bold">SHAPER LOGIC: </span>
                  {recommendation.reason}
                </p>
              </div>

              {/* Matched Product Preview */}
              <div className="p-4 bg-brand-surface border border-brand-border rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-center font-bold text-xs text-brand-cyan p-1 overflow-hidden">
                    <img src="/saint-joe-logo.jpg" alt="Saint Joe" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-brand-cyan font-bold uppercase block">RECOMMENDED MODEL</span>
                    <h4 className="font-display font-black text-base text-white">{recommendation.board.name}</h4>
                    <p className="text-xs text-slate-400">${recommendation.board.price} USD</p>
                  </div>
                </div>

                <a
                  href="#catalog"
                  className="px-4 py-2 rounded-xl bg-brand-cyan text-brand-dark font-bold text-xs uppercase font-mono hover:bg-cyan-300 transition-colors flex items-center gap-1 flex-shrink-0"
                >
                  <span>View</span> <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Bottom Customizer Link */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 mt-6">
              <span>Want this shape in a custom resin tint?</span>
              <a href="#custom-builder" className="text-brand-cyan font-bold hover:underline flex items-center gap-1">
                Customize in Studio →
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
