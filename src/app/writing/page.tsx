import type { Metadata } from "next";
import Link from "next/link";
import { ReturnLink } from "@/components/sites/mihirmahakalkar/return-link";
import { SiteFrame } from "@/components/sites/mihirmahakalkar/site-frame";
import { ARTICLES } from "@/lib/sites/mihirmahakalkar/writing";

export const metadata: Metadata = {
  title: "Writing — Mihir Mahakalkar",
};

export default function WritingPage() {
  return (
    <SiteFrame>
      <div data-fade="0.06" data-fade-kind="body" className="return-bar">
        <ReturnLink />
      </div>
      <header data-fade="0.14" data-fade-kind="body" className="mt-8">
        <h1 className="lm-name">Writing</h1>
        <p className="mt-1 text-pretty lm-dim">Notes from along the way.</p>
      </header>
      <div data-fade="0.22" data-fade-kind="body" className="mt-8">
        <p className="lm-dim">2026</p>
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            className="entry-card mt-4"
            href={`/writing/${article.slug}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="lm-name">{article.title}</h2>
              <time className="entry-host shrink-0" dateTime={article.dateTime}>
                {article.dateShort}
              </time>
            </div>
            <p className="mt-1 text-pretty lm-dim">{article.summary}</p>
          </Link>
        ))}
      </div>
    </SiteFrame>
  );
}
