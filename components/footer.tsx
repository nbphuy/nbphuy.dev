"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { PROFILE_DATA } from "@/lib/portfolio-data";

function FooterInner() {
  const pathname = usePathname();
  if (pathname === "/admin") return null;

  return (
    <footer className="no-print mt-auto border-t border-[#30363d]/60 bg-[#0f1115]/90 py-6 text-sm text-[#8b949e]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <p>
          © 2026 {PROFILE_DATA.fullName}. Built with Next.js &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-5 text-xs">
          <Link href="/about" className="transition-colors hover:text-[#00cfff]">
            About &amp; Skills
          </Link>
          <Link href="/projects" className="transition-colors hover:text-[#00cfff]">
            Projects
          </Link>
          <Link href="/photos" className="transition-colors hover:text-[#00cfff]">
            Photos
          </Link>
          <Link href="/cv" className="transition-colors hover:text-[#00cfff]">
            Resume / CV
          </Link>
          <Link href="/admin" className="transition-colors hover:text-[#00cfff]">
            Local CMS
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <Suspense fallback={null}>
      <FooterInner />
    </Suspense>
  );
}
