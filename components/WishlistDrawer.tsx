'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, Trash2, MessageCircle, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { PRODUCTS, Product, BRAND_INFO } from '@/data/products';
import { getWishlistIds, toggleWishlistItem, clearWishlist } from '@/lib/wishlist';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickOrder?: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  onQuickOrder
}: WishlistDrawerProps) {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  const refreshWishlist = () => {
    const ids = getWishlistIds();
    const items = PRODUCTS.filter((p) => ids.includes(p.id));
    setWishlistProducts(items);
  };

  useEffect(() => {
    refreshWishlist();

    const handleUpdate = () => {
      refreshWishlist();
    };

    window.addEventListener('atb-wishlist-change', handleUpdate);
    return () => {
      window.removeEventListener('atb-wishlist-change', handleUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const totalEstimated = wishlistProducts.reduce((sum, p) => sum + p.price, 0);

  // Generate WhatsApp message for all wishlisted items (Project BOM order)
  const createWishlistOrderUrl = () => {
    let text = `Salam All Tech Byte! I want to order/inquire about my saved Wishlist items:\n\n`;
    wishlistProducts.forEach((p, idx) => {
      text += `${idx + 1}. ${p.title} - Rs ${p.price.toLocaleString()}\n`;
    });
    text += `\nTotal Estimated: Rs ${totalEstimated.toLocaleString()}`;
    text += `\nPlease confirm availability and Lahore/Pakistan delivery details. Thank you!`;

    return `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleRemove = (productId: string) => {
    toggleWishlistItem(productId);
    refreshWishlist();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-2xs">
                <Heart className="w-5 h-5 fill-rose-600" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 leading-tight">
                  My Wishlist / Project BOM
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200">
                  <Heart className="w-8 h-8 stroke-slate-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Your wishlist is empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                    Save microcontrollers, motors, sensors, and tools here while planning your electronics project.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-[#0066CC] hover:bg-[#0052a3] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-3 flex gap-3 hover:border-blue-300 transition-all shadow-2xs group relative"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="relative w-18 h-18 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="72px"
                      className="object-contain p-1 group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-wider block truncate">
                        {product.category}
                      </span>
                      <Link
                        href={`/products/${product.id}`}
                        onClick={onClose}
                        className="text-xs font-bold text-slate-900 hover:text-[#0066CC] line-clamp-2 transition-colors leading-snug"
                      >
                        {product.title}
                      </Link>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm font-black text-slate-900">
                        Rs {product.price.toLocaleString()}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleRemove(product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Salam All Tech Byte! I want to order ${product.title} (Rs ${product.price}) from my wishlist.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-[#15803D] hover:bg-[#166534] text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-2xs transition-all"
                        >
                          <MessageCircle className="w-3 h-3 fill-white stroke-[#15803D]" />
                          <span>Order</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order All Action */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Estimated Total
                </span>
                <span className="text-xl font-black text-slate-900">
                  Rs {totalEstimated.toLocaleString()}
                </span>
              </div>

              <a
                href={createWishlistOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb355] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-[#25D366]" />
                <span>Order All {wishlistProducts.length} Items via WhatsApp</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                <span>Free cash on delivery options</span>
                <button
                  onClick={() => {
                    if (confirm('Clear all items from your wishlist?')) {
                      clearWishlist();
                      refreshWishlist();
                    }
                  }}
                  className="hover:text-rose-600 transition-colors"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
