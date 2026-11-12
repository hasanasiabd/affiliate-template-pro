/**
 * ============================================================================
 * ফাইল: src/types/admin.types.ts
 * কাজ (Purpose): অ্যাডমিন প্যানেলের অথেনটিকেশন, ক্লিক অ্যানালিটিক্স এবং API রেসপন্সের টাইপ নির্ধারণ করা।
 * কেন গুরুত্বপূর্ণ: ডাটাবেস ছাড়া JSON ফাইলে প্রোডাক্টের ক্লিক গণনা ও সেটিংস সেভ করার সময় ডেটা টাইপ ঠিক রাখে।
 * কোথায় ব্যবহৃত হবে: data/clickStats.json, src/app/admin/ এবং /api/admin/ রুটগুলোতে।
 * ============================================================================
 */

// ১. কোন প্রোডাক্টের অ্যামাজন বাটনে কতগুলো ক্লিক পড়েছে তার রেকর্ড
export interface ProductClickStat {
  productId: string;
  productSlug: string;
  productTitle: string;
  totalClicks: number;         // মোট কতবার "Check Price on Amazon" বাটনে ক্লিক হয়েছে
  lastClickedAt: string;       // সর্বশেষ ক্লিকের তারিখ ও সময়
}

// ২. পুরো সাইটের ক্লিক স্ট্যাটাস ফাইলের স্ট্রাকচার (data/clickStats.json)
export interface ClickStatsData {
  totalOutboundClicks: number; // সাইটের শুরু থেকে সব প্রোডাক্ট মিলিয়ে মোট ক্লিক
  productStats: Record<string, ProductClickStat>; // productSlug অনুযায়ী ক্লিকের হিসাব
}

// ৩. অ্যাডমিন ড্যাশবোর্ডের উপরের ওভারভিউ কার্ডগুলোর ডেটা
export interface AdminOverviewSummary {
  totalProducts: number;
  totalBlogs: number;
  totalOutboundClicks: number;
  topPerformingProduct: string;
  aiAgentStatus: 'Active' | 'Disabled';
  seoHealthScore: number;      // শতকরা কতভাগ প্রোডাক্টে সঠিক Schema ও Meta দেওয়া আছে
}

// ৪. অ্যাডমিন প্যানেলে যেকোনো ফরম সেভ করার পর স্ট্যান্ডার্ড API রেসপন্স
export interface AdminApiResponse {
  success: boolean;
  message: string;
  syncedWithGithub?: boolean;  // লাইভ সাইটে GitHub API-তে অটো কমিট হয়েছে কি না
}