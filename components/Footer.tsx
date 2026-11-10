'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
  Truck,
  Heart,
  ExternalLink
} from 'lucide-react';
import { BRAND_INFO, createGeneralInquiryUrl } from '@/data/products';

export default function Footer() {
  return (
    <footer className="bg-[#0B1E48] text-white pt-14 pb-8 border-t-4 border-[#0084FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-blue-900/60">
          
          {/* Column 1: Brand Info & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/10 border border-white/20 p-1 shadow-sm flex items-center justify-center">
                <Image
                  src="/robot-character.png"
                  alt="All Tech Byte Robot"
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white leading-tight block">
                  AllTech<span className="text-[#0084FF]">Byte</span>
                </span>
                <span className="text-xs text-blue-300 block font-bold uppercase tracking-wider">
                  Smart Tech, Honest Prices
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              All Tech Byte is Pakistan&apos;s robotics and electronic components store for Arduino, Raspberry Pi, 
              ESP32, sensors, motor controllers, and maker tools. Dedicated to transparent pricing, tested hardware, and instant WhatsApp customer service.
            </p>

            {/* Direct WhatsApp Callout Box */}
            <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2 max-w-sm">
              <span className="text-[11px] font-bold text-[#25D366] uppercase tracking-wider block flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Instant WhatsApp Hotline</span>
              </span>
              <a
                href={createGeneralInquiryUrl("Footer Hotline")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-black text-white hover:text-[#25D366] transition-colors block"
              >
                {BRAND_INFO.whatsappFormatted}
              </a>
              <span className="text-[10px] text-slate-300 block">
                Monday to Saturday: 10:00 AM - 8:30 PM (Lahore)
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-300">
              Categories
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  Microcontrollers &amp; Arduino
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  Raspberry Pi 5 &amp; Pico 2W
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  NDIR Sensors &amp; Displays
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  PWM Motor Speed Controllers
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  18650 Spot Welders &amp; Boosters
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  Semiconductor ICs &amp; Transistors
                </a>
              </li>
              <li>
                <a href="#flash-sale" className="text-rose-400 hover:text-rose-300 font-bold transition-colors">
                  🔥 Flash Deals
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Ordering */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-300">
              Customer Help
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a
                  href={createGeneralInquiryUrl("How to Order via WhatsApp")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Order via WhatsApp Guide
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#locations-section" className="hover:text-white transition-colors">
                  Lahore Store Pickup Hours
                </a>
              </li>
              <li>
                <a
                  href={createGeneralInquiryUrl("Bulk University / Project Order")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  FYP &amp; University Bulk Discounts
                </a>
              </li>
              <li>
                <a
                  href={createGeneralInquiryUrl("BOM Component Sourcing")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Submit BOM / Parts List
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Physical Address in Lahore */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-300">
              Lahore Store
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="font-bold text-white block text-[11px] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0084FF]" />
                  <span>Retail &amp; Dispatch Outlet:</span>
                </span>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {BRAND_INFO.address1.line}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span className="text-slate-300 font-semibold">
              Payment &amp; Delivery:
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[11px] text-white">
              Cash on Delivery (COD)
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[11px] text-white">
              Direct Bank Transfer
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[11px] text-white">
              JazzCash
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[11px] text-white">
              EasyPaisa
            </span>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p>
              © 2026 <strong className="text-white">{BRAND_INFO.name}</strong> ({BRAND_INFO.domain}). All rights reserved.
            </p>
            <p className="text-xs text-slate-400">
              Built by{' '}
              <a
                href="https://techsistlabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-200 hover:text-[#0084FF] font-semibold hover:underline underline-offset-2 transition-colors inline-flex items-center gap-1"
              >
                Techsist Labs
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
