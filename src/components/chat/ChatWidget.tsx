/**
 * ============================================================================
 * ফাইল: src/components/chat/ChatWidget.tsx
 * কাজ (Purpose): সব ছোট চ্যাট কম্পোনেন্টকে একত্রিত করা এবং /api/chat এর সাথে ডেটা আদান-প্রদান করা।
 * কেন গুরুত্বপূর্ণ: অ্যাডমিন কনফিগ (aiConfig.json) থেকে চ্যাটবট অন/অফ এবং ওয়েলকাম মেসেজ নিয়ন্ত্রণ করে।
 * কোথায় ব্যবহৃত হবে: src/app/layout.tsx (রুট লেআউটে)
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import aiConfigData from '@/data/aiConfig.json';
import { ChatMessage } from '@/types/chat.types';
import ChatToggleBtn from './ChatToggleBtn';
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import QuickPromptChips from './QuickPromptChips';
import ChatInputForm from './ChatInputForm';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialMessage: ChatMessage = {
    role: 'model',
    content: aiConfigData.welcomeMessage,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  // অ্যাডমিন প্যানেল থেকে AI Agent অফ করা থাকলে কিছুই রেন্ডার করবে না
  if (!aiConfigData.enableAiAgent) return null;

  // ইউজার মেসেজ পাঠালে বা চিপসে ক্লিক করলে API কল করার ফাংশন
  const handleSendMessage = async (userText: string) => {
    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userText },
    ];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            content: data.error || 'Rate limit reached. Please wait a moment and try again.',
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'model', content: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'Connection error. Please check your internet or try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([initialMessage]);
  };

  // চ্যাট বন্ধ থাকলে শুধু কোণায় ভাসমান বাটন দেখাবে
  if (!isOpen) {
    return (
      <ChatToggleBtn
        agentName={aiConfigData.agentName}
        onClick={() => setIsOpen(true)}
      />
    );
  }

  // চ্যাট ওপেন থাকলে পুরো চ্যাট উইন্ডো দেখাবে
  return (
    <aside
      aria-label="AI Shopping Assistant"
      className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[390px] h-[540px] max-h-[82vh] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
    >
      <ChatHeader
        agentName={aiConfigData.agentName}
        onResetChat={handleResetChat}
        onClose={() => setIsOpen(false)}
      />

      <ChatMessageList messages={messages} isLoading={isLoading} />

      {/* চ্যাটের শুরুতে থাকলে সাজেস্টেড প্রশ্ন চিপস দেখাবে */}
      {messages.length <= 2 && (
        <QuickPromptChips
          prompts={aiConfigData.quickPrompts}
          onSelectPrompt={handleSendMessage}
          disabled={isLoading}
        />
      )}

      <ChatInputForm
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        maxLength={aiConfigData.maxInputLength}
      />
    </aside>
  );
}