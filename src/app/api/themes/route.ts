import { NextResponse } from "next/server";
import { getSeedTopicsByLevel } from "@/lib/themes/seed";
import type { ExamLevel } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level") as ExamLevel | null;

  if (level !== "C1" && level !== "C2") {
    return NextResponse.json(
      { error: "Query ?level=C1|C2 é obrigatória." },
      { status: 400 },
    );
  }

  return NextResponse.json({ topics: getSeedTopicsByLevel(level) });
}
