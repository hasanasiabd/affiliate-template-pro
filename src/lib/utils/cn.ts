/**
 * ============================================================================
 * ফাইল: src/lib/utils/cn.ts
 * কাজ (Purpose): একাধিক Tailwind CSS ক্লাসকে শর্তসাপেক্ষে (Conditionally) মার্জ করা।
 * কোথায় ব্যবহৃত হবে: বাটন, কার্ড, মডালসহ প্রজেক্টের প্রায় প্রতিটি UI কম্পোনেন্টে।
 * এডিট গাইড: এই ফাইলটি কখনো এডিট করার প্রয়োজন নেই।
 * ============================================================================
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}