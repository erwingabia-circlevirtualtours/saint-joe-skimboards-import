import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Search, ShoppingBag, Heart, Menu, X, Compass, Sliders, Layers, MapPin, Star, ArrowRight, Phone, Mail, Video, Camera, Globe } from 'lucide-react';

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
    { name: 'Pro Spots', href: '#pro-spots', icon: MapPin },
    { name: 'Reviews', href: '#reviews', icon: Star },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-200'
            : 'bg-white/90 backdrop-blur-md py-4 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Saint Joe Skimboards Home"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-300 flex-shrink-0 flex items-center justify-center p-1.5">
              <img
                src="/saintjoeskim_logo_black.png"
                alt="Saint Joe Skimboards Logo"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 ring-2 ring-sky-500/0 group-hover:ring-sky-500/40 transition-all rounded-xl" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-slate-900 leading-tight uppercase flex items-center gap-1.5">
                SAINT JOE <span className="text-sky-600">SKiM</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] font-mono text-slate-500 font-semibold uppercase">
                HANDCRAFTED // LEYTE
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
                      ? 'bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 hover:border-sky-300 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${link.isSpecial ? 'text-sky-600' : 'text-slate-500'}`} />
                  {link.name}
                  {link.isSpecial && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
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
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-sky-600 transition-colors border border-slate-200"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Indicator */}
            <a
              href="#catalog"
              aria-label="Wishlist"
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-orange-600 transition-colors border border-slate-200 hidden sm:flex"
            >
              <Heart className="w-4 h-4" />
              {totalWishlist > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                  {totalWishlist}
                </span>
              )}
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-3.5 py-2 rounded-xl transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="text-xs tracking-wider uppercase hidden xs:inline">Quiver</span>
              <span className="bg-sky-500 text-white text-[11px] font-mono font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center">
                {totalItems}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="md:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-white/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 animate-fade-in border-b border-slate-200">
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-600 mb-4">
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
                      ? 'bg-sky-50 text-sky-800 border border-sky-300'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-sky-600" />
                    <span>{link.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              );
            })}
          </div>

          <div className="border-t border-slate-200 pt-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0">
                <img src="/saintjoeskim_logo_black.png" alt="Saint Joe" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-sm font-black uppercase text-slate-900">SAINT JOE SKiMBOARDS</p>
                <p className="text-xs text-slate-500">Tacloban City, Philippines, 6500 // Est. 2009</p>
              </div>
            </div>
            <p className="text-xs text-center text-slate-500 font-mono">
              Your quality Philippine made skimboards.
            </p>

            <div className="flex flex-col gap-2 pt-1 text-xs text-slate-700 font-mono">
              <a href="tel:+639154792915" className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-200 rounded-xl hover:text-sky-700 hover:border-sky-300 transition-colors shadow-sm font-semibold">
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>+63 915 479 2915</span>
              </a>
              <a href="mailto:saintjoeskimboards@gmail.com" className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-200 rounded-xl hover:text-sky-700 hover:border-sky-300 transition-colors shadow-sm truncate">
                <Mail className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                <span className="truncate">saintjoeskimboards@gmail.com</span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <a
                href="https://www.tiktok.com/@saintjoeskim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-white border border-slate-200 rounded-xl hover:border-slate-900 hover:text-slate-900 text-slate-700 text-xs font-mono font-semibold transition-colors shadow-2xs"
              >
                <Video className="w-3.5 h-3.5 text-slate-500" />
                <span>TikTok</span>
              </a>
              <a
                href="https://www.instagram.com/saintjoeskim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-white border border-slate-200 rounded-xl hover:border-pink-500 hover:text-pink-600 text-slate-700 text-xs font-mono font-semibold transition-colors shadow-2xs"
              >
                <Camera className="w-3.5 h-3.5 text-slate-500" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/saintjoeskim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-white border border-slate-200 rounded-xl hover:border-blue-600 hover:text-blue-600 text-slate-700 text-xs font-mono font-semibold transition-colors shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
