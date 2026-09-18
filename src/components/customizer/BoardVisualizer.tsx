import React, { useState } from 'react';
import { CustomBoardConfig } from '../../types';
import { RotateCw, Eye, Sparkles, Check, ZoomIn } from 'lucide-react';

interface BoardVisualizerProps {
  config: CustomBoardConfig;
  calculatedPrice: number;
}

export const BoardVisualizer: React.FC<BoardVisualizerProps> = ({
  config,
  calculatedPrice,
}) => {
  const [viewSide, setViewSide] = useState<'top' | 'bottom'>('top');

  // Determine SVG Board Path based on Shape
  const getBoardPath = () => {
    switch (config.tailShape) {
      case 'Fishtail':
        // Fish Tail outline
        return "M 150 20 C 230 40, 260 180, 255 380 C 250 490, 240 560, 220 590 L 150 540 L 80 590 C 60 560, 50 490, 45 380 C 40 180, 70 40, 150 20 Z";
      case 'Pro Shape':
      default:
        // Authentic Saint Pro Shape outline: forward wide point (41.5% at y=260), elongated tapered nose, pro shape rails
        return "M 150 16 C 168 35, 212 90, 242 165 C 258 205, 265 235, 265 260 C 265 315, 258 385, 242 455 C 226 515, 195 565, 168 588 C 158 597, 153 603, 150 604 C 147 603, 142 597, 132 588 C 105 565, 74 515, 58 455 C 42 385, 35 315, 35 260 C 35 235, 42 205, 58 165 C 88 90, 132 35, 150 16 Z";
    }
  };

  const isCarbonLayup = config.coreMaterial.includes('Carbon') || config.coreMaterial.includes('Kevlar');

  return (
    <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-3xl p-6 relative overflow-hidden shadow-lg">
      
      {/* Background Ambient Aura */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-15 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: config.deckColor }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-15 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: config.deckAccentColor }}
      />

      {/* Top Header inside Studio */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-slate-200 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-700">
            Live Spec Render // 2D CAD Preview
          </span>
        </div>

        {/* View Switcher: Top Deck vs Bottom Slick */}
        <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
          <button
            onClick={() => setViewSide('top')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              viewSide === 'top'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            TOP DECK
          </button>
          <button
            onClick={() => setViewSide('bottom')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              viewSide === 'bottom'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            BOTTOM SLICK
          </button>
        </div>
      </div>

      {/* Interactive Board Canvas */}
      <div className="relative my-6 py-4 flex items-center justify-center w-full min-h-[460px] sm:min-h-[520px]">
        
        {/* Glow Shadow beneath board */}
        <div
          className="absolute w-52 h-[440px] rounded-[60px] blur-2xl opacity-35 transition-all duration-500 pointer-events-none"
          style={{
            background: viewSide === 'top'
              ? (config.shapeId === 'pro-shape' ? '#00f0ff' : `linear-gradient(180deg, ${config.deckColor} 0%, ${config.deckAccentColor} 100%)`)
              : config.bottomColor
          }}
        />

        {(config.shapeId === 'pro-shape' || config.shapeId === 'fishtail' || config.shapeId === 'dude-cruise') && viewSide === 'top' ? (
          /* Authentic Workshop Board Photo (Uniform Pro Shape or Fishtail) */
          <div className="relative z-10 w-64 sm:w-72 md:w-80 h-[460px] sm:h-[500px] flex items-center justify-center transition-all duration-500 transform hover:scale-[1.02]">
            <img
              src={
                config.shapeId === 'fishtail' || config.shapeId === 'dude-cruise' || config.tailShape === 'Fishtail'
                  ? '/saint_joe_fishtail.png'
                  : config.coreMaterial.includes('Carbon') || config.coreMaterial.includes('Kevlar')
                  ? '/saint_joe_double_carbon.png'
                  : '/saint_joe_foamy.png'
              }
              alt={config.shapeId === 'fishtail' || config.shapeId === 'dude-cruise' || config.tailShape === 'Fishtail' ? 'Saint Joe Fishtail Skimboard' : 'Saint Joe Pro Shape Skimboard'}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] select-none pointer-events-none"
            />

            {/* Custom Rider Name Stamp (only when entered by user) */}
            {config.riderNameStamp && (
              <div className="absolute top-[64%] inset-x-0 text-center pointer-events-none">
                <span className="font-mono font-bold text-[11px] text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase block">
                  {config.riderNameStamp}
                </span>
                <span className="font-mono text-[8px] text-slate-300 tracking-wider block">
                  CUSTOM SHAPED // SAINT JOE
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Vector CAD SVG Canvas for Bottom Slick & Other Custom Outlines */
          <svg
            viewBox="0 0 300 620"
            className="w-64 sm:w-72 md:w-80 h-auto max-h-[500px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] filter transition-all duration-500 transform hover:scale-[1.02]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Dynamic Deck Gradients */}
              <linearGradient id="deckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={viewSide === 'top' ? config.deckColor : config.bottomColor} />
                <stop offset="60%" stopColor={viewSide === 'top' ? config.deckAccentColor : config.bottomColor} />
                <stop offset="100%" stopColor={viewSide === 'top' ? config.deckColor : config.bottomColor} />
              </linearGradient>

              <linearGradient id="resinSwirl" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor={config.deckColor} stopOpacity="0.9" />
                <stop offset="35%" stopColor={config.deckAccentColor} stopOpacity="0.8" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor={config.deckColor} stopOpacity="0.95" />
              </linearGradient>

              {/* Carbon Fiber Pattern Grid */}
              <pattern id="carbonGrid" width="6" height="6" patternUnits="userSpaceOnUse">
                <rect width="6" height="6" fill="#0c0e14" />
                <path d="M 0 0 L 3 3 M 3 0 L 0 3" stroke="#252d3d" strokeWidth="0.8" />
                <path d="M 3 3 L 6 6 M 6 3 L 3 6" stroke="#1a202c" strokeWidth="0.8" />
              </pattern>

              {/* Traction Diamond Texture */}
              <pattern id="tractionGrip" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 0 4 L 4 0 L 8 4 L 4 8 Z" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="0.75" />
              </pattern>

              {/* Board Spec Clip Path */}
              <clipPath id="boardClip">
                <path d={getBoardPath()} />
              </clipPath>
            </defs>

            {/* Board Main Body Base */}
            <path
              d={getBoardPath()}
              fill="url(#deckGradient)"
              stroke={config.carbonRails ? '#05070a' : config.railColor}
              strokeWidth={config.carbonRails ? '4' : '2'}
              className="transition-all duration-300"
            />

            {/* Layer inside board clip path */}
            <g clipPath="url(#boardClip)">
              {/* Carbon Weave under-layer if Carbon chosen */}
              {isCarbonLayup && (
                <rect
                  x="0"
                  y="0"
                  width="300"
                  height="620"
                  fill="url(#carbonGrid)"
                  opacity={viewSide === 'top' ? '0.35' : '0.6'}
                />
              )}

              {/* Artistic Resin Wave Effect if Swirl selected */}
              {viewSide === 'top' && config.deckStyle.includes('Swirl') && (
                <path
                  d="M 20 200 Q 150 280 280 180 Q 200 420 50 480 Z"
                  fill="url(#resinSwirl)"
                  opacity="0.7"
                />
              )}

              {/* Center Carbon Stringer */}
              {config.carbonStringer && (
                <rect
                  x="146"
                  y="10"
                  width="8"
                  height="590"
                  fill="#000000"
                  opacity="0.85"
                  stroke="#00f0ff"
                  strokeWidth="0.5"
                />
              )}

              {/* Rail Carbon Tape Overlay */}
              {config.carbonRails && (
                <path
                  d={getBoardPath()}
                  fill="none"
                  stroke="#080a0f"
                  strokeWidth="6"
                  opacity="0.8"
                />
              )}

              {/* TOP DECK ONLY: Saint Joe Stamped Emblem */}
              {config.includeSaintJoeLogo && (
                <g transform="translate(112, 220)" opacity="0.95">
                  <image
                    href={
                      config.deckColor.toLowerCase() === '#ffffff' || config.deckColor.toLowerCase() === '#f8fafc'
                        ? '/saintjoeskim_logo_black.png'
                        : '/saintjoeskim_logo_white.png'
                    }
                    x="0"
                    y="0"
                    width="76"
                    height="76"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </g>
              )}

              {/* TOP DECK ONLY: Traction Pads */}
              {viewSide === 'top' && config.tractionPadType !== 'Bare Wax Ready' && (
                <g id="tractionGroup">
                  {/* Center Arch Bar */}
                  {(config.tractionPadType === 'Full Deck Combo' || config.tractionPadType === 'Arch Bar + 3-Piece Tail') && (
                    <g transform="translate(138, 120)">
                      <rect
                        x="0"
                        y="0"
                        width="24"
                        height="230"
                        rx="8"
                        fill={config.tractionColor}
                        stroke="#000000"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="0"
                        y="0"
                        width="24"
                        height="230"
                        rx="8"
                        fill="url(#tractionGrip)"
                      />
                      {[...Array(12)].map((_, i) => (
                        <line
                          key={i}
                          x1="4"
                          y1={15 + i * 18}
                          x2="20"
                          y2={15 + i * 18}
                          stroke="rgba(0,0,0,0.5)"
                          strokeWidth="1.5"
                        />
                      ))}
                    </g>
                  )}

                  {/* 3-Piece Kick Tail Pad */}
                  {(config.tractionPadType === 'Full Deck Combo' || config.tractionPadType === 'Arch Bar + 3-Piece Tail' || config.tractionPadType === 'Tail Pad Only') && (
                    <g transform="translate(85, 410)">
                      <path
                        d="M 5 20 C 15 10, 35 10, 40 15 L 38 120 C 25 110, 10 90, 5 70 Z"
                        fill={config.tractionColor}
                        stroke="#000000"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="45"
                        y="15"
                        width="40"
                        height="115"
                        rx="4"
                        fill={config.tractionColor}
                        stroke="#000000"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 125 20 C 115 10, 95 10, 90 15 L 92 120 C 105 110, 120 90, 125 70 Z"
                        fill={config.tractionColor}
                        stroke="#000000"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="45"
                        y="105"
                        width="40"
                        height="25"
                        rx="3"
                        fill="#000000"
                        opacity="0.3"
                      />
                    </g>
                  )}
                </g>
              )}

              {/* Custom Rider Name Engraving / Decal */}
              {config.riderNameStamp && (
                <g transform="translate(150, 350)">
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fill={viewSide === 'top' ? '#ffffff' : '#00f0ff'}
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="bold"
                    letterSpacing="2"
                    filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.8))"
                  >
                    {config.riderNameStamp.toUpperCase()}
                  </text>
                  <text
                    x="0"
                    y="12"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="7"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    CUSTOM SHAPED // SAINT JOE
                  </text>
                </g>
              )}

              {/* Bottom Slick Channel Watermark (Bottom View) */}
              {viewSide === 'bottom' && (
                <g transform="translate(110, 180)" opacity="0.4">
                  <text
                    x="40"
                    y="120"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="14"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="900"
                    letterSpacing="4"
                  >
                    SAINT JOE
                  </text>
                  <text
                    x="40"
                    y="136"
                    textAnchor="middle"
                    fill="#00f0ff"
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="2"
                  >
                    {config.coreMaterial.toUpperCase()}
                  </text>
                </g>
              )}

              {/* High-Gloss Light Sheen / Glass Reflection Curve */}
              <path
                d="M 50 50 Q 150 15 250 50 Q 150 350 45 420 Z"
                fill="white"
                opacity="0.08"
                pointerEvents="none"
              />
            </g>
          </svg>
        )}

        {/* Floating Spec Tags */}
        <div className="absolute top-4 left-4 bg-white/95 border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] font-mono shadow-md z-20">
          <span className="text-slate-500 block text-[9px] uppercase tracking-wider">SHAPE OUTLINE</span>
          <span className="text-sky-700 font-bold block">{config.shapeName}</span>
          <span className="text-[9px] text-slate-500 font-mono block mt-0.5">WP: +2.5" FORWARD</span>
        </div>

        <div className="absolute top-4 right-4 bg-white/95 border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] font-mono shadow-md text-right z-20">
          <span className="text-slate-500 block text-[9px] uppercase tracking-wider">EDITION ID</span>
          <span className="text-slate-900 font-bold block">{config.tailShape === 'Fishtail' ? 'SAINT JOE FISHTAIL' : 'PRO SHAPE'}</span>
          <span className="text-[9px] text-emerald-600 font-mono block mt-0.5">{config.tailShape === 'Fishtail' ? 'V-NOTCH SHAPE' : 'WORKSHOP SHAPE SPEC'}</span>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/95 border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] font-mono shadow-md z-20">
          <span className="text-slate-500 block text-[9px] uppercase tracking-wider">TAIL PROFILE</span>
          <span className="text-slate-900 font-bold block">{config.tailShape === 'Fishtail' ? 'Fishtail' : 'Pro Shape'}</span>
          <span className="text-[9px] text-slate-500 font-mono block mt-0.5">{config.tailShape === 'Fishtail' ? 'Hydrodynamic V-Release' : 'Smooth Continuous Taper'}</span>
        </div>

        <div className="absolute bottom-4 right-4 bg-white/95 border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] font-mono shadow-md text-right z-20">
          <span className="text-slate-500 block text-[9px] uppercase tracking-wider">CORE THICKNESS</span>
          <span className="text-sky-700 font-bold block">5/8" Tapered Foil</span>
          <span className="text-[9px] text-slate-500 font-mono block mt-0.5">High Density Divinycell</span>
        </div>

      </div>

      {/* Live Estimated Price Bar */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between z-10 shadow-sm">
        <div>
          <span className="text-[11px] font-mono text-slate-500 block uppercase">Total Custom Investment</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-2xl sm:text-3xl text-slate-900">
              ${calculatedPrice}
            </span>
            <span className="text-xs font-mono text-emerald-600 font-bold">
              FREE SHIPPING ELIGIBLE
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-2 py-1 rounded border border-sky-200 block font-bold">
            10-14 DAYS LEAD TIME
          </span>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
            Handcrafted in Tacloban City, Philippines, 6500
          </span>
        </div>
      </div>

    </div>
  );
};
