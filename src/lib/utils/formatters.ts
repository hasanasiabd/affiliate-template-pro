/**
 * ============================================================================
 * ফাইল: src/lib/utils/formatters.ts
 * কাজ (Purpose): তারিখ, দাম এবং টেক্সট ফরম্যাট করার ছোট ছোট হেল্পার ফাংশন।
 * কোথায় ব্যবহৃত হবে: প্রোডাক্ট রিভিউ পেজ, ব্লগ কার্ড এবং অ্যাডমিন ড্যাশবোর্ডে।
 * ============================================================================
 */

/**
 * তারিখকে সুন্দর স্ট্রিং ফরম্যাটে রূপান্তর করা (যেমন: "Nov 12, 2026")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * টেক্সটের প্রথম অক্ষর বড় করা (Capitalize)
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * বড় টাইটেল বা ট্যাগলাইনকে নির্দিষ্ট সীমার ভেতর কেটে ডট (...) যুক্ত করা
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}