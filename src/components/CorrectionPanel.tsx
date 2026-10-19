"use client";

import { buildHighlightedSegments, severityClass } from "@/lib/highlight";
import type { Annotation, CorrectionResult } from "@/lib/types";

interface CorrectionPanelProps {
  essay: string;
  correction: CorrectionResult;
  showPt: boolean;
  onTogglePt: () => void;
}

const BAND_LABELS: Array<{ key: keyof CorrectionResult["bands"]; label: string }> = [
  { key: "content", label: "Content" },
  { key: "communicativeAchievement", label: "Communicative Achievement" },
  { key: "organisation", label: "Organisation" },
  { key: "language", label: "Language" },
];

export function CorrectionPanel({
  essay,
  correction,
  showPt,
  onTogglePt,
}: CorrectionPanelProps) {
  const segments = buildHighlightedSegments(essay, correction.annotations);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
            Seu texto anotado
          </h2>
          <button
            type="button"
            onClick={onTogglePt}
            className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {showPt ? "Explicações: PT" : "Explicações: EN"}
          </button>
        </div>
        <p className="whitespace-pre-wrap text-[15px] leading-7 text-[var(--ink)]">
          {segments.map((seg, i) =>
            seg.annotationIndex === null ? (
              <span key={i}>{seg.text}</span>
            ) : (
              <mark
                key={i}
                id={`ann-${seg.annotationIndex}`}
                className={`rounded-sm px-0.5 ${severityClass(
                  correction.annotations[seg.annotationIndex]!.severity,
                )}`}
              >
                {seg.text}
              </mark>
            ),
          )}
        </p>

        <div className="mt-8 border-t border-[var(--line)] pt-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Model answer
          </h3>
          <p className="whitespace-pre-wrap text-[15px] leading-7 text-[var(--ink)]">
            {correction.modelAnswer}
          </p>
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
          <p className="text-sm text-[var(--muted)]">Overall (prática)</p>
          <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--accent)]">
            {correction.overall.toFixed(1)}
            <span className="text-lg text-[var(--muted)]"> / 5</span>
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--ink)]">
            {showPt ? correction.summaryPt : correction.summaryEn}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {BAND_LABELS.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-xl bg-[var(--bg)] px-3 py-2"
              >
                <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">
                  {label}
                </p>
                <p className="text-lg font-semibold text-[var(--ink)]">
                  {correction.bands[key].toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Critérios
          </h3>
          <ul className="space-y-3 text-sm leading-6 text-[var(--ink)]">
            {BAND_LABELS.map(({ key, label }) => (
              <li key={key}>
                <span className="font-medium">{label}: </span>
                {correction.criterionComments[key]}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Anotações
          </h3>
          {correction.annotations.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              Nenhuma anotação localizada no texto.
            </p>
          ) : (
            <ul className="space-y-3">
              {correction.annotations.map((ann, index) => (
                <AnnotationItem
                  key={`${ann.quote}-${index}`}
                  index={index}
                  annotation={ann}
                  showPt={showPt}
                />
              ))}
            </ul>
          )}
        </div>

        {showPt && correction.explanationsPt ? (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Explicações (PT)
            </h3>
            <p className="whitespace-pre-wrap text-sm leading-6 text-[var(--ink)]">
              {correction.explanationsPt}
            </p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function AnnotationItem({
  index,
  annotation,
  showPt,
}: {
  index: number;
  annotation: Annotation;
  showPt: boolean;
}) {
  return (
    <li className="rounded-xl bg-[var(--bg)] p-3 text-sm">
      <a
        href={`#ann-${index}`}
        className="font-medium text-[var(--accent)] hover:underline"
      >
        “{annotation.quote.slice(0, 80)}
        {annotation.quote.length > 80 ? "…" : ""}”
      </a>
      <p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--muted)]">
        {annotation.category} · {annotation.severity}
      </p>
      <p className="mt-1 leading-6 text-[var(--ink)]">
        {showPt ? annotation.messagePt : annotation.messageEn}
      </p>
    </li>
  );
}
