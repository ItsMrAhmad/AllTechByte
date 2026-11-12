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
  onSelectCategory?: (catId: string) => void;
}

export default function HeroBanner({ onQuickOrder, onSelectCategory }: HeroBannerProps) {
  // Featured spotlight items cleanly surfaced below the command hero
  const featuredItems = [
    PRODUCTS.find((p) => p.id === '15468028166446') || PRODUCTS[0], // Raspberry Pi 5 16GB
    PRODUCTS.find((p) => p.id === '15469000000150') || PRODUCTS[1], // N20 DC 3V-6V Metal Gear Motor
    PRODUCTS.find((p) => p.id === '15468161696110') || PRODUCTS[2], // Spot Welder NY-D01
  ];

  const quickCategories = [
    { label: 'Arduino & ESP32', catId: 'boards' },
    { label: 'Sensors & Displays', catId: 'sensors' },
    { label: 'N20 & Motors', catId: 'robotics' },
    { label: '18650 & Power', catId: 'power' },
  ];

  const handleChipClick = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 animate-fadeIn">
      {/* ========================================================= */}
      {/* MIDNIGHT NAVY COMMAND STAGE (SAMPLE 2 - FULL VIEWPORT)    */}
      {/* ========================================================= */}
      <div className="relative bg-[#07132D] text-white overflow-hidden lg:min-h-[calc(100vh-118px)] flex items-center">
        {/* Seamless Full-Bleed Dark Studio Hardware Visual (Desktop Right) */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[68%] z-0 pointer-events-none select-none">
          <Image
            src="/hero-navy.webp"
            alt="All Tech Byte — Raspberry Pi 5, Arduino UNO, ESP32, N20 Motor & Sensors"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover object-center"
          />
          {/* Seamless left & vertical melt into #07132D */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07132D] via-[#07132D]/85 via-25% to-transparent"></div>
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#07132D]/60 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#07132D]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="max-w-xl space-y-6 text-center lg:text-left mx-auto lg:mx-0">

            {/* Bold Dual-Tone Display Headline */}
            <h1 className="font-brand text-3xl sm:text-5xl xl:text-[54px] font-black tracking-tight leading-[1.1] text-white">
              Everything Your{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-cyan-300 to-emerald-300 mt-1.5">
                Next Project Demands.
              </span>
            </h1>

            {/* Quick Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5">
              {quickCategories.map((qc) => (
                <button
                  key={qc.catId}
                  type="button"
                  onClick={() => handleChipClick(qc.catId)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#0084FF] text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-white/15 cursor-pointer"
                >
                  {qc.label}
                </button>
              ))}
            </div>

            {/* Elevated High-Contrast Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-1">
              <a
                href={createGeneralInquiryUrl("Hero Midnight Order")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] via-[#1DB954] to-[#128C7E] text-white px-5 py-3.5 rounded-2xl font-brand font-extrabold text-[15px] tracking-wide shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_14px_34px_rgba(37,211,102,0.55)] ring-1 ring-inset ring-white/25 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-[#16A34A] shrink-0 group-hover:scale-110 transition-transform" />
                <span>Order on WhatsApp</span>
                <span className="bg-black/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg tracking-wider">
                  {BRAND_INFO.phone}
                </span>
              </a>

              <a
                href="#products-section"
                className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-[#07132D] px-6 py-3.5 rounded-2xl font-brand font-extrabold text-[15px] tracking-wide shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
              >
                <span>Browse All Catalog</span>
                <ArrowRight className="w-4 h-4 text-[#0084FF] group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </div>

            {/* Subtle Trust Promises */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-3.5 text-xs font-semibold text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>&lt; 5 Min WhatsApp Reply</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Lahore Store Pickup</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>Nationwide COD Delivery</span>
              </span>
            </div>
          </div>

          {/* Mobile Showcase Visual (visible cleanly < lg) */}
          <div className="lg:hidden mt-8">
            <div className="relative aspect-[1376/768] w-full rounded-2xl overflow-hidden border border-blue-800/60 shadow-xl">
              <Image
                src="/hero-navy.webp"
                alt="All Tech Byte — Raspberry Pi 5, Arduino UNO, ESP32, N20 Motor & Sensors"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* HIGH-DEMAND SPOTLIGHT STRIP BELOW HERO                    */}
      {/* ========================================================= */}
      <div className="bg-[#fafbfc] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider mb-3 px-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Today&apos;s High-Demand Electronics
              </h2>
              <span className="flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Verified Stock
              </span>
            </div>
            <span className="text-[11px] font-medium normal-case text-slate-500">
              Click any card to inspect pinouts &amp; specs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onQuickOrder(item)}
                className="p-3 rounded-2xl shadow-xs transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group bg-white border border-slate-200/90 hover:border-[#0066CC] hover:shadow-md text-slate-900"
              >
                <div className="relative w-12 h-12 rounded-xl shrink-0 overflow-hidden flex items-center justify-center p-1 bg-white border border-slate-100">
                  <Image
                    src={item.image}
                    alt={`${item.title} - All Tech Byte`}
                    fill
                    sizes="48px"
                    className="object-contain p-0.5 group-hover:scale-108 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-[#0066CC]">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-xs truncate transition-colors text-slate-900 group-hover:text-[#0066CC]">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-black text-slate-900">
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
                  className="p-2 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white shrink-0 shadow-xs active:scale-95 transition-transform"
                  title="Order on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-[#15803D]" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
