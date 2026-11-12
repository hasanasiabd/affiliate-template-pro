/**
 * ============================================================================
 * ফাইল: src/lib/schema/faqSchema.ts
 * কাজ (Purpose): প্রোডাক্ট বা হোমপেজের FAQ সেকশনের জন্য FAQPage JSON-LD স্কিমা তৈরি করা।
 * কেন গুরুত্বপূর্ণ: গুগল সার্চ রেজাল্টে ড্রপডাউন প্রশ্ন-উত্তর (Rich FAQ snippet) দেখাতে সাহায্য করে।
 * কোথায় ব্যবহৃত হবে: রিভিউ পেজ এবং হোমপেজে।
 * ============================================================================
 */

import { ProductFaq } from '@/types/product.types';

/**
 * FAQ অ্যারে থেকে FAQPage স্কিমা জেনারেট করার ফাংশন
 */
export function generateFaqSchema(faqs: ProductFaq[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}