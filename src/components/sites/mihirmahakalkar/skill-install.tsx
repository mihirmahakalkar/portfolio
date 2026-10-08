"use client";

import { useEffect, useRef, useState } from "react";
import { playChime } from "@/lib/sites/mihirmahakalkar/audio";

const LINKS = [
  { label: "skills.sh", href: "https://example.com/skills" },
  { label: "GitHub", href: "https://example.com/github" },
] as const;

const ArrowIcon = (
  <svg
    data-icon="arrow"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export function SkillInstall({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const resetRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetRef.current), []);

  const copyCommand = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    playChime("success");
    setCopied(true);
    clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="skill-card mt-6">
      <div className="skill-cmd">
        <code>{command}</code>
        <button
          type="button"
          className="skill-copy"
          aria-label={copied ? "Install command copied" : "Copy install command"}
          onClick={copyCommand}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
          )}
        </button>
      </div>
      <div className="skill-links">
        {LINKS.map((link) => (
          <a
            key={link.label}
            className="skill-link ct-ext"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ct-t">{link.label}</span>
            <span className="ct-slot" aria-hidden="true">
              {ArrowIcon}
            </span>
          </a>
        ))}
      </div>
      <span className="sr-only" role="status">
        {copied ? "Install command copied" : ""}
      </span>
    </div>
  );
}
