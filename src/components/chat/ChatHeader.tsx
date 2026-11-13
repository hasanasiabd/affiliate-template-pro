/**
 * ============================================================================
 * ফাইল: src/components/chat/ChatHeader.tsx
 * কাজ (Purpose): চ্যাট উইন্ডোর উপরের হেডার, এজেন্টের নাম, ক্লিয়ার চ্যাট এবং ক্লোজ বাটন।
 * কোথায় ব্যবহৃত হবে: src/components/chat/ChatWidget.tsx
 * ============================================================================
 */

'use client';

import { Bot, RotateCcw, X } from 'lucide-react';

interface ChatHeaderProps {
  agentName: string;
  onResetChat: () => void;
  onClose: () => void;
}

export default function ChatHeader({
  agentName,
  onResetChat,
  onClose,
}: ChatHeaderProps) {
  return (
    <div className="bg-slate-900 text-white px-4 py-3.5 border-b border-slate-800 flex items-center justify-between">
      {/* বাম পাশ: এজেন্ট আইকন ও নাম */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Bot className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-white leading-none flex items-center gap-1.5">
            {agentName}
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" title="Online" />
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Powered by Gemini • Catalog Grounded
          </p>
        </div>
      </div>

      {/* ডান পাশ: চ্যাট ক্লিয়ার এবং ক্লোজ বাটন */}
      <div className="flex items-center gap-1">
        <button
          onClick={onResetChat}
          title="Reset Conversation"
          aria-label="Reset Conversation"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onClose}
          title="Close Chat"
          aria-label="Close Chat"
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}