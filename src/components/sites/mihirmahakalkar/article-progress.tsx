"use client";

import { useEffect, useRef } from "react";

/** Share of the article already scrolled, from 0 up to 1. */
function articleRead(article: HTMLElement): number {
  const rect = article.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const viewport = window.innerHeight;
  const maxScroll = Math.max(
    document.documentElement.scrollHeight - viewport,
    0,
  );
  const end = Math.min(top + rect.height - viewport, maxScroll);
  const range = end - top;
  if (range <= 0) return window.scrollY >= maxScroll ? 1 : 0;
  return Math.min(1, Math.max(0, (window.scrollY - top) / range));
}

export function ArticleProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = document.querySelector("article");
    const el = bar.current;
    if (!article || !el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const read = articleRead(article);
      el.style.transform = `scaleX(${read})`;
      el.parentElement?.setAttribute(
        "aria-valuenow",
        String(Math.round(read * 100)),
      );
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="article-progress"
      role="progressbar"
      aria-label="Article progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <div ref={bar} className="article-progress-bar" />
    </div>
  );
}
