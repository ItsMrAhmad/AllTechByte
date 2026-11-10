'use client';

import React from 'react';
import Image from 'next/image';
import {
  MessageCircle,
  ArrowRight,
  Cpu,
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F6FF] via-[#F8FAFC] to-white text-slate-900 py-8 md:py-12 lg:py-14 border-b border-slate-200/80 animate-fadeIn">
      {/* Subtle Ambient Background Gradients & Tech Dot Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0084FF_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-[350px] h-[250px] bg-emerald-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Bold Typography & Direct WhatsApp Action */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs bg-blue-50 border border-blue-200 text-[#0084FF]">
              <Cpu className="w-3.5 h-3.5 text-[#0084FF]" />
              <span>Pakistan Maker Hardware Hub</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-[#07132D]">
              Robotics, Arduino &amp; Electronics Store <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0084FF] via-blue-600 to-cyan-500">
                in Pakistan.
              </span>
            </h1>

            <div className="inline-flex items-center justify-center lg:justify-start gap-2.5">
              <span className="h-[2.5px] w-5 bg-[#008CFF] rounded-full"></span>
              <p className="text-xs sm:text-sm font-black text-[#07132D] tracking-widest uppercase">
                POWERING <em className="italic text-[#008CFF]">EVERY</em> PROJECT
              </p>
              <span className="h-[2.5px] w-5 bg-[#008CFF] rounded-full"></span>
            </div>

            <p className="text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal text-slate-600">
              Your direct verified source for{' '}
              <strong className="text-slate-900 font-semibold">
                Arduino, Raspberry Pi 5, ESP32
              </strong>
              , precision NDIR sensors, and power converters with zero checkout friction.
            </p>

            {/* Primary WhatsApp Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href={createGeneralInquiryUrl("Hero Crisp Light Order")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1fb355] text-white px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366]" />
                <span>Order via WhatsApp ({BRAND_INFO.phone})</span>
              </a>

              <a
                href="#products-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-colors bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs"
              >
                <span>Browse All Catalog</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
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

          {/* Right Column: Concept 3 Maker Workbench Showcase */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[1376/768] w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200/90 bg-white group">
              <Image
                src="/hero-workbench.webp"
                alt="All Tech Byte Maker Workbench — Tested Hardware Ready for Your Build"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="hidden sm:flex absolute bottom-3.5 left-3.5 bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-md px-3 py-1.5 rounded-full text-[11px] font-bold text-[#07132D] items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Same-Day Lahore Dispatch</span>
              </div>
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
