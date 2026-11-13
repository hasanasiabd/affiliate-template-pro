/**
 * ============================================================================
 * ফাইল: src/app/blog/page.tsx
 * কাজ (Purpose): সাইটের সমস্ত বায়িং গাইড এবং টেক টিউটোরিয়াল আর্টিকেলের তালিকা দেখানো।
 * কেন গুরুত্বপূর্ণ: ইনফরমেশনাল কীওয়ার্ডে র‍্যাঙ্ক করে গুগল থেকে ফ্রি ট্রাফিক আনার প্রধান মাধ্যম।
 * ============================================================================
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import blogPostsData from '@/data/blogPosts.json';
import siteConfigData from '@/data/siteConfig.json';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/formatters';
import { BookOpen, Clock, ArrowRight, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Developer Hardware Buying Guides & Ergonomic Tutorials',
  description:
    'In-depth mechanical keyboard switch guides, ergonomic mouse comparisons, and coding monitor setup tutorials.',
  alternates: {
    canonical: `${siteConfigData.siteUrl}/blog`,
  },
};

export default function BlogIndexPage() {
  const { posts } = blogPostsData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeading
        title="Hardware Buying Guides & Setup Tutorials"
        subtitle="Research-backed articles to help you choose the right mechanical switches, ergonomic mice, and displays for long coding sessions."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/60 transition shadow-xs hover:shadow-xl"
          >
            <div>
              {/* কভার ইমেজ */}
              <div className="relative w-full h-56 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="emerald" className="bg-slate-900/90 text-emerald-400">
                    <BookOpen className="w-3 h-3" /> {post.category}
                  </Badge>
                </div>
              </div>

              {/* আর্টিকেল ইনফো */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* নিচের রিড মোর বাটন */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                By <strong className="text-slate-700 dark:text-slate-300">{siteConfigData.author.name}</strong>
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}