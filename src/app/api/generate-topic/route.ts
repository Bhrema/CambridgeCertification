import { NextResponse } from "next/server";
import { completeJson, parseJsonObject } from "@/lib/llm/client";
import {
  topicGenerationSystem,
  topicGenerationUser,
} from "@/lib/llm/prompts";
import type { ExamLevel, TopicSource, WritingTopic } from "@/lib/types";

interface GenerateBody {
  level?: ExamLevel;
  mode?: "bank" | "current";
  hint?: string;
}

interface GeneratedPayload {
  title?: string;
  prompt?: string;
  notes?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateBody;
    const level = body.level;
    const mode = body.mode ?? "bank";

    if (level !== "C1" && level !== "C2") {
      return NextResponse.json(
        { error: "Campo level deve ser C1 ou C2." },
        { status: 400 },
      );
    }

    if (mode !== "bank" && mode !== "current") {
      return NextResponse.json(
        { error: 'Campo mode deve ser "bank" ou "current".' },
        { status: 400 },
      );
    }

    const raw = await completeJson(
      topicGenerationSystem(level, mode),
      topicGenerationUser(level, body.hint),
    );
    const parsed = parseJsonObject<GeneratedPayload>(raw);

    if (!parsed.title?.trim() || !parsed.prompt?.trim()) {
      return NextResponse.json(
        { error: "Modelo não retornou título/prompt válidos." },
        { status: 502 },
      );
    }

    const source: TopicSource = mode === "current" ? "current" : "generated";
    const topic: WritingTopic = {
      id: `${source}-${level}-${Date.now()}`,
      level,
      title: parsed.title.trim(),
      prompt: parsed.prompt.replace(/\\n/g, "\n").trim(),
      notes: parsed.notes?.trim(),
      source,
    };

    return NextResponse.json({ topic });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao gerar tema.";
    const status = message.includes("não configurada") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
