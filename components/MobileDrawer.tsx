'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, MessageCircle, MapPin, Search, ChevronRight, Phone } from 'lucide-react';
import { BRAND_INFO, CATEGORIES, createGeneralInquiryUrl } from '@/data/products';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (id: string) => void;
  selectedCategory: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  onSelectCategory,
  selectedCategory,
  searchQuery,
  onSearchChange
}: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 bg-[#0B1E48] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white border border-white/20 p-1 flex items-center justify-center shrink-0">
              <Image
                src="/robot-character.png"
                alt="All Tech Byte Robot"
                fill
                sizes="44px"
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <span className="font-brand font-black text-lg tracking-tight text-white leading-none block">
                All Tech <span className="text-[#0099FF]">Byte</span>
              </span>
              <div className="flex items-center gap-1 mt-1">
                <span className="h-[1.5px] w-2 bg-[#0099FF] rounded-full shrink-0"></span>
                <span className="text-[8.5px] text-slate-200 font-black uppercase tracking-wider whitespace-nowrap leading-none">
                  POWERING <em className="italic text-[#38BDF8]">EVERY</em> PROJECT
                </span>
                <span className="h-[1.5px] w-2 bg-[#0099FF] rounded-full shrink-0"></span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Search */}
        <div className="p-3 border-b border-slate-200 bg-slate-50">
          <div className="relative flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden px-2.5 py-1.5">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search components..."
              className="w-full text-xs text-slate-800 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
              Component Categories
            </span>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const href = cat.id === 'all' ? '/#products-section' : `/category/${cat.id}`;
                return (
                  <Link
                    key={cat.id}
                    href={href}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-[#0084FF] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Lahore Store */}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
              Lahore Store
            </span>
            <div className="space-y-2 text-xs">
              <Link
                href="/#locations-section"
                onClick={onClose}
                className="block p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:border-blue-300"
              >
                <strong className="text-slate-900 block font-bold">Bund Road Store:</strong>
                <span className="text-[11px] text-slate-500">Shop #8, Muhammadia Colony, Bund Road</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
          <a
            href={createGeneralInquiryUrl("Mobile Menu Order")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-[#15803D]" />
            <span>Chat on WhatsApp: {BRAND_INFO.phone}</span>
          </a>

          <a
            href={`tel:${BRAND_INFO.phone}`}
            className="w-full flex items-center justify-center gap-1.5 bg-white text-slate-700 border border-slate-300 py-2.5 px-4 rounded-xl font-semibold text-xs transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>Direct Phone Call</span>
          </a>
        </div>

      </div>
    </div>
  );
}
