'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  MessageCircle,
  Menu,
  ChevronDown,
  Sparkles,
  MapPin,
  X
} from 'lucide-react';
import { BRAND_INFO, CATEGORIES, createGeneralInquiryUrl } from '@/data/products';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
  onCategorySelect?: (catId: string) => void;
  selectedCategory?: string;
  searchQuery?: string;
  onOpenMobileMenu?: () => void;
}

export default function Header({
  onSearchChange = () => {},
  onCategorySelect = () => {},
  selectedCategory = 'all',
  searchQuery = '',
  onOpenMobileMenu = () => {}
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const navMenuItems = [
    {
      title: "Boards & Microcontrollers",
      catId: "boards",
      items: [
        { label: "Arduino Uno & Mega", tag: "Arduino" },
        { label: "Raspberry Pi 5 & 4", tag: "Raspberry Pi" },
        { label: "Raspberry Pi Pico 2W", tag: "Pico 2W" },
        { label: "ESP32 WiFi & Bluetooth", tag: "ESP32" },
        { label: "STM32 ARM Cortex", tag: "STM32" },
        { label: "Server Power Breakout Boards", tag: "Breakout Boards" }
      ]
    },
    {
      title: "Components & ICs",
      catId: "components",
      items: [
        { label: "SOP & DIP Microcontrollers", tag: "Microcontroller" },
        { label: "Power MOSFETs & IGBTs", tag: "MOSFET" },
        { label: "Linear Regulators & Diodes", tag: "Diode" },
        { label: "Crystal Oscillators", tag: "Oscillator" },
        { label: "IC Sockets & Adapters", tag: "Adapter" }
      ]
    },
    {
      title: "Sensors & Displays",
      catId: "sensors",
      items: [
        { label: "5-Inch & 7-Inch HDMI Touch LCDs", tag: "LCD" },
        { label: "MH-Z19C NDIR CO2 Gas Sensors", tag: "CO2" },
        { label: "DS18B20 Waterproof Temp Sensors", tag: "Temperature" },
        { label: "Digital LED Voltmeters DC 0-30V", tag: "Voltmeter" }
      ]
    },
    {
      title: "Robotics & Motors",
      catId: "robotics",
      items: [
        { label: "10A PWM DC Motor Speed Controllers", tag: "PWM" },
        { label: "L298N Dual H-Bridge Drivers", tag: "Motor Driver" },
        { label: "NEMA 17 Stepper Motors & Cables", tag: "Stepper Motor" },
        { label: "Robotics Chassis & DIY Kits", tag: "Robotics" }
      ]
    },
    {
      title: "Power & Converters",
      catId: "power",
      items: [
        { label: "100W DC-DC Step-Up Boost Converters", tag: "Boost Converter" },
        { label: "100A Spot Welding Controller Boards", tag: "Spot Welder" },
        { label: "18650 Battery Spot Welding Pens", tag: "Welding Pen" }
      ]
    },
    {
      title: "Tools & Cables",
      catId: "tools",
      items: [
        { label: "Pure Nickel Strips (0.15mm x 8mm)", tag: "Nickel Strip" },
        { label: "40-Pin DuPont Jumper Wires", tag: "Jumper Wires" },
        { label: "1.8V SPI Programmer Adapters", tag: "Adapter" }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile menu button */}
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 text-slate-700 hover:text-[#0084FF] hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1 group-hover:border-[#0084FF]/50 transition-colors">
              <Image
                src="/robot-character.png"
                alt="All Tech Byte Robot"
                fill
                sizes="(max-width: 768px) 48px, 56px"
                className="object-contain p-0.5 group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-brand text-xl md:text-2xl font-black tracking-tight text-[#07132D] leading-none">
                All Tech <span className="text-[#008CFF]">Byte</span>
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-[2px] w-2.5 md:w-3.5 bg-[#008CFF] rounded-full shrink-0"></span>
                <span className="text-[8px] md:text-[9.5px] font-black tracking-wider text-[#07132D] uppercase whitespace-nowrap leading-none">
                  POWERING <em className="italic text-[#008CFF]">EVERY</em> PROJECT
                </span>
                <span className="h-[2px] w-2.5 md:w-3.5 bg-[#008CFF] rounded-full shrink-0"></span>
              </div>
            </div>
          </Link>

          {/* Universal Website Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative flex w-full border-2 border-slate-200 focus-within:border-[#0084FF] rounded-xl overflow-hidden transition-all bg-white shadow-inner">
              {/* Text Input with Leading Search Icon */}
              <div className="relative flex-1 flex items-center pl-3.5">
                <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search overall store: Arduino, Raspberry Pi, ESP32, sensors, motors, ICs..."
                  className="w-full py-2.5 pr-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    aria-label="Clear search"
                    className="p-1 mr-1 text-slate-400 hover:text-slate-600 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Submit / Icon */}
              <a
                href="#products-section"
                className="bg-[#0B1E48] hover:bg-[#0084FF] text-white px-5 flex items-center justify-center transition-colors font-medium text-sm gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline">Search</span>
              </a>
            </div>
          </div>

          {/* Right Action buttons: WhatsApp Direct Ordering & Store Locations */}
          <div className="flex items-center gap-3">
            {/* Store Locations Shortcut */}
            <a
              href="#locations-section"
              className="hidden xl:flex flex-col text-right pr-2 border-r border-slate-200"
            >
              <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700 justify-end">
                <MapPin className="w-3 h-3 text-[#0084FF]" />
                <span>Lahore Store</span>
              </span>
              <span className="text-[10px] text-slate-500">Main Bund Road</span>
            </a>

            {/* Direct WhatsApp Ordering Button */}
            <a
              href={createGeneralInquiryUrl("Instant Order Booking")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fb355] text-white px-3.5 md:px-4 py-2 md:py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 group"
            >
              <div className="relative">
                <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366]" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-200"></span>
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-semibold text-emerald-100 uppercase tracking-wider leading-none">
                  Order via WhatsApp
                </span>
                <span className="text-xs md:text-sm font-black tracking-tight leading-tight">
                  {BRAND_INFO.phone}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile search bar visible on phones */}
        <div className="mt-3 md:hidden">
          <div className="relative flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
            <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 500+ robotics, ICs, Arduino..."
              className="w-full px-2.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 bg-transparent outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1 mr-2 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Categories Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 xl:gap-2 py-1 text-xs xl:text-[13px] 2xl:text-sm font-medium text-slate-700 whitespace-nowrap overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            
            {/* All Categories Link */}
            <li className="relative group py-1 shrink-0">
              <Link
                href="/#products-section"
                onClick={() => onCategorySelect('all')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-bold ${
                  selectedCategory === 'all'
                    ? 'text-[#0084FF] bg-blue-50 border border-blue-200/80'
                    : 'text-slate-800 hover:text-[#0084FF] hover:bg-slate-200/60'
                }`}
              >
                <span className="whitespace-nowrap">All Categories</span>
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform shrink-0" />
              </Link>
            </li>

            {/* Menu Items with Hover Dropdowns */}
            {navMenuItems.map((menu) => (
              <li
                key={menu.catId}
                className="relative py-1 shrink-0"
                onMouseEnter={() => setDropdownOpen(menu.catId)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  href={`/category/${menu.catId}`}
                  onClick={() => {
                    setDropdownOpen(null);
                  }}
                  className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-colors ${
                    selectedCategory === menu.catId
                      ? 'text-[#0084FF] bg-blue-50 border border-blue-200/80 font-bold'
                      : 'hover:text-[#0084FF] hover:bg-slate-200/60 text-slate-700'
                  }`}
                >
                  <span className="whitespace-nowrap">{menu.title}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 shrink-0" />
                </Link>

                {/* Dropdown panel */}
                {dropdownOpen === menu.catId && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn whitespace-normal">
                    <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {menu.title}
                    </div>
                    {menu.items.map((sub, i) => (
                      <Link
                        key={i}
                        href={`/category/${menu.catId}?q=${encodeURIComponent(sub.tag)}`}
                        onClick={() => {
                          onCategorySelect(menu.catId);
                          onSearchChange(sub.tag);
                          setDropdownOpen(null);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0084FF] transition-colors flex items-center justify-between group"
                      >
                        <span>{sub.label}</span>
                        <span className="text-[10px] text-slate-400 group-hover:text-[#0084FF] font-medium">
                          View &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}

            {/* FAQs link right-aligned */}
            <li className="py-1 ml-auto shrink-0">
              <Link
                href="/#faq-section"
                className="px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold text-slate-600 hover:text-[#0084FF] hover:bg-slate-200/60 transition-colors inline-block"
              >
                Help &amp; FAQs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
