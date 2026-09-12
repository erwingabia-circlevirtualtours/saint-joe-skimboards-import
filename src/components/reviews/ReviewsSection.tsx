import React from 'react';
import { REVIEWS } from '../../data/reviews';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ThumbsUp, Heart } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-brand-dark relative border-b border-brand-border/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-cyan/40 text-xs font-mono font-bold uppercase tracking-widest text-brand-cyan mb-3">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Verified Rider Community</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              SHOREBREAK <span className="text-gradient-cyan">PROVEN</span>
            </h2>
          </div>

          {/* Aggregate Rating Badge */}
          <div className="flex items-center gap-4 bg-brand-surface p-4 rounded-2xl border border-brand-border">
            <div className="text-center">
              <span className="font-display font-black text-3xl text-white">4.96</span>
              <div className="flex text-amber-400 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="border-l border-brand-border pl-4 text-xs font-mono text-slate-400">
              <p className="font-bold text-white uppercase">Over 1,200+ Boards Shaped</p>
              <p>100% Hand-inspected in California</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-brand-surface border border-brand-border/80 rounded-3xl p-6 flex flex-col justify-between hover:border-brand-cyan/40 transition-all duration-300 shadow-lg"
            >
              <div className="space-y-3">
                {/* Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{rev.date}</span>
                </div>

                {/* Review Title & Board Model */}
                <div>
                  <h3 className="font-display font-bold text-base text-white leading-snug">
                    "{rev.title}"
                  </h3>
                  <p className="text-[11px] font-mono text-brand-cyan mt-1">
                    {rev.boardModel}
                  </p>
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-white block">{rev.author}</span>
                  <span className="text-[10px] text-slate-500">{rev.location} {rev.riderWeight ? `• ${rev.riderWeight}` : ''}</span>
                </div>
                {rev.verified && (
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Community Banner */}
        <div className="mt-12 p-8 bg-gradient-to-r from-brand-surface via-brand-surfaceAlt to-brand-surface border border-brand-border rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan flex-shrink-0">
              <Heart className="w-6 h-6 fill-brand-cyan/30" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Tag #SaintJoeSkim on Instagram</h3>
              <p className="text-xs text-slate-400">Share your shorebreak clips to be featured on our official channel.</p>
            </div>
          </div>

          <a
            href="#custom-builder"
            className="px-6 py-3 rounded-xl bg-brand-surface hover:bg-brand-border text-white font-bold text-xs uppercase font-mono border border-brand-border transition-colors whitespace-nowrap"
          >
            Start Your Custom Quiver →
          </a>
        </div>

      </div>

    </section>
  );
};
