import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Search, ShoppingBag, Heart, Menu, X, Compass, Sliders, Layers, Users, Star, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenCustomizer }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Boards', href: '#catalog', icon: Compass },
    { name: 'Custom Builder', href: '#custom-builder', icon: Sliders, isSpecial: true },
    { name: 'Tech & Anatomy', href: '#tech-anatomy', icon: Layers },
    { name: 'Size Finder', href: '#size-finder', icon: Sliders },
    { name: 'Pro Team', href: '#team-riders', icon: Users },
    { name: 'Reviews', href: '#reviews', icon: Star },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-2xl py-3 border-b border-brand-border/80'
            : 'bg-brand-dark/90 backdrop-blur-md py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Saint Joe Skimboards Home"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white border border-white/20 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0 flex items-center justify-center">
              <img
                src="/saint-joe-logo.jpg"
                alt="Saint Joe Skimboards Logo"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 ring-2 ring-brand-cyan/0 group-hover:ring-brand-cyan/50 transition-all rounded-xl" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-white leading-tight uppercase flex items-center gap-1.5">
                SAINT JOE <span className="text-brand-cyan">SKiM</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] font-mono text-slate-400 font-semibold uppercase">
                HANDCRAFTED // CALIF
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.name === 'Custom Builder') {
                      onOpenCustomizer();
                    }
                  }}
                  className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    link.isSpecial
                      ? 'bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 hover:border-brand-cyan hover:glow-cyan shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${link.isSpecial ? 'text-brand-cyan' : 'text-slate-400'}`} />
                  {link.name}
                  {link.isSpecial && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Open Search"
              className="p-2.5 rounded-xl bg-brand-surface hover:bg-brand-surfaceAlt text-slate-300 hover:text-brand-cyan transition-colors border border-brand-border/60 hover:border-brand-cyan/40"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Indicator */}
            <a
              href="#catalog"
              aria-label="Wishlist"
              className="relative p-2.5 rounded-xl bg-brand-surface hover:bg-brand-surfaceAlt text-slate-300 hover:text-brand-sunset transition-colors border border-brand-border/60 hover:border-brand-sunset/40 hidden sm:flex"
            >
              <Heart className="w-4 h-4" />
              {totalWishlist > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-sunset text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                  {totalWishlist}
                </span>
              )}
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="relative flex items-center gap-2 bg-gradient-to-r from-brand-cyan to-brand-blue text-brand-dark hover:brightness-110 font-bold px-3.5 py-2 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="text-xs tracking-wider uppercase hidden xs:inline">Quiver</span>
              <span className="bg-brand-dark text-brand-cyan text-[11px] font-mono font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center border border-white/20">
                {totalItems}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="md:hidden p-2.5 rounded-xl bg-brand-surface text-slate-300 hover:text-white border border-brand-border"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-brand-dark/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 animate-fade-in">
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-brand-cyan mb-4">
              Navigation Menu
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.name === 'Custom Builder') {
                      onOpenCustomizer();
                    }
                  }}
                  className={`flex items-center justify-between p-3.5 rounded-xl text-base font-bold uppercase tracking-wider ${
                    link.isSpecial
                      ? 'bg-gradient-to-r from-brand-blue/30 to-brand-cyan/20 text-brand-cyan border border-brand-cyan/40'
                      : 'bg-brand-surface text-slate-200 hover:bg-brand-surfaceAlt'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-brand-cyan" />
                    <span>{link.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              );
            })}
          </div>

          <div className="border-t border-brand-border/80 pt-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-brand-surface rounded-xl">
              <img src="/saint-joe-logo.jpg" alt="Saint Joe" className="w-10 h-10 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-black uppercase text-white">SAINT JOE SKiMBOARDS</p>
                <p className="text-xs text-slate-400">San Clemente, California // Est. 2002</p>
              </div>
            </div>
            <p className="text-xs text-center text-slate-500 font-mono">
              Engineered for shorebreak dominance.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
