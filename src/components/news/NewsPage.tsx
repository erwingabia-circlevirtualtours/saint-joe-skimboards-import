import React, { useState } from 'react';
import { NEWS_ARTICLES, NewsArticle } from '../../data/newsData';
import {
  Trophy,
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
  Sliders,
  Compass,
  Award,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';

interface NewsPageProps {
  onBackToHome: () => void;
  onOpenCustomizer: () => void;
  onNavigateToCatalog: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  onBackToHome,
  onOpenCustomizer,
  onNavigateToCatalog
}) => {
  const [selectedArticle] = useState<NewsArticle>(NEWS_ARTICLES[0]);
  const [copied, setCopied] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState<{ url: string; caption: string } | null>(null);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedArticle.title,
        text: selectedArticle.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* Top Breadcrumb & Control Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 sm:top-[72px] z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-sky-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Boards &amp; Shop</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Latest Field Report
            </span>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all border border-slate-200"
              title="Share this article"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Magazine Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Editorial Masthead */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-mono font-bold uppercase tracking-widest mb-4 border border-sky-200 shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-sky-600" />
            <span>Saint Joe Shorebreak Dispatches</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1] uppercase">
            NEWS &amp; CONTEST <span className="text-sky-600">REPORTS</span>
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-light">
            Grassroots Philippine skimboarding competitions, rider podium finishes, and field updates from the Saint Joe shaping factory.
          </p>
        </div>

        {/* Featured Article Card */}
        <article className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden mb-16">
          
          {/* Article Header & Badges */}
          <div className="p-6 sm:p-10 lg:p-12 border-b border-slate-100 bg-gradient-to-b from-sky-50/50 to-white">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {selectedArticle.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {selectedArticle.eventDates}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                {selectedArticle.location}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono flex items-center gap-1.5 ml-auto hidden sm:flex">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {selectedArticle.readTime}
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight uppercase">
              {selectedArticle.title}
            </h2>

            <p className="mt-4 text-base sm:text-xl text-slate-700 leading-relaxed font-normal">
              {selectedArticle.subtitle}
            </p>

            <div className="mt-6 pt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono text-slate-500">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                  SJ
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">{selectedArticle.author}</span>
                  <span>Published {selectedArticle.date}</span>
                </div>
              </div>
            </div>

            {/* Official Event Poster Lead Visual */}
            <div
              className="relative w-full aspect-16/10 sm:aspect-16/9 overflow-hidden rounded-2xl border border-slate-200 mt-6 shadow-sm group cursor-pointer bg-slate-950"
              onClick={() =>
                setActiveLightboxImg({
                  url: selectedArticle.coverImage,
                  caption:
                    'Official Event Poster: One Drop Slide Open Category Skimboard Competition in Brgy. Pundaquit, San Antonio, Zambales (October 16–17, 2026).'
                })
              }
            >
              <img
                src={selectedArticle.coverImage}
                alt="Official Event Poster"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain sm:object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 sm:p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between w-full text-white">
                  <div className="text-xs sm:text-sm font-mono font-medium drop-shadow-md">
                    Official Event Poster • October 16–17, 2026 • Zambales
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Sweep Podium Showcase */}
          <div className="p-6 sm:p-10 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 carbon-bg opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl uppercase tracking-wide text-white">
                    Official Podium Lockout • Open Category Class A
                  </h3>
                  <p className="text-xs font-mono text-cyan-300">
                    All 3 podium winners powered by Saint Joe Skimboards
                  </p>
                </div>
              </div>

              {/* 3 Winner Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {selectedArticle.podium.map((winner, idx) => {
                  const isChamp = idx === 0;
                  const isFirstRunner = idx === 1;
                  return (
                    <div
                      key={winner.name}
                      className={`relative rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between ${
                        isChamp
                          ? 'bg-gradient-to-b from-amber-500/15 to-slate-950 border-amber-400/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/30'
                          : isFirstRunner
                          ? 'bg-slate-950/80 border-slate-400/30 shadow-md'
                          : 'bg-slate-950/80 border-amber-700/30 shadow-md'
                      }`}
                    >
                      {/* Placement Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className={`text-xs font-mono font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                            isChamp
                              ? 'bg-amber-400 text-slate-950 shadow-sm'
                              : isFirstRunner
                              ? 'bg-slate-200 text-slate-900'
                              : 'bg-amber-700/60 text-amber-100 border border-amber-600/40'
                          }`}
                        >
                          <Award className="w-3.5 h-3.5" />
                          {winner.placement}
                        </span>

                        <span className="text-2xl font-black font-display text-white/30">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-1 mb-4">
                        <h4 className="font-display font-black text-2xl text-white tracking-tight uppercase">
                          {winner.name}
                        </h4>
                        <a
                          href={`https://instagram.com/${winner.handle.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors inline-block font-semibold"
                        >
                          {winner.handle} ↗
                        </a>
                      </div>

                      <div className="pt-4 border-t border-white/10 space-y-2 mt-auto">
                        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                          Weapon of Choice:
                        </div>
                        <div className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span>{winner.boardModel}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                          {winner.details}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Photo Gallery Grid */}
          <div className="p-6 sm:p-10 border-b border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 block">
                  Event Photography
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 uppercase">
                  Pundaquit Sandbar &amp; Awarding Gallery
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Click any photo to enlarge
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedArticle.galleryImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveLightboxImg({ url: img.url, caption: img.caption })}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                    <img
                      src={img.url}
                      alt={img.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-3.5 bg-white flex-1 flex flex-col justify-center">
                    <p className="text-xs text-slate-600 font-medium leading-snug line-clamp-2">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Article Body */}
          <div className="p-6 sm:p-10 lg:p-12 space-y-10 max-w-4xl">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-serif border-l-4 border-sky-600 pl-4 sm:pl-6 italic">
              {selectedArticle.leadParagraph}
            </p>

            {selectedArticle.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 uppercase tracking-tight">
                  {section.heading}
                </h3>
                {section.body.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="my-6 p-6 rounded-2xl bg-sky-50/70 border border-sky-200/80">
                    <p className="font-display font-bold text-base sm:text-lg text-slate-900 italic mb-3">
                      "{section.quote.text}"
                    </p>
                    <div className="text-xs font-mono text-sky-800 font-semibold">
                      — {section.quote.author}, <span className="text-slate-500 font-normal">{section.quote.role}</span>
                    </div>
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* Quiver Gear Tie-in */}
          <div className="p-6 sm:p-10 bg-slate-50 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 block">
                  Championship Quiver
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 uppercase">
                  Boards Ridden in This Heat
                </h3>
              </div>

              <button
                onClick={onOpenCustomizer}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md self-start sm:self-auto"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Build Your Custom Weapon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {selectedArticle.gearUsed.map((gear, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-colors"
                >
                  <div className="space-y-2 mb-4">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold inline-block">
                      {gear.type}
                    </span>
                    <h4 className="font-display font-bold text-base text-slate-900 uppercase">
                      {gear.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {gear.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono font-black text-sm text-slate-900">
                      ${gear.price} USD
                    </span>
                    <button
                      onClick={onNavigateToCatalog}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors"
                    >
                      <span>View in Quiver</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </article>

        {/* Back to Home CTA Box */}
        <div className="text-center py-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Return to Saint Joe Boards Catalog</span>
          </button>
        </div>

      </main>

      {/* Lightbox Modal for Full-Resolution Image Viewing */}
      {activeLightboxImg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] flex items-center justify-center bg-black/60 overflow-hidden">
              <img
                src={activeLightboxImg.url}
                alt={activeLightboxImg.caption}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
              <button
                onClick={() => setActiveLightboxImg(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors border border-white/20"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-slate-900 text-slate-300 text-xs font-mono border-t border-white/10 flex items-center justify-between">
              <span>{activeLightboxImg.caption}</span>
              <span className="text-slate-500 text-[11px]">Saint Joe Media Archive</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
