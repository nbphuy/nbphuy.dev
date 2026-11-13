"use client";

import { useState } from "react";
import Link from "next/link";
import { parseMarkdown } from "@/lib/markdown";
import { ArrowLeft } from "lucide-react";

const STORAGE_KEY = "blog_draft";

interface DraftState {
  title: string;
  id: string;
  date: string;
  summary: string;
  content: string;
}

function getInitialDraft(): { draft: DraftState; status: string } {
  const defaultDate = "2026-11-13";
  if (typeof window === "undefined") {
    return {
      draft: { title: "", id: "", date: defaultDate, summary: "", content: "" },
      status: "Saved exactly now",
    };
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        draft: {
          title: parsed.title || "",
          id: parsed.id || "",
          date: parsed.date || defaultDate,
          summary: parsed.summary || "",
          content: parsed.content || "",
        },
        status: "Draft loaded",
      };
    }
  } catch {
    // Ignore storage read errors
  }
  return {
    draft: { title: "", id: "", date: defaultDate, summary: "", content: "" },
    status: "Saved exactly now",
  };
}

function formatDateString(dateString: string) {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

export function AdminEditor() {
  const [initial] = useState(getInitialDraft);
  const [draft, setDraft] = useState<DraftState>(initial.draft);
  const [saveStatus, setSaveStatus] = useState<string>(initial.status);

  const [modalData, setModalData] = useState<{
    open: boolean;
    filename: string;
    jsonSnippet: string;
  }>({
    open: false,
    filename: "",
    jsonSnippet: "",
  });

  function updateField<K extends keyof DraftState>(key: K, value: DraftState[K]) {
    const nextDraft = { ...draft, [key]: value };
    setDraft(nextDraft);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDraft));
      setSaveStatus("Saved just now");
    } catch {
      setSaveStatus("Unable to save draft");
    }
  }

  function handlePublish() {
    const trimmedId = draft.id.trim();
    const trimmedContent = draft.content.trim();
    const trimmedTitle = draft.title.trim();
    const trimmedSummary = draft.summary.trim();
    const dateStr = formatDateString(draft.date);

    if (!trimmedId || !trimmedContent) {
      alert(
        "Please provide at least a post-id and some markdown content to publish."
      );
      return;
    }

    const filename = `${trimmedId}.md`;

    // Trigger markdown file download
    const blob = new Blob([trimmedContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const jsonSnippet = `{
  id: "${trimmedId}",
  title: "${trimmedTitle.replace(/"/g, '\\"')}",
  date: "${dateStr}",
  summary: "${trimmedSummary.replace(/"/g, '\\"')}",
  file: "posts/published/${filename}"
},`;

    setModalData({
      open: true,
      filename,
      jsonSnippet,
    });
  }

  const previewHtml = parseMarkdown(draft.content || "Start writing...");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0f1115]">
      <nav className="flex h-[70px] shrink-0 items-center justify-between border-b border-[#30363d] bg-[#0f1115] px-5 sm:px-10">
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8b949e] transition-colors hover:text-[#00cfff]"
          >
            <ArrowLeft className="size-4" />
            Blog
          </Link>
          <div className="text-lg font-bold text-[#f0f6fc] sm:text-xl">
            Markdown Admin Editor
          </div>
        </div>

        <div className="flex items-center gap-5">
          <span
            id="save-status"
            className="hidden text-[0.85rem] text-[#8b949e] sm:inline"
          >
            {saveStatus}
          </span>
          <button
            id="btn-publish"
            type="button"
            onClick={handlePublish}
            className="btn-primary !px-4 !py-2 !text-sm"
          >
            Generate &amp; Publish
          </button>
        </div>
      </nav>

      <main className="flex h-[calc(100vh-70px)] w-full flex-1 flex-col lg:flex-row">
        {/* Left Editor Pane */}
        <div className="flex h-1/2 flex-1 flex-col overflow-y-auto border-b-2 border-[#00cfff] bg-[#1a1d24] lg:h-full lg:border-r lg:border-b-0 lg:border-[#30363d]">
          <div className="flex flex-col gap-[15px] border-b border-[#30363d] p-5">
            <input
              type="text"
              id="post-title"
              value={draft.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Post Title (e.g. My Awesome Blog)"
              className="w-full rounded-md border border-[#30363d] bg-transparent px-[15px] py-2.5 text-base text-[#f0f6fc] transition-colors focus:border-[#00cfff] focus:outline-none"
            />
            <div className="flex gap-[15px]">
              <input
                type="text"
                id="post-id"
                value={draft.id}
                onChange={(e) => updateField("id", e.target.value)}
                placeholder="post-id (e.g. post3)"
                className="w-full flex-1 rounded-md border border-[#30363d] bg-transparent px-[15px] py-2.5 text-base text-[#f0f6fc] transition-colors focus:border-[#00cfff] focus:outline-none"
              />
              <input
                type="date"
                id="post-date"
                title="Date"
                value={draft.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="w-full flex-1 rounded-md border border-[#30363d] bg-transparent px-[15px] py-2.5 text-base text-[#f0f6fc] transition-colors focus:border-[#00cfff] focus:outline-none"
              />
            </div>
            <input
              type="text"
              id="post-summary"
              value={draft.summary}
              onChange={(e) => updateField("summary", e.target.value)}
              placeholder="Brief summary for the blog feed"
              className="w-full rounded-md border border-[#30363d] bg-transparent px-[15px] py-2.5 text-base text-[#f0f6fc] transition-colors focus:border-[#00cfff] focus:outline-none"
            />
          </div>

          <textarea
            id="md-editor"
            value={draft.content}
            onChange={(e) => updateField("content", e.target.value)}
            placeholder="Write your markdown here..."
            className="w-full flex-1 resize-none border-none bg-transparent p-5 font-mono text-[1.1rem] leading-[1.6] text-[#f0f6fc] focus:outline-none"
          />
        </div>

        {/* Right Preview Pane */}
        <div className="flex h-1/2 flex-1 flex-col overflow-y-auto bg-[#0f1115] px-6 lg:h-full lg:px-10">
          <div
            id="preview-content"
            className="my-10 w-full"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </main>

      {/* Publish Workflow Modal */}
      {modalData.open && (
        <div
          id="publish-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
        >
          <div className="w-[90%] max-w-[600px] rounded-xl border border-[#30363d] bg-[#1a1d24] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:p-10">
            <h3 className="mb-5 text-xl font-bold text-[#f0f6fc]">
              Publish Workflow
            </h3>
            <p className="mb-4 leading-[1.6] text-[#8b949e]">
              1. The markdown file{" "}
              <strong id="download-filename" className="text-[#f0f6fc]">
                {modalData.filename}
              </strong>{" "}
              has been generated and downloaded. Move it to{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[#a5d6ff]">
                posts/published/
              </code>{" "}
              alongside <code className="font-mono text-[#a5d6ff]">post1.md</code>.
            </p>
            <p className="mb-4 leading-[1.6] text-[#8b949e]">
              2. Open{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[#a5d6ff]">
                lib/markdown.ts
              </code>{" "}
              and add the following object to the{" "}
              <code className="font-mono text-[#a5d6ff]">INITIAL_BLOG_POSTS</code>{" "}
              array (or let the server auto-discover it from{" "}
              <code className="font-mono text-[#a5d6ff]">posts/published/</code>):
            </p>
            <pre className="mb-6 overflow-x-auto rounded-lg border border-white/5 bg-[#0d0f12] p-5">
              <code id="json-snippet" className="font-mono text-sm text-[#a5d6ff]">
                {modalData.jsonSnippet}
              </code>
            </pre>
            <button
              id="btn-close-modal"
              type="button"
              onClick={() => setModalData((prev) => ({ ...prev, open: false }))}
              className="btn-primary"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
