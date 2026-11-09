import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS, Product, BRAND_INFO, createProductOrderUrl } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { MessageCircle, CheckCircle2, ShieldCheck, ArrowLeft, Star, Truck, MapPin } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.filter((p) => !p.isDraft).map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id && !p.isDraft);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = `${product.title} Price in Pakistan`;
  const description = `Buy ${product.title} in Pakistan at Rs ${product.price.toLocaleString()}. Genuine components, same-day Lahore dispatch, Cash on Delivery & WhatsApp order at 03298840694.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://alltechbyte.pk/products/${product.id}`,
    },
    openGraph: {
      title: `${product.title} | All Tech Byte Pakistan`,
      description,
      url: `https://alltechbyte.pk/products/${product.id}`,
      siteName: 'All Tech Byte',
      images: [
        {
          url: product.image,
          width: 900,
          height: 900,
          alt: product.title,
        },
      ],
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | All Tech Byte`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id && !p.isDraft);

  if (!product) {
    notFound();
  }

  const orderUrl = createProductOrderUrl(product, 1);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": `https://alltechbyte.pk${product.image}`,
    "description": product.description,
    "sku": product.sku || product.id,
    "brand": {
      "@type": "Brand",
      "name": "All Tech Byte"
    },
    "aggregateRating": product.rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewsCount || 10
    } : undefined,
    "offers": {
      "@type": "Offer",
      "url": `https://alltechbyte.pk/products/${product.id}`,
      "priceCurrency": "PKR",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "All Tech Byte"
      }
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://alltechbyte.pk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.category,
        "item": `https://alltechbyte.pk/?category=${encodeURIComponent(product.category)}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.title,
        "item": `https://alltechbyte.pk/products/${product.id}`
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#0084FF] transition-colors flex items-center gap-1 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-[#0084FF] transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
              {product.title}
            </span>
          </nav>

          {/* Product Detail Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Product Image Column */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-6 flex items-center justify-center aspect-square relative shadow-xs">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-contain p-4"
                />
                <span className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  In Stock (Lahore)
                </span>
                {product.comparePrice && (
                  <span className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
                    SAVE Rs {(product.comparePrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Product Info Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#0084FF] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-4 h-4 fill-amber-400 stroke-none" />
                      <span>{product.rating || '5.0'}</span>
                      <span className="text-slate-400 font-normal">({product.reviewsCount || 48} reviews)</span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    {product.title}
                  </h1>

                  {product.sku && (
                    <span className="text-xs text-slate-400 font-mono mt-1 block">
                      SKU: {product.sku}
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 flex items-baseline justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">
                        Rs {product.price.toLocaleString()}
                      </span>
                      {product.comparePrice && (
                        <span className="text-base text-slate-400 line-through">
                          Rs {product.comparePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 block mt-1">
                      Cash on Delivery Available across Pakistan
                    </span>
                  </div>

                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Genuine Verified Hardware
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Product Overview
                  </h2>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Specifications Table */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Technical Specifications
                    </h2>
                    <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                      {Object.entries(product.specs).map(([k, v], idx) => (
                        <div
                          key={k}
                          className={`flex justify-between py-2.5 px-3.5 ${
                            idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                          } border-b border-slate-100 last:border-b-0`}
                        >
                          <span className="font-semibold text-slate-700">{k}</span>
                          <span className="font-mono text-slate-900 font-bold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* WhatsApp Order Action */}
                <div className="pt-2 space-y-3">
                  <a
                    href={orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fb355] text-white py-4 px-6 rounded-2xl font-black text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366]" />
                    <span>Order on WhatsApp (Rs {product.price.toLocaleString()})</span>
                  </a>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-slate-500 pt-2 text-center">
                    <div className="flex items-center justify-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <Truck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>Same-day Lahore dispatch</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Tested before shipment</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>2 Walk-in Lahore stores</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
