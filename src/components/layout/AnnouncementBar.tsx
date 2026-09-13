import React, { useState, useEffect } from 'react';
import { Truck, Sparkles, Phone, ChevronRight, Globe } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const announcements = [
    { text: "WORLDWIDE SHIPPING AVAILABLE ON ALL BOARDS", icon: Truck, highlight: "GLOBAL DISPATCH" },
    { text: "HANDCRAFTED IN TACLOBAN CITY, PHILIPPINES, 6500", icon: Sparkles, highlight: "SINCE 2009" },
    { text: "USE CODE 'SAINT10' FOR 10% OFF YOUR FIRST BOARD", icon: Sparkles, highlight: "10% OFF" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currency, setCurrency] = useState('USD ($)');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const CurrentIcon = announcements[currentIndex].icon;

  return (
    <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Store Status & Factory hotline */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] tracking-wide text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300 font-mono font-medium">FACTORY SHAPER IN SESSION</span>
          </span>
          <span className="text-slate-600">|</span>
          <a href="tel:+639154792915" className="hover:text-sky-400 transition-colors flex items-center gap-1 font-mono">
            <Phone className="w-3 h-3" />
            <span>+63 915 479 2915</span>
          </a>
        </div>

        {/* Center: Dynamic Announcement Ticker */}
        <div className="flex-1 flex items-center justify-center text-center">
          <div className="flex items-center gap-2 font-medium tracking-wider">
            <CurrentIcon className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span className="text-slate-100">
              {announcements[currentIndex].text}
            </span>
            <span className="hidden sm:inline-block bg-sky-500/20 text-sky-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-sky-400/30">
              {announcements[currentIndex].highlight}
            </span>
          </div>
        </div>

        {/* Right Side: Currency & Dealer Portal */}
        <div className="hidden md:flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1 text-slate-400 hover:text-slate-200 cursor-pointer">
            <Globe className="w-3 h-3 text-slate-400" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Currency Selector"
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer text-[11px]"
            >
              <option value="USD ($)" className="bg-slate-900 text-white">USD ($)</option>
              <option value="EUR (€)" className="bg-slate-900 text-white">EUR (€)</option>
              <option value="AUD ($)" className="bg-slate-900 text-white">AUD ($)</option>
              <option value="CAD ($)" className="bg-slate-900 text-white">CAD ($)</option>
            </select>
          </div>
          <span className="text-slate-600">|</span>
          <a
            href="#custom-builder"
            className="text-sky-400 hover:underline font-semibold flex items-center gap-0.5"
          >
            Custom Queue <ChevronRight className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
};
