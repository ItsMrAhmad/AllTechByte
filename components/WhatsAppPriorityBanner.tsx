'use client';

import React from 'react';
import { MessageCircle, CheckCircle, Clock, Send, ShieldAlert, Sparkles } from 'lucide-react';
import { BRAND_INFO, createGeneralInquiryUrl } from '@/data/products';

export default function WhatsAppPriorityBanner() {
  const steps = [
    {
      num: "1",
      title: "Select Any Product",
      desc: "Browse our inventory of Arduino, Raspberry Pi, sensors, or send us your component BOM / list."
    },
    {
      num: "2",
      title: "Tap 'Order on WhatsApp'",
      desc: "Our pre-formatted link instantly opens WhatsApp with the exact item name, price, and model."
    },
    {
      num: "3",
      title: "Instant Human Confirmation",
      desc: "Our technician confirms stock, shares photos if requested, and dispatches via courier or store pickup!"
    }
  ];

  return (
    <section className="py-14 bg-gradient-to-br from-[#0B1E48] via-[#0E2A66] to-[#081533] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero-Friction WhatsApp Commerce</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Why Wait for Tedious Checkouts? <br />
                <span className="text-[#25D366]">Chat &amp; Order Directly on WhatsApp!</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Just like on <span className="text-white font-semibold">dotmaticprinter.com</span>, we have eliminated checkout carts, 
                password resets, and payment failures. You get direct one-on-one access to our electronics staff in Lahore for real-time stock checks, technical advice, and rapid delivery booking.
              </p>

              {/* 3 Step Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {steps.map((st, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                    <div className="w-7 h-7 rounded-full bg-[#0084FF] text-white font-black text-xs flex items-center justify-center mb-2">
                      {st.num}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                      {st.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Primary action */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={createGeneralInquiryUrl("Custom Order or Parts List")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fb355] text-white px-8 py-3.5 rounded-2xl font-black text-base shadow-xl hover:shadow-emerald-500/30 transition-all transform active:scale-95 group"
                >
                  <MessageCircle className="w-6 h-6 fill-white stroke-[#25D366]" />
                  <span>Start WhatsApp Chat: 03298840694</span>
                </a>

                <div className="flex items-center gap-2 text-xs text-slate-400 justify-center sm:justify-start">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Average response time: <strong>&lt; 5 minutes</strong></span>
                </div>
              </div>
            </div>

            {/* Right WhatsApp preview mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-[#0E1E38] rounded-3xl p-5 border border-white/20 shadow-2xl space-y-4">
                
                {/* Simulated chat header */}
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <div className="relative w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                    AB
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-300 border-2 border-[#0E1E38] rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">All Tech Byte Sales</h4>
                    <span className="text-[10px] text-emerald-400 block font-medium">Online • Lahore Store</span>
                  </div>
                </div>

                {/* Simulated chat message bubbles */}
                <div className="space-y-2.5 text-xs">
                  <div className="bg-emerald-950/80 border border-emerald-800/40 text-emerald-100 p-3 rounded-2xl rounded-tl-xs space-y-1">
                    <p className="font-semibold text-white">Customer message:</p>
                    <p className="text-[11px] text-slate-200">
                      &quot;Hi! I want to order 1x Arduino Uno SMD and 2x 10A PWM Motor Controllers for delivery in Lahore.&quot;
                    </p>
                  </div>

                  <div className="bg-white/10 text-white p-3 rounded-2xl rounded-tr-xs space-y-1 ml-4 border border-white/10">
                    <p className="font-semibold text-emerald-400">All Tech Byte Response:</p>
                    <p className="text-[11px] text-slate-200">
                      &quot;Order received! Total Rs 3,150 PKR. Rider dispatched for same-day delivery with Cash on Delivery.&quot;
                    </p>
                  </div>
                </div>

                {/* Simulated action pill */}
                <div className="bg-[#25D366]/20 border border-[#25D366]/40 p-2.5 rounded-xl text-center">
                  <span className="text-[11px] font-bold text-[#25D366]">
                    ✓ No Account Needed • Fast Nationwide Dispatch
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
