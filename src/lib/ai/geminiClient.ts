/**
 * ============================================================================
 * ফাইল: src/lib/ai/geminiClient.ts
 * কাজ (Purpose): Google Gemini API-এর সাথে নিরাপদ কানেকশন তৈরি করা।
 * কেন গুরুত্বপূর্ণ: পুরো প্রজেক্টে বারবার API ইনিশিয়ালাইজ না করে এই একটি ফাইল থেকেই
 *               মডেল কল করা যাবে।
 * কোথায় ব্যবহৃত হবে: src/app/api/chat/route.ts
 * এডিট গাইড: ভবিষ্যতে মডেল আপডেট করতে চাইলে শুধু modelName পরিবর্তন করুন।
 * ============================================================================
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * সিস্টেম ইনস্ট্রাকশনসহ Gemini মডেল ইনস্ট্যান্স রিটার্ন করার ফাংশন
 */
export function getGeminiModel(systemInstruction: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_free_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is missing or not configured in .env.local');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // ফ্রি টিয়ারে দ্রুততম রেসপন্স ও স্ট্রিমিংয়ের জন্য gemini-1.5-flash ব্যবহার করা হয়েছে
  return genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction,
  });
}