/**
 * ============================================================================
 * ফাইল: src/types/product.types.ts
 * কাজ (Purpose): প্রোডাক্ট রিভিউ, স্পেসিফিকেশন, তুলনা এবং ক্যাটাগরির ডেটা স্ট্রাকচার নির্ধারণ করা।
 * কেন গুরুত্বপূর্ণ: গুগল রিচ স্নিপেট (Schema) এবং AI সার্চ (GEO) এর জন্য প্রয়োজনীয় প্রতিটি ফিল্ড
 *               যেন নির্ভুল থাকে, তা এই টাইপ ফাইলটি নিশ্চিত করে।
 * কোথায় ব্যবহৃত হবে: data/products.json, প্রোডাক্ট কার্ড, রিভিউ পেজ এবং কম্পেয়ার ফিচারে।
 * ============================================================================
 */

// ১. প্রোডাক্টের টেকনিক্যাল স্পেসিফিকেশন ও তার বাস্তব সুবিধা ("So What?" ব্যাখ্যা)
export interface ProductSpec {
  label: string;       // যেমন: "DPI / Sensor" বা "Battery Life"
  value: string;       // যেমন: "26,000 DPI" বা "Up to 90 Hours"
  realWorldBenefit?: string; // যেমন: "কাঁচের টেবিলেও মাউসপ্যাড ছাড়া নিখুঁত কাজ করে"
}

// ২. প্রতিদ্বন্দ্বী প্রোডাক্টের সাথে তুলনা করার ডেটা
export interface ProductAlternative {
  name: string;        // বিকল্প প্রোডাক্টের নাম
  priceRange: string;  // যেমন: "$40 - $50"
  bestFor: string;     // যেমন: "Budget Buyers" বা "Small Hands"
  affiliateUrl: string;// বিকল্প প্রোডাক্টের অ্যামাজন লিংক
}

// ৩. প্রোডাক্ট ভিত্তিক সাধারণ প্রশ্নোত্তর (FAQ Schema-এর জন্য)
export interface ProductFaq {
  question: string;
  answer: string;
}

// ৪. মূল প্রোডাক্ট ইন্টারফেস
export interface Product {
  id: string;
  slug: string;                // SEO-বান্ধব URL (যেমন: "logitech-mx-master-3s-review")
  title: string;               // প্রোডাক্টের পূর্ণ নাম
  brand: string;               // ব্র্যান্ডের নাম (Schema-এর জন্য বাধ্যতামূলক)
  category: string;            // যেমন: "mouse", "keyboard", "monitor"
  tagline: string;             // ১ লাইনের আকর্ষণীয় সাবটাইটেল
  
  // দাম ও অ্যামাজন কমপ্লায়েন্স (তারিখ উল্লেখ থাকা বাধ্যতামূলক)
  price: string;               // যেমন: "$99.99"
  priceUpdatedDate: string;    // যেমন: "Nov 2026" (অ্যামাজন পলিসি রক্ষার জন্য)
  affiliateUrl: string;        // অ্যামাজন প্রোডাক্ট লিংক
  
  // রেটিং ও ব্যাজ
  rating: number;              // ৫ এর মধ্যে রেটিং (যেমন: 4.8)
  isEditorsChoice?: boolean;   // হোমপেজে সেরা প্রোডাক্ট হিসেবে হাইলাইট হবে কি না
  badgeText?: string;          // যেমন: "Best for Coding" বা "Top Pick"

  // মিডিয়া ফাইল (public/ ফোল্ডার থেকে)
  mainImage: string;           // যেমন: "/images/products/mx-master-3s.webp"
  galleryImages?: string[];    // অতিরিক্ত ছবির তালিকা
  demoVideoUrl?: string;       // যেমন: "/videos/mx-master-demo.webm"

  // AI সার্চ (GEO) ও BLUF ফ্রেমওয়ার্ক ডেটা
  quickVerdict: string;        // ২-৩ লাইনের সরাসরি চূড়ান্ত সিদ্ধান্ত
  buyIf: string[];             // কারা এই প্রোডাক্টটি কিনবে (৩টি পয়েন্ট)
  skipIf: string[];            // কারা এটি এড়িয়ে চলবে (২-৩টি পয়েন্ট)

  // E-E-A-T সিগন্যাল ও বিস্তারিত অভিজ্ঞতা
  testingSummary: string;      // কীভাবে এবং কত দিন প্রোডাক্টটি টেস্ট করা হয়েছে
  pros: string[];              // প্রোডাক্টের ভালো দিকগুলো
  cons: string[];              // প্রোডাক্টের দুর্বল দিকগুলো
  fullReviewContent: string;   // বিস্তারিত রিভিউ প্যারাগ্রাফ
  
  // টেবিল ও অতিরিক্ত সেকশন
  specs: ProductSpec[];
  alternatives?: ProductAlternative[];
  faqs?: ProductFaq[];
  
  publishedAt: string;         // যেমন: "2026-11-12"
}

// ৫. ক্যাটাগরি ফিল্টারিংয়ের ইন্টারফেস
export interface Category {
  id: string;
  name: string;                // যেমন: "Keyboards"
  slug: string;                // যেমন: "keyboard"
  description: string;
  iconName: string;            // Lucide আইকনের নাম (যেমন: "Keyboard", "Mouse")
}