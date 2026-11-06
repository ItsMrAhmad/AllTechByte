'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, MessageCircle, Zap, Clock } from 'lucide-react';
import { PRODUCTS, Product, createProductOrderUrl } from '@/data/products';

interface FlashSaleProps {
  onQuickOrder: (product: Product) => void;
}

export default function FlashSaleSection({ onQuickOrder }: FlashSaleProps) {
  // Select top products with discount / comparePrice
  const flashProducts = PRODUCTS.filter((p) => p.comparePrice && p.comparePrice > p.price).slice(0, 4);

  return (
    <section id="flash-sale" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flash Sale Banner Header */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-red-800 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-rose-100">
                <Zap className="w-3.5 h-3.5 fill-current text-yellow-300" />
                <span>Special Promotional Pricing</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Our Flash Sale Is On!
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
                Grab authentic development boards, high-power DC converters, and maker tools at special discounted rates. Order instantly via WhatsApp before stock runs out!
              </p>
            </div>

            {/* Countdown / Dispatch badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3.5 text-center shrink-0 self-stretch md:self-auto flex items-center justify-center gap-3">
              <Clock className="w-5 h-5 text-yellow-300 animate-spin-slow" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-rose-200 block">Dispatch Status</span>
                <span className="text-sm font-black text-white">Same-Day Lahore Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {flashProducts.map((product) => {
            const discountPct = product.comparePrice
              ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
              : null;

            return (
              <div
                key={product.id}
                onClick={() => onQuickOrder(product)}
                className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-200 group relative cursor-pointer"
              >
                {/* Badges container */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  {discountPct && (
                    <span className="bg-rose-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                      SAVE {discountPct}%
                    </span>
                  )}
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    In Stock
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-48 sm:h-52 w-full bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.title} - AllTechByte`}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#0084FF] uppercase tracking-wider block">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mt-1 group-hover:text-[#0084FF] transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900">
                        Rs {product.price.toLocaleString()}
                      </span>
                      {product.comparePrice && (
                        <span className="text-xs text-slate-400 line-through">
                          Rs {product.comparePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Prices include GST / Cash on Delivery
                    </span>
                  </div>

                  {/* Direct WhatsApp Order CTA */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href={createProductOrderUrl(product, 1)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1fb355] text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-xs transition-all active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 fill-white stroke-[#25D366]" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
