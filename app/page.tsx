'use client';

import React, { useState, useMemo } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategoryGrid from '@/components/CategoryGrid';
import FlashSaleSection from '@/components/FlashSaleSection';
import ProductGrid from '@/components/ProductGrid';
import WhatsAppPriorityBanner from '@/components/WhatsAppPriorityBanner';
import StoreLocations from '@/components/StoreLocations';
import FAQSection from '@/components/FAQSection';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';
import QuickOrderModal from '@/components/QuickOrderModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MobileDrawer from '@/components/MobileDrawer';
import { PRODUCTS, Product } from '@/data/products';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Filter only active published products for storefront view (drafts remain in data/products.ts for review)
  const publishedProducts = useMemo(() => PRODUCTS.filter((p) => !p.isDraft), []);

  const handleQuickOrder = (product: Product) => {
    setActiveModalProduct(product);
  };

  const handleCloseModal = () => {
    setActiveModalProduct(null);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && selectedCategory !== 'all') {
      setSelectedCategory('all');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      {/* Main Responsive Header */}
      <Header
        onSearchChange={handleSearchChange}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <HeroBanner
          onQuickOrder={handleQuickOrder}
          onSelectCategory={handleCategorySelect}
        />

        {/* Popular Categories Visual Grid */}
        <CategoryGrid
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        {/* Flash Sale / Limited Hot Deals */}
        <FlashSaleSection onQuickOrder={handleQuickOrder} />

        {/* Main Product Catalog Grid with search and category filters */}
        <ProductGrid
          products={publishedProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
          onQuickOrder={handleQuickOrder}
        />

        {/* WhatsApp Priority Commerce Banner (Zero Checkout Friction) */}
        <WhatsAppPriorityBanner />

        {/* 2 Physical Lahore Walk-in Store Branches */}
        <StoreLocations />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Maker Articles & Guides */}
        <NewsSection />
      </main>

      {/* Comprehensive Site Footer */}
      <Footer />

      {/* Floating Sticky WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Quick Order / Specs Modal */}
      <QuickOrderModal
        product={activeModalProduct}
        onClose={handleCloseModal}
      />

      {/* Mobile Sliding Navigation Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onSelectCategory={handleCategorySelect}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
}
