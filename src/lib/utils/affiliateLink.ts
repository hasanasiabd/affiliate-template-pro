/**
 * ============================================================================
 * ফাইল: src/lib/utils/affiliateLink.ts
 * কাজ (Purpose): যেকোনো অ্যামাজন প্রোডাক্ট লিংকে স্বয়ংক্রিয়ভাবে গ্লোবাল অ্যাফিলিয়েট ট্যাগ যুক্ত করা।
 * কেন গুরুত্বপূর্ণ: কোনো প্রোডাক্ট পেজে ট্যাগ দিতে ভুলে গেলেও এই ফাংশনটি নিশ্চিত করবে
 *               যাতে অ্যামাজন কমিশন মিস না হয়।
 * কোথায় ব্যবহৃত হবে: প্রোডাক্ট রিভিউ পেজ, হোমপেজ কার্ড এবং "Check Price on Amazon" বাটনে।
 * ============================================================================
 */

import siteConfigData from '@/data/siteConfig.json';

/**
 * অ্যামাজন লিংকের সাথে ট্যাগ যুক্ত করার হেল্পার ফাংশন
 * @param rawUrl - মূল অ্যামাজন প্রোডাক্ট লিংক (যেমন: https://www.amazon.com/dp/B09HM94VDS)
 * @param customTag - (অপশনাল) নির্দিষ্ট কোনো প্রোডাক্টের জন্য আলাদা ট্যাগ দিতে চাইলে
 * @returns ট্যাগযুক্ত সম্পূর্ণ এফিলিয়েট লিংক
 */
export function getAffiliateUrl(rawUrl: string, customTag?: string): string {
  if (!rawUrl || !rawUrl.includes('amazon.')) {
    return rawUrl || '#';
  }

  const tagToUse = customTag || siteConfigData.amazonAssociateTag;

  try {
    const url = new URL(rawUrl);
    
    // অ্যামাজনের ট্যাগ প্যারামিটার (tag) সেট বা ওভাররাইট করা
    url.searchParams.set('tag', tagToUse);
    
    return url.toString();
  } catch (error) {
    // যদি URL পার্স করতে কোনো সমস্যা হয়, তবে স্ট্রিং ম্যানিপুলেশনের মাধ্যমে ট্যাগ জুড়ে দেওয়া
    console.error('Affiliate URL parsing error:', error);
    if (rawUrl.includes('?')) {
      return `${rawUrl}&tag=${tagToUse}`;
    } else {
      return `${rawUrl}?tag=${tagToUse}`;
    }
  }
}