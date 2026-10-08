export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: readonly string[] }
  | {
      type: "parts";
      groups: readonly {
        title: string;
        items: readonly string[];
      }[];
    }
  | {
      type: "flow";
      steps: readonly { kicker: string; text: string }[];
    }
  | {
      type: "table";
      headers: readonly string[];
      rows: readonly (readonly string[])[];
    }
  | {
      type: "limits";
      items: readonly { label: string; value: string; width: number }[];
    }
  | {
      type: "history";
      items: readonly { year: string; text: string }[];
    };

export type Article = {
  slug: string;
  title: string;
  dateTime: string;
  dateShort: string;
  dateLong: string;
  summary: string;
  blocks: readonly ArticleBlock[];
};

export const ARTICLES: readonly Article[] = [
  {
    slug: "what-is-asd-ste100",
    title: "What is ASD-STE100",
    dateTime: "2026-10-03",
    dateShort: "3 Oct",
    dateLong: "3 Oct 2026",
    summary:
      "Notes on ASD-STE100 for AI engineering: how to write prompts, tool steps, and checks a model can follow.",
    blocks: [
      {
        type: "p",
        text: "ASD-STE100 is a controlled-English spec. It was written for maintenance procedures. In an AI system the same failure shows up in the system prompt, the tool description, and the eval: a loose word is a place the model fills in.",
      },
      {
        type: "p",
        text: "Two parts. The writing rules are mandatory. The dictionary has about 1,100 approved words, each with one part of speech and one meaning. “Close” is shut, not near. If the prompt says “context”, the tool says “notes”, and the test says “document”, you are scoring three behaviors.",
      },
      {
        type: "parts",
        groups: [
          {
            title: "Part 1. How to write",
            items: [
              "Which words to use",
              "How to name a thing",
              "How to use action words",
              "How to build a sentence",
              "How to write steps",
              "How to describe something",
              "How to warn someone",
              "Punctuation and length",
              "Habits that keep it clear",
            ],
          },
          {
            title: "Part 2. The word list",
            items: [
              "Words you may use",
              "Words to replace",
              "Names of things, kept as they are",
              "Special action words, kept as they are",
            ],
          },
        ],
      },
      { type: "h2", text: "What to enforce" },
      {
        type: "list",
        items: [
          "One name per object, shared by the prompt, the tool schema, and the eval.",
          "Name the actor. “The model calls search,” not “Search should be performed.”",
          "One action per sentence, so a trace line maps to one step.",
          "Keep “the”, “a”, and “this”. Dropped words become free parameters.",
          "One behavior per paragraph. A multi-step policy is a list, not a clause.",
        ],
      },
      { type: "h2", text: "A prompt, rewritten" },
      {
        type: "flow",
        steps: [
          {
            kicker: "Unusable as a spec",
            text: "It is imperative that the assistant ensures the retrieved context is fully utilized prior to commencing generation.",
          },
          {
            kicker: "A step the model can run",
            text: "Read the retrieved context. Use it in the answer. Then start the answer.",
          },
        ],
      },
      {
        type: "list",
        items: [
          "“ensures” is not an action. “Read” is.",
          "“utilized” becomes “use”.",
          "“prior to” becomes the next step, not a clause.",
          "“commencing generation” becomes “start the answer”.",
          "“Retrieved context” stays. It is the name of the input.",
        ],
      },
      {
        type: "p",
        text: "In the spec, WARNING is injury and CAUTION is damage. In a system prompt, write the hard stop the same way, as an order with the risk named: “Do not add a fact that is not in the retrieved context.” A description of the system is a fact, not an order: “The model reads the retrieved context when a question arrives.” Ten words. The descriptive limit is 25.",
      },
      { type: "h2", text: "Verb forms in a procedure" },
      {
        type: "table",
        headers: ["Way of saying it", "Example", "Allowed?"],
        rows: [
          ["Imperative", "Call search.", "Approved"],
          ["Simple present", "The model calls search.", "Approved"],
          ["Simple past", "The model called search.", "Approved"],
          ["Infinitive", "Open the trace to read the call.", "Approved"],
          ["Past participle as a modifier", "the saved trace", "Approved"],
          ["Progressive", "The model is calling search.", "Not approved"],
          ["Perfect", "The model has called search.", "Not approved"],
          ["Passive in a step", "Search must be called.", "Not approved"],
        ],
      },
      {
        type: "p",
        text: "An -ing form is allowed inside a name, as in “landing gear”. It is not a step. Passive hides the actor, so you cannot tell the model from the tool from the user.",
      },
      { type: "h2", text: "Words to swap" },
      {
        type: "p",
        text: "Approved words are uppercase in the dictionary. Unapproved words are lowercase, with the replacement beside them. These are the ones that show up in prompts and then fail a check.",
      },
      {
        type: "table",
        headers: ["Instead of", "Write", "Do not write"],
        rows: [
          ["close, meaning near", "Put the check NEAR the answer.", "Put the check close to the answer."],
          ["commence", "START the answer.", "Commence generation."],
          ["ensure", "MAKE SURE the context is loaded.", "Ensure the context is loaded."],
          ["prior to", "BEFORE you call the tool.", "Prior to calling the tool."],
          ["utilize", "USE the retrieved context.", "Utilize the retrieved context."],
        ],
      },
      { type: "h2", text: "How long it can be" },
      {
        type: "limits",
        items: [
          { label: "A procedure step", value: "20 words", width: 80 },
          { label: "A system description", value: "25 words", width: 100 },
          { label: "A behavior paragraph", value: "6 sentences", width: 48 },
          { label: "A noun cluster", value: "3 words", width: 28 },
          { label: "Actions in one sentence", value: "1", width: 12 },
        ],
      },
      {
        type: "p",
        text: "Two actions share a sentence only when they happen together. “Read the retrieved context. Then call search.” is two steps. An eval should be able to fail one of them.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}
