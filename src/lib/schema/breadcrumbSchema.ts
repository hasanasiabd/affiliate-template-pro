/**
 * ============================================================================
 * ফাইল: src/lib/schema/breadcrumbSchema.ts
 * কাজ (Purpose): সাইটের ন্যাভিগেশন স্ট্রাকচার বোঝানোর জন্য BreadcrumbList JSON-LD স্কিমা তৈরি করা।
 * কেন গুরুত্বপূর্ণ: গুগল সার্চ রেজাল্টে লিংকের উপরে পাথ দেখাতে সাহায্য করে।
 * কোথায় ব্যবহৃত হবে: রিভিউ পেজ, ব্লগ পেজ এবং লিগ্যাল পেজগুলোতে।
 * ============================================================================
 */

import siteConfigData from '@/data/siteConfig.json';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * ব্রেডক্রাম্ব আইটেমগুলোর তালিকা থেকে স্কিমা জেনারেট করার ফাংশন
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const siteUrl = siteConfigData.siteUrl;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}