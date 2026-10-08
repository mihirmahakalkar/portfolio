import type { Metadata } from "next";
import { ReturnLink } from "@/components/sites/mihirmahakalkar/return-link";
import { SiteFrame } from "@/components/sites/mihirmahakalkar/site-frame";

export const metadata: Metadata = {
  title: "Lab — Mihir Mahakalkar",
};

export default function LabPage() {
  return (
    <SiteFrame narrow>
      <div data-fade="0.06" data-fade-kind="body" className="return-bar">
        <ReturnLink />
      </div>
      <header data-fade="0.14" data-fade-kind="body" className="mt-8">
        <h1 className="lm-name">Lab</h1>
        <p className="mt-1 text-pretty lm-dim">Things I’m still figuring out.</p>
      </header>
    </SiteFrame>
  );
}
