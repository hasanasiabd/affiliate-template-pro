/**
 * ============================================================================
 * ফাইল: next.config.ts
 * কাজ (Purpose): Next.js-এর ইমেজ অপ্টিমাইজেশন, ফরম্যাট এবং সিকিউরিটি হেডার কনফিগার করা।
 * কেন গুরুত্বপূর্ণ: এটি ছবিগুলোকে স্বয়ংক্রিয়ভাবে হালকা ফরম্যাটে (AVIF/WebP) রূপান্তর করে
 *               এবং অ্যামাজনের এক্সটার্নাল ছবির লিংক নিরাপদে লোড করার অনুমতি দেয়।
 * এডিট গাইড: নতুন কোনো ওয়েবসাইট থেকে ছবি লোড করতে চাইলে remotePatterns-এ ডোমেইন যোগ করুন।
 * ============================================================================
 */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ইমেজ অপ্টিমাইজেশন সেটিংস
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', // অ্যামাজনের অফিশিয়াল প্রোডাক্ট ইমেজ সাপোর্ট
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // ডেমো বা ব্লগ ছবির জন্য
      },
    ],
  },

  // প্রোডাকশন বিল্ডে ব্রাউজার ক্যাশিং ও নিরাপত্তা জোরদার করা
  poweredByHeader: false, // সিকিউরিটির জন্য X-Powered-By: Next.js হেডার লুকানো
  reactStrictMode: true,
};

export default nextConfig;