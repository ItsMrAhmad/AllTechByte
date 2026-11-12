'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  MessageCircle,
  ArrowLeft,
  Package,
  Truck,
  MapPin,
} from 'lucide-react';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import QuickOrderModal from '@/components/QuickOrderModal';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MobileDrawer from '@/components/MobileDrawer';
import {
  CATEGORIES,
  Product,
  createGeneralInquiryUrl,
} from '@/data/products';

interface CategoryPageClientProps {
  categorySlug: string;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  categoryProducts: Product[];
}

export default function CategoryPageClient({
  categorySlug,
  categoryName,
  categoryDescription,
  categoryImage,
  categoryProducts,
}: CategoryPageClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q') || '';
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [categorySlug]);

  const handleCategoryNavigate = (catId: string) => {
    if (catId === 'all') {
      router.push('/#products-section');
      return;
    }
    if (catId !== categorySlug) {
      router.push(`/category/${catId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      <Header
        onSearchChange={setSearchQuery}
        onCategorySelect={handleCategoryNavigate}
        selectedCategory={categorySlug}
        searchQuery={searchQuery}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      <main className="flex-1">
        {/* Category Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#07132D] via-[#0B1E48] to-[#0E295E] text-white border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300 mb-5"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1 hover:text-white transition-colors font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-sky-300 font-semibold">{categoryName}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-sky-300">
                  <Package className="w-3.5 h-3.5" />
                  <span>{categoryProducts.length} Products Available</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  {categoryName}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {categoryDescription}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={createGeneralInquiryUrl(`Category Inquiry: ${categoryName}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-[#15803D]" />
                    <span>Ask Bulk Pricing on WhatsApp</span>
                  </a>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-sky-400" />
                      COD Across Pakistan
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      Lahore Store Pickup
                    </span>
                  </div>
                </div>
              </div>

              {/* Category Visual Preview */}
              <div className="hidden sm:flex items-center justify-center shrink-0">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white/95 p-3 shadow-xl border border-white/20 overflow-hidden">
                  <Image
                    src={categoryImage}
                    alt={`${categoryName} - All Tech Byte`}
                    fill
                    sizes="160px"
                    className="object-contain p-2.5"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Direct Links to Other Categories */}
            <nav
              aria-label="Category Switcher"
              className="mt-7 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2"
            >
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
              >
                All Categories
              </Link>
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
                const isActive = cat.id === categorySlug;
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#0084FF] text-white shadow-sm'
                        : 'bg-white/10 hover:bg-white/20 text-slate-200'
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </section>

        {/* Filtered Category Catalog Grid */}
        <ProductGrid
          products={categoryProducts}
          selectedCategory={categorySlug}
          onSelectCategory={handleCategoryNavigate}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onQuickOrder={setActiveModalProduct}
          hideCategoryTabs
          sectionTitle={`Browse ${categoryName}`}
          sectionSubtitle={`Showing ${categoryProducts.length} in-stock and catalog items in ${categoryName}.`}
        />
      </main>

      <Footer />
      <FloatingWhatsApp />

      <QuickOrderModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onSelectCategory={handleCategoryNavigate}
        selectedCategory={categorySlug}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
}
