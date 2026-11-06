'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, MapPin } from 'lucide-react';
import { BRAND_INFO, createGeneralInquiryUrl } from '@/data/products';

const ANNOUNCEMENTS = [
  {
    text: "Shop our latest robotics & microcontroller arrivals with nationwide delivery!",
    linkText: "Browse Store",
    linkHref: "#products-section"
  },
  {
    text: "Welcome to All Tech Byte — Lahore's premier maker electronics & robotics hub!",
    linkText: "About Us",
    linkHref: "#locations-section"
  },
  {
    text: "Instant WhatsApp Ordering & Stock Confirmation: 03298840694",
    linkText: "Chat on WhatsApp",
    linkHref: createGeneralInquiryUrl("Instant Order Confirmation")
  }
];

export default function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  const current = ANNOUNCEMENTS[currentIdx];

  return (
    <div className="bg-[#0B1E48] text-white text-xs py-2 px-4 border-b border-blue-900/40 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left helper info (hidden on mobile) */}
        <div className="hidden lg:flex items-center space-x-4 text-slate-300">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#0084FF]" />
            <span>Bund Road & Gulberg III, Lahore</span>
          </span>
          <span className="text-slate-500">•</span>
          <a
            href={`tel:${BRAND_INFO.phone}`}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#25D366]" />
            <span>{BRAND_INFO.phone}</span>
          </a>
        </div>

        {/* Center sliding announcement */}
        <div className="flex-1 flex items-center justify-center space-x-2 px-2 text-center">
          <button
            onClick={handlePrev}
            aria-label="Previous announcement"
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="min-h-[20px] flex items-center justify-center gap-2">
            <span className="font-medium text-slate-100">{current.text}</span>
            <a
              href={current.linkHref}
              className="text-[#0084FF] hover:text-blue-300 font-semibold underline underline-offset-2 ml-1 hidden sm:inline"
            >
              {current.linkText}
            </a>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next announcement"
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center space-x-3 text-slate-300">
          <a
            href={createGeneralInquiryUrl("Customer Support")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 px-2.5 py-0.5 rounded-full font-medium transition-colors"
          >
            <span>WhatsApp Helpline</span>
          </a>
        </div>
      </div>
    </div>
  );
}
