import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alltechbyte.pk';

  const productUrls: MetadataRoute.Sitemap = PRODUCTS.filter((p) => !p.isDraft).map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...productUrls,
  ];
}
