/**
 * ============================================================================
 * ফাইল: src/components/chat/QuickPromptChips.tsx
 * কাজ (Purpose): ইউজারের সুবিধার জন্য চ্যাটবক্সে রেডিমেড প্রশ্ন চিপস দেখানো।
 * কেন গুরুত্বপূর্ণ: নতুন ভিজিটর কী প্রশ্ন করবে তা নিয়ে দ্বিধায় থাকে; চিপসে ক্লিক করলেই অটো মেসেজ চলে যায়।
 * কোথায় ব্যবহৃত হবে: src/components/chat/ChatWidget.tsx
 * ============================================================================
 */

'use client';

import { MessageSquarePlus } from 'lucide-react';

interface QuickPromptChipsProps {
  prompts: string[];
  onSelectPrompt: (promptText: string) => void;
  disabled?: boolean;
}

export default function QuickPromptChips({
  prompts,
  onSelectPrompt,
  disabled = false,
}: QuickPromptChipsProps) {
  if (!prompts || prompts.length === 0) return null;

  return (
    <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800/80">
      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
        <MessageSquarePlus className="w-3 h-3 text-emerald-500" />
        Suggested Questions:
      </p>
      <div className="flex flex-wrap gap-1.5">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            type="button"
            disabled={disabled}
            onClick={() => onSelectPrompt(prompt)}
            className="text-left text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition disabled:opacity-50 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}