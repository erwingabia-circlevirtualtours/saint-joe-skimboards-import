import React, { useState } from 'react';
import { CustomBoardConfig } from '../../types';
import {
  SHAPES,
  CORE_LAYUPS,
  RESIN_TINTS,
  SIZES,
  THICKNESS_OPTIONS,
  ROCKER_OPTIONS,
  TRACTION_COMBOS,
  TRACTION_COLORS
} from '../../data/customizerOptions';
import {
  Sliders,
  Sparkles,
  Zap,
  ShieldCheck,
  Check,
  ShoppingBag,
  Flame,
  ChevronRight,
  Info,
  Clock
} from 'lucide-react';

interface CustomizerControlsProps {
  config: CustomBoardConfig;
  onChange: (updates: Partial<CustomBoardConfig>) => void;
  onAddToCart: () => void;
  calculatedPrice: number;
}

export const CustomizerControls: React.FC<CustomizerControlsProps> = ({
  config,
  onChange,
  onAddToCart,
  calculatedPrice,
}) => {
  const [activeTab, setActiveTab] = useState<'shape' | 'layup' | 'art' | 'rocker' | 'traction' | 'summary'>('shape');

  const tabs = [
    { id: 'shape', label: '1. Shape & Size' },
    { id: 'layup', label: '2. Core & Layup' },
    { id: 'art', label: '3. Resin & Colors' },
    { id: 'rocker', label: '4. Rocker & Foil' },
    { id: 'traction', label: '5. Grip & Inscription' },
    { id: 'summary', label: '6. Review & Order' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
      
      {/* Step Tabs Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-4 mb-6 border-b border-slate-200 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6 flex-1 min-h-[380px]">
        
        {/* TAB 1: SHAPE & SIZING */}
        {activeTab === 'shape' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Select Board Profile & Tail Shape
                </label>
                <span className="text-[11px] font-mono text-sky-700">Tail geometry tuned for shorebreak</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SHAPES.map((shape) => {
                  const isSelected = config.shapeId === shape.id;
                  return (
                    <div
                      key={shape.id}
                      onClick={() => onChange({
                        shapeId: shape.id,
                        shapeName: shape.name,
                        tailShape: (shape.id === 'pro-shape' ? 'Pin Tail' : shape.id === 'hybrid-shape' ? 'Squash Tail' : shape.id === 'dude-cruise' ? 'Fish Tail' : 'Diamond Tail')
                      })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 shadow-sm ring-1 ring-sky-500'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-slate-900">{shape.name}</span>
                        {shape.badge && (
                          <span className="text-[9px] font-mono font-bold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">
                            {shape.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">{shape.description}</p>
                      <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500">Base Price:</span>
                        <span className="text-slate-900 font-bold">${shape.basePrice}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sizing selection */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-3">
                Board Size & Rider Target Weight
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SIZES.map((size) => {
                  const isSelected = config.size.startsWith(size.name.split(' ')[0]);
                  return (
                    <button
                      key={size.id}
                      onClick={() => onChange({ size: size.name as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 text-slate-900 shadow-sm ring-1 ring-sky-500'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span className="text-xs font-bold block text-slate-900">{size.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{size.dimensions}</span>
                      <span className="text-[9px] font-mono text-sky-700 block mt-1">{size.riderWeight}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CORE & LAYUP */}
        {activeTab === 'layup' && (
          <div className="space-y-5 animate-fade-in">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block">
              Core Material & Fiber Layup Matrix
            </label>
            
            <div className="space-y-3">
              {CORE_LAYUPS.map((core) => {
                const isSelected = config.coreMaterial === (core.id === 'double-carbon' ? 'Double Carbon Epoxy' : core.id === 'kevlar-weave' ? 'Kevlar Pro Weave' : 'Aerospace E-Glass');
                return (
                  <div
                    key={core.id}
                    onClick={() => onChange({
                      coreMaterial: (core.id === 'double-carbon' ? 'Double Carbon Epoxy' : core.id === 'kevlar-weave' ? 'Kevlar Pro Weave' : 'Aerospace E-Glass')
                    })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-sky-50 border-sky-500 ring-1 ring-sky-500 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{core.name}</span>
                        <span className="text-[10px] font-mono font-bold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">
                          {core.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{core.subtitle}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {core.features.map((f, i) => (
                          <span key={i} className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 ml-4">
                      <span className="text-xs font-mono font-bold text-sky-700">
                        {core.price === 0 ? 'Included' : `+$${core.price}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carbon Options toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div
                onClick={() => onChange({ carbonRails: !config.carbonRails })}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between ${
                  config.carbonRails ? 'bg-sky-50 border-sky-500' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">Wrap Carbon Rails</p>
                  <p className="text-[10px] text-slate-500 font-mono">Reinforced sandbar rock impact zone</p>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${config.carbonRails ? 'bg-sky-600 text-white border-sky-600' : 'border-slate-300 bg-white'}`}>
                  {config.carbonRails && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div
                onClick={() => onChange({ carbonStringer: !config.carbonStringer })}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between ${
                  config.carbonStringer ? 'bg-sky-50 border-sky-500' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">Center Carbon Stringer</p>
                  <p className="text-[10px] text-slate-500 font-mono">Torsional spring recoil beam</p>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${config.carbonStringer ? 'bg-sky-600 text-white border-sky-600' : 'border-slate-300 bg-white'}`}>
                  {config.carbonStringer && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RESIN TINTS & ARTWORK */}
        {activeTab === 'art' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-3">
                Curated Resin Art & Colorway
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RESIN_TINTS.map((tint) => {
                  const isSelected = config.deckColor === tint.deckColor && config.deckAccentColor === tint.deckAccentColor;
                  return (
                    <div
                      key={tint.id}
                      onClick={() => onChange({
                        deckColor: tint.deckColor,
                        deckAccentColor: tint.deckAccentColor,
                        bottomColor: tint.bottomColor,
                        deckStyle: tint.type,
                      })}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 shadow-sm ring-1 ring-sky-500'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Color Preview Swatch */}
                      <div
                        className="w-10 h-10 rounded-xl border border-slate-300 flex-shrink-0 shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${tint.deckColor} 0%, ${tint.deckAccentColor} 100%)`
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">{tint.name}</span>
                        <span className="text-[10px] font-mono text-slate-500 block">{tint.type}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-sky-600 flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Deck Color Picker */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-mono uppercase text-slate-700 font-bold block">
                Custom Color Adjustments
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-slate-500 block mb-1.5">Primary Deck Tint</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.deckColor}
                      onChange={(e) => onChange({ deckColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                    />
                    <span className="text-xs font-mono text-slate-700">{config.deckColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-500 block mb-1.5">Accent Tint</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.deckAccentColor}
                      onChange={(e) => onChange({ deckAccentColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                    />
                    <span className="text-xs font-mono text-slate-700">{config.deckAccentColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Saint Joe Brand Stamp Toggle */}
            <div
              onClick={() => onChange({ includeSaintJoeLogo: !config.includeSaintJoeLogo })}
              className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between ${
                config.includeSaintJoeLogo ? 'bg-sky-50 border-sky-500' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src="/saint-joe-logo.jpg" alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Saint Joe Iconic Emblem Lamination</p>
                  <p className="text-[10px] text-slate-500 font-mono">Hand-placed fiberglass deck emblem</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${config.includeSaintJoeLogo ? 'bg-sky-600 text-white border-sky-600' : 'border-slate-300 bg-white'}`}>
                {config.includeSaintJoeLogo && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ROCKER & THICKNESS */}
        {activeTab === 'rocker' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-3">
                Rocker Profile Configuration
              </label>
              <div className="space-y-2.5">
                {ROCKER_OPTIONS.map((rocker) => {
                  const isSelected = config.rocker.startsWith(rocker.name.split(' ')[0]);
                  return (
                    <div
                      key={rocker.id}
                      onClick={() => onChange({ rocker: rocker.name as any })}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 ring-1 ring-sky-500 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{rocker.name}</p>
                        <p className="text-[11px] text-slate-600">{rocker.description}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-sky-700 ml-2 flex-shrink-0">
                        {rocker.price === 0 ? 'Included' : `+$${rocker.price}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-3">
                Board Foil Thickness
              </label>
              <div className="space-y-2.5">
                {THICKNESS_OPTIONS.map((thick) => {
                  const isSelected = config.thickness.startsWith(thick.name.split(' ')[0]);
                  return (
                    <div
                      key={thick.id}
                      onClick={() => onChange({ thickness: thick.name as any })}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 ring-1 ring-sky-500 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{thick.name}</p>
                        <p className="text-[11px] text-slate-600">{thick.description}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-sky-700 ml-2 flex-shrink-0">
                        {thick.price === 0 ? 'Standard' : `+$${thick.price}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TRACTION & INSCRIPTION */}
        {activeTab === 'traction' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-3">
                Factory Traction Grip Package
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TRACTION_COMBOS.map((combo) => {
                  const isSelected = config.tractionPadType.includes(combo.name.split(' ')[0]) || (combo.id === 'none' && config.tractionPadType === 'Bare Wax Ready');
                  return (
                    <div
                      key={combo.id}
                      onClick={() => onChange({
                        tractionPadType: (combo.id === 'combo' ? 'Full Deck Combo' : combo.id === 'tail-only' ? 'Tail Pad Only' : combo.id === 'arch-only' ? 'Arch Bar + 3-Piece Tail' : 'Bare Wax Ready')
                      })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 ring-1 ring-sky-500 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">{combo.name}</span>
                        {combo.tag && (
                          <span className="text-[9px] font-mono font-bold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">
                            {combo.tag}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-sky-700 font-bold block mt-2">
                        {combo.price === 0 ? '$0' : `+$${combo.price}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {config.tractionPadType !== 'Bare Wax Ready' && (
              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Traction Pad Colorway
                </label>
                <div className="flex flex-wrap gap-2">
                  {TRACTION_COLORS.map((tc) => (
                    <button
                      key={tc.name}
                      onClick={() => onChange({ tractionColor: tc.hex })}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 ${
                        config.tractionColor === tc.hex
                          ? 'bg-sky-50 border-sky-500 text-slate-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: tc.hex }} />
                      <span>{tc.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Rider Name Stamp */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-xs font-mono uppercase text-slate-700 font-bold block">
                Custom Rider Name / Deck Inscription (Free)
              </label>
              <input
                type="text"
                maxLength={24}
                placeholder="e.g. SAINT JOE #042 // SHREDDER"
                value={config.riderNameStamp}
                onChange={(e) => onChange({ riderNameStamp: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
              <span className="text-[10px] text-slate-500 font-mono block">
                Laser-etched underneath the top resin gloss coat in Tacloban City, Philippines, 6500.
              </span>
            </div>
          </div>
        )}

        {/* TAB 6: SUMMARY & SPEC CONFIRMATION */}
        {activeTab === 'summary' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 uppercase">Board Outline</span>
                <span className="text-slate-900 font-bold">{config.shapeName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 uppercase">Core & Layup</span>
                <span className="text-sky-700 font-bold">{config.coreMaterial}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 uppercase">Rocker & Foil</span>
                <span className="text-slate-900 font-bold">{config.rocker} ({config.thickness})</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 uppercase">Resin Style</span>
                <span className="text-slate-900 font-bold">{config.deckStyle}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 uppercase">Traction Grip</span>
                <span className="text-slate-900 font-bold">{config.tractionPadType}</span>
              </div>
              {config.riderNameStamp && (
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 uppercase">Rider Inscription</span>
                  <span className="text-slate-900 font-bold">{config.riderNameStamp}</span>
                </div>
              )}
            </div>

            {/* Rush Build Option */}
            <div
              onClick={() => onChange({ rushBuild: !config.rushBuild })}
              className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between ${
                config.rushBuild ? 'bg-amber-50 border-amber-500 text-amber-950' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Priority Express Shaping (+ $50)</p>
                  <p className="text-[10px] text-slate-500 font-mono">Dispatches in 5 business days instead of 14</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${config.rushBuild ? 'bg-amber-500 text-white border-amber-500' : 'border-slate-300 bg-white'}`}>
                {config.rushBuild && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-[11px] text-sky-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>Includes Lifetime Delamination Warranty & Saint Joe Factory Authenticity Certificate.</span>
            </div>
          </div>
        )}

      </div>

      {/* Footer Navigation & Add to Cart */}
      <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4 mt-6">
        
        {/* Prev / Next Step Buttons */}
        <div className="flex items-center gap-2">
          {activeTab !== 'shape' && (
            <button
              onClick={() => {
                const idx = tabs.findIndex(t => t.id === activeTab);
                if (idx > 0) setActiveTab(tabs[idx - 1].id as any);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              ← Back
            </button>
          )}

          {activeTab !== 'summary' ? (
            <button
              onClick={() => {
                const idx = tabs.findIndex(t => t.id === activeTab);
                if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id as any);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-mono font-bold flex items-center gap-1.5 border border-slate-200"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4 text-sky-600" />
            </button>
          ) : null}
        </div>

        {/* Master CTA: Add Custom Board to Quiver */}
        <button
          onClick={onAddToCart}
          className="flex-1 max-w-xs inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-sm uppercase tracking-wider transition-all shadow-md"
        >
          <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
          <span>Add Custom to Quiver (${calculatedPrice})</span>
        </button>

      </div>

    </div>
  );
};
