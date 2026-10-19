import type { Annotation } from "@/lib/types";

export interface TextSegment {
  text: string;
  annotationIndex: number | null;
}

/** Split essay into segments marked by the first matching annotation quote. */
export function buildHighlightedSegments(
  essay: string,
  annotations: Annotation[],
): TextSegment[] {
  type Mark = { start: number; end: number; index: number };
  const marks: Mark[] = [];

  annotations.forEach((ann, index) => {
    if (!ann.quote) return;
    const start = essay.indexOf(ann.quote);
    if (start < 0) return;
    const end = start + ann.quote.length;
    const overlaps = marks.some((m) => !(end <= m.start || start >= m.end));
    if (overlaps) return;
    marks.push({ start, end, index });
  });

  marks.sort((a, b) => a.start - b.start);

  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const mark of marks) {
    if (mark.start > cursor) {
      segments.push({
        text: essay.slice(cursor, mark.start),
        annotationIndex: null,
      });
    }
    segments.push({
      text: essay.slice(mark.start, mark.end),
      annotationIndex: mark.index,
    });
    cursor = mark.end;
  }
  if (cursor < essay.length) {
    segments.push({ text: essay.slice(cursor), annotationIndex: null });
  }
  if (segments.length === 0) {
    segments.push({ text: essay, annotationIndex: null });
  }
  return segments;
}

export function severityClass(severity: Annotation["severity"]): string {
  switch (severity) {
    case "error":
      return "bg-rose-200/80 underline decoration-rose-600 decoration-2";
    case "strength":
      return "bg-emerald-200/70 underline decoration-emerald-700 decoration-2";
    default:
      return "bg-amber-200/70 underline decoration-amber-700 decoration-2";
  }
}
