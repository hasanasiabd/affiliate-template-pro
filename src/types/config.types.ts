/**
 * ============================================================================
 * ফাইল: src/types/config.types.ts
 * কাজ (Purpose): সাইটের গ্লোবাল সেটিংস, অ্যামাজন ট্যাগ এবং ট্র্যাকিং পিক্সেলের টাইপ নির্ধারণ করা।
 * কেন গুরুত্বপূর্ণ: টেম্পলেট ক্রেতারা যখন অ্যাডমিন প্যানেল থেকে সাইটের নাম বা পিক্সেল আইডি
 *               পরিবর্তন করবেন, তখন এই স্ট্রাকচার অনুযায়ী ডেটা সেভ ও ভ্যালিডেট হবে।
 * কোথায় ব্যবহৃত হবে: data/siteConfig.json, data/trackingConfig.json এবং অ্যাডমিন প্যানেলে।
 * ============================================================================
 */

// ১. রিভিউ লেখকের প্রোফাইল (গুগল E-E-A-T র‍্যাঙ্কিংয়ের জন্য)
export interface AuthorProfile {
  name: string;                // যেমন: "Md. Hasan"
  role: string;                // যেমন: "Lead Tech Reviewer & Full-Stack Developer"
  bio: string;                 // ১-২ লাইনের পরিচিতি
  avatarUrl: string;           // লেখকের ছবির পাথ
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// ২. সাইটের মূল কনফিগারেশন ও গ্লোবাল অ্যাফিলিয়েট সেটিংস
export interface SiteConfig {
  siteName: string;            // যেমন: "DevGear Reviews"
  siteTagline: string;         // হোমপেজের মূল স্লোগান
  siteDescription: string;     // গুগল এসইও মেটা ডেসক্রিপশন
  siteUrl: string;             // যেমন: "https://reviews.yourname.me"
  logoText: string;            // নেভবারে দেখানোর টেক্সট লোগো
  
  // মাস্টার অ্যামাজন ট্যাগ (এখানে বদলালে সব প্রোডাক্টে অটো যুক্ত হবে)
  amazonAssociateTag: string;  // যেমন: "hasan2026-20"
  
  // বাধ্যতামূলক অ্যামাজন ডিসক্লোজার নোটিশ
  disclosureText: string;      // হেডার ও ফুটারে দেখানোর সংক্ষিপ্ত নোটিশ
  
  // ডিফল্ট থিম ও লেখকের তথ্য
  defaultTheme: 'dark' | 'light' | 'system';
  author: AuthorProfile;
  contactEmail: string;
}

// ৩. মার্কেটিং পিক্সেল ও সার্চ ইঞ্জিন ভেরিফিকেশন সেটিংস
export interface TrackingConfig {
  enableTracking: boolean;             // এক ক্লিকে সব ট্র্যাকিং অন/অফ করার মাস্টার সুইচ
  metaPixelId: string;                 // Facebook / Meta Pixel ID
  googleAnalyticsId: string;           // GA4 Measurement ID (যেমন: "G-XXXXXXXXXX")
  microsoftClarityId: string;          // ফ্রি হিটম্যাপ ট্র্যাকিং আইডি
  googleSiteVerification: string;      // Google Search Console ভেরিফিকেশন কোড
  bingSiteVerification: string;        // Bing Webmaster ভেরিফিকেশন কোড
}