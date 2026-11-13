import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getAllBlogPosts } from "@/lib/blog";
import { LegacyBlogQueryRedirect } from "@/components/legacy-blog-query";
import { PenSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog by Nguyen Binh Phuong Huy.",
};

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <main className="mx-auto w-full max-w-[1200px] px-5 pt-[110px] pb-[80px]">
      <Suspense fallback={null}>
        <LegacyBlogQueryRedirect />
      </Suspense>

      <div className="mx-auto flex max-w-[800px] flex-wrap items-center justify-between gap-4">
        <h1 id="blog-page-title" className="section-title !mb-0">
          Blog
        </h1>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#1a1d24] px-4 py-2 text-xs font-medium text-[#8b949e] transition-all hover:border-[#00cfff] hover:text-[#00cfff]"
        >
          <PenSquare className="size-3.5" />
          Open Local CMS
        </Link>
      </div>

      <div
        id="blog-feed"
        className="animate-fade-in mx-auto mt-10 flex max-w-[800px] flex-col gap-[30px]"
      >
        {blogPosts.length === 0 ? (
          <p className="text-[#8b949e]">No posts published yet.</p>
        ) : (
          blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block rounded-xl border border-white/[0.04] bg-white/[0.02] p-[30px] no-underline transition-all duration-300 hover:-translate-y-1 hover:border-[#00cfff]/20 hover:bg-white/[0.04] hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
            >
              <div className="mb-2.5 text-[0.85rem] font-medium tracking-[1px] text-[#00cfff]">
                {post.date}
              </div>
              <div className="mb-[15px] text-2xl font-semibold text-[#f0f6fc]">
                {post.title}
              </div>
              <div className="leading-[1.6] text-[#8b949e]">{post.summary}</div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
