/**
 * ============================================================================
 * ফাইল: src/components/admin/AiControllerForm.tsx
 * কাজ (Purpose): অ্যাডমিন প্যানেল থেকে Gemini AI এজেন্টের অন/অফ সুইচ, ওয়েলকাম মেসেজ
 *               এবং রেট লিমিট নিয়ন্ত্রণ করা।
 * কোথায় ব্যবহৃত হবে: src/app/admin/ai-agent/page.tsx
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { AiAgentConfig } from '@/types/chat.types';
import Button from '@/components/ui/Button';
import { Bot, Save, CheckCircle2 } from 'lucide-react';

interface AiControllerFormProps {
  initialData: AiAgentConfig;
}

export default function AiControllerForm({
  initialData,
}: AiControllerFormProps) {
  const [formData, setFormData] = useState<AiAgentConfig>(initialData);
  const [promptsText, setPromptsText] = useState(
    initialData.quickPrompts.join('\n')
  );
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    const updatedConfig: AiAgentConfig = {
      ...formData,
      quickPrompts: promptsText
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch('/api/admin/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: 'aiConfig.json',
          data: updatedConfig,
        }),
      });

      const result = await res.json();
      setStatusMsg(
        res.ok
          ? result.message || 'AI Concierge settings saved successfully!'
          : result.message || 'Failed to save AI settings.'
      );
    } catch {
      setStatusMsg('Network error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-3xl"
    >
      {/* ১. AI চ্যাটবট অন/অফ মাস্টার সুইচ */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5 text-emerald-500" />
          <div>
            <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Enable Floating Gemini AI Concierge
            </p>
            <p className="text-xs text-slate-500">
              Show or hide the interactive AI shopping assistant across all pages.
            </p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={formData.enableAiAgent}
          onChange={(e) =>
            setFormData({ ...formData, enableAiAgent: e.target.checked })
          }
          className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
        />
      </div>

      {/* ২. এজেন্টের নাম এবং রেট লিমিট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Assistant Display Name
          </label>
          <input
            type="text"
            value={formData.agentName}
            onChange={(e) =>
              setFormData({ ...formData, agentName: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Max Messages Per Minute (Rate Limit)
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={formData.maxMessagesPerMinute}
            onChange={(e) =>
              setFormData({
                ...formData,
                maxMessagesPerMinute: Number(e.target.value),
              })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>
      </div>

      {/* ৩. ওয়েলকাম মেসেজ */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
          Initial Greeting Message
        </label>
        <textarea
          rows={2}
          value={formData.welcomeMessage}
          onChange={(e) =>
            setFormData({ ...formData, welcomeMessage: e.target.value })
          }
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm"
        />
      </div>

      {/* ৪. সাজেস্টেড প্রশ্ন চিপস (প্রতি লাইনে ১টি) */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
          Quick Prompt Chips (One question per line)
        </label>
        <textarea
          rows={4}
          value={promptsText}
          onChange={(e) => setPromptsText(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono"
        />
      </div>

      {/* ৫. অতিরিক্ত সিস্টেম প্রম্পট রুলস */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
          Custom AI System Instructions
        </label>
        <textarea
          rows={2}
          value={formData.customSystemRules || ''}
          onChange={(e) =>
            setFormData({ ...formData, customSystemRules: e.target.value })
          }
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm"
        />
      </div>

      {statusMsg && (
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      <Button type="submit" disabled={isSaving}>
        <Save className="w-4 h-4" />
        {isSaving ? 'Saving AI Config...' : 'Save AI Concierge Settings'}
      </Button>
    </form>
  );
}