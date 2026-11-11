'use client';

import React from 'react';
import Image from 'next/image';
import {
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Truck
} from 'lucide-react';
import { BRAND_INFO, createGeneralInquiryUrl, createProductOrderUrl, PRODUCTS, Product } from '@/data/products';

interface HeroBannerProps {
  onQuickOrder: (product: Product) => void;
}

export default function HeroBanner({ onQuickOrder }: HeroBannerProps) {
  // Featured items for the high-demand spotlight cards
  const featuredItems = [
    PRODUCTS.find((p) => p.id === '15468028166446') || PRODUCTS[0], // RPi 5
    PRODUCTS.find((p) => p.id === '15468019951918') || PRODUCTS[1], // Arduino Uno
    PRODUCTS.find((p) => p.id === '15468161696110') || PRODUCTS[2], // Spot Welder
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F6FF] via-[#F8FAFC] to-white text-slate-900 py-8 md:py-10 lg:py-12 border-b border-slate-200/80 animate-fadeIn">
      {/* Subtle Ambient Background Gradients & Tech Dot Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0084FF_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-[350px] h-[250px] bg-emerald-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Bold Typography & Styled Action Buttons */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <h1 className="font-brand text-3xl sm:text-4xl xl:text-[46px] font-black tracking-tight leading-[1.12] text-[#07132D]">
              Everything Your{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0084FF] via-blue-600 to-cyan-500 mt-1">
                Next Project Demands.
              </span>
            </h1>

            {/* Elevated Dual CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center justify-center lg:justify-start gap-3.5 pt-1">
              <a
                href={createGeneralInquiryUrl("Hero Crisp Light Order")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] via-[#1DB954] to-[#128C7E] text-white px-5 py-3.5 rounded-2xl font-brand font-extrabold text-[15px] tracking-wide shadow-[0_10px_24px_-6px_rgba(37,211,102,0.5)] hover:shadow-[0_14px_28px_-6px_rgba(37,211,102,0.65)] ring-1 ring-inset ring-white/25 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-[#16A34A] shrink-0 group-hover:scale-110 transition-transform" />
                <span>Order on WhatsApp</span>
                <span className="bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-lg tracking-wider">
                  {BRAND_INFO.phone}
                </span>
              </a>

              <a
                href="#products-section"
                className="group inline-flex items-center justify-center gap-2 bg-[#07132D] hover:bg-[#0B2354] text-white px-6 py-3.5 rounded-2xl font-brand font-extrabold text-[15px] tracking-wide shadow-[0_10px_24px_-6px_rgba(7,19,45,0.35)] hover:shadow-[0_14px_28px_-6px_rgba(0,132,255,0.35)] ring-1 ring-inset ring-white/15 hover:ring-[#0084FF]/50 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
              >
                <span>Browse All Catalog</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8] group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </div>

            {/* Subtle Inline Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-3.5 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>&lt; 5 Min WhatsApp Response</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0084FF]" />
                <span>Lahore Store Pickup</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-500" />
                <span>Nationwide Express Delivery</span>
              </span>
            </div>
          </div>

          {/* Right Column: Large Concept 3 Maker Workbench Showcase */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[1376/768] w-full rounded-3xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(11,30,72,0.18)] border border-slate-200/90 bg-white group">
              <Image
                src="/hero-workbench.webp"
                alt="All Tech Byte Maker Workbench — Tested Hardware Ready for Your Build"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 820px"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

        </div>

        {/* Bottom Spotlight Bar: 3 High-Demand Electronics */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-7 border-t border-slate-200/80">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider mb-3.5 px-1">
            <div className="flex items-center gap-2.5">
              <span className="text-slate-600">
                Today&apos;s High-Demand Electronics
              </span>
              <span className="flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Verified Stock
              </span>
            </div>
            <span className="text-[11px] font-medium normal-case text-slate-500">
              Click any card to inspect pinouts &amp; specs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onQuickOrder(item)}
                className="p-3 sm:p-3.5 rounded-2xl shadow-xs transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group bg-white border border-slate-200/90 hover:border-[#0084FF] hover:shadow-md text-slate-900"
              >
                <div className="relative w-14 h-14 rounded-xl shrink-0 overflow-hidden flex items-center justify-center p-1 shadow-2xs bg-white border border-slate-100">
                  <Image
                    src={item.image}
                    alt={`${item.title} - All Tech Byte`}
                    fill
                    sizes="56px"
                    className="object-contain p-0.5 group-hover:scale-108 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-[#0084FF]">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm truncate transition-colors text-slate-900 group-hover:text-[#0084FF]">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      Rs {item.price.toLocaleString()} PKR
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-emerald-700 bg-emerald-50 border border-emerald-200">
                      In Stock
                    </span>
                  </div>
                </div>

                <a
                  href={createProductOrderUrl(item, 1)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-xl bg-[#25D366] hover:bg-[#1fb355] text-white shrink-0 shadow-sm active:scale-95 transition-transform"
                  title="Order on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-[#25D366]" />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
