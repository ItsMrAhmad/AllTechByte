'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createGeneralInquiryUrl } from '@/data/products';

export default function FloatingWhatsApp() {
  return (
    <aside
      aria-label="WhatsApp Floating Support"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none"
    >
      <div className="relative group">
        {/* Continuous flashing / blinking radar ripple aura (from dotmaticprinter.com) */}
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-70 animate-ping pointer-events-none duration-1000"
        ></span>
        <span
          aria-hidden="true"
          className="absolute -inset-0.5 rounded-full bg-[#25D366] opacity-40 animate-pulse pointer-events-none"
        ></span>

        {/* Main interactive pill button */}
        <a
          href={createGeneralInquiryUrl("Website Inquiry")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with All Tech Byte on WhatsApp"
          className="relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#128C7E] text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <MessageCircle className="w-6 h-6 fill-white text-white stroke-none shrink-0" />
          <span className="font-black text-sm pr-1 tracking-wide">
            Chat with Us
          </span>
        </a>
      </div>
    </aside>
  );
}
