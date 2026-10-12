import React from 'react';
import {
  X,
  MapPin,
  ExternalLink,
  Layers,
  Compass,
  Ruler,
  Sparkles,
  ShoppingBag,
  FileCode,
  ShieldCheck,
  Star,
  ArrowRight
} from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string, category?: string) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection
}) => {
  if (!isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent, sectionId: string, category?: string) => {
    e.preventDefault();
    onNavigateSection(sectionId, category);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sitemap-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 id="sitemap-modal-title" className="font-display font-black text-lg text-slate-900 tracking-tight flex items-center gap-2">
                SAINT JOE SKiMBOARDS SITEMAP
                <span className="text-[10px] font-mono uppercase bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                  DIRECTORY
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Complete site structure, product models, customizer studio &amp; SEO resources
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close sitemap modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Quick XML Sitemap & SEO Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-sky-50/60 border border-sky-100 rounded-2xl">
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-sky-950 block">Search Engine XML Sitemap</span>
                <span className="text-[11px] text-sky-700 font-mono">Standard sitemaps.org format indexed for Google &amp; search crawlers</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white text-sky-700 hover:text-sky-900 border border-sky-200 rounded-xl hover:bg-sky-50 shadow-2xs transition-all font-mono"
              >
                <span>/sitemap.xml</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs transition-all font-mono"
              >
                <span>/robots.txt</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Sitemaps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            
            {/* Column 1: Storefront & Skimboards */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-display text-sm pb-2 border-b border-slate-100">
                <ShoppingBag className="w-4 h-4 text-sky-600" />
                <h3>Skimboards &amp; Quiver</h3>
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#catalog"
                    onClick={(e) => handleLinkClick(e, 'catalog', 'woody')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Woody Skimboard</span>
                      <p className="text-[11px] text-slate-500 font-mono">$75 USD • Marine Hardwood Core</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#catalog"
                    onClick={(e) => handleLinkClick(e, 'catalog', 'foamy')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Foamy Skimboard</span>
                      <p className="text-[11px] text-slate-500 font-mono">$155 USD • PVC Foamcore + Double E-Glass</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#catalog"
                    onClick={(e) => handleLinkClick(e, 'catalog', 'carbon')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Carbon Fiber Skimboard</span>
                      <p className="text-[11px] text-slate-500 font-mono">$220 USD • Toray 3K Double Carbon</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#catalog"
                    onClick={(e) => handleLinkClick(e, 'catalog', 'all')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Complete Ready-to-Ship Line</span>
                      <p className="text-[11px] text-slate-500 font-mono">Full Tacloban workshop inventory</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Custom Builder Studio */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-display text-sm pb-2 border-b border-slate-100">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <h3>Custom Builder Studio</h3>
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#custom-builder"
                    onClick={(e) => handleLinkClick(e, 'custom-builder')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Pro Shape Builder</span>
                      <p className="text-[11px] text-slate-500 font-mono">Competition profile, tapered rails</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#custom-builder"
                    onClick={(e) => handleLinkClick(e, 'custom-builder')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Fishtail Builder</span>
                      <p className="text-[11px] text-slate-500 font-mono">Dual-pivot swallow tail &amp; V-notch</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#custom-builder"
                    onClick={(e) => handleLinkClick(e, 'custom-builder')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Core Selection</span>
                      <p className="text-[11px] text-slate-500 font-mono">Woody ($75), Foamy ($155), Carbon ($220)</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#custom-builder"
                    onClick={(e) => handleLinkClick(e, 'custom-builder')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Custom Rider Stencil &amp; Tint</span>
                      <p className="text-[11px] text-slate-500 font-mono">Personalized deck stamp &amp; resin colors</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Tech & Sizing */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-display text-sm pb-2 border-b border-slate-100">
                <Layers className="w-4 h-4 text-sky-600" />
                <h3>Tech &amp; Sizing Finder</h3>
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#size-finder"
                    onClick={(e) => handleLinkClick(e, 'size-finder')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Interactive Size Finder</span>
                      <p className="text-[11px] text-slate-500 font-mono">Calculate ideal board length by rider weight</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#tech-anatomy"
                    onClick={(e) => handleLinkClick(e, 'tech-anatomy')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Anatomy &amp; Core Layups</span>
                      <p className="text-[11px] text-slate-500 font-mono">Toray Carbon, PVC, and Marine Hardwood</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#tech-anatomy"
                    onClick={(e) => handleLinkClick(e, 'tech-anatomy')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">5/8" vs 3/4" Thickness Guide</span>
                      <p className="text-[11px] text-slate-500 font-mono">Flex vs float comparison for Philippine waves</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#tech-anatomy"
                    onClick={(e) => handleLinkClick(e, 'tech-anatomy')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Rocker Profiles Breakdown</span>
                      <p className="text-[11px] text-slate-500 font-mono">Continuous curve &amp; flat tail speed</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Spots Guide */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-display text-sm pb-2 border-b border-slate-100">
                <MapPin className="w-4 h-4 text-sky-600" />
                <h3>Philippine Pro Spots</h3>
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#tanauan-leyte"
                    onClick={(e) => handleLinkClick(e, 'tanauan-leyte')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Tanauan Beach, Leyte</span>
                      <p className="text-[11px] text-slate-500 font-mono">Skimboarding Capital of the Philippines</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#dahican-mati"
                    onClick={(e) => handleLinkClick(e, 'dahican-mati')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Dahican Beach, Mati</span>
                      <p className="text-[11px] text-slate-500 font-mono">Skimboarding Capital of Mindanao • Big Wave Arena</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#dulag-leyte"
                    onClick={(e) => handleLinkClick(e, 'dulag-leyte')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Dulag Shorebreak, Leyte</span>
                      <p className="text-[11px] text-slate-500 font-mono">Crisp Peeling Wedges &amp; Sandbar Run-ups</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#pundaquit-magic-left"
                    onClick={(e) => handleLinkClick(e, 'pundaquit-magic-left')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Pundaquit's Magic Left, Zambales</span>
                      <p className="text-[11px] text-slate-500 font-mono">Reef Break • Sweeping Left-Hand Peelers</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#puka-beach-boracay"
                    onClick={(e) => handleLinkClick(e, 'puka-beach-boracay')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-cyan-600">Puka Beach, Boracay</span>
                      <p className="text-[11px] text-slate-500 font-mono">Steep Azure Drop-Off • Puka Shell Shorebreak</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-cyan-600 transition-colors" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Reviews & Community */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-display text-sm pb-2 border-b border-slate-100">
                <Star className="w-4 h-4 text-sky-600" />
                <h3>Reviews &amp; Community</h3>
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#reviews"
                    onClick={(e) => handleLinkClick(e, 'reviews')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Verified Rider Reviews</span>
                      <p className="text-[11px] text-slate-500 font-mono">4.98/5.0 aggregate rating across models</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    onClick={(e) => handleLinkClick(e, 'reviews')}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600">Shaper Guarantee &amp; Warranty</span>
                      <p className="text-[11px] text-slate-500 font-mono">1-Year delamination warranty</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 6: Factory HQ & Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-display text-sm pb-2 border-b border-slate-100">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <h3>Factory HQ &amp; Channels</h3>
              </div>
              <ul className="space-y-2 text-xs">
                <li className="p-2 rounded-xl bg-slate-50">
                  <span className="font-semibold text-slate-900 block">Tacloban City Shaping Bay</span>
                  <p className="text-[11px] text-slate-500 font-mono">Tacloban City, Philippines, 6500</p>
                  <p className="text-[11px] text-slate-600 font-mono mt-1 font-semibold">+63 915 479 2915</p>
                </li>
                <li className="flex items-center gap-2 pt-1">
                  <a
                    href="https://www.tiktok.com/@saintjoeskim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-slate-600 hover:text-slate-900 underline underline-offset-2"
                  >
                    TikTok: @saintjoeskim
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href="https://www.instagram.com/saintjoeskim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-pink-600 hover:text-pink-700 underline underline-offset-2"
                  >
                    Instagram
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href="https://www.facebook.com/saintjoeskim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-blue-600 hover:text-blue-700 underline underline-offset-2"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
          <span>© {new Date().getFullYear()} SAINT JOE SKiMBOARDS // Tacloban City, Leyte, Philippines</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-sans text-xs font-semibold"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
