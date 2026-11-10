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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F6FF] via-[#F8FAFC] to-white text-slate-900 py-10 md:py-14 lg:py-16 border-b border-slate-200/80 animate-fadeIn">
      {/* Subtle Ambient Background Gradients & Tech Dot Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0084FF_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-[350px] h-[250px] bg-emerald-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Typography & Direct WhatsApp Action */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs bg-blue-50 border border-blue-200 text-[#0084FF]">
              <Cpu className="w-3.5 h-3.5 text-[#0084FF]" />
              <span>Pakistan Maker Hardware Hub</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-[#07132D]">
              Robotics, Arduino &amp; Electronics Store <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0084FF] via-blue-600 to-cyan-500">
                in Pakistan.
              </span>
            </h1>

            <p className="text-sm sm:text-base font-bold text-[#0084FF] tracking-wide uppercase">
              Smart Tech, Honest Prices
            </p>

            <p className="text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal text-slate-600">
              Your direct verified source for{' '}
              <strong className="text-slate-900 font-semibold">
                Arduino, Raspberry Pi 5, ESP32
              </strong>
              , precision NDIR sensors, and power converters with zero checkout friction.
            </p>

            {/* Primary WhatsApp Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <a
                href={createGeneralInquiryUrl("Hero Crisp Light Order")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fb355] text-white px-7 py-3.5 rounded-2xl font-bold text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366]" />
                <span>Order via WhatsApp ({BRAND_INFO.phone})</span>
              </a>

              <a
                href="#products-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-base transition-colors bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs"
              >
                <span>Browse All Catalog</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Subtle Inline Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-xs font-semibold text-slate-500 pt-1">
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

          {/* Right Column: 3 Floating High-Demand Spotlight Cards */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1 px-1">
              <span className="text-slate-500">
                Today&apos;s High-Demand Electronics
              </span>
              <span className="flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Verified Stock
              </span>
            </div>

            {featuredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onQuickOrder(item)}
                className="p-3.5 sm:p-4 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-between gap-3.5 cursor-pointer group bg-white border border-slate-200/90 hover:border-[#0084FF] hover:shadow-lg text-slate-900"
              >
                <div className="relative w-16 h-16 rounded-xl shrink-0 overflow-hidden flex items-center justify-center p-1.5 shadow-xs bg-slate-50 border border-slate-100">
                  <Image
                    src={item.image}
                    alt={`${item.title} - AllTechByte`}
                    fill
                    priority={idx === 0}
                    sizes="64px"
                    className="object-contain p-1 group-hover:scale-108 transition-transform"
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
                  className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#1fb355] text-white shrink-0 shadow-md active:scale-95 transition-transform"
                  title="Order on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-[#25D366]" />
                </a>
              </div>
            ))}

            <p className="text-[11px] text-center pt-1 text-slate-500">
              Click any card to inspect full pinouts &amp; specifications.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
