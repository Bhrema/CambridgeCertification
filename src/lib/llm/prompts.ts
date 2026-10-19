import type { ExamLevel } from "@/lib/types";
import { LEVEL_WORD_TARGETS } from "@/lib/types";

export function topicGenerationSystem(level: ExamLevel, mode: "bank" | "current"): string {
  const shape =
    level === "C1"
      ? `C1 Advanced Writing Part 1 format:
- A short context sentence (class watched a documentary / attended a lecture / etc.)
- A "Notes" list with exactly 4 bullet points
- Instructions: discuss TWO of the notes, say which is more significant / should be prioritised, give reasons
- Mention they may use opinions from the input but should use their own words
Target length of the full prompt: similar to real Cambridge papers.`
      : `C2 Proficiency Writing Part 1 format:
- Instruction: summarise and evaluate key points from both texts; use own words; include own ideas
- Exactly two short contrasting texts (Text 1 / Text 2), each 60–90 words
Target length similar to real Cambridge papers.`;

  const freshness =
    mode === "current"
      ? "Invent a timely, contemporary theme that feels current (technology, society, environment, work, culture). Do NOT claim real news sources; invent plausible thematic framing only."
      : "Create a classic exam-style theme suitable for a practice bank (timeless social / academic topics).";

  return `You are an expert Cambridge English exam writer.
Create ONE original ${level} Writing Part 1 essay prompt.
${freshness}
${shape}

Return JSON only:
{
  "title": "short English title",
  "prompt": "full exam prompt text with line breaks as \\n",
  "notes": "optional examiner tip in English"
}`;
}

export function topicGenerationUser(level: ExamLevel, hint?: string): string {
  return [
    `Level: ${level}`,
    hint ? `User hint / theme preference: ${hint}` : "No specific hint — choose a strong topic.",
  ].join("\n");
}

export function correctionSystem(level: ExamLevel): string {
  const words = LEVEL_WORD_TARGETS[level];
  return `You are a strict but constructive Cambridge ${level} Writing examiner for Part 1 essays.
Score using the four subscales 0–5 (halves allowed, e.g. 3.5): Content, Communicative Achievement, Organisation, Language.
Overall = arithmetic mean of the four subscales, one decimal.
Word target for ${level}: ${words.min}–${words.max} words.

Rules:
- Feedback core (summaryEn, criterionComments, annotation messageEn, modelAnswer) MUST be in English.
- Also provide summaryPt, each annotation messagePt, and explanationsPt in Brazilian Portuguese for learner support.
- annotations: quote MUST be an exact contiguous substring copied from the candidate essay (or empty array if none). Prefer 4–10 high-value annotations.
- modelAnswer: a full band-5 style essay responding to the SAME prompt (${words.min}–${words.max} words).
- Be honest: do not inflate scores. This is practice, not an official certificate.

Return JSON only:
{
  "bands": {
    "content": number,
    "communicativeAchievement": number,
    "organisation": number,
    "language": number
  },
  "overall": number,
  "summaryEn": string,
  "summaryPt": string,
  "criterionComments": {
    "content": string,
    "communicativeAchievement": string,
    "organisation": string,
    "language": string
  },
  "annotations": [
    {
      "quote": string,
      "category": "grammar" | "vocabulary" | "style" | "task" | "organisation" | "strength",
      "severity": "error" | "suggestion" | "strength",
      "messageEn": string,
      "messagePt": string
    }
  ],
  "modelAnswer": string,
  "explanationsPt": string
}`;
}

export function correctionUser(input: {
  level: ExamLevel;
  prompt: string;
  essay: string;
  wordCount: number;
}): string {
  return [
    `Level: ${input.level}`,
    `Word count (candidate): ${input.wordCount}`,
    "",
    "EXAM PROMPT:",
    input.prompt,
    "",
    "CANDIDATE ESSAY:",
    input.essay,
  ].join("\n");
}
