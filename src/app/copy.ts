/* Homepage words, kept apart from the markup so /lab can swap in a draft
   and compare. The employer names sit between pastLead and pastTail. */

export type Copy = {
  eyebrow: string;
  h1: readonly [string, string];
  lede: string;
  work: readonly { n: string; k: string; v: string }[];
  lanesEyebrow: string;
  lanesH2: string;
  roomEyebrow: string;
  roomH2: string;
  captions: readonly [string, string];
  pastEyebrow: string;
  pastH2: string;
  pastLead: string;
  pastTail: string;
  contactH2: string;
  contactBody: string;
};

/* Built on the Hormozi rules (name the visitor and the result, describe
   their problem, services as what they get, proof under the promise, one
   clear ask), then run through unslop and writing-for-humans. Proof is
   only what's real: the employers, the decade, the workshops. */
export const COPY: Copy = {
  eyebrow: "Software · AI systems · Dubai",
  h1: ["I help businesses", "put AI to work."],
  lede: "Most owners I meet know AI could save their team hours. They don't know where to start, or who to trust with it. I build the systems, connect them to the tools you already use, and train your people to run them.",
  lanesEyebrow: "What I can do for you",
  lanesH2: "Three ways I help.",
  work: [
    {
      n: "01",
      k: "Build it for you",
      v: "Tell me the problem. I build the software, with agents doing most of the coding, and hand over a running system and the keys. You won't need me to keep it alive.",
    },
    {
      n: "02",
      k: "Put AI into the work you already do",
      v: "Quoting, reporting, case handling: the repetitive work your team does every day. I connect AI to the tools you already use, so nobody has to learn a new platform.",
    },
    {
      n: "03",
      k: "Teach your team",
      v: "In-person sessions, from AI 101 for owners to hands-on days where your team builds with the tools themselves. You leave knowing what's worth using and what isn't.",
    },
  ],
  roomEyebrow: "In person",
  roomH2: "What a session looks like.",
  captions: [
    "AI 101 · Dubai business owners & solopreneurs · May 2026",
    "Hands-on agentic working session · Dubai",
  ],
  pastEyebrow: "Before this",
  pastH2: "Ten years building software millions of people use.",
  pastLead: "I worked at ",
  pastTail: " before going independent in Dubai.",
  contactH2: "Tell me what's slowing your team down.",
  contactBody: "A few lines about your business and the problem are enough. I read every message myself and reply to most of them.",
};
