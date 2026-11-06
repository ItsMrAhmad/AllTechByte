'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Cpu, CircuitBoard, Activity, Bot, Zap, Wrench } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

interface CategoryGridProps {
  onSelectCategory: (id: string) => void;
  selectedCategory: string;
}

export default function CategoryGrid({ onSelectCategory, selectedCategory }: CategoryGridProps) {
  const categoryCards = [
    {
      id: "boards",
      title: "Microcontrollers & Boards",
      subtitle: "Arduino, Raspberry Pi, ESP32, STM32",
      count: "14+ Models",
      icon: CircuitBoard,
      image: "https://cdn.shopify.com/s/files/1/1019/7391/8062/files/Arduino-UNO-SMD-R3-Best-Price-in-Pakistan.webp?v=1788272705&width=320",
      accent: "from-blue-600 to-indigo-600"
    },
    {
      id: "sensors",
      title: "Sensors & Displays",
      subtitle: "Touch LCDs, CO2 NDIR, Voltmeter, Temp",
      count: "10+ Types",
      icon: Activity,
      image: "https://cdn.shopify.com/s/files/1/1019/7391/8062/files/compressed_compressed_Gemini_Generated_Image_8en3i68en3i68en3.webp?v=1792517472&width=480",
      accent: "from-cyan-600 to-teal-600"
    },
    {
      id: "robotics",
      title: "Robotics & Motors",
      subtitle: "PWM Speed Controllers, Drivers, Steppers",
      count: "8+ Modules",
      icon: Bot,
      image: "https://cdn.shopify.com/s/files/1/1019/7391/8062/files/ChatGPTImageNov2_2026_06_27_03PM-8.png?v=1793627679",
      accent: "from-emerald-600 to-green-600"
    },
    {
      id: "power",
      title: "Power & Converters",
      subtitle: "100W Boost, Spot Welders, Server Breakouts",
      count: "9+ Units",
      icon: Zap,
      image: "https://cdn.shopify.com/s/files/1/1019/7391/8062/files/ChatGPTImageNov2_2026_06_26_48PM-2.png?v=1793628410",
      accent: "from-amber-500 to-orange-600"
    },
    {
      id: "components",
      title: "Electronic Components & ICs",
      subtitle: "SOP/DIP ICs, MOSFETs, Diodes, Sockets",
      count: "12+ ICs",
      icon: Cpu,
      image: "https://cdn.shopify.com/s/files/1/1019/7391/8062/files/ChatGPTImageNov2_2026_03_06_34PM-1.png?v=1793620847",
      accent: "from-purple-600 to-violet-600"
    },
    {
      id: "tools",
      title: "Tools, Cables & Wires",
      subtitle: "Nickel Strips, Jumper Wires, Adapters",
      count: "7+ Hardware",
      icon: Wrench,
      image: "https://cdn.shopify.com/s/files/1/1019/7391/8062/files/jumper-wires-male-to-female.jpg?v=1787732702&width=320",
      accent: "from-rose-600 to-pink-600"
    }
  ];

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0084FF] mb-1">
              Component Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Popular Electronics &amp; Robotics Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore Lahore&apos;s most comprehensive inventory of maker electronics, microcontroller kits, and industrial parts.
            </p>
          </div>

          <button
            onClick={() => {
              onSelectCategory('all');
              const el = document.getElementById('products-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B1E48] hover:text-[#0084FF] transition-colors self-start md:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {categoryCards.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('products-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex flex-col text-left p-3.5 sm:p-4 rounded-2xl bg-white border transition-all group overflow-hidden relative ${
                  isSelected
                    ? 'border-[#0084FF] shadow-lg ring-2 ring-[#0084FF]/20 bg-blue-50/20'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Category Image thumbnail */}
                <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100 flex items-center justify-center">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Category icon badge */}
                  <div className="absolute top-1.5 left-1.5 p-1 rounded-md bg-white/90 shadow-xs backdrop-blur-xs text-slate-700">
                    <Icon className="w-3.5 h-3.5 text-[#0084FF]" />
                  </div>
                </div>

                {/* Info */}
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {cat.count}
                </span>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 mt-0.5 group-hover:text-[#0084FF] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-1">
                  {cat.subtitle}
                </p>

                {/* Sub-hover arrow */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#0084FF]">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
