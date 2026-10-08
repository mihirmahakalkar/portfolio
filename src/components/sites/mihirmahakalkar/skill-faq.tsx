"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SkillFaq({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.55, ease: EASE };

  return (
    <section className="mt-12">
      <h2 className="faq-label">
        <span>/faq</span>
        <span />
      </h2>
      <div className="mt-2">
        {items.map((item) => {
          const expanded = open === item.question;
          return (
            <div key={item.question} className="faq-item">
              <button
                type="button"
                className="faq-q"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : item.question)}
              >
                {item.question}
                <span className="faq-icon" aria-hidden="true">
                  <motion.span
                    className="faq-plus"
                    animate={{ opacity: expanded ? 0 : 1 }}
                    transition={transition}
                  >
                    +
                  </motion.span>
                  <motion.span
                    className="faq-plus"
                    animate={{ opacity: expanded ? 1 : 0 }}
                    transition={transition}
                  >
                    −
                  </motion.span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={transition}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="faq-a text-pretty lm-dim">{item.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
