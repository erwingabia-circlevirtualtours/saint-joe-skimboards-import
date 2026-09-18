import React, { useState, useMemo } from 'react';
import {
  Gauge,
  Sliders,
  Waves,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Ruler,
  Scale,
  Calculator,
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Zap
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const SizingCalculator: React.FC = () => {
  // Height state: stored internally in inches (e.g. 70 = 5'10")
  const [heightInches, setHeightInches] = useState<number>(70);
  const [heightUnit, setHeightUnit] = useState<'ft-in' | 'cm'>('ft-in');

  // Weight state: stored internally in lbs or kg
  const [weight, setWeight] = useState<number>(165);
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');

  const [waveType, setWaveType] = useState<'shorebreak' | 'sandbar' | 'flatland'>('shorebreak');
  const [skill, setSkill] = useState<'beginner' | 'intermediate' | 'pro'>('intermediate');
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(true);

  // Normalise values
  const weightLbs = unit === 'kg' ? Math.round(weight * 2.20462) : weight;
  const weightKg = unit === 'kg' ? weight : +(weight / 2.20462).toFixed(1);

  // Height display calculations
  const feet = Math.floor(heightInches / 12);
  const remainingInches = heightInches % 12;
  const heightCm = Math.round(heightInches * 2.54);

  // 1. Skimboard Length = 75% rider height rounded to the next whole number in inches
  const computedLengthInches = Math.ceil(heightInches * 0.75);

  // 2. Skimboard Width = 19-22 inches, 40kgs below 19inches. 0.5 inch increment per 10kg body weight.
  const computedWidthInches = useMemo(() => {
    if (weightKg <= 40) {
      return 19.0;
    }
    const weightAbove40 = weightKg - 40;
    const increment = (weightAbove40 / 10) * 0.5;
    const result = 19.0 + increment;
    return Math.min(22.0, +result.toFixed(1));
  }, [weightKg]);

  const recommendation = useMemo(() => {
    let sizeCategory = 'Medium';
    let sizeDimensions = '51.5" x 20.25"';
    let thickness = '5/8" (Razor Thin Carve)';
    let recommendedModelId = 'saint-apex-pro';

    if (computedLengthInches <= 46 || weightKg < 45) {
      sizeCategory = 'Grom / Junior';
      sizeDimensions = '44.0" - 48.0" x 18.5" - 19.0"';
      thickness = '5/8" (Lightweight Junior Foil)';
      recommendedModelId = 'saint-joe-foamy';
    } else if (computedLengthInches <= 49 || weightKg < 60) {
      sizeCategory = 'Small (48" - 49")';
      sizeDimensions = '49.0" x 20.0"';
      thickness = waveType === 'flatland' ? '3/4"' : '5/8"';
      recommendedModelId = waveType === 'flatland' ? 'saint-joe-fishtail' : 'saint-apex-pro';
    } else if (computedLengthInches <= 52 || weightKg < 78) {
      sizeCategory = 'Medium (51.5")';
      sizeDimensions = '51.5" x 20.5"';
      thickness = waveType === 'shorebreak' ? '5/8"' : 'Tapered (3/4" to 5/8")';
      recommendedModelId =
        waveType === 'flatland'
          ? 'saint-joe-woody'
          : waveType === 'sandbar'
          ? 'saint-joe-foamy'
          : 'sanctuary-carbon-magnet';
    } else if (computedLengthInches <= 54 || weightKg < 92) {
      sizeCategory = 'Large (53")';
      sizeDimensions = '53.0" x 20.75"';
      thickness = '3/4" (Maximum Glide Float)';
      recommendedModelId = 'sanctuary-carbon-magnet';
    } else {
      sizeCategory = 'X-Large (55"+)';
      sizeDimensions = '55.0" x 21.25" - 22.0"';
      thickness = '3/4" (Full Volume Distance Core)';
      recommendedModelId = 'sanctuary-carbon-magnet';
    }

    const matchedBoard = PRODUCTS.find((p) => p.id === recommendedModelId) || PRODUCTS[0];

    return {
      sizeCategory,
      sizeDimensions,
      thickness,
      board: matchedBoard,
      rocker: waveType === 'shorebreak' ? '2.15" Ocean Steep Nose' : '1.85" Low Drag Flatland',
      reason: `At ${heightInches}" tall (${feet}'${remainingInches}") and ${weight} ${unit.toUpperCase()} (${weightKg} kg), your exact theoretical shape is ${computedLengthInches}" × ${computedWidthInches}". Paired with ${thickness} foil for ${waveType}, this delivers maximum planing speed without nose-diving.`,
    };
  }, [computedLengthInches, computedWidthInches, heightInches, feet, remainingInches, weight, unit, weightKg, waveType, skill]);

  const handleApplyToCustomizer = () => {
    // Notify Customizer
    window.dispatchEvent(
      new CustomEvent('saintjoe-set-custom-size', {
        detail: {
          sizeName: recommendation.sizeCategory,
          computedLength: computedLengthInches,
          computedWidth: computedWidthInches,
        },
      })
    );
    // Scroll smoothly to customizer
    const customizerEl = document.getElementById('custom-builder');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="size-finder" className="py-20 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold uppercase tracking-widest text-sky-800">
            <Calculator className="w-3.5 h-3.5" />
            <span>Saint Joe Hydrodynamic Sizing Engine</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-slate-900">
            FIND YOUR <span className="text-sky-600">EXACT SIZING</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our shaper calculation decouples <strong>rider height</strong> (for length & drop stance) from <strong>rider weight</strong> (for width & hydrodynamic planing lift). Dial in your metrics below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Controls on Left */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            
            {/* 1. Rider Height Input */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-sky-600" />
                  <span>Rider Height</span>
                  <span className="text-[10px] font-normal text-slate-500 font-mono">(Determines Length)</span>
                </label>
                
                {/* Unit Switcher */}
                <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200 text-xs font-mono">
                  <button
                    onClick={() => setHeightUnit('ft-in')}
                    className={`px-2.5 py-0.5 rounded transition-colors ${
                      heightUnit === 'ft-in' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    FT / IN
                  </button>
                  <button
                    onClick={() => setHeightUnit('cm')}
                    className={`px-2.5 py-0.5 rounded transition-colors ${
                      heightUnit === 'cm' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    CM
                  </button>
                </div>
              </div>

              {/* Display Box */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Rider Stature</span>
                  <span className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                    {heightUnit === 'ft-in' ? (
                      <>
                        {feet}&apos;{remainingInches}&quot;{' '}
                        <span className="text-sm font-mono text-slate-500">({heightInches}&quot;)</span>
                      </>
                    ) : (
                      <>
                        {heightCm}{' '}
                        <span className="text-sm font-mono text-slate-500">cm ({heightInches}&quot;)</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-sky-700 font-bold block uppercase">75% Height Rule</span>
                  <span className="text-sm font-mono font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                    → {computedLengthInches}&quot; Length
                  </span>
                </div>
              </div>

              {/* Slider (Inches from 48 to 78) */}
              <input
                type="range"
                min={48}
                max={78}
                step={1}
                value={heightInches}
                onChange={(e) => setHeightInches(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>4&apos;0&quot; (122 cm)</span>
                <span>5&apos;8&quot; (173 cm)</span>
                <span>6&apos;6&quot; (198 cm)</span>
              </div>
            </div>

            {/* 2. Rider Weight Input */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-sky-600" />
                  <span>Rider Body Weight</span>
                  <span className="text-[10px] font-normal text-slate-500 font-mono">(Determines Width)</span>
                </label>
                
                {/* Unit Switcher */}
                <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200 text-xs font-mono">
                  <button
                    onClick={() => {
                      if (unit === 'kg') {
                        setWeight(Math.round(weight * 2.20462));
                        setUnit('lbs');
                      }
                    }}
                    className={`px-2.5 py-0.5 rounded transition-colors ${
                      unit === 'lbs' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
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
                    className={`px-2.5 py-0.5 rounded transition-colors ${
                      unit === 'kg' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    KG
                  </button>
                </div>
              </div>

              {/* Slider & Big Display */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Current Weight</span>
                  <span className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                    {weight}{' '}
                    <span className="text-sm font-mono text-slate-500">
                      {unit.toUpperCase()} ({unit === 'lbs' ? `${weightKg} kg` : `${weightLbs} lbs`})
                    </span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-sky-700 font-bold block uppercase">Planing Lift Formula</span>
                  <span className="text-sm font-mono font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                    → {computedWidthInches}&quot; Width
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={unit === 'lbs' ? 70 : 32}
                max={unit === 'lbs' ? 240 : 110}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>{unit === 'lbs' ? '70 lbs (32 kg)' : '32 kg (70 lbs)'}</span>
                <span>{unit === 'lbs' ? '155 lbs (70 kg)' : '70 kg (155 lbs)'}</span>
                <span>{unit === 'lbs' ? '240 lbs (110 kg)' : '110 kg (240 lbs)'}</span>
              </div>
            </div>

            {/* 3. Wave Conditions */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 block mb-2.5">
                Primary Beach Wave Conditions
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'shorebreak', name: 'Shorebreak', desc: 'Steep Dump / Wraps' },
                  { id: 'sandbar', name: 'Sandbars', desc: 'Lining Waves & Flats' },
                  { id: 'flatland', name: 'Flatland / Mush', desc: 'Maximum Distance' },
                ].map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWaveType(w.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      waveType === w.id
                        ? 'bg-sky-50 border-sky-500 ring-1 ring-sky-500 text-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-bold block text-slate-900">{w.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{w.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Experience Level */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 block mb-2.5">
                Rider Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'beginner', label: 'Beginner', desc: 'Drop & Slide' },
                  { id: 'intermediate', label: 'Intermediate', desc: 'Turning on Waves' },
                  { id: 'pro', label: 'Pro / Expert', desc: 'Air & Deep Barrels' },
                ].map((sk) => (
                  <button
                    key={sk.id}
                    onClick={() => setSkill(sk.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      skill === sk.id
                        ? 'bg-sky-50 border-sky-500 ring-1 ring-sky-500 text-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-bold block text-slate-900">{sk.label}</span>
                    <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{sk.desc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Recommendation Output Card on Right */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden space-y-6">
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-800 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Calculated Optimal Dimensions
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  PRECISION FIT
                </span>
              </div>

              {/* Exact Formula vs Tier Output Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Calculated Length */}
                <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-sky-800 block uppercase font-bold">TARGET LENGTH</span>
                    <span className="text-[9px] font-mono text-sky-600 font-bold">75% Height</span>
                  </div>
                  <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 block mt-1">
                    {computedLengthInches}&quot;
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                    Aligns with chest / collarbone
                  </span>
                </div>

                {/* Calculated Width */}
                <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-sky-800 block uppercase font-bold">TARGET WIDTH</span>
                    <span className="text-[9px] font-mono text-sky-600 font-bold">19&quot;–22&quot; Rule</span>
                  </div>
                  <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 block mt-1">
                    {computedWidthInches}&quot;
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                    {weightKg <= 40 ? 'Base 19.0" width' : `+${((weightKg - 40) / 10 * 0.5).toFixed(1)}" above 40kg`}
                  </span>
                </div>
              </div>

              {/* Closest Standard Size Tier & Foil */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">RECOMMENDED SIZE TIER</span>
                  <span className="font-display font-black text-lg sm:text-xl text-slate-900 block mt-1">
                    {recommendation.sizeCategory}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                    Tier standard: {recommendation.sizeDimensions}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">FOIL THICKNESS</span>
                  <span className="font-display font-black text-lg sm:text-xl text-sky-700 block mt-1">
                    {recommendation.thickness.split(' ')[0]}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                    {recommendation.rocker}
                  </span>
                </div>
              </div>

              {/* Shaper Logic */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-xs text-slate-700 leading-relaxed font-mono">
                  <span className="text-sky-700 font-bold">SHAPER LOGIC: </span>
                  {recommendation.reason}
                </p>
              </div>

              {/* Matched Product Preview */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-sky-700 p-1 overflow-hidden">
                    <img
                      src={recommendation.board.image || '/saintjoeskim_logo_black.png'}
                      alt="Saint Joe Skimboard"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-sky-700 font-bold uppercase block">RECOMMENDED MODEL</span>
                    <h4 className="font-display font-black text-base text-slate-900">{recommendation.board.name}</h4>
                    <p className="text-xs text-slate-500 font-mono">${recommendation.board.price} USD</p>
                  </div>
                </div>

                <a
                  href="#catalog"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase font-mono hover:bg-slate-800 transition-colors flex items-center gap-1 flex-shrink-0 shadow-sm"
                >
                  <span>View</span> <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Bottom Customizer Link */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-600">
              <span>Apply custom dimensions to our studio:</span>
              <button
                onClick={handleApplyToCustomizer}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-500 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Customize {computedLengthInches}&quot; × {computedWidthInches}&quot; Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* Dedicated Computation Explanation Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold uppercase">
                  Technical Shaper Documentation
                </span>
                <span className="text-xs font-mono text-sky-600 font-bold">Math & Hydrodynamics</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-1 uppercase tracking-tight">
                How We Compute Skimboard Size
              </h3>
            </div>

            <button
              onClick={() => setShowFormulaDetails(!showFormulaDetails)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-3.5 py-2 rounded-xl border border-sky-200 transition-colors self-start sm:self-auto"
            >
              <span>{showFormulaDetails ? 'Hide Formulas' : 'Expand Formulas'}</span>
              {showFormulaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showFormulaDetails && (
            <div className="pt-6 space-y-8 animate-fade-in">
              
              {/* The Two Primary Equations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Length Rule */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-sky-800 bg-sky-100 px-2.5 py-1 rounded-md">
                      RULE 1: SKIMBOARD LENGTH
                    </span>
                    <span className="text-xs font-mono text-slate-500">Ergonomics & Stance</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 font-mono text-sm text-slate-900 font-bold">
                    Length (inches) = ⌈ Rider Height (in) × 0.75 ⌉
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Why 75% of Rider Height?</strong> When a skimboard is propped vertically on the sand beside the rider, the tip reaches naturally between the <strong>sternum and collarbone</strong>.
                  </p>
                  
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-mono">
                    <li>Prevents the lead knee from clipping the nose on high-speed sprint drops.</li>
                    <li>Matches natural stride and foot spread for maximum pop and back-foot leverage.</li>
                    <li>Rounds to the next whole inch (e.g., 68&quot; × 0.75 = 51&quot;).</li>
                  </ul>
                </div>

                {/* 2. Width Rule */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-sky-800 bg-sky-100 px-2.5 py-1 rounded-md">
                      RULE 2: SKIMBOARD WIDTH
                    </span>
                    <span className="text-xs font-mono text-slate-500">Hydrodynamic Planing Lift</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 font-mono text-sm text-slate-900 font-bold">
                    Width = 19.0&quot; base (≤40kg) + 0.5&quot; per 10kg body weight (max 22.0&quot;)
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Why scale width by rider weight?</strong> Skimboarding relies on surface-tension displacement across a thin layer of water.
                  </p>

                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-mono">
                    <li><strong>40 kg and below:</strong> 19.0&quot; beam provides effortless float without excessive bulk.</li>
                    <li><strong>+0.5&quot; per 10 kg:</strong> Compensates for downward hydrostatic pressure to maintain plane.</li>
                    <li><strong>Capped at 22.0&quot;:</strong> Preserves razor-sharp rail transition into steep shorebreak barrels.</li>
                  </ul>
                </div>

              </div>

              {/* Reference Dimension Table */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Standard Dimension Benchmark Reference Matrix
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                      <tr>
                        <th className="py-3 px-4">Rider Height</th>
                        <th className="py-3 px-4">Rider Weight</th>
                        <th className="py-3 px-4 text-sky-700">Target Length (75%)</th>
                        <th className="py-3 px-4 text-sky-700">Target Width (19-22&quot;)</th>
                        <th className="py-3 px-4">Standard Tier Match</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-600 bg-white">
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-900">4&apos;10&quot; - 5&apos;2&quot; (58&quot; - 62&quot;)</td>
                        <td className="py-2.5 px-4">&lt; 40 kg (&lt; 88 lbs)</td>
                        <td className="py-2.5 px-4 font-bold text-sky-700">44&quot; - 47&quot;</td>
                        <td className="py-2.5 px-4 font-bold text-sky-700">18.5&quot; - 19.0&quot;</td>
                        <td className="py-2.5 px-4">Grom / Junior (Disciple)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-900">5&apos;3&quot; - 5&apos;5&quot; (63&quot; - 65&quot;)</td>
                        <td className="py-2.5 px-4">50 kg (110 lbs)</td>
                        <td className="py-2.5 px-4 font-bold text-sky-700">48&quot; - 49&quot;</td>
                        <td className="py-2.5 px-4 font-bold text-sky-700">19.5&quot;</td>
                        <td className="py-2.5 px-4">Small (48.0&quot; × 19.5&quot;)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-900">5&apos;6&quot; - 5&apos;9&quot; (66&quot; - 69&quot;)</td>
                        <td className="py-2.5 px-4">65 kg (143 lbs)</td>
                        <td className="py-2.5 px-4 font-bold text-sky-700">50&quot; - 52&quot;</td>
                        <td className="py-2.5 px-4 font-bold text-sky-700">20.25&quot;</td>
                        <td className="py-2.5 px-4">Medium (51.5&quot; × 20.25&quot;)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-900">5&apos;10&quot; - 6&apos;0&quot; (70&quot; - 72&quot;)</td>
                        <td className="py-2.5 px-4">75 - 80 kg (165 - 176 lbs)</td>
                        <td className="py-2.5 px-4 font-bold text-sky-700">53&quot; - 54&quot;</td>
                        <td className="py-2.5 px-4 font-bold text-sky-700">20.75&quot; - 21.0&quot;</td>
                        <td className="py-2.5 px-4">Large (53.0&quot; × 20.75&quot;)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-900">6&apos;1&quot;+ (73&quot;+)</td>
                        <td className="py-2.5 px-4">90+ kg (198+ lbs)</td>
                        <td className="py-2.5 px-4 font-bold text-sky-700">55&quot; - 56&quot;</td>
                        <td className="py-2.5 px-4 font-bold text-sky-700">21.5&quot; - 22.0&quot;</td>
                        <td className="py-2.5 px-4">X-Large (55.0&quot; × 21.25&quot;+)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};

