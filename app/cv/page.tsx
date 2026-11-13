import type { Metadata } from "next";
import Link from "next/link";
import {
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PROFILE_DATA,
  SKILL_CATEGORIES,
} from "@/lib/portfolio-data";
import { PrintCvButton } from "@/components/print-cv-button";
import { ArrowLeft, Code2, ExternalLink, Globe, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume / CV",
  description: "Curriculum Vitae of Nguyen Binh Phuong Huy.",
};

export default function CvPage() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-5 pt-[110px] pb-[80px] print:max-w-none print:p-0">
      {/* Top Action Bar */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#8b949e] transition-colors hover:text-[#00cfff]"
        >
          <ArrowLeft className="size-4" />
          Back to About
        </Link>
        <PrintCvButton />
      </div>

      {/* CV Document Container */}
      <article className="animate-fade-in rounded-2xl border border-[#30363d] bg-[#1a1d24] p-6 shadow-2xl sm:p-12 print:rounded-none print:border-none print:bg-white print:p-0 print:text-black print:shadow-none">
        {/* Header */}
        <header className="border-b border-[#30363d] pb-6 text-center print:border-black/20">
          <h1 className="text-3xl font-bold text-[#f0f6fc] sm:text-4xl print:text-black">
            {PROFILE_DATA.fullName}
          </h1>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#8b949e] sm:text-sm print:text-black/80">
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="inline-flex items-center gap-1.5 hover:text-[#00cfff]"
            >
              <Mail className="size-3.5 text-[#00cfff] print:hidden" />
              {PROFILE_DATA.email}
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href="https://www.linkedin.com/in/nbphuy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#00cfff]"
            >
              <Globe className="size-3.5 text-[#00cfff] print:hidden" />
              www.linkedin.com/in/nbphuy
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href="https://github.com/nbphuy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#00cfff]"
            >
              <Code2 className="size-3.5 text-[#00cfff] print:hidden" />
              https://github.com/nbphuy
            </a>
          </div>
        </header>

        {/* Education */}
        <section className="mt-8">
          <h2 className="border-b border-[#30363d] pb-1.5 text-sm font-bold tracking-wider text-[#00cfff] uppercase print:border-black print:text-black">
            Education
          </h2>
          <div className="mt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-bold text-[#f0f6fc] print:text-black">
                {EDUCATION_DATA.institution}
              </h3>
              <span className="text-xs font-medium italic text-[#8b949e] print:text-black/70">
                {EDUCATION_DATA.period}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2 text-sm">
              <span className="font-semibold text-[#f0f6fc] print:text-black">
                {EDUCATION_DATA.degree}
              </span>
              <span className="font-semibold text-[#8b949e] print:text-black">
                GPA: 3.0/4.0
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#8b949e] print:text-black/80">
              <strong className="font-semibold text-[#f0f6fc] print:text-black">
                Relevant Courses:
              </strong>{" "}
              {EDUCATION_DATA.courses.join(", ")}
            </p>
          </div>
        </section>

        {/* Work Experience */}
        <section className="mt-8">
          <h2 className="border-b border-[#30363d] pb-1.5 text-sm font-bold tracking-wider text-[#00cfff] uppercase print:border-black print:text-black">
            Work Experience
          </h2>
          <div className="mt-4 space-y-6">
            {EXPERIENCE_DATA.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#f0f6fc] sm:text-base print:text-black">
                    {exp.company} | {exp.role} | {exp.type}
                  </h3>
                  <span className="text-xs font-medium italic text-[#8b949e] print:text-black/70">
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-[#8b949e] sm:text-sm print:text-black/80">
                  {exp.points.map((pt) => (
                    <li key={pt.heading}>
                      <strong className="font-semibold text-[#f0f6fc] print:text-black">
                        {pt.heading}:
                      </strong>{" "}
                      {pt.detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Project Experience */}
        <section className="mt-8">
          <h2 className="border-b border-[#30363d] pb-1.5 text-sm font-bold tracking-wider text-[#00cfff] uppercase print:border-black print:text-black">
            Project Experience
          </h2>
          <div className="mt-4 space-y-6 text-xs leading-relaxed text-[#8b949e] sm:text-sm print:text-black/80">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold text-[#f0f6fc] print:text-black">
                  StudentFood – Campus Food Ordering Platform | Mobile Frontend Developer
                </h3>
                <span className="text-xs italic">Oct 2026 – Current</span>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5">
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">
                    Responsive Frontend Development &amp; Feature Implementation:
                  </strong>{" "}
                  Developed and debugged responsive student-facing interfaces using Next.js, React, TypeScript, and CSS Modules. Implemented Home, Explore, Order Management, and Food/Drink Customization features, including interactive search filters, dynamic product options, and mobile navigation.
                </li>
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">
                    UI Optimization, Refactoring &amp; Testing:
                  </strong>{" "}
                  Refactored application-wide typography and responsive styling to improve visual consistency across desktop and mobile devices. Debugged user interface issues, implemented automated regression tests for key student workflows, and maintained technical documentation to support code maintainability and reliability.
                </li>
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">GitHub:</strong>{" "}
                  <a
                    href="https://github.com/MrT2003/student-food-mvp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#00cfff] hover:underline print:text-black"
                  >
                    MrT2003/student-food-mvp/
                    <ExternalLink className="size-3 print:hidden" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold text-[#f0f6fc] print:text-black">
                  Real-time EEG Meditation Monitoring Application | Undergraduate Thesis
                </h3>
                <span className="text-xs italic">Jan 2026 – July 2026</span>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5">
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">
                    Real-time EEG Pipeline &amp; Algorithm:
                  </strong>{" "}
                  Engineered a processing backend in Python and FastAPI to ingest EMOTIV BCI streams via WebSocket; formulated the Meditation Quality Index (MQI) using Welch&rsquo;s method for Power Spectral Density, cross-band ratios for Alpha, Beta, and Theta waves, and exponential moving average smoothing.
                </li>
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">
                    System Architecture &amp; Validation:
                  </strong>{" "}
                  Developed a telemetry dashboard with native JavaScript and ECharts for live neurofeedback; evaluated the algorithm against the OpenNeuro DS001787 dataset and achieved an average execution latency of 12 milliseconds. Successfully defended the capstone thesis with a score of 88/100.
                </li>
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">GitHub:</strong>{" "}
                  <a
                    href="https://github.com/nbphuy/meditee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#00cfff] hover:underline print:text-black"
                  >
                    nbphuy/meditee
                    <ExternalLink className="size-3 print:hidden" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold text-[#f0f6fc] print:text-black">
                  MangaHub - Manga Reading &amp; Management Platform | Collaborate Developer
                </h3>
                <span className="text-xs italic">Nov 2025 – Dec 2025</span>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5">
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">
                    Full-Stack Development &amp; Real-Time Synchronization:
                  </strong>{" "}
                  Developed a comprehensive manga reading platform supporting both CLI and Web interfaces using Go and SQLite. Implemented real-time reading progress synchronization across devices via a TCP Sync Server and integrated a UDP server for instant chapter notifications.
                </li>
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">
                    System Architecture &amp; Multi-Protocol APIs:
                  </strong>{" "}
                  Architected a multi-protocol backend system featuring RESTful APIs (Gin framework), high-performance gRPC endpoints, and WebSocket connections for real-time chat functionality. Engineered secure user authentication with bcrypt and comprehensive library management features including reading progress tracking, bookmarks, and rating systems.
                </li>
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">GitHub:</strong>{" "}
                  <a
                    href="https://github.com/nbphuy/manga_hub_project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#00cfff] hover:underline print:text-black"
                  >
                    nbphuy/manga_hub_project
                    <ExternalLink className="size-3 print:hidden" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold text-[#f0f6fc] print:text-black">
                  Coinbase – Mobile App UI Design Project | UI Designer
                </h3>
                <span className="text-xs italic">Dec 2023 – Jan 2024</span>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5">
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">
                    Mobile-First UI/UX Design:
                  </strong>{" "}
                  Designed a modern identity verification flow inspired by real-world fintech applications like Coinbase, prioritizing intuitive form inputs, mobile usability, and accessible component systems including custom keyboards and input fields.
                </li>
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">
                    High-Fidelity Prototyping &amp; Design System:
                  </strong>{" "}
                  Created interactive prototypes in Figma and established a scalable design system by applying consistent typography, spacing, and semantic color tokens across all UI components.
                </li>
                <li>
                  <strong className="text-[#f0f6fc] print:text-black">
                    User Flow Structuring:
                  </strong>{" "}
                  Architected end-to-end user journeys encompassing seamless onboarding, precise address input, and dynamic risk profiling screens.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills (Strictly listed without percentages) */}
        <section className="mt-8">
          <h2 className="border-b border-[#30363d] pb-1.5 text-sm font-bold tracking-wider text-[#00cfff] uppercase print:border-black print:text-black">
            Skills
          </h2>
          <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-[#8b949e] sm:text-sm print:text-black/80">
            {SKILL_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <strong className="font-semibold text-[#f0f6fc] print:text-black">
                  {cat.title}:
                </strong>{" "}
                {cat.skills.join(", ")}.
              </li>
            ))}
          </ul>
        </section>

        {/* Certifications */}
        <section className="mt-8">
          <h2 className="border-b border-[#30363d] pb-1.5 text-sm font-bold tracking-wider text-[#00cfff] uppercase print:border-black print:text-black">
            Certifications
          </h2>
          <ul className="mt-3 grid grid-cols-1 gap-1.5 text-xs text-[#8b949e] sm:grid-cols-2 sm:text-sm print:text-black/80">
            {CERTIFICATIONS_DATA.map((cert) => (
              <li key={cert.id} className="flex items-start gap-2">
                <span className="text-[#00cfff] print:text-black">❖</span>
                <span>
                  {cert.title}
                  {cert.badgeText ? ` – ${cert.badgeText}` : ""} (
                  {cert.issuer}
                  {cert.platform ? ` | ${cert.platform}` : ""})
                </span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
