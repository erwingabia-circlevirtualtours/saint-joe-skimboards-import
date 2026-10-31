import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { SitemapModal } from './components/layout/SitemapModal';
import { HeroSection } from './components/hero/HeroSection';
import { ProSpotsHeroStack } from './components/hero/ProSpotsHeroStack';
import { CategoryGrid } from './components/categories/CategoryGrid';
import { CustomBuilder } from './components/customizer/CustomBuilder';
import { ProductCatalog } from './components/products/ProductCatalog';
import { TechAnatomy } from './components/tech/TechAnatomy';
import { SizingCalculator } from './components/tech/SizingCalculator';
import { TeamShowcase } from './components/team/TeamShowcase';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { NewsPage } from './components/news/NewsPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { Toast } from './components/ui/Toast';
import { CinematicPageTurner } from './components/navigation/CinematicPageTurner';
import { BoardProduct } from './types';

export const AppContent: React.FC = () => {
  const { isAuthenticated, openLoginModal, setIsAdminPortalOpen } = useAdmin();
  const [currentView, setCurrentView] = useState<'home' | 'news'>(() => {
    return window.location.hash.startsWith('#news') ? 'news' : 'home';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#admin')) {
        if (isAuthenticated) {
          setIsAdminPortalOpen(true);
        } else {
          openLoginModal();
        }
      } else if (window.location.hash.startsWith('#news')) {
        setCurrentView('news');
      } else if (currentView === 'news' && !window.location.hash.startsWith('#news')) {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash.startsWith('#admin')) {
      if (isAuthenticated) setIsAdminPortalOpen(true);
      else openLoginModal();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView, isAuthenticated, openLoginModal, setIsAdminPortalOpen]);

  const navigateToNews = () => {
    setCurrentView('news');
    window.location.hash = '#news';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    if (window.location.hash.startsWith('#news')) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const scrollToCustomizer = () => {
    if (currentView === 'news') {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById('custom-builder');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('custom-builder');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductSelectFromSearch = (product: BoardProduct) => {
    if (currentView === 'news') {
      navigateToHome();
    }
    setSelectedCategory(product.category);
    setTimeout(() => {
      const el = document.getElementById('catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateFromSitemap = (sectionId: string, category?: string) => {
    if (sectionId === 'news') {
      navigateToNews();
      return;
    }

    if (currentView === 'news') {
      navigateToHome();
    }

    if (category) {
      setSelectedCategory(category);
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-sky-500/20 selection:text-sky-950">
      
      {/* Top Announcements */}
      <AnnouncementBar />

      {/* Sticky Main Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCustomizer={scrollToCustomizer}
        currentView={currentView}
        onNavigateHome={navigateToHome}
        onNavigateNews={navigateToNews}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {currentView === 'news' ? (
          <NewsPage
            onBackToHome={() => {
              navigateToHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCustomizer={() => {
              navigateToHome();
              setTimeout(() => scrollToCustomizer(), 100);
            }}
            onNavigateToCatalog={() => {
              navigateToHome();
              setTimeout(() => {
                const el = document.getElementById('catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        ) : (
          <>
            {/* Main Brand Hero Section */}
            <HeroSection onOpenCustomizer={scrollToCustomizer} />

            {/* Full-Bleed Philippine Pro Spots Dedicated Hero Stack */}
            <ProSpotsHeroStack
              onSelectCategory={(catId) => setSelectedCategory(catId)}
              onOpenCustomizer={scrollToCustomizer}
            />

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

            {/* Philippine Pro Spots Showcase */}
            <TeamShowcase />

            {/* Verified Reviews & Community Feed */}
            <ReviewsSection />
          </>
        )}
      </main>

      {/* Comprehensive E-Commerce Footer */}
      <Footer
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        onNavigateNews={navigateToNews}
      />

      {/* Overlays & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleProductSelectFromSearch}
      />
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        onNavigateSection={handleNavigateFromSitemap}
      />
      {currentView === 'home' && <CinematicPageTurner />}
      <Toast />
      <AdminPortal />
      <AdminLoginModal />

    </div>
  );
};

export default function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </AdminProvider>
  );
}
