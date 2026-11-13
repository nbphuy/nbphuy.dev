import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  HOBBIES_DATA,
  PROFILE_DATA,
  SKILL_CATEGORIES,
  SOFTWARE_TOOLS,
  HobbyItem,
} from "@/lib/portfolio-data";
import {
  Award,
  BookOpen,
  Briefcase,
  Camera,
  Code2,
  ExternalLink,
  FileText,
  GraduationCap,
  Palette,
  Sparkles,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "About Nguyen Binh Phuong Huy, a Computer Science student and Fullstack Developer.",
};

function renderHobbyIcon(iconName: HobbyItem["iconName"]) {
  switch (iconName) {
    case "camera":
      return <Camera className="size-5 text-[#00cfff]" />;
    case "palette":
      return <Palette className="size-5 text-[#00cfff]" />;
    case "code":
      return <Code2 className="size-5 text-[#00cfff]" />;
    case "book":
      return <BookOpen className="size-5 text-[#00cfff]" />;
  }
}

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-5 pt-[110px] pb-[80px]">
      {/* 1. Original About Me Section (100% preserved from nbphuy.github.io/about.html) */}
      <section className="animate-fade-in mt-10 flex flex-col items-center gap-10 text-center lg:flex-row lg:gap-[60px] lg:text-left">
        <div className="flex-1 text-[1.1rem] leading-[1.8] text-[#8b949e]">
          <h1 className="section-title">About Me</h1>
          <h3 className="mb-5 text-[1.4rem] font-medium text-[#00cfff]">
            {PROFILE_DATA.aboutSubheading}
          </h3>
          <p className="mb-[30px] text-justify">{PROFILE_DATA.aboutParagraph}</p>
          <div className="mt-[30px] flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link href="/cv" className="btn-primary">
              <FileText className="size-4" />
              Download CV
            </Link>
            <a
              href="https://www.linkedin.com/in/nbphuy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#1a1d24] px-5 py-3 text-base font-medium text-[#f0f6fc] transition-all hover:border-[#00cfff] hover:text-[#00cfff]"
            >
              LinkedIn Profile
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        <div className="order-first flex w-full flex-1 items-center justify-center lg:order-none">
          <Image
            src={PROFILE_DATA.aboutImage}
            alt={PROFILE_DATA.aboutImageAlt}
            width={500}
            height={600}
            priority
            className="w-full max-w-[500px] rounded-2xl border border-[#30363d] object-cover shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-2.5"
          />
        </div>
      </section>

      {/* 2. Skills Section (Pure categorization & badges — strictly NO percentages or level bars) */}
      <section id="skills" className="mt-24 scroll-mt-24">
        <div className="mb-8 flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#00cfff] uppercase">
            <Wrench className="size-4" />
            Technical &amp; Creative Proficiencies
          </div>
          <h2 className="section-title !mb-2">Skills &amp; Toolkit</h2>
          <p className="max-w-2xl text-sm text-[#8b949e]">
            Technologies, frameworks, and tools I work with across full-stack web engineering, real-time backend systems, AI workflows, and UI/2D design.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="flex flex-col rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-[#00cfff]/30 hover:bg-white/[0.05]"
            >
              <h3 className="text-lg font-semibold text-[#f0f6fc]">
                {category.title}
              </h3>
              <p className="mt-1 mb-4 text-xs text-[#8b949e]">
                {category.description}
              </p>
              <ul className="mt-auto flex flex-wrap gap-2" aria-label={category.title}>
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-[#30363d] bg-[#1a1d24] px-3 py-1.5 text-xs font-medium text-[#f0f6fc] transition-colors hover:border-[#00cfff]/60 hover:text-[#00cfff]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Creative & Productivity Software Logos from nbphuy.github.io/public/img/software_logo */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md">
          <h3 className="mb-4 text-base font-semibold text-[#f0f6fc]">
            Design &amp; Productivity Software
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {SOFTWARE_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-[#30363d]/60 bg-[#1a1d24]/70 p-4 text-center transition-all hover:-translate-y-1 hover:border-[#00cfff]/40 hover:bg-[#262a33]/80"
              >
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#f0f6fc]">
                    {tool.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#8b949e]">
                    {tool.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Education & Work Experience Section */}
      <section id="experience" className="mt-24 scroll-mt-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Education Column */}
          <div className="lg:col-span-5">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#00cfff] uppercase">
              <GraduationCap className="size-4" />
              Academic Background
            </div>
            <h2 className="section-title !mb-6">Education</h2>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#30363d] bg-[#1a1d24] p-2">
                  <Image
                    src={EDUCATION_DATA.logo}
                    alt={EDUCATION_DATA.institution}
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <span className="inline-block rounded-full bg-[#00cfff]/10 px-2.5 py-0.5 text-xs font-medium text-[#00cfff]">
                    {EDUCATION_DATA.period}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-[#f0f6fc]">
                    {EDUCATION_DATA.degree}
                  </h3>
                  <p className="text-sm text-[#8b949e]">
                    {EDUCATION_DATA.institution}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-[#30363d]/60 pt-4">
                <h4 className="mb-3 text-xs font-semibold tracking-wider text-[#8b949e] uppercase">
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION_DATA.courses.map((course) => (
                    <span
                      key={course}
                      className="rounded-md border border-[#30363d]/80 bg-[#0f1115]/80 px-2.5 py-1 text-xs text-[#8b949e]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Work Experience Column */}
          <div className="lg:col-span-7">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#00cfff] uppercase">
              <Briefcase className="size-4" />
              Career Journey
            </div>
            <h2 className="section-title !mb-6">Work Experience</h2>

            <div className="flex flex-col gap-6">
              {EXPERIENCE_DATA.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-[#00cfff]/30"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-[#f0f6fc]">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium text-[#00cfff]">
                        {exp.company}{" "}
                        <span className="text-[#8b949e]">• {exp.type}</span>
                      </p>
                    </div>
                    <span className="rounded-full border border-[#30363d] bg-[#1a1d24] px-3 py-1 text-xs font-medium text-[#8b949e]">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5 text-sm text-[#8b949e]">
                    {exp.points.map((pt) => (
                      <li key={pt.heading} className="leading-relaxed">
                        <strong className="font-semibold text-[#f0f6fc]">
                          {pt.heading}:
                        </strong>{" "}
                        {pt.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Certifications Section (from LinkedIn & CV) */}
      <section id="certifications" className="mt-24 scroll-mt-24">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#00cfff] uppercase">
              <Award className="size-4" />
              Verified Credentials
            </div>
            <h2 className="section-title !mb-2">Certifications</h2>
            <p className="max-w-2xl text-sm text-[#8b949e]">
              Professional certificates and credentials from Google, Coursera, Cisco, IELTS, Microsoft, and Thinking School.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/nbphuy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00cfff] hover:underline"
          >
            View on LinkedIn
            <ExternalLink className="size-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS_DATA.map((cert) => (
            <div
              key={cert.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#00cfff]/30 hover:bg-white/[0.05]"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-md bg-[#00cfff]/10 px-2.5 py-1 text-[11px] font-semibold text-[#00cfff]">
                    {cert.category}
                  </span>
                  {cert.badgeText && (
                    <span className="rounded-md border border-[#00cfff]/40 bg-[#00cfff]/15 px-2.5 py-0.5 text-xs font-semibold text-[#f0f6fc]">
                      {cert.badgeText}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold leading-snug text-[#f0f6fc] group-hover:text-[#00cfff]">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#30363d]/50 pt-3 text-xs text-[#8b949e]">
                <span className="font-medium text-[#f0f6fc]">{cert.issuer}</span>
                {cert.platform && <span> via {cert.platform}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Hobbies & Personal Interests Section */}
      <section id="hobbies" className="mt-24 scroll-mt-24">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#00cfff] uppercase">
              <Sparkles className="size-4" />
              Life Beyond The Terminal
            </div>
            <h2 className="section-title !mb-2">Hobbies &amp; Interests</h2>
            <p className="max-w-2xl text-sm text-[#8b949e]">
              Creative pursuits and passions that keep me inspired and balanced outside of software development.
            </p>
          </div>
          <Link
            href="/photos"
            className="inline-flex items-center gap-2 rounded-lg border border-[#00cfff]/40 bg-[#00cfff]/10 px-4 py-2 text-sm font-medium text-[#00cfff] transition-all hover:bg-[#00cfff]/20"
          >
            <Camera className="size-4" />
            Explore Photo Gallery
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {HOBBIES_DATA.map((hobby) => (
            <div
              key={hobby.id}
              className="flex flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#00cfff]/30 hover:bg-white/[0.05]"
            >
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#30363d] bg-[#1a1d24]">
                    {renderHobbyIcon(hobby.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#f0f6fc]">
                      {hobby.title}
                    </h3>
                    <p className="text-xs text-[#00cfff]">{hobby.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#8b949e]">
                  {hobby.description}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-[#30363d]/50 pt-4">
                {hobby.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[#1a1d24] px-2.5 py-1 text-xs text-[#8b949e]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
