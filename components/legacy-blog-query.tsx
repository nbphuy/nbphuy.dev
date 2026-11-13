"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LegacyBlogQueryRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const postParam = searchParams.get("post");

  useEffect(() => {
    if (postParam) {
      router.replace(`/blog/${encodeURIComponent(postParam)}`);
    }
  }, [postParam, router]);

  return null;
}
