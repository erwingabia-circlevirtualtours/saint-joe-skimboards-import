import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, MapPin, Award, Phone, Globe, Share2, ArrowUp, Video, Camera } from 'lucide-react';

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
    <footer id="footer" className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background Subtle Carbon Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none carbon-bg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Brand Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-200">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0">
                <img
                  src="/saintjoeskim_logo_black.png"
                  alt="Saint Joe Skimboards"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-slate-900 uppercase flex items-center gap-1.5">
                  SAINT JOE <span className="text-sky-600">SKiMBOARDS</span>
                </span>
                <p className="text-xs font-mono text-slate-500">
                  HANDCRAFTED IN TACLOBAN CITY, PHILIPPINES, 6500 // EST. 2009
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              We engineer quality Philippine made skimboards designed for shorebreak dominance, maximum float, and responsive performance. Every single board is vacuum-infused and finished by hand.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-700 pt-2">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-sky-600" /> Lifetime Delam Warranty
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <Award className="w-4 h-4 text-emerald-600" /> 15x World Champions
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-display font-bold text-lg text-slate-900 mb-1">
              Join the Saint Joe Shorebreak Underground
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Get secret custom resin drops, factory blem sales, and exclusive promo code <span className="text-sky-700 font-mono font-bold">SAINT10</span> for 10% off.
            </p>

            {subscribed ? (
              <div className="p-3 bg-sky-50 border border-sky-300 text-sky-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Welcome to the family! Check your inbox for code SAINT10.
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex-shrink-0"
                >
                  Join Quiver
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-slate-200">
          
          <div>
            <h4 className="font-display font-bold text-sm uppercase text-slate-900 tracking-wider mb-4">
              Skimboards
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#catalog" className="hover:text-sky-700 transition-colors">Saint Apex Pro Carbon</a></li>
              <li><a href="#catalog" className="hover:text-sky-700 transition-colors">The Miracle Worker Hybrid</a></li>
              <li><a href="#catalog" className="hover:text-sky-700 transition-colors">Sanctuary Full Carbon 3K</a></li>
              <li><a href="#catalog" className="hover:text-sky-700 transition-colors">Holy Roller Dude! Shape</a></li>
              <li><a href="#catalog" className="hover:text-sky-700 transition-colors">Disciple Grom Series</a></li>
              <li><a href="#custom-builder" className="hover:text-sky-800 text-sky-700 transition-colors font-bold">Launch Custom Builder →</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase text-slate-900 tracking-wider mb-4">
              Tech & Sizing
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#tech-anatomy" className="hover:text-sky-700 transition-colors">Carbon & Epoxy Layup Tech</a></li>
              <li><a href="#size-finder" className="hover:text-sky-700 transition-colors">Interactive Size & Weight Finder</a></li>
              <li><a href="#tech-anatomy" className="hover:text-sky-700 transition-colors">5/8" vs 3/4" Thickness Guide</a></li>
              <li><a href="#tech-anatomy" className="hover:text-sky-700 transition-colors">Rocker Curves Breakdown</a></li>
              <li><a href="#tech-anatomy" className="hover:text-sky-700 transition-colors">Board Care & Repair Instructions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase text-slate-900 tracking-wider mb-4">
              Company & Spots
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#pro-spots" className="hover:text-sky-700 transition-colors">Philippine Pro Spots</a></li>
              <li><a href="#reviews" className="hover:text-sky-700 transition-colors">Verified Rider Reviews</a></li>
              <li><a href="#footer" className="hover:text-sky-700 transition-colors">Tacloban City Factory</a></li>
              <li><a href="#footer" className="hover:text-sky-700 transition-colors">Authorized Dealer Portal</a></li>
              <li><a href="#footer" className="hover:text-sky-700 transition-colors">Shorebreak Video Vault</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase text-slate-900 tracking-wider mb-4">
              Factory HQ
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>Tacloban City, Philippines, 6500</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <a href="tel:+639154792915" className="hover:text-sky-700 transition-colors font-medium">+63 915 479 2915</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <a href="mailto:saintjoeskimboards@gmail.com" className="hover:text-sky-700 transition-colors font-medium">saintjoeskimboards@gmail.com</a>
              </p>
              <p className="text-[11px] font-mono text-slate-500 pt-1">
                Mon - Sat: 8:00 AM - 6:00 PM PHT
              </p>

              {/* Official Social Media Channels */}
              <div className="pt-3 border-t border-slate-200/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2 font-bold">
                  Official Channels
                </span>
                <div className="flex flex-col gap-1.5 font-mono text-xs">
                  <a
                    href="https://www.tiktok.com/@saintjoeskim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-900 hover:text-slate-900 text-slate-700 transition-all group shadow-2xs"
                  >
                    <Video className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 flex-shrink-0" />
                    <span className="font-semibold text-slate-900">TikTok:</span>
                    <span className="text-slate-500 group-hover:text-slate-700 truncate">@saintjoeskim</span>
                  </a>

                  <a
                    href="https://www.instagram.com/saintjoeskim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl bg-white border border-slate-200 hover:border-pink-500 hover:text-pink-600 text-slate-700 transition-all group shadow-2xs"
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-500 flex-shrink-0" />
                    <span className="font-semibold text-slate-900">Instagram:</span>
                    <span className="text-slate-500 group-hover:text-pink-600 truncate">@saintjoeskim</span>
                  </a>

                  <a
                    href="https://www.facebook.com/saintjoeskim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 transition-all group shadow-2xs"
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                    <span className="font-semibold text-slate-900">Facebook:</span>
                    <span className="text-slate-500 group-hover:text-blue-600 truncate">saintjoeskim</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} SAINT JOE SKiMBOARDS. All rights reserved. Handcrafted in Tacloban City, Philippines, 6500.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-sky-700 hover:text-slate-900 transition-colors font-bold"
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
