'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createGeneralInquiryUrl } from '@/data/products';

export default function FloatingWhatsApp() {
  return (
    <aside
      aria-label="WhatsApp Floating Support"
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end select-none"
    >
      <div className="relative group">
        {/* Subtle pulsing ring aura */}
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-55 animate-ping pointer-events-none duration-1000"
        ></span>

        {/* Clean circular WhatsApp button with hover label */}
        <a
          href={createGeneralInquiryUrl("Website Inquiry")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with All Tech Byte on WhatsApp"
          title="Chat with Us on WhatsApp"
          className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6d] text-white rounded-full shadow-2xl shadow-emerald-600/40 ring-2 ring-white/90 transition-all duration-300 hover:scale-108 active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-none shrink-0" />
        </a>
      </div>
    </aside>
  );
}
