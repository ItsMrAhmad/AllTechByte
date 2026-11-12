import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CATEGORIES,
  CATEGORY_DETAILS,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/data/products';
import CategoryPageClient from '@/components/CategoryPageClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.filter((cat) => cat.id !== 'all').map((cat) => ({
    slug: cat.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category || category.id === 'all') {
    return {
      title: 'Category Not Found',
    };
  }

  const details = CATEGORY_DETAILS[slug] ?? CATEGORY_DETAILS.boards;
  const canonicalUrl = `https://alltechbyte.pk/category/${slug}`;

  return {
    title: `${category.name} in Pakistan`,
    description: details.seoDescription,
    keywords: details.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${category.name} | All Tech Byte`,
      description: details.seoDescription,
      url: canonicalUrl,
      siteName: 'All Tech Byte',
      type: 'website',
      images: [
        {
          url: `https://alltechbyte.pk${details.image}`,
          alt: `${category.name} - All Tech Byte`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | All Tech Byte`,
      description: details.seoDescription,
      images: [`https://alltechbyte.pk${details.image}`],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category || category.id === 'all') {
    notFound();
  }

  const categoryProducts = getProductsByCategory(slug);
  const details = CATEGORY_DETAILS[slug] ?? CATEGORY_DETAILS.boards;
  const canonicalUrl = `https://alltechbyte.pk/category/${slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://alltechbyte.pk',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: canonicalUrl,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} - All Tech Byte`,
    description: details.seoDescription,
    url: canonicalUrl,
    numberOfItems: categoryProducts.length,
    itemListElement: categoryProducts.slice(0, 30).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        url: `https://alltechbyte.pk/products/${product.id}`,
        image: product.image.startsWith('http')
          ? product.image
          : `https://alltechbyte.pk${product.image}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'PKR',
          price: product.price,
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <CategoryPageClient
        categorySlug={slug}
        categoryName={category.name}
        categoryDescription={details.description}
        categoryImage={details.image}
        categoryProducts={categoryProducts}
      />
    </>
  );
}
