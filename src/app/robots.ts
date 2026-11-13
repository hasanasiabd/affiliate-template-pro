/**
 * ============================================================================
 * ফাইল: src/app/robots.ts
 * কাজ (Purpose): সার্চ ইঞ্জিন বটদের জন্য স্বয়ংক্রিয়ভাবে /robots.txt ফাইল তৈরি করা।
 * কেন গুরুত্বপূর্ণ: পাবলিক রিভিউ পেজ ইনডেক্স করতে দেয় কিন্তু /admin প্যানেল গুগল থেকে গোপন রাখে।
 * ============================================================================
 */

import type { MetadataRoute } from 'next';
import siteConfigData from '@/data/siteConfig.json';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfigData.siteUrl.replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}