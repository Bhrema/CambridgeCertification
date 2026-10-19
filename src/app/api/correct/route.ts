import { NextResponse } from "next/server";
import { completeJson, parseJsonObject } from "@/lib/llm/client";
import { correctionSystem, correctionUser } from "@/lib/llm/prompts";
import { countWords } from "@/lib/words";
import type {
  Annotation,
  BandScores,
  CorrectionResult,
  ExamLevel,
} from "@/lib/types";

interface CorrectBody {
  level?: ExamLevel;
  prompt?: string;
  essay?: string;
}

function clampBand(n: unknown): number {
  const value = typeof n === "number" ? n : Number(n);
  if (Number.isNaN(value)) return 0;
  return Math.min(5, Math.max(0, Math.round(value * 2) / 2));
}

function normaliseBands(raw: Partial<BandScores> | undefined): BandScores {
  return {
    content: clampBand(raw?.content),
    communicativeAchievement: clampBand(raw?.communicativeAchievement),
    organisation: clampBand(raw?.organisation),
    language: clampBand(raw?.language),
  };
}

function normaliseAnnotations(raw: unknown, essay: string): Annotation[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const a = item as Partial<Annotation>;
      const quote = typeof a.quote === "string" ? a.quote : "";
      if (!quote || !essay.includes(quote)) return null;
      return {
        quote,
        category: a.category ?? "style",
        severity: a.severity ?? "suggestion",
        messageEn: a.messageEn ?? "",
        messagePt: a.messagePt ?? "",
      } satisfies Annotation;
    })
    .filter((a): a is Annotation => a !== null)
    .slice(0, 12);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CorrectBody;
    const level = body.level;
    const prompt = body.prompt?.trim() ?? "";
    const essay = body.essay?.trim() ?? "";

    if (level !== "C1" && level !== "C2") {
      return NextResponse.json(
        { error: "Campo level deve ser C1 ou C2." },
        { status: 400 },
      );
    }
    if (!prompt || !essay) {
      return NextResponse.json(
        { error: "Prompt e essay são obrigatórios." },
        { status: 400 },
      );
    }
    if (essay.length < 80) {
      return NextResponse.json(
        { error: "Essay muito curto para correção útil." },
        { status: 400 },
      );
    }

    const wordCount = countWords(essay);
    const raw = await completeJson(
      correctionSystem(level),
      correctionUser({ level, prompt, essay, wordCount }),
    );
    const parsed = parseJsonObject<Partial<CorrectionResult>>(raw);
    const bands = normaliseBands(parsed.bands);
    const overall =
      Math.round(
        ((bands.content +
          bands.communicativeAchievement +
          bands.organisation +
          bands.language) /
          4) *
          10,
      ) / 10;

    const correction: CorrectionResult = {
      bands,
      overall,
      summaryEn: parsed.summaryEn ?? "",
      summaryPt: parsed.summaryPt ?? "",
      criterionComments: {
        content: parsed.criterionComments?.content ?? "",
        communicativeAchievement:
          parsed.criterionComments?.communicativeAchievement ?? "",
        organisation: parsed.criterionComments?.organisation ?? "",
        language: parsed.criterionComments?.language ?? "",
      },
      annotations: normaliseAnnotations(parsed.annotations, essay),
      modelAnswer: parsed.modelAnswer ?? "",
      explanationsPt: parsed.explanationsPt ?? "",
    };

    return NextResponse.json({ correction, wordCount });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao corrigir texto.";
    const status = message.includes("não configurada") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
