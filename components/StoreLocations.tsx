'use client';

import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO, createGeneralInquiryUrl } from '@/data/products';

export default function StoreLocations() {
  const branches = [
    {
      name: "Bund Road Retail Store & Dispatch Center",
      tag: "Store & Warehouse",
      address: "Shop #8, Muhammadia Colony, Near Muhammadia Masjid, Bund Road, Lahore, Punjab",
      city: "Lahore, Punjab",
      phone: BRAND_INFO.phone,
      hours: "Monday - Saturday: 10:00 AM - 8:30 PM",
      features: [
        "Complete Maker & Electronics Inventory",
        "Same-Day Courier & Rider Dispatch",
        "Over-The-Counter Cash Pickup",
        "Testing Facilities Available"
      ],
      mapsQuery: "Muhammadia Colony Near Muhammadia Masjid Bund Road Lahore"
    }
  ];

  return (
    <section id="locations-section" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0066CC] bg-blue-50 px-3 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            <span>Physical Walk-in Outlet</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Visit Our Store in Lahore
          </h2>
          <p className="text-sm text-slate-500">
            Need urgent components for your FYP, maker build, or industrial assembly? Visit our Lahore store on Bund Road or order for immediate courier delivery!
          </p>
        </div>

        {/* Single Centered Store Card */}
        <div className="max-w-2xl mx-auto">
          {branches.map((b, i) => (
            <div
              key={i}
              className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-lg hover:border-[#0066CC]/40 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Branch Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0066CC] bg-blue-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
                    {b.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Open Today
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  {b.name}
                </h3>

                {/* Address */}
                <div className="flex items-start gap-3 text-sm text-slate-700 bg-white p-4 rounded-2xl border border-slate-200">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Address:</span>
                    <span>{b.address}</span>
                  </div>
                </div>

                {/* Hours & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{b.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
                    <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span>{b.phone}</span>
                  </div>
                </div>

                {/* Features checklist */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Branch Highlights:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {b.features.map((feat, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={createGeneralInquiryUrl(`Store Visit Inquiry for ${b.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-[#15803D]" />
                  <span>Confirm Stock via WhatsApp</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(b.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold py-3 px-4 rounded-xl transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#0066CC]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
