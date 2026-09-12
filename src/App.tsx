import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { HeroSection } from './components/hero/HeroSection';
import { CategoryGrid } from './components/categories/CategoryGrid';
import { CustomBuilder } from './components/customizer/CustomBuilder';
import { ProductCatalog } from './components/products/ProductCatalog';
import { TechAnatomy } from './components/tech/TechAnatomy';
import { SizingCalculator } from './components/tech/SizingCalculator';
import { TeamShowcase } from './components/team/TeamShowcase';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { Toast } from './components/ui/Toast';
import { BoardProduct } from './types';

export const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const scrollToCustomizer = () => {
    const el = document.getElementById('custom-builder');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductSelectFromSearch = (product: BoardProduct) => {
    setSelectedCategory(product.category);
    const el = document.getElementById('catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 flex flex-col selection:bg-brand-cyan selection:text-brand-dark">
      
      {/* Top Announcements */}
      <AnnouncementBar />

      {/* Sticky Main Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCustomizer={scrollToCustomizer}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onOpenCustomizer={scrollToCustomizer} />

        {/* Category Quick Grid */}
        <CategoryGrid
          onSelectCategory={(catId) => setSelectedCategory(catId)}
          onOpenCustomizer={scrollToCustomizer}
        />

        {/* Custom Board Builder Studio */}
        <CustomBuilder />

        {/* Product Catalog Grid */}
        <ProductCatalog
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
        />

        {/* Technology & Anatomy Breakdown */}
        <TechAnatomy />

        {/* Interactive Sizing & Weight Calculator */}
        <SizingCalculator />

        {/* Pro Team Showcase */}
        <TeamShowcase />

        {/* Verified Reviews & Community Feed */}
        <ReviewsSection />
      </main>

      {/* Comprehensive E-Commerce Footer */}
      <Footer />

      {/* Overlays & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleProductSelectFromSearch}
      />
      <Toast />

    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CartProvider>
  );
}
