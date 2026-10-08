import { Clock } from "@/components/sites/mihirmahakalkar/clock";
import { Reveal } from "@/components/sites/mihirmahakalkar/reveal";

function SiteFooter({ className }: { className: string }) {
  return (
    <footer data-fade="0.38" data-fade-kind="body" className={className}>
      <div className="flex items-center gap-[7px]">
        <span
          className="inline-block h-[5px] w-[5px] shrink-0 rounded-[9999px] bg-[var(--lm-accent)]"
          aria-hidden="true"
        />
        <Clock />
      </div>
      <span className="min-w-0 text-right [overflow-wrap:anywhere]">
        mihirmahakalkar.github.io/portfolio
      </span>
    </footer>
  );
}

export function SiteFrame({
  children,
  narrow = false,
}: {
  children: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <div className="min-h-screen transition-colors duration-500 ease-[cubic-bezier(.5,0,.1,1)]">
      <Reveal>
        <main className="mx-auto flex min-h-screen w-full min-w-0 max-w-[560px] flex-col px-[clamp(20px,6vw,60px)] pb-[clamp(28px,5vh,44px)] pt-[calc(var(--lm-head-top)_+_3px)]">
          <div
            className={`w-full min-w-0 text-[15px] font-medium leading-[1.5] tracking-[-0.015em] ${narrow ? "max-w-[420px]" : ""}`}
          >
            {children}
          </div>
          <SiteFooter className="site-foot mt-auto pt-[76px]" />
        </main>
      </Reveal>
    </div>
  );
}
