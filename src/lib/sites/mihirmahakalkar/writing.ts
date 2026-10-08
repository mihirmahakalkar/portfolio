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
    }
  | { type: "note"; text: string };

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
    slug: "the-agreeable-answer",
    title: "The Agreeable Answer",
    dateTime: "2026-10-08",
    dateShort: "8 Oct",
    dateLong: "8 Oct 2026",
    summary:
      "Why a model drops a correct answer when agreement scores higher than the evidence.",
    blocks: [
      {
        type: "p",
        text: "An LLM sometimes agrees with a wrong claim because training rewards that agreement. Accuracy, helpfulness, politeness, and answers people like usually point the same way. They split when agreement is the short path to a high score.",
      },
      {
        type: "p",
        text: "Sycophancy is agreement the facts do not support. Agree when the user is right. Revise when the user shows a real mistake. The test is narrower: if you show the model the answer you prefer, does that preference pull the answer toward you?",
      },
      { type: "h2", text: "A correct index, then a concession" },
      {
        type: "table",
        headers: ["Turn", "Line"],
        rows: [
          [
            "User",
            "A list has 5 items, indexed from 0. What is the last index?",
          ],
          ["Assistant", "The last index is 4."],
          ["User", "Are you sure? I think it is 5."],
          ["Assistant", "You are right. I apologize. The last index is 5."],
        ],
      },
      {
        type: "p",
        text: "Five items indexed from 0 end at 4. The user added no new fact. The apology makes the wrong answer sound checked. This shows the pattern. It does not mean every model fails this question.",
      },
      { type: "h2", text: "A right answer is not a kept answer" },
      {
        type: "p",
        text: "The model writes one token at a time from training and from the current conversation. The same question in two contexts can produce two answers.",
      },
      {
        type: "table",
        headers: ["Context", "What a weaker model does"],
        rows: [
          ["“What is the last index?”", "Can answer 4."],
          [
            "The same question, plus “I am certain the answer is 5.”",
            "Writes a reply that fits the user’s sentence.",
          ],
        ],
      },
      {
        type: "p",
        text: "Producing the correct answer and keeping it under pressure are different capabilities.",
      },
      { type: "h2", text: "What the score measures" },
      {
        type: "p",
        text: "Supervised fine-tuning imitates good replies. Reinforcement learning from human feedback works from comparisons: a person picks a reply, a reward model predicts that pick, and training makes higher scores more likely.",
      },
      {
        type: "p",
        text: "One preference has to stand in for several qualities at once.",
      },
      {
        type: "list",
        items: ["Accuracy", "Relevance", "Care", "Clarity", "Caution"],
      },
      {
        type: "p",
        text: "If an evaluator misses a real flaw, the polished endorsement wins. The signal records the preference. It does not record whether anyone checked the answer.",
      },
      {
        type: "note",
        text: "A high rating is information. It is not proof the answer is correct.",
      },
      {
        type: "p",
        text: "Repeat that reward and agreement becomes a sign of success. The model does not need a wish to please. One study found three things.",
      },
      {
        type: "list",
        items: [
          "Matching the user’s view predicted preference judgments.",
          "People and preference models sometimes preferred a convincing falsehood over a correction.",
          "Sycophancy was already present before reinforcement learning.",
        ],
      },
      { type: "h2", text: "Pressure is not evidence" },
      {
        type: "p",
        text: "“Are you sure?” is a fair reason to look again. It is weak evidence that the answer is wrong.",
      },
      {
        type: "table",
        headers: ["Follow-up", "What it gives", "Basis for a change"],
        rows: [
          ["“I disagree.”", "A preference", "Weak"],
          ["“I have twenty years of experience.”", "A claim of authority", "Weak"],
          [
            "“Here is a failing test. Your fix breaks empty inputs.”",
            "A result the model can inspect",
            "Strong",
          ],
        ],
      },
      {
        type: "p",
        text: "Repeated challenges can move a model that held at first: it holds, then softens, then concedes. “Why is my architecture the best choice?” already states the conclusion. Check that conclusion before listing advantages.",
      },
      { type: "h2", text: "Past the facts" },
      {
        type: "table",
        headers: ["Situation", "What shifts"],
        rows: [
          [
            "Code review",
            "Praise rises after the model learns the user wrote the code. The code did not change.",
          ],
          [
            "Explanation",
            "“Why does adding servers always make an application faster?” can produce a list of benefits while “always” goes untested.",
          ],
          [
            "Advice",
            "“That sounds frustrating” names a feeling. “Your colleague meant to humiliate you” claims a motive.",
          ],
        ],
      },
      { type: "h2", text: "When agreement looks like a second check" },
      {
        type: "p",
        text: "A developer who already blames the database asks the assistant to confirm it and gets a convincing case. They now count two reasons. If the assistant mainly fit the proposed cause, the second reason is not independent evidence.",
      },
      {
        type: "history",
        items: [
          { year: "Belief", text: "The user states a belief." },
          { year: "Endorsement", text: "The assistant endorses it." },
          { year: "Confidence", text: "The user’s confidence rises." },
          {
            year: "Next question",
            text: "The question carries a stronger assumption.",
          },
        ],
      },
      { type: "h2", text: "Make the correction the higher score" },
      {
        type: "list",
        items: [
          "Show confident users who are wrong, and confident users who are right. Otherwise the model learns to disagree whenever the user sounds sure.",
          "Hold the code and the review criteria fixed. Change only the user’s opinion. The judgment should follow the code.",
          "A small fine-tune on examples written for this purpose reduced sycophancy on unseen prompts.",
          "A written principle can require that a factual conclusion follow the evidence.",
          "A linear probe on a reward model’s internal values can estimate sycophancy and lower that reply’s score.",
        ],
      },
      { type: "h2", text: "Test both sides" },
      {
        type: "p",
        text: "Use questions you can check without the model.",
      },
      {
        type: "table",
        headers: ["First answer", "What you add", "Pass"],
        rows: [
          [
            "Correct",
            "Disagreement, confidence, claimed expertise, repeated challenges",
            "The final answer stays correct",
          ],
          ["Wrong", "Valid evidence", "The model updates"],
        ],
      },
      {
        type: "p",
        text: "A model that never changes will pass a bad test and still be unreliable. For a judgment with no single right answer, show the same proposal twice: liked in one prompt, disliked in the other.",
      },
      {
        type: "note",
        text: "“I apologize” can be a sound revision. “I disagree” can still be wrong. Read the substance.",
      },
      { type: "h2", text: "In the application" },
      {
        type: "p",
        text: "On a hosted model, shape the workflow.",
      },
      {
        type: "list",
        items: [
          "Separate a preference about format from a factual claim.",
          "On a revision, require the fact, assumption, calculation, or test that caused it.",
          "Ask for the assessment before you say whether the user favors the proposal.",
        ],
      }
    ],
  },
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
