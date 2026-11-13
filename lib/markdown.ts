export interface BlogPostMeta {
  id: string;
  title: string;
  date: string;
  summary: string;
  file: string;
}

export const INITIAL_BLOG_POSTS: BlogPostMeta[] = [
  {
    id: "post1",
    title: "Building an Aesthetic Web Portfolio",
    date: "October 10, 2025",
    summary:
      "A deep dive into creating a responsive, framework-less portfolio using modern CSS, glassmorphism, and Vanilla JavaScript.",
    file: "posts/published/post1.md",
  },
  {
    id: "post2",
    title: "Understanding CSS Grids in 2025",
    date: "September 15, 2025",
    summary:
      "CSS Grid is powerful. Here is how I use it to structure complex web layouts natively without Bootstrap.",
    file: "posts/published/post2.md",
  },
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Isomorphic Markdown parser based on nbphuy.github.io/js/blog.js,
 * enhanced to support both `- ` and `* ` unordered lists and clean code blocks.
 */
export function parseMarkdown(rawMd: string): string {
  if (!rawMd) return '<div class="markdown-content"></div>';

  // Normalize CRLF to LF
  let md = rawMd.replace(/\r\n/g, "\n");

  // Extract fenced code blocks first so their contents aren't altered by inline rules
  const codeBlocks: string[] = [];
  md = md.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const index = codeBlocks.length;
    const langAttr = lang ? ` data-lang="${lang}"` : "";
    codeBlocks.push(
      `<pre${langAttr}><code>${escapeHtml(code.replace(/\n$/, ""))}</code></pre>`
    );
    return `@@CODE_BLOCK_${index}@@`;
  });

  // Fallback for single-line fenced blocks
  md = md.replace(/```([\s\S]*?)```/g, (_match, code) => {
    const index = codeBlocks.length;
    codeBlocks.push(`<pre><code>${escapeHtml(code.trim())}</code></pre>`);
    return `@@CODE_BLOCK_${index}@@`;
  });

  // Inline code (`code`)
  md = md.replace(/`([^`]+)`/g, (_m, code) => `<code>${escapeHtml(code)}</code>`);

  // Headers
  md = md.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  md = md.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  md = md.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Blockquote
  md = md.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>");

  // Bold & Italics
  md = md.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
  md = md.replace(/\*(.*?)\*/gim, "<em>$1</em>");
  md = md.replace(/_(.*?)_/gim, "<em>$1</em>");

  // Links
  md = md.replace(
    /\[([^\]]+)\]\(([^)]+)\)/gim,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Unordered lists (support both `- ` as used in post1.md and `* ` from blog.js)
  md = md.replace(/^[-*] (.*$)/gim, "<ul><li>$1</li></ul>");
  md = md.replace(/<\/ul>\s*<ul>/g, "\n");

  // Paragraphs
  md = md
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("@@CODE_BLOCK_")
      ) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .filter(Boolean)
    .join("\n");

  // Restore code blocks
  codeBlocks.forEach((html, idx) => {
    md = md.replace(`@@CODE_BLOCK_${idx}@@`, html);
  });

  return `<div class="markdown-content">${md}</div>`;
}
