import Link from "next/link";
import { ContactProse } from "@/components/sites/mihirmahakalkar/contact-prose";
import { SiteFrame } from "@/components/sites/mihirmahakalkar/site-frame";

const SECTIONS = {
  projects: "/projects",
  lab: "/lab",
  writing: "/writing",
  skills: "/skills",
};

export default function Home() {
  return (
    <SiteFrame narrow>
      <h1 data-fade="0.06" data-fade-kind="body" className="lm-name">
        Hi, I’m{" "}
        <span className="home-me" tabIndex={0}>
          <span className="home-nm">Mihir</span>.
          <span className="home-face" aria-hidden="true">
            👨
          </span>
        </span>
      </h1>
      <p
        data-fade="0.14"
        data-fade-kind="body"
        className="mt-6 text-pretty lm-dim"
      >
        I like building software that has to live in someone else’s workflow:
        the product, the model inside it, and the details that decide whether a
        team can rely on it.
      </p>
      <p
        data-fade="0.22"
        data-fade-kind="body"
        className="mt-6 text-pretty lm-dim"
      >
        What I’ve finished is in{" "}
        <Link className="home-w" href={SECTIONS.projects}>
          projects
        </Link>
        . What I’m still figuring out goes to the{" "}
        <Link className="home-w" href={SECTIONS.lab}>
          lab
        </Link>
        . Some thoughts along the way are in{" "}
        <Link className="home-w" href={SECTIONS.writing}>
          writing
        </Link>
        , and what I’ve taught my agents is in{" "}
        <Link className="home-w" href={SECTIONS.skills}>
          skills
        </Link>
        .
      </p>
      <p
        data-fade="0.30"
        data-fade-kind="body"
        className="mt-6 text-pretty lm-dim"
      >
        <ContactProse />
      </p>
    </SiteFrame>
  );
}
