/**
 * ============================================================================
 * ফাইল: src/types/chat.types.ts
 * কাজ (Purpose): ফ্লোটিং Gemini AI শপিং এজেন্টের চ্যাট মেসেজ এবং কনফিগারেশনের টাইপ নির্ধারণ করা।
 * কেন গুরুত্বপূর্ণ: চ্যাটবক্সে ইউজার ও AI-এর কথোপকথন এবং রেট লিমিটিং নির্ভুলভাবে হ্যান্ডেল করতে সাহায্য করে।
 * কোথায় ব্যবহৃত হবে: data/aiConfig.json, src/components/chat/ এবং /api/chat এন্ডপয়েন্টে।
 * ============================================================================
 */

// ১. চ্যাটবক্সে প্রতিটি মেসেজের স্ট্রাকচার
export interface ChatMessage {
  id?: string;
  role: 'user' | 'model';      // মেসেজটি ইউজারের নাকি Gemini মডেলের
  content: string;             // মেসেজের মূল টেক্সট
  timestamp?: string;          // মেসেজ পাঠানোর সময়
}

// ২. অ্যাডমিন প্যানেল থেকে নিয়ন্ত্রণযোগ্য AI এজেন্ট সেটিংস
export interface AiAgentConfig {
  enableAiAgent: boolean;      // চ্যাট উইজেট পুরো সাইটে চালু থাকবে কি না
  agentName: string;           // যেমন: "Gear Concierge" বা "Tech Assistant"
  welcomeMessage: string;      // চ্যাট ওপেন করলেই প্রথম যে স্বাগতম মেসেজ দেখাবে
  quickPrompts: string[];      // ইউজারের সুবিধার জন্য ৩-৪টি রেডিমেড প্রশ্ন চিপস
  maxMessagesPerMinute: number;// ফ্রি কোটা বাঁচাতে প্রতি মিনিটে ইউজারপ্রতি মেসেজ লিমিট
  maxInputLength: number;      // ইউজার সর্বোচ্চ কত অক্ষরের প্রশ্ন লিখতে পারবে (যেমন: 300)
  customSystemRules?: string;  // অ্যাডমিন প্যানেল থেকে AI-কে অতিরিক্ত কোনো নির্দেশনা দিতে চাইলে
}

// ৩. চ্যাট API রিকোয়েস্ট বডির টাইপ
export interface ChatApiRequest {
  messages: ChatMessage[];
}