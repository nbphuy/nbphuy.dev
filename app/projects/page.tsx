import type { Metadata } from "next";
import Image from "next/image";
import { PROJECTS_DATA, ProjectItem } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Portfolio of projects by Nguyen Binh Phuong Huy.",
};

function GithubSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  );
}

function CubeDemoSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M8.636 3.545a1.5 1.5 0 0 0-1.272 0l-5 2.5A1.5 1.5 0 0 0 1.5 7.386v4.228a1.5 1.5 0 0 0 .864 1.341l5 2.5a1.5 1.5 0 0 0 1.272 0l5-2.5a1.5 1.5 0 0 0 .864-1.341V7.386a1.5 1.5 0 0 0-.864-1.341l-5-2.5zM8 4.673l4.5 2.25L8 9.173 3.5 6.923 8 4.673zm.636 5.518l4.364-2.182v4.605l-4.364 2.182V10.19zm-1.272 0v4.605L3 12.614V8.009l4.364 2.182z" />
    </svg>
  );
}

function ProjectThumbnail({ project }: { project: ProjectItem }) {
  if (project.thumbnailType === "logo" && project.thumbnailImage) {
    return (
      <div className="flex h-[180px] w-full items-center justify-center border-b border-white/5 bg-[#262a33] p-5">
        <Image
          src={project.thumbnailImage}
          alt={project.thumbnailAlt || project.title}
          width={240}
          height={140}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  if (project.thumbnailType === "gradient-1") {
    return (
      <div
        className="flex h-[180px] w-full items-end justify-between border-b border-white/5 p-5"
        style={{ background: "linear-gradient(135deg, #1f2229, #2b2f38)" }}
      >
        <span className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-medium text-[#8b949e]">
          Web Application
        </span>
      </div>
    );
  }

  if (project.thumbnailType === "gradient-2") {
    return (
      <div
        className="flex h-[180px] w-full items-end justify-between border-b border-white/5 p-5"
        style={{ background: "linear-gradient(135deg, #2b2f38, #1f2229)" }}
      >
        <span className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-medium text-[#8b949e]">
          Personal Portfolio
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex h-[180px] w-full flex-col justify-between border-b border-white/5 p-5"
      style={{
        background:
          project.accentGradient || "linear-gradient(135deg, #1f2229, #2b2f38)",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        {project.role && (
          <span className="rounded-md border border-[#00cfff]/30 bg-[#00cfff]/10 px-2.5 py-1 text-xs font-medium text-[#00cfff]">
            {project.role}
          </span>
        )}
        {project.period && (
          <span className="text-xs font-medium text-[#8b949e]">
            {project.period}
          </span>
        )}
      </div>
      <div className="text-lg font-bold tracking-tight text-white/90">
        {project.title.split("–")[0].split("-")[0].trim()}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-5 pt-[110px] pb-[80px]">
      <h1 className="section-title">My Projects</h1>
      <p className="max-w-2xl text-sm text-[#8b949e]">
        A collection of full-stack web applications, multi-protocol backend systems, real-time BCI/EEG research software, and mobile-first UI/UX designs.
      </p>

      <div
        id="projects-grid"
        className="animate-fade-in mt-10 grid grid-cols-1 gap-[30px] pb-10 md:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS_DATA.map((project) => (
          <article
            key={project.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#00cfff]/30 hover:bg-white/[0.05] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(0,207,255,0.1)]"
          >
            <ProjectThumbnail project={project} />

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-semibold text-[#f0f6fc]">
                  {project.title}
                </h3>
              </div>

              {(project.role || project.period) && project.thumbnailType === "logo" && (
                <p className="mb-2 text-xs font-medium text-[#00cfff]">
                  {project.role} {project.period ? `• ${project.period}` : ""}
                </p>
              )}

              <p className="mb-4 text-[0.95rem] leading-[1.5] text-[#8b949e]">
                {project.description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <ul className="mb-5 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-[#8b949e]/90">
                  {project.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="mt-auto mb-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[#30363d] bg-[#1a1d24] px-2.5 py-0.5 text-[11px] font-medium text-[#8b949e]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto flex items-center gap-[15px] pt-2">
                {project.links.map((link) => {
                  const isExternal = link.url.startsWith("http");
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[#00cfff] transition-colors hover:text-[#0088ff]"
                    >
                      {link.type === "code" ? <GithubSvg /> : <CubeDemoSvg />}
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
