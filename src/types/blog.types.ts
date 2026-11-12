/**
 * ============================================================================
 * ফাইল: src/types/blog.types.ts
 * কাজ (Purpose): বায়িং গাইড এবং তুলনামূলক ব্লগ আর্টিকেলের ডেটা স্ট্রাকচার নির্ধারণ করা।
 * কোথায় ব্যবহৃত হবে: data/blogs.json এবং src/app/blog/ পেজগুলোতে।
 * ============================================================================
 */

export interface BlogSection {
  heading: string;             // সাব-হেডিং (H2)
  content: string;             // সেকশনের বিস্তারিত লেখা
  recommendedProductSlug?: string; // লেখার মাঝে কোনো নির্দিষ্ট প্রোডাক্ট কার্ড দেখাতে চাইলে তার স্লাগ
}

export interface BlogPost {
  id: string;
  slug: string;                // যেমন: "best-mechanical-keyboards-for-coding-2026"
  title: string;               // ব্লগের শিরোনাম
  excerpt: string;             // হোমপেজ বা ব্লগ লিস্টে দেখানোর ২ লাইনের সারাংশ
  coverImage: string;          // যেমন: "/images/blogs/coding-keyboards.webp"
  category: string;            // যেমন: "Buying Guide" বা "Comparison"
  readTime: string;            // যেমন: "5 min read"
  publishedAt: string;         // প্রকাশের তারিখ
  updatedAt: string;           // সর্বশেষ আপডেটের তারিখ (SEO-এর জন্য গুরুত্বপূর্ণ)
  
  // AI সার্চের জন্য আর্টিকেলের মূল কথা (Key Takeaways)
  keyTakeaways: string[];      // ৩-৪টি বুলেট পয়েন্ট
  
  // আর্টিকেলের মূল বডি সেকশনসমূহ
  sections: BlogSection[];
}