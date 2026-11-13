/**
 * ============================================================================
 * ফাইল: src/app/api/chat/route.ts
 * কাজ (Purpose): Google Gen AI Official SDK ব্যবহার করে চ্যাট বট এপিআই হ্যান্ডেল করা।
 * ============================================================================
 */

import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import productsData from '@/data/products.json';

// অফিশিয়াল SDK ইনিশিয়ালাইজ করা
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured in .env.local' },
        { status: 500 }
      );
    }

    const latestMessage = messages[messages.length - 1]?.content || '';
    const catalogContext = JSON.stringify(productsData.products);

    const prompt = `You are a helpful, expert AI shopping assistant for a developer hardware review and affiliate website. 
    Here is our tested product catalog data: ${catalogContext}. 
    User's question: "${latestMessage}". 
    Instructions: Answer concisely, professionally, and recommend relevant products from our catalog with direct Markdown links (e.g., [Product Title](/products/slug)).`;

    // আপডেটেড স্ট্যান্ডার্ড মডেল: gemini-2.0-flash কল করা
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const reply =
      response.text ||
      'I am sorry, I could not generate a response at the moment.';

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { reply: 'AI is currently experiencing high demand. Please try again in a few seconds.' },
      { status: 200 }
    );
  }
}