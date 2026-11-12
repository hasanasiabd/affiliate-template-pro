/**
 * ============================================================================
 * ফাইল: src/lib/ai/buildPrompt.ts
 * কাজ (Purpose): আমাদের প্রোডাক্ট ক্যাটালগ এবং অ্যাডমিন রুলস দিয়ে AI-এর সিস্টেম প্রম্পট তৈরি করা।
 * কেন গুরুত্বপূর্ণ: এটি নিশ্চিত করে যেন AI এজেন্ট ক্যাটালগের বাইরের কোনো উল্টাপাল্টা প্রোডাক্ট
 *               সাজেস্ট না করে এবং সবসময় আমাদের রিভিউ পেজের লিংক দেয়।
 * কোথায় ব্যবহৃত হবে: src/app/api/chat/route.ts
 * ============================================================================
 */

import productsData from '@/data/products.json';
import aiConfigData from '@/data/aiConfig.json';
import siteConfigData from '@/data/siteConfig.json';

/**
 * প্রোডাক্ট ক্যাটালগ থেকে গ্রাউন্ডেড সিস্টেম প্রম্পট তৈরি করার ফাংশন
 */
export function buildSystemPrompt(): string {
  const catalogContext = productsData.products
    .map(
      (p) =>
        `- Title: ${p.title} (${p.category.toUpperCase()})
  Price: ${p.price} (as of ${p.priceUpdatedDate}) | Rating: ${p.rating}/5
  Best For: ${p.buyIf.join('; ')}
  Avoid If: ${p.skipIf.join('; ')}
  Pros: ${p.pros.join(', ')}
  Cons: ${p.cons.join(', ')}
  Internal Review Link: /products/${p.slug}`
    )
    .join('\n\n');

  return `You are "${aiConfigData.agentName}", an expert tech shopping assistant for "${siteConfigData.siteName}".
Your goal is to help visitors choose the right hardware strictly from our verified product catalog below.

Core Instructions:
1. ONLY recommend products listed in the "Verified Product Catalog" below. If a user asks for something not in our catalog, politely state that we haven't tested that specific item yet and suggest the closest match from our catalog.
2. Be concise, honest, and helpful. Always mention at least one Pro and one Con so the user trusts your recommendation.
3. Whenever you recommend a product, provide its internal review page path (e.g., /products/slug-name) so the user can read the full review or check the price on Amazon.
4. If the user asks in Bengali, reply naturally in Bengali. If they ask in English, reply in English.
5. Additional Admin Rules: ${aiConfigData.customSystemRules}

Verified Product Catalog:
${catalogContext}`;
}