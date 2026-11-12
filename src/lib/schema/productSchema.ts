/**
 * ============================================================================
 * ফাইল: src/lib/schema/productSchema.ts
 * কাজ (Purpose): গুগল সার্চের রিচ স্নিপেটের জন্য Product এবং Review JSON-LD স্কিমা তৈরি করা।
 * কেন গুরুত্বপূর্ণ: এটি গুগলে প্রোডাক্টের স্টার রেটিং, দাম ও স্টক স্ট্যাটাস দেখাতে সাহায্য করে।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx
 * ============================================================================
 */

import { Product } from '@/types/product.types';
import siteConfigData from '@/data/siteConfig.json';
import { getAffiliateUrl } from '@/lib/utils/affiliateLink';

/**
 * প্রোডাক্ট রিভিউ পেজের জন্য JSON-LD অবজেক্ট জেনারেটর
 */
export function generateProductSchema(product: Product) {
  const affiliateLink = getAffiliateUrl(product.affiliateUrl, siteConfigData.amazonAssociateTag);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: [product.mainImage, ...(product.galleryImages || [])],
    description: product.tagline,
    sku: `PROD-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Tech Brand',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: product.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      author: {
        '@type': 'Person',
        name: siteConfigData.author.name,
      },
      datePublished: product.publishedAt,
      reviewBody: product.quickVerdict,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: '1',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      url: affiliateLink,
      priceCurrency: 'USD',
      price: product.price.replace('$', ''),
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Amazon',
      },
    },
  };
}