'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Heart, Plus, CheckCircle, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { Product, BRAND_INFO } from '@/data/products';
import { isProductWishlisted, toggleWishlistItem } from '@/lib/wishlist';

interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  projectTitle: string;
  content: string;
  verified: boolean;
}

interface ProductReviewsProps {
  product: Product;
}

export default function ProductReviewsSection({ product }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form
  const [authorName, setAuthorName] = useState('');
  const [cityOrUni, setCityOrUni] = useState('');
  const [rating, setRating] = useState(5);
  const [projectTitle, setProjectTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isProductWishlisted(product.id));

    const handleWishlistSync = () => {
      setIsWishlisted(isProductWishlisted(product.id));
    };

    window.addEventListener('atb-wishlist-change', handleWishlistSync);

    // Load genuine customer submitted reviews from localStorage
    const storageKey = `atb_reviews_${product.id}`;
    const saved = localStorage.getItem(storageKey);
    let initialList: ReviewItem[] = [];

    if (saved) {
      try {
        initialList = JSON.parse(saved);
      } catch {
        initialList = [];
      }
    }

    setReviews(initialList);

    return () => {
      window.removeEventListener('atb-wishlist-change', handleWishlistSync);
    };
  }, [product.id, product.category, product.title]);

  const handleToggleWishlist = () => {
    const nowWishlisted = toggleWishlistItem(product.id);
    setIsWishlisted(nowWishlisted);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewContent.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      location: cityOrUni.trim() || 'Verified Customer',
      rating: rating,
      date: 'Just now',
      projectTitle: projectTitle.trim() || 'Custom Electronics Project',
      content: reviewContent.trim(),
      verified: true
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem(`atb_reviews_${product.id}`, JSON.stringify(updated));
    setIsSubmitted(true);
  };

  const createReviewShareWhatsApp = () => {
    const text = `Salam All Tech Byte! I submitted a project review for *${product.title}*:\n\n` +
      `Rating: ${'★'.repeat(rating)}\n` +
      `Project: ${projectTitle || 'DIY Electronics'}\n` +
      `Feedback: "${reviewContent}"\n` +
      `- ${authorName} (${cityOrUni || 'Pakistan'})`;

    return `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="mt-12 pt-10 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0066CC] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Verified Feedback</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Customer Reviews &amp; Ratings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real feedback from Pakistani engineers, university students, and maker lab creators.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-2xs ${
              isWishlisted
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-slate-400'}`} />
            <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
          </button>

          {/* Submit Review Button */}
          <button
            onClick={() => {
              setIsSubmitted(false);
              setIsModalOpen(true);
            }}
            className="bg-[#0B1E48] hover:bg-[#0066CC] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Review Cards Grid or Empty State */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center border border-slate-200">
            <Star className="w-6 h-6 stroke-slate-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">No customer reviews yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Have you tested this component? Be the first to share your rating and review with other makers!
            </p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 bg-[#0066CC] hover:bg-[#0052a3] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write the First Review</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-100 text-slate-200'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1.5">
                      {rev.rating}.0
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    {rev.date}
                  </span>
                </div>

                {rev.projectTitle && (
                  <div className="text-xs font-bold text-[#0066CC] mb-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]"></span>
                    <span>Project: {rev.projectTitle}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900">{rev.author}</span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-slate-500 text-[11px]">{rev.location}</span>
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified Purchase</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {!isSubmitted ? (
              <form onSubmit={handleSaveReview} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Write a Customer Review
                    </h3>
                    <p className="text-xs text-slate-500">
                      Reviewing: <span className="font-bold text-slate-700">{product.title}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                  >
                    &times;
                  </button>
                </div>

                {/* Rating Stars Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-transform hover:scale-110 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-100 text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">
                      {rating} of 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bilal Ahmed"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0066CC] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      City or University
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. NUST / Lahore"
                      value={cityOrUni}
                      onChange={(e) => setCityOrUni(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0066CC] outline-none"
                    />
                  </div>
                </div>

                {/* Project Title */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Project Title (What did you build with it?)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Smart IoT Weather Station or Line Following Robot"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0066CC] outline-none"
                  />
                </div>

                {/* Feedback Content */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Review &amp; Experience *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share how the component worked, delivery experience, pinout compatibility..."
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0066CC] outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#0066CC] hover:bg-[#0052a3] text-white px-5 py-2.5 text-xs font-bold rounded-xl shadow-xs transition-all"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Thank You for Your Feedback!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Your review has been saved and is now visible on this product page.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                  <a
                    href={createReviewShareWhatsApp()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-[#15803D]" />
                    <span>Share on WhatsApp to Feature on Homepage</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
