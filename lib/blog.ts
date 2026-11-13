import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cacheLife } from "next/cache";
import { BlogPostMeta, INITIAL_BLOG_POSTS, parseMarkdown } from "./markdown";

export interface BlogPostFull extends BlogPostMeta {
  content: string;
  html: string;
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  "use cache";
  cacheLife("hours");

  const posts: BlogPostMeta[] = [...INITIAL_BLOG_POSTS];
  const knownIds = new Set(posts.map((p) => p.id));

  try {
    const publishedDir = path.join(process.cwd(), "posts", "published");
    const files = await fs.readdir(publishedDir);

    for (const filename of files) {
      if (!filename.endsWith(".md") && !filename.endsWith(".mdx")) continue;
      const id = filename.replace(/\.(md|mdx)$/, "");
      if (knownIds.has(id)) continue;

      const fullPath = path.join(process.cwd(), "posts", "published", filename);
      const raw = await fs.readFile(fullPath, "utf8");
      const parsed = matter(raw);
      const firstHeadingMatch = parsed.content.match(/^#\s+(.+)$/m);

      posts.unshift({
        id,
        title:
          (parsed.data?.title as string) ||
          (firstHeadingMatch ? firstHeadingMatch[1].trim() : id),
        date: (parsed.data?.date as string) || "Recent",
        summary:
          (parsed.data?.summary as string) ||
          parsed.content
            .replace(/^#.*$/gm, "")
            .trim()
            .slice(0, 160) + "...",
        file: `posts/published/${filename}`,
      });
    }
  } catch {
    // Fallback to INITIAL_BLOG_POSTS if directory cannot be scanned
  }

  return posts;
}

export async function getBlogPostById(id: string): Promise<BlogPostFull | null> {
  "use cache";
  cacheLife("hours");

  const allPosts = await getAllBlogPosts();
  const meta = allPosts.find((p) => p.id === id);
  if (!meta) return null;

  try {
    const filename = path.basename(meta.file);
    const filePath = path.join(process.cwd(), "posts", "published", filename);
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    const content = parsed.content || raw;
    const html = parseMarkdown(content);

    return {
      ...meta,
      content,
      html,
    };
  } catch {
    return null;
  }
}
