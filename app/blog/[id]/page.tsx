import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostById } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-5 pt-[110px] pb-[80px]">
      <article
        id="blog-post"
        className="animate-fade-in mx-auto my-10 max-w-[800px]"
      >
        <Link
          href="/blog"
          className="mb-[30px] inline-flex items-center gap-2 text-base font-medium text-[#00cfff] no-underline transition-colors hover:text-[#0088ff]"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-5 w-5 fill-current"
            aria-hidden="true"
          >
            <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
          Back to Feed
        </Link>

        <div className="mb-2.5 text-[0.85rem] font-medium tracking-[1px] text-[#00cfff]">
          {post.date}
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </main>
  );
}
