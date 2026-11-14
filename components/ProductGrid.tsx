'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MessageCircle,
  SlidersHorizontal,
  CheckCircle,
  X,
  Search,
  Heart
} from 'lucide-react';
import { Product, CATEGORIES, createProductOrderUrl, matchesCategory } from '@/data/products';
import { getWishlistIds, toggleWishlistItem } from '@/lib/wishlist';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onQuickOrder: (product: Product) => void;
  hideCategoryTabs?: boolean;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export default function ProductGrid({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onQuickOrder,
  hideCategoryTabs = false,
  sectionTitle = 'Electronics, Robotics & Maker Components',
  sectionSubtitle = 'Every component is backed by direct WhatsApp support, stock confirmation, and Lahore store pickup.'
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const INITIAL_BATCH_SIZE = 24;
  const BATCH_INCREMENT = 24;
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    setWishlistIds(getWishlistIds());
    const handleSync = () => setWishlistIds(getWishlistIds());
    window.addEventListener('atb-wishlist-change', handleSync);
    return () => window.removeEventListener('atb-wishlist-change', handleSync);
  }, []);

  // Reset pagination when category or search changes
  React.useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [selectedCategory, searchQuery]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category (searchQuery searches overall catalog)
    if (selectedCategory !== 'all' && !searchQuery.trim()) {
      list = list.filter((p) => matchesCategory(p, selectedCategory));
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  return (
    <section id="products-section" className="py-14 bg-slate-50/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filter Tabs */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0066CC] mb-1">
                Verified Inventory
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {sectionTitle}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {sectionSubtitle}
              </p>
            </div>

            {/* Sort & Filter controls */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <label htmlFor="product-sort-select" className="cursor-pointer">Sort by:</label>
                <select
                  id="product-sort-select"
                  aria-label="Sort products by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent outline-none font-bold text-slate-900 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs Pill Bar */}
          {!hideCategoryTabs && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#0B1E48] text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Search Filter Badge if present */}
          {searchQuery && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl text-xs text-blue-900">
              <Search className="w-3.5 h-3.5 text-[#0084FF]" />
              <span>
                Search results for: <strong className="font-bold">&quot;{searchQuery}&quot;</strong> ({filteredProducts.length} items found)
              </span>
              <button
                onClick={onClearSearch}
                className="ml-auto inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-bold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayedProducts.map((product) => {
                const discountPct = product.comparePrice
                  ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
                  : null;

                return (
                  <div
                    key={product.id}
                    onClick={() => onQuickOrder(product)}
                    className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#0066CC]/50 transition-all duration-200 group relative cursor-pointer"
                  >
                    {/* Top Badges & Wishlist Action */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                      <div className="pointer-events-none">
                        {discountPct ? (
                          <span className="bg-rose-600 text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
                            -{discountPct}%
                          </span>
                        ) : (
                          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                            Genuine
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="bg-white/95 text-emerald-700 border border-emerald-200 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs pointer-events-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          In Stock
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlistItem(product.id);
                          }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-xs ${
                            wishlistIds.includes(product.id)
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : 'bg-white/90 hover:bg-white text-slate-400 hover:text-rose-600 border border-slate-200'
                          }`}
                          title={wishlistIds.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          aria-label="Toggle Wishlist"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                              wishlistIds.includes(product.id) ? 'fill-rose-600 text-rose-600' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Image Container */}
                    <div className="relative h-44 sm:h-48 md:h-52 w-full bg-slate-50 flex items-center justify-center p-3 border-b border-slate-100 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`${product.title} - AllTechByte`}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-contain p-2 group-hover:scale-108 transition-transform duration-300"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                      <div>
                        {/* Category */}
                        <div className="text-[10px] sm:text-[11px] text-slate-500 mb-1.5">
                          <span className="font-bold text-[#0066CC] uppercase tracking-wider leading-tight">
                            {product.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-[#0066CC] transition-colors"
                          title={product.title}
                        >
                          <Link
                            href={`/products/${product.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:underline"
                          >
                            {product.title}
                          </Link>
                        </h3>
                      </div>

                      {/* Price and Stock */}
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base sm:text-lg font-black text-slate-900">
                            Rs {product.price.toLocaleString()}
                          </span>
                          {product.comparePrice && (
                            <span className="text-[11px] text-slate-500 line-through">
                              Rs {product.comparePrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-slate-500 block">
                          Cash on Delivery Available
                        </span>
                      </div>

                      {/* Direct WhatsApp Buy Button */}
                      <div className="pt-2 border-t border-slate-100">
                        <a
                          href={createProductOrderUrl(product, 1)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full flex items-center justify-center gap-1.5 bg-[#15803D] hover:bg-[#166534] text-white text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 px-3 rounded-xl shadow-xs transition-all active:scale-95"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white stroke-[#15803D]" />
                          <span>Order on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Products Button */}
            {visibleCount < filteredProducts.length && (
              <div className="mt-10 text-center flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + BATCH_INCREMENT)}
                  className="inline-flex items-center gap-2.5 bg-white hover:bg-blue-50/50 text-[#07132D] hover:text-[#0066CC] font-bold text-sm px-7 py-3.5 rounded-2xl border-2 border-slate-200 hover:border-[#0066CC] shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Load More Products</span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    +{Math.min(BATCH_INCREMENT, filteredProducts.length - visibleCount)} More
                  </span>
                </button>
                <p className="text-xs text-slate-500">
                  Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} components
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching components found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              We may still have it in stock in our Lahore store. Message our technician directly on WhatsApp!
            </p>
            <button
              onClick={() => {
                onClearSearch();
                onSelectCategory('all');
              }}
              className="bg-[#0B1E48] hover:bg-[#0084FF] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              Reset Filters &amp; View All
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
