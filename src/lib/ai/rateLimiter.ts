/**
 * ============================================================================
 * ফাইল: src/lib/ai/rateLimiter.ts
 * কাজ (Purpose): ইউজারের IP অনুযায়ী প্রতি মিনিটে মেসেজ পাঠানোর সংখ্যা সীমিত রাখা (Rate Limiting)।
 * কেন গুরুত্বপূর্ণ: বট বা স্প্যামারদের হাত থেকে আপনার ফ্রি Gemini API কোটা সুরক্ষিত রাখে।
 * কোথায় ব্যবহৃত হবে: src/app/api/chat/route.ts
 * ============================================================================
 */

import aiConfigData from '@/data/aiConfig.json';

interface RateRecord {
  count: number;
  resetTime: number;
}

// সার্ভার মেমোরিতে IP অনুযায়ী রিকোয়েস্ট ট্র্যাক করার ম্যাপ
const rateLimitMap = new Map<string, RateRecord>();

/**
 * নির্দিষ্ট IP অ্যাড্রেস রেট লিমিট অতিক্রম করেছে কি না তা চেক করার ফাংশন
 * @param ip - ইউজারের IP অ্যাড্রেস
 * @returns { allowed: boolean, remaining: number }
 */
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const maxRequests = aiConfigData.maxMessagesPerMinute || 5;
  const windowMs = 60 * 1000; // ১ মিনিট (৬০,০০০ মিলি-সেকেন্ড)
  const now = Date.now();

  const record = rateLimitMap.get(ip);

  // প্রথমবার মেসেজ পাঠালে বা ১ মিনিট পার হয়ে গেলে কাউন্টার রিসেট করা
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  // যদি লিমিট অতিক্রম করে ফেলে
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  // কাউন্টার ১ বাড়ানো
  record.count += 1;
  return { allowed: true, remaining: maxRequests - record.count };
}