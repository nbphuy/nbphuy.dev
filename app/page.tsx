import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { PROFILE_DATA } from "@/lib/portfolio-data";
import { ArrowRight, Award, Camera, Code2, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-5 pt-[110px] pb-[60px]">
      {/* Hello Tấn Thiện - Preserved Hero Section from nbphuy.github.io/index.html */}
      <section className="animate-fade-in flex min-h-[calc(100vh-200px)] flex-col-reverse items-center justify-between gap-10 pt-5 text-center lg:flex-row lg:gap-[60px] lg:pt-0 lg:text-left">
        {/* Left Section / Column */}
        <div className="w-full max-w-[600px] flex-1">
          <h2 className="text-xl font-semibold text-[#f0f6fc] sm:text-2xl">
            {PROFILE_DATA.greeting}
          </h2>
          <h2 className="mt-1 text-2xl font-bold text-[#f0f6fc] sm:text-3xl">
            {PROFILE_DATA.fullName}
          </h2>
          <h1 className="hero-gradient-header mt-5 mb-10 text-3xl leading-[1.2] font-extrabold sm:text-[40px] lg:whitespace-nowrap">
            {PROFILE_DATA.headline}
          </h1>

          <SocialLinks className="mb-10 justify-center lg:justify-start" />

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link href="/cv" className="btn-primary">
              <FileText className="size-4" />
              Download CV
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#1a1d24] px-6 py-3 text-base font-medium text-[#f0f6fc] transition-all hover:-translate-y-0.5 hover:border-[#00cfff] hover:bg-[#262a33] hover:text-[#00cfff]"
            >
              View Projects
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Right Section / Column */}
        <div className="flex w-full flex-1 items-center justify-center">
          <Image
            src={PROFILE_DATA.avatar}
            alt={PROFILE_DATA.avatarAlt}
            width={450}
            height={450}
            priority
            className="avatar-blob"
          />
        </div>
      </section>

      {/* Quick Overview Strip linking to newly added sections */}
      <section
        aria-label="Quick portfolio highlights"
        className="mt-12 grid grid-cols-1 gap-5 border-t border-[#30363d]/60 pt-12 sm:grid-cols-3"
      >
        <Link
          href="/about#skills"
          className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#00cfff]/30 hover:bg-white/[0.04]"
        >
          <div className="mb-3 inline-flex rounded-lg bg-[#00cfff]/10 p-2.5 text-[#00cfff]">
            <Code2 className="size-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#f0f6fc] group-hover:text-[#00cfff]">
            Technical Skills &amp; Stack
          </h3>
          <p className="mt-1.5 text-sm text-[#8b949e]">
            Python, Go, TypeScript, React.js, Next.js, FastAPI, PostgreSQL, gRPC, WebSockets &amp; Creative Tools.
          </p>
        </Link>

        <Link
          href="/about#certifications"
          className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#00cfff]/30 hover:bg-white/[0.04]"
        >
          <div className="mb-3 inline-flex rounded-lg bg-[#00cfff]/10 p-2.5 text-[#00cfff]">
            <Award className="size-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#f0f6fc] group-hover:text-[#00cfff]">
            11+ Certifications
          </h3>
          <p className="mt-1.5 text-sm text-[#8b949e]">
            IELTS 6.5, Google Python &amp; Agile Project Management, Google AI &amp; Gemini Educator, Cisco AI, and MOS.
          </p>
        </Link>

        <Link
          href="/photos"
          className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#00cfff]/30 hover:bg-white/[0.04]"
        >
          <div className="mb-3 inline-flex rounded-lg bg-[#00cfff]/10 p-2.5 text-[#00cfff]">
            <Camera className="size-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#f0f6fc] group-hover:text-[#00cfff]">
            Hobbies &amp; Photography
          </h3>
          <p className="mt-1.5 text-sm text-[#8b949e]">
            Explore my personal photography gallery, color grading works, and creative interests beyond code.
          </p>
        </Link>
      </section>
    </main>
  );
}
