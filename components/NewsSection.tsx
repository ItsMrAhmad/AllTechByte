'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpen, ArrowRight, MessageCircle } from 'lucide-react';
import { createGeneralInquiryUrl } from '@/data/products';

export default function NewsSection() {
  const articles = [
    {
      title: "Raspberry Pi 5 16GB: The Most Powerful Mini Computer in Pakistan",
      snippet: "Discover how the quad-core Arm Cortex-A76 processor and PCIe 2.0 interface enable on-device AI computer vision, robotics, and edge computing for Pakistani engineers.",
      category: "Single Board Computers",
      readTime: "4 min read",
      image: "https://cdn.shopify.com/s/files/1/1019/7391/8062/files/raspberry-pi-5-16gb.jpg?v=1787697928&width=320",
      date: "November 2026"
    },
    {
      title: "Arduino Uno: The Best Microcontroller for DIY Electronics in Pakistan",
      snippet: "Why the ATmega328P remains the ideal board for university FYPs, sensor interfacing, robotic arms, and home automation prototypes.",
      category: "Microcontroller Guides",
      readTime: "3 min read",
      image: "https://cdn.shopify.com/s/files/1/1019/7391/8062/files/Arduino-UNO-SMD-R3-Best-Price-in-Pakistan.webp?v=1788272705&width=320",
      date: "October 2026"
    },
    {
      title: "Essential Guide to 18650 Spot Welding & Pure Nickel Strips",
      snippet: "How to safely build custom lithium battery packs using NY-D01 spot welder controller boards and 0.15mm nickel strips for EV bikes and backup power.",
      category: "Battery & Power",
      readTime: "5 min read",
      image: "https://cdn.shopify.com/s/files/1/1019/7391/8062/files/ChatGPTImageNov2_2026_03_06_44PM-7.png?v=1793622042",
      date: "October 2026"
    }
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0084FF] mb-1">
              Knowledge Hub
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Maker Tutorials &amp; Tech Guides
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Practical guides on microcontrollers, robotics hardware, and electronic component selection.
            </p>
          </div>

          <a
            href={createGeneralInquiryUrl("Technical Guidance & Tutorial Parts")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0084FF] hover:text-blue-700 transition-colors"
          >
            <span>Ask for Project Parts on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <article
              key={idx}
              className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg hover:border-slate-300 transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center p-4 border-b border-slate-200 overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-3 left-3 bg-[#0B1E48]/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                  {art.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0084FF] transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {art.snippet}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <a
                    href={createGeneralInquiryUrl(`Parts for Article: ${art.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:text-emerald-700 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Inquire Components</span>
                  </a>

                  <span className="text-xs font-semibold text-[#0084FF] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
