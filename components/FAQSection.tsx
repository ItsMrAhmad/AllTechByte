'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { BRAND_INFO, createGeneralInquiryUrl } from '@/data/products';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the direct WhatsApp ordering process work on All Tech Byte?",
      a: "Just like dotmaticprinter.com, we prioritize direct WhatsApp communication to save you time. Simply browse any product on our site and click 'Order on WhatsApp' or send us your parts list. A pre-filled message with the exact item title and price will open in your WhatsApp. Our sales technician will confirm availability, answer technical questions, and book your dispatch immediately."
    },
    {
      q: "Where is your physical retail store located in Lahore?",
      a: "Our retail store & dispatch outlet is located at Shop #8, Muhammadia Colony, Near Muhammadia Masjid, Bund Road, Lahore. You are welcome to walk in, inspect hardware, and purchase on the spot!"
    },
    {
      q: "Do you deliver to cities outside Lahore across Pakistan?",
      a: "Yes! We provide express nationwide courier delivery to Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Gujranwala, Sialkot, and all other cities and towns across Pakistan. Delivery typically takes 24 to 48 hours via TCS, Leopards, or Trax."
    },
    {
      q: "What payment methods are supported?",
      a: "We support: (1) Cash on Delivery (COD) across Pakistan, (2) Direct Online Bank Transfer (Meezan Bank, HBL, Bank Alfalah), (3) JazzCash, and (4) EasyPaisa. You can choose your preferred method during our WhatsApp conversation."
    },
    {
      q: "Are your Raspberry Pi boards, microcontrollers, and ICs genuine?",
      a: "Yes, 100%. We source original microcontrollers (Raspberry Pi UK, genuine Atmel/Microchip ATmega328P, Espressif ESP32, STMicroelectronics STM32, Winsen sensors). We conduct pre-shipment inspections so that university students and engineering teams receive fully operational hardware."
    },
    {
      q: "Can I get technical assistance or component recommendations for my project?",
      a: "Certainly! Our staff includes experienced electronics technicians who understand pinouts, power supplies, motor drivers, and microcontroller compatibility. Send us a message on WhatsApp (03298840694) with your schematic or requirements, and we will guide you to the right parts."
    }
  ];

  return (
    <section id="faq-section" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0084FF] bg-blue-50 px-3 py-1 rounded-full">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500">
            Everything you need to know about purchasing, WhatsApp ordering, and delivery from All Tech Byte.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#0084FF] transition-colors"
                >
                  <span className="text-sm sm:text-base leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0084FF]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-8 bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 text-center sm:flex sm:items-center sm:justify-between gap-4">
          <div className="text-left mb-3 sm:mb-0">
            <h3 className="text-sm font-bold text-slate-900">Still have a question or need a custom quote?</h3>
            <p className="text-xs text-slate-500">Our team is available 6 days a week on WhatsApp.</p>
          </div>
          <a
            href={createGeneralInquiryUrl("FAQ Inquiry")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb355] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-[#25D366]" />
            <span>Chat on WhatsApp (03298840694)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
