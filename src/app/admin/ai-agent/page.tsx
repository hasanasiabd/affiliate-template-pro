/**
 * ============================================================================
 * ফাইল: src/app/admin/ai-agent/page.tsx
 * কাজ (Purpose): ফ্লোটিং Gemini AI শপিং অ্যাসিস্ট্যান্টের আচরণ ও প্রম্পট চিপস নিয়ন্ত্রণ করা।
 * ============================================================================
 */

import { readDataFile } from '@/lib/admin/fileStorage';
import { AiAgentConfig } from '@/types/chat.types';
import AiControllerForm from '@/components/admin/AiControllerForm';

export const dynamic = 'force-dynamic';

export default async function AdminAiAgentPage() {
  const aiConfig = await readDataFile<AiAgentConfig>('aiConfig.json');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Gemini AI Shopping Concierge Control
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize your catalog-grounded AI assistant, edit quick-prompt chips, or adjust rate limits to protect your free Gemini API quota.
        </p>
      </div>

      <AiControllerForm initialData={aiConfig} />
    </div>
  );
}