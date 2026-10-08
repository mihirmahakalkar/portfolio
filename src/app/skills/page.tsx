import type { Metadata } from "next";
import { ReturnLink } from "@/components/sites/mihirmahakalkar/return-link";
import { SiteFrame } from "@/components/sites/mihirmahakalkar/site-frame";
import { SkillFaq } from "@/components/sites/mihirmahakalkar/skill-faq";
import { SkillInstall } from "@/components/sites/mihirmahakalkar/skill-install";

export const metadata: Metadata = {
  title: "Skills — Mihir Mahakalkar",
};

const FAQ = [
  {
    question: "What is a skill?",
    answer:
      "A placeholder answer. A skill is a folder of instructions an agent reads when a task calls for it.",
  },
  {
    question: "How do I install one?",
    answer:
      "A placeholder answer. Run the command under the skill and choose which agents should have it.",
  },
  {
    question: "Which agents does it work with?",
    answer:
      "A placeholder answer. Any agent that reads skills, including the ones you already use.",
  },
  {
    question: "How do I use it?",
    answer:
      "A placeholder answer. Type the command, then the task you want done.",
  },
  {
    question: "How do I get updates?",
    answer:
      "A placeholder answer. Run the update command for the skills you have installed.",
  },
] as const;

export default function SkillsPage() {
  return (
    <SiteFrame>
      <div data-fade="0.06" data-fade-kind="body" className="return-bar">
        <ReturnLink />
      </div>
      <header data-fade="0.14" data-fade-kind="body" className="mt-8">
        <h1 className="lm-name">Skills</h1>
        {/* <p className="mt-1 text-pretty lm-dim">What I’ve taught my agents.</p> */}
        <p className="mt-1 text-pretty lm-dim">
          Skills are on the way. The agents are still taking notes.
        </p>
      </header>
      {/* <section data-fade="0.22" data-fade-kind="body" className="mt-8">
        <h2 className="lm-name">/sample-skill</h2>
        <p className="mt-1 text-pretty lm-dim">
          Placeholder for a skill an agent can run. The real command and
          description replace this.
        </p>
        <SkillInstall command="npx skills add example/sample-skill" />
      </section>
      <div data-fade="0.30" data-fade-kind="body">
        <SkillFaq items={FAQ} />
      </div> */}
    </SiteFrame>
  );
}
