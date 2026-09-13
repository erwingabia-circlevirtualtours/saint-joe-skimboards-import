import React, { useState } from 'react';
import { PRO_SPOTS } from '../../data/proSpots';
import { ProSpot } from '../../types';
import { MapPin, Compass, Quote, ArrowRight, Sparkles } from 'lucide-react';

export const TeamShowcase: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<ProSpot>(PRO_SPOTS[0]);

  return (
    <section id="pro-spots" className="py-20 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Compatibility anchor */}
      <div id="team-riders" className="absolute -top-10" />
      
      {/* Carbon Texture */}
      <div className="absolute inset-0 opacity-5 carbon-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold uppercase tracking-widest text-sky-800 mb-3">
              <Compass className="w-3.5 h-3.5 text-sky-600" />
              <span>Top Philippine Skim Destinations</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-slate-900">
              PHILIPPINE <span className="text-sky-600">PRO SPOTS</span>
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            From the world-class shorebreak barrels of Dahican in Mati to the legendary wedges of Leyte. Discover where Saint Joe skimboards dominate the coast.
          </p>
        </div>

        {/* Featured Spot Spotlight & Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Selected Spot Spotlight */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            
            {/* Action Shot Banner */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedSpot.image}
                alt={selectedSpot.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
              
              {/* Location Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-xs font-mono text-slate-800 flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span className="font-semibold">{selectedSpot.location}</span>
              </div>

              <div className="absolute top-4 right-4 bg-sky-600 text-white px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                {selectedSpot.waveType}
              </div>
            </div>

            {/* Spot Info Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display font-black text-3xl text-slate-900 uppercase">
                    {selectedSpot.name}
                  </h3>
                  <p className="text-xs font-mono text-sky-700 font-semibold">{selectedSpot.tag}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedSpot.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-full flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-sky-600" /> {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blurb */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 relative shadow-sm">
                <Quote className="w-6 h-6 text-sky-200 absolute top-3 right-3" />
                <p className="text-xs sm:text-sm italic text-slate-700 relative z-10 leading-relaxed">
                  "{selectedSpot.blurb}"
                </p>
              </div>

              {/* Recommended Board Link */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">RECOMMENDED WEAPON OF CHOICE</span>
                  <p className="font-display font-black text-base text-slate-900">{selectedSpot.recommendedBoardName}</p>
                </div>
                <a
                  href="#catalog"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase font-mono hover:bg-slate-800 transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>Shop Board</span> <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

          {/* Right: Spot Selection Thumbnails */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Select Pro Spot
            </span>

            {PRO_SPOTS.map((spot) => {
              const isSelected = selectedSpot.id === spot.id;
              return (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                    isSelected
                      ? 'bg-sky-50/70 border-sky-500 ring-1 ring-sky-500 shadow-md translate-x-1'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <img
                    src={spot.thumbnail}
                    alt={spot.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-base text-slate-900 truncate">{spot.name}</h4>
                      <span className="text-[10px] font-mono font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full truncate ml-2">
                        {spot.waveType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-sky-600 flex-shrink-0" />
                      <span className="truncate">{spot.location}</span>
                    </p>
                    <p className="text-[11px] text-slate-600 font-mono truncate mt-0.5 font-medium">
                      Setup: {spot.recommendedBoardName}
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

export const ProSpotsShowcase = TeamShowcase;

