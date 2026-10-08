"use client";

import { useEffect, useRef, useState } from "react";
import { playChime, playTick } from "@/lib/sites/mihirmahakalkar/audio";

const EMAIL = "mihirmahakalkar@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mihirmahakalkar" },
  { label: "X", href: "https://x.com/MihirMahakalkar" },
] as const;

function Icon({
  name,
  stroke,
  children,
}: {
  name: string;
  stroke: number;
  children: React.ReactNode;
}) {
  return (
    <svg
      data-icon={name}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const ArrowIcon = (
  <Icon name="arrow" stroke={3.6}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </Icon>
);

function ExternalLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      className="ct-ext"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in new tab)`}
      onClick={() => playTick()}
    >
      <span className="ct-t">{label}</span>
      <span className="ct-slot" aria-hidden="true">
        {ArrowIcon}
      </span>
    </a>
  );
}

export function ContactProse() {
  const [copied, setCopied] = useState(false);
  const emailRef = useRef<HTMLSpanElement>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetRef.current), []);

  const copyEmail = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // No clipboard permission: select the address so it can be copied by hand.
      const el = emailRef.current;
      const selection = window.getSelection();
      if (el && selection) {
        const range = document.createRange();
        range.selectNodeContents(el);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      return;
    }
    playChime("success");
    setCopied(true);
    clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => setCopied(false), 1600);
  };

  const [github, x] = SOCIALS;

  return (
    <>
      My code is on{" "}
      <span className="ct-lk">
        <ExternalLink {...github} />,
      </span>{" "}
      I’m around on{" "}
      <span className="ct-lk">
        <ExternalLink {...x} />,
      </span>{" "}
      and my inbox is{" "}
      <span className="ct-lk ct-mail">
        <button
          type="button"
          className="ct-ext"
          data-done={copied || undefined}
          aria-label={`Copy email address ${EMAIL}`}
          onClick={copyEmail}
        >
          <span ref={emailRef} className="ct-t">
            {EMAIL}
          </span>
          <span className="ct-slot" aria-hidden="true">
            <Icon name="copy" stroke={3.2}>
              <rect x="8" y="8" width="13" height="13" rx="2.5" />
              <path d="M4 16V5a1 1 0 0 1 1-1h11" />
            </Icon>
            <Icon name="check" stroke={3.4}>
              <path d="M20 6 9 17l-5-5" />
            </Icon>
          </span>
        </button>
        .
      </span>
      <span className="sr-only" role="status">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
