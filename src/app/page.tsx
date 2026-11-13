/**
 * ============================================================================
 * ফাইল: src/app/page.tsx
 * কাজ (Purpose): ওয়েবসাইটের প্রধান ল্যান্ডিং পেজ (Homepage) রেন্ডার করা।
 * কেন গুরুত্বপূর্ণ: ভিজিটরকে সেরা প্রোডাক্ট, ক্যাটাগরি ফিল্টার এবং বায়িং গাইড এক জায়গায় দেখায়।
 * ============================================================================
 */

import Link from 'next/link';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import blogPostsData from '@/data/blogPosts.json';
import siteConfigData from '@/data/siteConfig.json';

import HeroSection from '@/components/home/HeroSection';
import EditorsChoiceGrid from '@/components/home/EditorsChoiceGrid';
import SearchAndFilterBar from '@/components/home/SearchAndFilterBar';
import NewsletterBox from '@/components/home/NewsletterBox';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/formatters';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

export default function HomePage() {
  const { products } = productsData;
  const { categories } = categoriesData;
  const { posts } = blogPostsData;

  // গুগল সার্চের জন্য WebSite JSON-LD স্কিমা
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfigData.siteName,
    url: siteConfigData.siteUrl,
    description: siteConfigData.siteDescription,
  };

  return (
    <div>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ১. হিরো সেকশন */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ২. এডিটরস চয়েস (Top 3 Picks) */}
        <EditorsChoiceGrid products={products} />

        {/* ৩. ইনস্ট্যান্ট সার্চ ও ক্যাটাগরি ফিল্টার গ্রিড */}
        <SearchAndFilterBar products={products} categories={categories} />

        {/* ৪. লেটেস্ট বায়িং গাইড ও ব্লগ প্রিভিউ সেকশন */}
        {posts && posts.length > 0 && (
          <section className="py-12 border-t border-slate-200 dark:border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <SectionHeading
                title="In-Depth Buying Guides"
                subtitle="Expert tutorials and ergonomic hardware comparisons for developers."
                className="mb-0"
              />
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
              >
                View All Guides <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(0, 2).map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-emerald-500/50 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="emerald">
                        <BookOpen className="w-3 h-3" /> {post.category}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition mb-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                    <span>Updated {formatDate(post.publishedAt)}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 hover:underline"
                    >
                      Read Guide <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ৫. ইমেইল নিউজলেটার বক্স */}
        <NewsletterBox />
      </div>
    </div>
  );
}