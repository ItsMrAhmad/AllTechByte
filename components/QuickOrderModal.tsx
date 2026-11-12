'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, MessageCircle, Plus, Minus, CheckCircle, ShieldCheck, Truck } from 'lucide-react';
import { Product, createProductOrderUrl } from '@/data/products';

interface QuickOrderModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickOrderModal({ product, onClose }: QuickOrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [cityNote, setCityNote] = useState('');

  useEffect(() => {
    setQuantity(1);
    setCityNote('');
  }, [product]);

  if (!product) return null;

  const subtotal = product.price * quantity;
  const orderUrl = createProductOrderUrl(product, quantity, cityNote);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            
            {/* Image Box */}
            <div className="relative h-60 sm:h-72 w-full bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4">
              <Image
                src={product.image}
                alt={`${product.title} - AllTechByte`}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-contain p-3"
              />
            </div>

            {/* Product Summary */}
            <div className="space-y-3">
              <div className="text-xs text-slate-500">
                <span className="text-[#0084FF] font-bold uppercase tracking-wider leading-tight">
                  {product.category}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {product.title}
              </h2>

              {product.sku && (
                <div className="text-[11px] text-slate-400 font-mono">
                  SKU: {product.sku}
                </div>
              )}

              {/* Price */}
              <div className="pt-1">
                <span className="text-xs text-slate-400 block">Unit Price (PKR):</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">
                    Rs {product.price.toLocaleString()}
                  </span>
                  {product.comparePrice && (
                    <span className="text-sm text-slate-400 line-through">
                      Rs {product.comparePrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="pt-2">
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Select Quantity:
                </label>
                <div className="inline-flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-1.5 rounded-lg hover:bg-white text-slate-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-black text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="p-1.5 rounded-lg hover:bg-white text-slate-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Live Subtotal */}
              <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Total Subtotal:</span>
                <span className="text-base font-black text-[#0B1E48]">
                  Rs {subtotal.toLocaleString()} PKR
                </span>
              </div>
            </div>

          </div>

          {/* Technical Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <h5 className="text-xs font-bold text-slate-800 mb-2">Technical Specifications:</h5>
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <span className="font-semibold text-slate-500 text-[10px] uppercase">{k}</span>
                    <span className="font-bold text-slate-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer City / Custom Note Input */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-slate-700 block">
              Your City or Delivery Note (Optional):
            </label>
            <input
              type="text"
              value={cityNote}
              onChange={(e) => setCityNote(e.target.value)}
              placeholder="e.g. Lahore (Johar Town), Karachi, Cash on delivery needed..."
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0084FF] outline-none bg-slate-50 focus:bg-white transition-all"
            />
          </div>

          {/* Direct WhatsApp Order CTA Button */}
          <div className="pt-2">
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-[#15803D] hover:bg-[#166534] text-white py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base shadow-xl hover:shadow-emerald-500/30 transition-all active:scale-95 group"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-[#15803D]" />
              <span>Proceed to WhatsApp Order (Rs {subtotal.toLocaleString()})</span>
            </a>
            <span className="text-[11px] text-slate-500 text-center block mt-2">
              Opens WhatsApp directly with pre-filled item specifications and pricing. No cart checkout required!
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
