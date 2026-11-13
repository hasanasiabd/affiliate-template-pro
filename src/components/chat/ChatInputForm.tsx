/**
 * ============================================================================
 * ফাইল: src/components/chat/ChatInputForm.tsx
 * কাজ (Purpose): ইউজারের প্রশ্ন টাইপ করার ইনপুট ফিল্ড এবং সেন্ড বাটন।
 * কোথায় ব্যবহৃত হবে: src/components/chat/ChatWidget.tsx
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputFormProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  maxLength?: number;
}

export default function ChatInputForm({
  onSendMessage,
  isLoading,
  maxLength = 300,
}: ChatInputFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSendMessage(trimmed);
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
    >
      <input
        type="text"
        value={input}
        maxLength={maxLength}
        disabled={isLoading}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask for a mouse, keyboard, or budget..."
        className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        aria-label="Send message"
        className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40 transition cursor-pointer shrink-0"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}