/**
 * ============================================================================
 * ফাইল: src/app/sitemap.ts
 * কাজ (Purpose): গুগল এবং বিং সার্চ ইঞ্জিনের জন্য ডাইনামিক sitemap.xml জেনারেট করা।
 * কেন গুরুত্বপূর্ণ: নতুন প্রোডাক্ট যোগ করলে ম্যানুয়ালি সাইটম্যাপ এডিট করতে হয় না।
 * ============================================================================
 */

import type { MetadataRoute } from 'next';
import siteConfigData from '@/data/siteConfig.json';
import productsData from '@/data/products.json';
  import blogPostsData from '@/data/blogPosts.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfigData.siteUrl.replace(/\/$/, '');

  // ১. স্ট্যাটিক পেজসমূহ
  const staticPages: MetadataRoute.Sitemap = [
    '',
    '/compare',
    '/blog',
    '/about',
    '/contact',
    '/affiliate-disclosure',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.7,
  }));

  // ২. ডাইনামিক প্রোডাক্ট রিভিউ পেজসমূহ
  const productPages: MetadataRoute.Sitemap = productsData.products.map(
    (product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product.publishedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  );

  // ৩. ডাইনামিক ব্লগ বায়িং গাইড পেজসমূহ
  const blogPages: MetadataRoute.Sitemap = blogPostsData.posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}