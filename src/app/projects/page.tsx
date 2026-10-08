import type { Metadata } from "next";
import { ExternalMark } from "@/components/sites/mihirmahakalkar/external-mark";
import { ReturnLink } from "@/components/sites/mihirmahakalkar/return-link";
import { SiteFrame } from "@/components/sites/mihirmahakalkar/site-frame";

export const metadata: Metadata = {
  title: "Projects — Mihir Mahakalkar",
};

const PROJECTS = [
  {
    name: "Project one",
    href: "https://example.com/project-one",
    host: "example.com/project-one",
    contributed: false,
    summary:
      "Placeholder description for a shipped project. The real name, link, and summary replace this.",
  },
  {
    name: "Project two",
    href: "https://example.com/project-two",
    host: "example.com/project-two",
    contributed: false,
    summary:
      "Placeholder description for a second project, in the same shape as the first.",
  },
  {
    name: "Project three",
    href: "https://example.com/project-three",
    host: "example.com/project-three",
    contributed: true,
    summary: "Placeholder description for a contributed project.",
  },
] as const;

export default function ProjectsPage() {
  return (
    <SiteFrame>
      <div data-fade="0.06" data-fade-kind="body" className="return-bar">
        <ReturnLink />
      </div>
      <header data-fade="0.14" data-fade-kind="body" className="mt-8">
        <h1 className="lm-name">Projects</h1>
        {/* <p className="mt-1 text-pretty lm-dim">
          Work that’s finished enough to stand on its own.
        </p> */}
        <p className="mt-1 text-pretty lm-dim">
          The projects exist. They’re just not ready to meet you.
        </p>
      </header>
      {/* <ul data-fade="0.22" data-fade-kind="body" className="mt-8">
        {PROJECTS.map((project) => (
          <li key={project.href} className="mt-2 first:mt-0">
            <a
              className="entry-card ct-ext"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="min-w-0">
                  <span className="lm-name">{project.name}</span>
                  <span className="ct-slot">
                    <ExternalMark />
                  </span>
                  {project.contributed ? (
                    <span className="entry-note">contributed</span>
                  ) : null}
                </div>
                <span className="entry-host shrink-0">{project.host}</span>
              </div>
              <p className="mt-1 text-pretty lm-dim">{project.summary}</p>
            </a>
          </li>
        ))}
      </ul> */}
    </SiteFrame>
  );
}
