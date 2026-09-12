import React, { useState } from 'react';
import { TEAM_RIDERS } from '../../data/teamRiders';
import { TeamRider } from '../../types';
import { Users, Award, MapPin, Quote, ArrowRight } from 'lucide-react';

export const TeamShowcase: React.FC = () => {
  const [selectedRider, setSelectedRider] = useState<TeamRider>(TEAM_RIDERS[0]);

  return (
    <section id="team-riders" className="py-20 bg-brand-charcoal relative overflow-hidden border-b border-brand-border/60">
      
      {/* Carbon Texture */}
      <div className="absolute inset-0 opacity-10 carbon-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-cyan/40 text-xs font-mono font-bold uppercase tracking-widest text-brand-cyan mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>World Champion Quiver Athletes</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              THE SAINT JOE <span className="text-gradient-cyan">PRO TEAM</span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Tested in the world’s heaviest shorebreak arenas from Cabo to Rio de Janeiro. Meet the riders pushing the limits of skimboarding.
          </p>
        </div>

        {/* Featured Rider Spotlight & Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Selected Rider Spotlight */}
          <div className="lg:col-span-7 bg-brand-surface border border-brand-border rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
            
            {/* Action Shot Banner */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedRider.actionShot}
                alt={selectedRider.name}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
              
              {/* Location Badge */}
              <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-border text-xs font-mono text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{selectedRider.location}</span>
              </div>

              <div className="absolute top-4 right-4 bg-brand-dark/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-border text-xs font-mono text-brand-volt font-bold">
                {selectedRider.stance.toUpperCase()} STANCE
              </div>
            </div>

            {/* Rider Info Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display font-black text-3xl text-white uppercase">
                    {selectedRider.name}
                  </h3>
                  <p className="text-xs font-mono text-brand-cyan font-semibold">{selectedRider.handle}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedRider.titles.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-bold bg-brand-volt/15 text-brand-volt border border-brand-volt/30 px-2.5 py-1 rounded-full flex items-center gap-1"
                    >
                      <Award className="w-3 h-3" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 bg-brand-dark/70 rounded-2xl border border-brand-border relative">
                <Quote className="w-6 h-6 text-brand-cyan/30 absolute top-3 right-3" />
                <p className="text-xs sm:text-sm italic text-slate-300 relative z-10 leading-relaxed">
                  "{selectedRider.quote}"
                </p>
              </div>

              {/* Signature Board Link */}
              <div className="p-4 bg-brand-surfaceAlt rounded-2xl border border-brand-cyan/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">CURRENT WEAPON OF CHOICE</span>
                  <p className="font-display font-black text-base text-white">{selectedRider.signatureBoardName}</p>
                </div>
                <a
                  href="#catalog"
                  className="px-4 py-2 rounded-xl bg-brand-cyan text-brand-dark font-bold text-xs uppercase font-mono hover:bg-cyan-300 transition-colors flex items-center gap-1"
                >
                  <span>Shop Board</span> <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

          {/* Right: Team Selection Thumbnails */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Team Rider
            </span>

            {TEAM_RIDERS.map((rider) => {
              const isSelected = selectedRider.id === rider.id;
              return (
                <div
                  key={rider.id}
                  onClick={() => setSelectedRider(rider)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                    isSelected
                      ? 'bg-brand-surface border-brand-cyan ring-1 ring-brand-cyan shadow-xl translate-x-1'
                      : 'bg-brand-dark/60 border-brand-border hover:bg-brand-surface/70'
                  }`}
                >
                  <img
                    src={rider.avatar}
                    alt={rider.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-border flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-base text-white truncate">{rider.name}</h4>
                      <span className="text-[10px] font-mono text-slate-500">{rider.stance}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">{rider.location}</p>
                    <p className="text-[11px] text-brand-cyan font-mono truncate mt-0.5">
                      Signature: {rider.signatureBoardName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
};
