/**
 * ============================================================================
 * ফাইল: src/app/api/chat/route.ts
 * কাজ (Purpose): ফ্লোটিং Gemini AI শপিং এজেন্টের ব্যাকএন্ড চ্যাট API রুট।
 * কেন গুরুত্বপূর্ণ: ক্যাটালগ প্রম্পট ইনজেক্ট করে এবং রেট লিমিট রক্ষা করে চ্যাট রেসপন্স দেয়।
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/ai/geminiClient';
import { buildSystemPrompt } from '@/lib/ai/buildPrompt';
import { checkRateLimit } from '@/lib/ai/rateLimiter';
import { ChatApiRequest } from '@/types/chat.types';

export async function POST(req: NextRequest) {
  try {
    // ১. ইউজারের IP অ্যাড্রেস সংগ্রহ করে রেট লিমিট চেক করা
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'You are sending messages too fast. Please wait a minute.' },
        { status: 429 }
      );
    }

    // ২. রিকোয়েস্টবডি থেকে মেসেজগুলো নেওয়া
    const body: ChatApiRequest = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages payload.' }, { status: 400 });
    }

    // ৩. সিস্টেম প্রম্পট তৈরি এবং Gemini মডেল কল করা
    const systemInstruction = buildSystemPrompt();
    const model = getGeminiModel(systemInstruction);

    // পূর্বের কথোপকথন ফর্ম্যাট করা
    const chatHistory = messages.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history: chatHistory,
    });

    const latestMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error: unknown) {
    console.error('Gemini Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `AI Assistant error: ${errorMessage}` },
      { status: 500 }
    );
  }
}