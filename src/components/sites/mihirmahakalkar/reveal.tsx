"use client";

import { useEffect, useRef } from "react";

const SETTLE = (el: HTMLElement) => {
  el.style.opacity = "1";
  el.style.transform = "none";
  el.style.filter = "none";
  el.style.willChange = "auto";
};

/**
 * Staggered entry animation. Each descendant carrying `data-fade` holds its
 * delay in seconds; `data-fade-kind` selects the motion, and `data-fade-dur`
 * overrides the duration.
 */
export function Reveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const targets = Array.from(
      node.querySelectorAll<HTMLElement>("[data-fade]"),
    );
    const animations: Animation[] = [];
    let finished = false;
    let outerFrame = 0;
    let innerFrame = 0;

    const settleAll = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
      for (const animation of animations) {
        try {
          animation.finish();
        } catch {
          // A cancelled animation cannot be finished; the element is settled below.
        }
      }
      for (const el of targets) SETTLE(el);
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.hidden
    ) {
      settleAll();
      return;
    }

    for (const el of targets) el.style.willChange = "opacity, transform, filter";

    // Two frames so the browser commits the pre-animation styles first.
    outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        if (finished) return;
        for (const el of targets) {
          const parsed = parseFloat(el.dataset.fade || "0") * 1000;
          const delay = Number.isFinite(parsed) ? parsed : 0;
          const isBody = el.dataset.fadeKind === "body";
          const isPhoto = el.dataset.fadeKind === "photo";

          const custom = parseFloat(el.dataset.fadeDur || "");
          const duration = isBody
            ? Number.isFinite(custom)
              ? custom * 1000
              : 560
            : 360;

          const from: Keyframe = isBody
            ? { opacity: 0, transform: "translateY(12px)", filter: "blur(6px)" }
            : isPhoto
              ? { opacity: 0, transform: "scale(0.96)", filter: "blur(0)" }
              : { opacity: 0, transform: "translateY(8px)", filter: "blur(3px)" };
          const to: Keyframe = {
            opacity: 1,
            transform: isPhoto ? "scale(1)" : "translateY(0)",
            filter: "blur(0)",
          };

          const animation = el.animate([from, to], {
            duration,
            delay,
            easing: isBody
              ? "cubic-bezier(.22,1,.36,1)"
              : "cubic-bezier(.16,1,.3,1)",
            fill: "both",
          });
          animation.onfinish = () => SETTLE(el);
          animations.push(animation);
        }
      });
    });

    const onVisibilityChange = () => {
      if (document.hidden) settleAll();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    const safety = window.setTimeout(settleAll, 2500);

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
      clearTimeout(safety);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      for (const animation of animations) {
        try {
          animation.cancel();
        } catch {
          // Already finished.
        }
      }
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
