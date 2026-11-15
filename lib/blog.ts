import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cacheLife, cacheTag } from "next/cache";
import { BlogPostMeta, INITIAL_BLOG_POSTS, parseMarkdown } from "./markdown";
import { getPublicSupabaseClient } from "./portfolio-db";

export interface BlogPostFull extends BlogPostMeta {
  content: string;
  html: string;
  published?: boolean;
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-posts");

  const posts: BlogPostMeta[] = [...INITIAL_BLOG_POSTS];
  const knownIds = new Set(posts.map((p) => p.id));

  // 1. Scan local posts/published directory
  try {
    const publishedDir = path.join(process.cwd(), "posts", "published");
    const files = await fs.readdir(publishedDir);

    for (const filename of files) {
      if (!filename.endsWith(".md") && !filename.endsWith(".mdx")) continue;
      const id = filename.replace(/\.(md|mdx)$/, "");

      const fullPath = path.join(process.cwd(), "posts", "published", filename);
      const raw = await fs.readFile(fullPath, "utf8");
      const parsed = matter(raw);
      const firstHeadingMatch = parsed.content.match(/^#\s+(.+)$/m);

      const metaItem: BlogPostMeta = {
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
      };

      if (knownIds.has(id)) {
        const idx = posts.findIndex((p) => p.id === id);
        if (idx !== -1 && parsed.data?.title) {
          posts[idx] = metaItem;
        }
      } else {
        knownIds.add(id);
        posts.unshift(metaItem);
      }
    }
  } catch {
    // Fallback to INITIAL_BLOG_POSTS if directory cannot be scanned
  }

  // 2. Merge / override with Supabase PostgreSQL `blog_posts` table if configured
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, date, summary, published, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const dbPosts: BlogPostMeta[] = data.map((row) => ({
          id: String(row.id),
          title: String(row.title),
          date: String(row.date),
          summary: String(row.summary),
          file: `supabase:blog_posts/${row.id}`,
        }));

        const mergedMap = new Map<string, BlogPostMeta>();
        for (const dbPost of dbPosts) {
          mergedMap.set(dbPost.id, dbPost);
        }
        for (const filePost of posts) {
          if (!mergedMap.has(filePost.id)) {
            mergedMap.set(filePost.id, filePost);
          }
        }
        return Array.from(mergedMap.values());
      }
    } catch {
      // Fallback to file-based posts
    }
  }

  return posts;
}

export async function getBlogPostById(
  id: string
): Promise<BlogPostFull | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-posts");

  // 1. Check Supabase PostgreSQL first
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        const rawContent = String(data.content || "");
        const parsed = matter(rawContent);
        const content = parsed.content || rawContent;
        return {
          id: String(data.id),
          title: String(data.title),
          date: String(data.date),
          summary: String(data.summary),
          file: `supabase:blog_posts/${data.id}`,
          content,
          html: parseMarkdown(content),
          published: Boolean(data.published),
        };
      }
    } catch {
      // Fallback to local markdown files
    }
  }

  // 2. Fallback to local markdown file
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
      published: true,
    };
  } catch {
    return null;
  }
}

export async function getAllBlogPostsWithContent(): Promise<BlogPostFull[]> {
  const metas = await getAllBlogPosts();
  const fullPosts: BlogPostFull[] = [];

  for (const meta of metas) {
    const full = await getBlogPostById(meta.id);
    if (full) {
      fullPosts.push(full);
    }
  }

  return fullPosts;
}
