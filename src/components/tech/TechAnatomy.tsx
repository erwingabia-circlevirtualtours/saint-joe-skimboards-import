import React, { useState } from 'react';
import { Layers, ShieldCheck, Zap, Sparkles, Feather, Gauge } from 'lucide-react';

export const TechAnatomy: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(1);

  const layers = [
    {
      id: 0,
      title: 'Top UV Resin Finish & Traction Deck',
      subtitle: 'Non-yellowing, impact-absorbing aerospace gloss resin matrix',
      stat: '0.2mm High-Gloss Armor',
      description: 'Specially formulated high-clarity epoxy resin with proprietary UV blockers to prevent sun yellowing and resin embrittlement over years of beach sessions.',
      icon: Sparkles,
      color: '#00f0ff',
    },
    {
      id: 1,
      title: 'Double Carbon 3K Toray Weave',
      subtitle: 'Aerospace structural carbon fiber top & bottom skin',
      stat: '100% Bi-Axial Stiff Recoil',
      description: 'Continuous spread-tow 3K carbon fiber provides unparalleled torsional stiffness. When pumping across flat sand, zero kinetic energy is lost to deck flex.',
      icon: Zap,
      color: '#ccff00',
    },
    {
      id: 2,
      title: 'High-Density Structural PVC Foam Core',
      subtitle: '75kg/m³ Closed-cell impervious waterproof core',
      stat: 'Zero Water Absorption',
      description: 'Unlike polyurethane or EPS surfboard foam that sucks water on the first ding, our Divinycell closed-cell structural core will never absorb a drop of water, preserving the board’s featherweight float forever.',
      icon: Feather,
      color: '#0066ff',
    },
    {
      id: 3,
      title: 'Reinforced Kevlar Bullnose Rails',
      subtitle: 'Multi-ply aramid perimeter impact defense',
      stat: 'Bulletproof Sandbar Durability',
      description: 'The rails endure the brunt of beach collisions with shells, pebbles, and hard-packed sand shelves. Kevlar bumper tape ensures crisp, razor-sharp rails that never crumble.',
      icon: ShieldCheck,
      color: '#ff5e3a',
    }
  ];

  return (
    <section id="tech-anatomy" className="py-20 bg-brand-charcoal relative overflow-hidden border-b border-brand-border/60">
      
      {/* Background Carbon Pattern */}
      <div className="absolute inset-0 opacity-10 carbon-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-cyan/40 text-xs font-mono font-bold uppercase tracking-widest text-brand-cyan">
            <Layers className="w-3.5 h-3.5" />
            <span>The Saint Joe Anatomy</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            AEROSPACE GRADE <span className="text-gradient-cyan">CONSTRUCTION</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Every Saint Joe skimboard is built using high-pressure vacuum infusion techniques derived from aerospace engineering. Here is why our boards dominate the world tour.
          </p>
        </div>

        {/* Interactive Layer Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Layer Selector Cards */}
          <div className="lg:col-span-6 space-y-3">
            {layers.map((layer) => {
              const isSelected = activeLayer === layer.id;
              const Icon = layer.icon;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-surface border-brand-cyan shadow-xl ring-1 ring-brand-cyan/80 translate-x-2'
                      : 'bg-brand-dark/60 border-brand-border/80 hover:bg-brand-surface/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: `${layer.color}15`,
                          borderColor: `${layer.color}40`,
                          color: layer.color
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-white">{layer.title}</h3>
                        <p className="text-xs text-slate-400 font-mono">{layer.subtitle}</p>
                      </div>
                    </div>

                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border flex-shrink-0"
                      style={{
                        backgroundColor: `${layer.color}15`,
                        borderColor: `${layer.color}40`,
                        color: layer.color
                      }}
                    >
                      {layer.stat}
                    </span>
                  </div>

                  {isSelected && (
                    <p className="text-xs text-slate-300 mt-3 pt-3 border-t border-white/10 leading-relaxed animate-fade-in">
                      {layer.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Exploded Layer Graphic Diagram */}
          <div className="lg:col-span-6 bg-brand-surface/80 border border-brand-border rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center relative min-h-[420px]">
            
            {/* Visual Exploded Skimboard Layers */}
            <div className="w-full max-w-md space-y-4 py-6">
              
              {/* Layer 0: UV Gloss */}
              <div
                onClick={() => setActiveLayer(0)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeLayer === 0
                    ? 'bg-brand-cyan/20 border-brand-cyan scale-105 shadow-lg shadow-cyan-500/20'
                    : 'bg-brand-dark/80 border-brand-border opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan font-mono text-xs font-bold flex items-center justify-center">1</span>
                  <span className="text-xs font-bold font-mono text-white">EPOXY HIGH-GLOSS UV SHIELD</span>
                </div>
                <span className="text-[10px] font-mono text-brand-cyan">LAYER 1</span>
              </div>

              {/* Layer 1: Double Carbon Weave */}
              <div
                onClick={() => setActiveLayer(1)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeLayer === 1
                    ? 'bg-brand-volt/20 border-brand-volt scale-105 shadow-lg shadow-volt-500/20'
                    : 'bg-brand-dark/80 border-brand-border opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-volt/20 text-brand-volt font-mono text-xs font-bold flex items-center justify-center">2</span>
                  <span className="text-xs font-bold font-mono text-white">3K TORAY CARBON SPREAD-TOW</span>
                </div>
                <span className="text-[10px] font-mono text-brand-volt">LAYER 2</span>
              </div>

              {/* Layer 2: PVC Foam Core */}
              <div
                onClick={() => setActiveLayer(2)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeLayer === 2
                    ? 'bg-brand-blue/30 border-brand-blue scale-105 shadow-lg shadow-blue-500/20'
                    : 'bg-brand-dark/80 border-brand-border opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-blue/30 text-brand-cyan font-mono text-xs font-bold flex items-center justify-center">3</span>
                  <span className="text-xs font-bold font-mono text-white">75kg/m³ CLOSED-CELL PVC CORE</span>
                </div>
                <span className="text-[10px] font-mono text-brand-cyan">CORE</span>
              </div>

              {/* Layer 3: Kevlar Rails */}
              <div
                onClick={() => setActiveLayer(3)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeLayer === 3
                    ? 'bg-brand-sunset/20 border-brand-sunset scale-105 shadow-lg shadow-sunset-500/20'
                    : 'bg-brand-dark/80 border-brand-border opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-sunset/20 text-brand-sunset font-mono text-xs font-bold flex items-center justify-center">4</span>
                  <span className="text-xs font-bold font-mono text-white">KEVLAR ARAMID SHOREBREAK RAILS</span>
                </div>
                <span className="text-[10px] font-mono text-brand-sunset">PERIMETER</span>
              </div>

            </div>

            {/* Spec Highlights Matrix */}
            <div className="w-full grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center font-mono text-xs">
              <div className="bg-brand-dark/50 p-2.5 rounded-xl border border-brand-border">
                <span className="text-slate-400 block text-[10px]">WEIGHT RATIO</span>
                <span className="text-brand-volt font-bold text-sm">3.9 - 4.2 LBS</span>
              </div>
              <div className="bg-brand-dark/50 p-2.5 rounded-xl border border-brand-border">
                <span className="text-slate-400 block text-[10px]">TORSIONAL FLEX</span>
                <span className="text-brand-cyan font-bold text-sm">99.4% REBOUND</span>
              </div>
              <div className="bg-brand-dark/50 p-2.5 rounded-xl border border-brand-border">
                <span className="text-slate-400 block text-[10px]">WATERPROOF</span>
                <span className="text-white font-bold text-sm">100% FOREVER</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
