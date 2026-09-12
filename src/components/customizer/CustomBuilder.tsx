import React, { useState, useMemo } from 'react';
import { CustomBoardConfig } from '../../types';
import { BoardVisualizer } from './BoardVisualizer';
import { CustomizerControls } from './CustomizerControls';
import { SHAPES, CORE_LAYUPS, SIZES, THICKNESS_OPTIONS, ROCKER_OPTIONS, TRACTION_COMBOS } from '../../data/customizerOptions';
import { useCart } from '../../context/CartContext';
import { Sliders, Sparkles, Share2, RotateCcw, Check, Zap } from 'lucide-react';

export const CustomBuilder: React.FC = () => {
  const { addToCart } = useCart();

  const defaultConfig: CustomBoardConfig = {
    shapeId: 'pro-shape',
    shapeName: 'Saint Pro Shape (Pin Tail)',
    tailShape: 'Pin Tail',
    size: 'Medium (51.5")',
    thickness: '5/8"',
    coreMaterial: 'Double Carbon Epoxy',
    deckStyle: 'Acid Wash Gradient',
    deckColor: '#0066ff',
    deckAccentColor: '#00f0ff',
    bottomColor: '#0a0c10',
    railColor: '#00f0ff',
    carbonRails: true,
    carbonStringer: true,
    rocker: 'Standard Ocean Rocker',
    tractionPadType: 'Full Deck Combo',
    tractionColor: '#11141b',
    riderNameStamp: 'SAINT JOE #001',
    includeSaintJoeLogo: true,
    rushBuild: false,
    notes: '',
  };

  const [config, setConfig] = useState<CustomBoardConfig>(defaultConfig);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleConfigChange = (updates: Partial<CustomBoardConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  // Calculate live price based on selections
  const calculatedPrice = useMemo(() => {
    const selectedShape = SHAPES.find(s => s.id === config.shapeId) || SHAPES[0];
    let total = selectedShape.basePrice;

    // Core Layup
    const core = CORE_LAYUPS.find(c => 
      (c.id === 'double-carbon' && config.coreMaterial === 'Double Carbon Epoxy') ||
      (c.id === 'kevlar-weave' && config.coreMaterial === 'Kevlar Pro Weave') ||
      (c.id === 'aerospace-s-glass' && config.coreMaterial === 'Aerospace E-Glass')
    );
    if (core) total += core.price;

    // Size
    const sizeObj = SIZES.find(s => config.size.startsWith(s.name.split(' ')[0]));
    if (sizeObj) total += sizeObj.price;

    // Thickness
    const thickObj = THICKNESS_OPTIONS.find(t => config.thickness.startsWith(t.name.split(' ')[0]));
    if (thickObj) total += thickObj.price;

    // Rocker
    const rockerObj = ROCKER_OPTIONS.find(r => config.rocker.startsWith(r.name.split(' ')[0]));
    if (rockerObj) total += rockerObj.price;

    // Traction
    const tractObj = TRACTION_COMBOS.find(tc => 
      config.tractionPadType.includes(tc.name.split(' ')[0]) || (tc.id === 'none' && config.tractionPadType === 'Bare Wax Ready')
    );
    if (tractObj) total += tractObj.price;

    // Carbon features
    if (config.carbonRails) total += 25;
    if (config.carbonStringer) total += 20;

    // Rush build
    if (config.rushBuild) total += 50;

    return total;
  }, [config]);

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      isCustom: true,
      name: `Custom ${config.shapeName} (${config.size.split(' ')[0]})`,
      price: calculatedPrice,
      image: '/saint-joe-logo.jpg',
      selectedSize: config.size,
      selectedColor: config.deckStyle,
      customConfig: config,
      quantity: 1,
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <section id="custom-builder" className="py-20 bg-brand-dark relative overflow-hidden border-b border-brand-border/60">
      
      {/* Background Accent Lines */}
      <div className="absolute inset-0 opacity-15 tech-hazard-stripes pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-cyan/40 text-xs font-mono font-bold uppercase tracking-widest text-brand-cyan mb-3">
              <Sliders className="w-3.5 h-3.5 text-brand-volt animate-spin" />
              <span>San Clemente Custom Craft Studio</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
              BUILD YOUR <span className="text-gradient-cyan">DREAM BOARD</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetConfig}
              className="px-3.5 py-2 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-cyan text-xs font-mono text-slate-300 hover:text-brand-cyan flex items-center gap-1.5 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-brand-volt" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Config Copied!' : 'Share Setup'}
            </button>
          </div>
        </div>

        {/* Studio Grid: Visualizer on Left, Controls on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 2D Live Spec Render */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <BoardVisualizer
              config={config}
              calculatedPrice={calculatedPrice}
            />
          </div>

          {/* Right: Step-by-Step Customizer Controls */}
          <div className="lg:col-span-7">
            <CustomizerControls
              config={config}
              onChange={handleConfigChange}
              onAddToCart={handleAddToCart}
              calculatedPrice={calculatedPrice}
            />
          </div>

        </div>

      </div>

    </section>
  );
};
