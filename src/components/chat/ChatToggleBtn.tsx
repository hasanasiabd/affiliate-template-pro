/**
 * ============================================================================
 * ফাইল: src/components/chat/ChatToggleBtn.tsx
 * কাজ (Purpose): স্ক্রিনের নিচে ডান কোণায় ভাসমান "Ask AI Assistant" টগল বাটন দেখানো।
 * কেন গুরুত্বপূর্ণ: ভিজিটরের মনোযোগ আকর্ষণ করে এবং এক ক্লিকে শপিং অ্যাসিস্ট্যান্ট ওপেন করে।
 * কোথায় ব্যবহৃত হবে: src/components/chat/ChatWidget.tsx
 * ============================================================================
 */

'use client';

import { Sparkles } from 'lucide-react';

interface ChatToggleBtnProps {
  agentName: string;
  onClick: () => void;
}

export default function ChatToggleBtn({ agentName, onClick }: ChatToggleBtnProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open ${agentName}`}
      className="fixed bottom-20 md:bottom-6 right-5 z-40 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-3.5 rounded-full shadow-2xl shadow-emerald-600/30 border border-emerald-400/30 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
      </span>
      <Sparkles className="w-4 h-4" />
      <span>Ask {agentName}</span>
    </button>
  );
}