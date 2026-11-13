"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/photos", label: "Photos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function NavLinksInner() {
  const pathname = usePathname();

  if (pathname === "/admin") {
    return null;
  }

  return (
    <header className="no-print fixed top-0 left-0 z-50 flex h-[70px] w-full items-center justify-center border-b border-[#30363d] bg-[#0f1115]/85 backdrop-blur-md transition-all">
      <nav aria-label="Main navigation" className="w-full max-w-[1200px] px-4">
        <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-2.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`inline-block rounded-md px-2.5 py-2 text-[0.85rem] font-medium transition-all sm:px-4 sm:text-[0.95rem] ${
                    isActive
                      ? "text-[#00cfff]"
                      : "text-[#8b949e] hover:bg-[#1a1d24] hover:text-[#f0f6fc]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-sm bg-[#00cfff] shadow-[0_0_8px_rgba(0,207,255,0.4)]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

function NavLinksFallback() {
  return (
    <header className="no-print fixed top-0 left-0 z-50 flex h-[70px] w-full items-center justify-center border-b border-[#30363d] bg-[#0f1115]/85 backdrop-blur-md">
      <nav aria-label="Main navigation" className="w-full max-w-[1200px] px-4">
        <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-2.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className="inline-block rounded-md px-2.5 py-2 text-[0.85rem] font-medium text-[#8b949e] transition-all hover:bg-[#1a1d24] hover:text-[#f0f6fc] sm:px-4 sm:text-[0.95rem]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<NavLinksFallback />}>
      <NavLinksInner />
    </Suspense>
  );
}
