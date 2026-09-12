import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, MapPin, Award, Phone, Globe, Share2, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-brand-charcoal border-t border-brand-border text-slate-300 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background Subtle Carbon Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none carbon-bg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Brand Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-brand-border/80">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/saint-joe-logo.jpg"
                alt="Saint Joe Skimboards"
                className="w-12 h-12 rounded-xl object-cover bg-white p-0.5 border border-brand-cyan/40 shadow-lg"
              />
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-white uppercase flex items-center gap-1.5">
                  SAINT JOE <span className="text-brand-cyan">SKiMBOARDS</span>
                </span>
                <p className="text-xs font-mono text-slate-400">
                  HANDCRAFTED IN SAN CLEMENTE, CA // EST. 2002
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              We engineer uncompromising, aerospace-grade carbon fiber skimboards designed for heavy shorebreak, maximum float, and podium-winning speed. Every single board is vacuum-infused and finished by hand.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-300 pt-2">
              <span className="flex items-center gap-1.5 bg-brand-surface px-3 py-1.5 rounded-lg border border-brand-border">
                <ShieldCheck className="w-4 h-4 text-brand-cyan" /> Lifetime Delam Warranty
              </span>
              <span className="flex items-center gap-1.5 bg-brand-surface px-3 py-1.5 rounded-lg border border-brand-border">
                <Award className="w-4 h-4 text-brand-volt" /> 15x World Champions
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center bg-brand-surface/70 p-6 rounded-2xl border border-brand-border/80">
            <h3 className="font-display font-bold text-lg text-white mb-1">
              Join the Saint Joe Shorebreak Underground
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Get secret custom resin drops, factory blem sales, and exclusive promo code <span className="text-brand-cyan font-mono font-bold">SAINT10</span> for 10% off.
            </p>

            {subscribed ? (
              <div className="p-3 bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4" /> Welcome to the family! Check your inbox for code SAINT10.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-brand-dark border border-brand-border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-cyan hover:bg-cyan-300 text-brand-dark font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex-shrink-0"
                >
                  Join Quiver
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-brand-border/60">
          
          <div>
            <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider mb-4 text-brand-cyan">
              Skimboards
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#catalog" className="hover:text-brand-cyan transition-colors">Saint Apex Pro Carbon</a></li>
              <li><a href="#catalog" className="hover:text-brand-cyan transition-colors">The Miracle Worker Hybrid</a></li>
              <li><a href="#catalog" className="hover:text-brand-cyan transition-colors">Sanctuary Full Carbon 3K</a></li>
              <li><a href="#catalog" className="hover:text-brand-cyan transition-colors">Holy Roller Dude! Shape</a></li>
              <li><a href="#catalog" className="hover:text-brand-cyan transition-colors">Disciple Grom Series</a></li>
              <li><a href="#custom-builder" className="hover:text-brand-cyan text-brand-volt transition-colors font-bold">Launch Custom Builder →</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider mb-4 text-brand-cyan">
              Tech & Sizing
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#tech-anatomy" className="hover:text-brand-cyan transition-colors">Carbon & Epoxy Layup Tech</a></li>
              <li><a href="#size-finder" className="hover:text-brand-cyan transition-colors">Interactive Size & Weight Finder</a></li>
              <li><a href="#tech-anatomy" className="hover:text-brand-cyan transition-colors">5/8" vs 3/4" Thickness Guide</a></li>
              <li><a href="#tech-anatomy" className="hover:text-brand-cyan transition-colors">Rocker Curves Breakdown</a></li>
              <li><a href="#tech-anatomy" className="hover:text-brand-cyan transition-colors">Board Care & Repair Instructions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider mb-4 text-brand-cyan">
              Company & Team
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#team-riders" className="hover:text-brand-cyan transition-colors">Saint Joe Pro Team</a></li>
              <li><a href="#reviews" className="hover:text-brand-cyan transition-colors">Verified Rider Reviews</a></li>
              <li><a href="#footer" className="hover:text-brand-cyan transition-colors">San Clemente Factory</a></li>
              <li><a href="#footer" className="hover:text-brand-cyan transition-colors">Authorized Dealer Portal</a></li>
              <li><a href="#footer" className="hover:text-brand-cyan transition-colors">Shorebreak Video Vault</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider mb-4 text-brand-cyan">
              Factory HQ
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                <span>1040 Calle Negocio, Suite B<br />San Clemente, CA 92673</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <span>(949) 555-SKIM (7546)</span>
              </p>
              <p className="text-[11px] font-mono text-slate-500 pt-1">
                Mon - Fri: 8:00 AM - 5:00 PM PST
              </p>

              <div className="flex items-center gap-3 pt-3">
                <a href="#" aria-label="Social Link" className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center hover:text-brand-cyan hover:border-brand-cyan transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Share Link" className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center hover:text-brand-cyan hover:border-brand-cyan transition-colors">
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} SAINT JOE SKiMBOARDS LLC. All rights reserved. Handcrafted in USA.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-brand-cyan hover:text-white transition-colors"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
