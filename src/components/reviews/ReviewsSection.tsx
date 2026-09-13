import React from 'react';
import { REVIEWS } from '../../data/reviews';
import { Star, CheckCircle2, Heart, ThumbsUp, Globe, ArrowRight } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-slate-50 relative border-b border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold uppercase tracking-widest text-sky-800 mb-3">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Facebook Page Recommendations</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-slate-900">
              COMMUNITY <span className="text-sky-600">RECOMMENDED</span>
            </h2>
          </div>

          {/* Aggregate Rating Badge */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-center">
              <span className="font-display font-black text-3xl text-slate-900">5.0</span>
              <div className="flex text-amber-500 mt-0.5 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
            </div>
            <div className="border-l border-slate-200 pl-4 text-xs font-mono text-slate-500">
              <p className="font-bold text-slate-900 uppercase">100% Recommendation Rate</p>
              <p>Handcrafted & Tested in Tacloban City, Philippines, 6500</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 flex flex-col justify-between hover:border-sky-400 hover:shadow-md transition-all duration-300 shadow-sm relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Stars, Recommendation Badge & Date */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono font-bold text-blue-700">
                      <ThumbsUp className="w-3 h-3" /> 5-Star Recommendation
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{rev.date}</span>
                </div>

                {/* Board Model */}
                <div className="inline-block px-3 py-1 rounded-lg bg-sky-50 text-sky-800 text-xs font-mono font-bold border border-sky-100">
                  {rev.boardModel}
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-display font-black text-base text-slate-900 block">{rev.author}</span>
                  <span className="text-xs text-slate-500">{rev.location}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.facebook.com/saintjoeskim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1 font-bold bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors"
                  >
                    <Globe className="w-3 h-3" /> Facebook Review
                  </a>
                  <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Community Banner */}
        <div className="mt-12 p-8 bg-white border border-slate-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 flex-shrink-0">
              <Heart className="w-6 h-6 fill-sky-200" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Connect with the Saint Joe Community</h3>
              <p className="text-xs text-slate-600">Join our growing community on Facebook and Instagram for session clips, board builds, and shorebreak updates.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/saintjoeskim"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase font-mono transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
            >
              <span>Facebook Page</span> <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#custom-builder"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase font-mono transition-colors whitespace-nowrap shadow-sm"
            >
              Custom Quiver →
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
