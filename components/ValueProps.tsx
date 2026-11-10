'use client';

import React from 'react';
import { Truck, ShieldCheck, MessageCircle, MapPin } from 'lucide-react';
import { BRAND_INFO, createGeneralInquiryUrl } from '@/data/products';

export default function ValueProps() {
  const props = [
    {
      icon: Truck,
      color: "text-[#0084FF]",
      bgColor: "bg-blue-50 border-blue-100",
      title: "Delivery All Over Pakistan",
      description: "Fast courier delivery to Karachi, Rawalpindi, Islamabad, Peshawar, Multan, Faisalabad & all cities. Same-day Lahore dispatch available!"
    },
    {
      icon: ShieldCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-100",
      title: "100% Tested & Genuine",
      description: "Authentic microcontrollers, original ICs, reliable power supplies, and sensors inspected and verified for university and industrial projects."
    },
    {
      icon: MessageCircle,
      color: "text-[#25D366]",
      bgColor: "bg-green-50 border-green-100",
      title: "Direct WhatsApp Ordering",
      description: "Skip complex carts and account forms. Tap, chat, and place your order directly on WhatsApp (03298840694) with instant human confirmation!"
    },
    {
      icon: MapPin,
      color: "text-amber-600",
      bgColor: "bg-amber-50 border-amber-100",
      title: "Lahore Walk-in Store",
      description: "Visit our physical retail store at Bund Road (Near Muhammadia Masjid) for immediate in-store pickup & consultation."
    }
  ];

  return (
    <section className="bg-white py-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all group"
              >
                <div className={`p-3.5 rounded-xl border ${p.bgColor} shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
