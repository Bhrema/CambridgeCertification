"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CorrectionPanel } from "@/components/CorrectionPanel";
import {
  clearHistory,
  deleteAttempt,
  loadHistory,
  upsertAttempt,
} from "@/lib/storage/history";
import { pickRandomSeedTopic } from "@/lib/themes/seed";
import type {
  AttemptRecord,
  CorrectionResult,
  ExamLevel,
  PracticeMode,
  WritingTopic,
} from "@/lib/types";
import { LEVEL_WORD_TARGETS } from "@/lib/types";
import { countWords } from "@/lib/words";

type Step = "setup" | "write" | "result";

export function WritingApp() {
  const [level, setLevel] = useState<ExamLevel>("C1");
  const [mode, setMode] = useState<PracticeMode>("practice");
  const [step, setStep] = useState<Step>("setup");
  const [topic, setTopic] = useState<WritingTopic | null>(null);
  const [seedTopics, setSeedTopics] = useState<WritingTopic[]>([]);
  const [essay, setEssay] = useState("");
  const [hint, setHint] = useState("");
  const [correction, setCorrection] = useState<CorrectionResult | null>(null);
  const [history, setHistory] = useState<AttemptRecord[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPt, setShowPt] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);

  const targets = LEVEL_WORD_TARGETS[level];
  const wordCount = useMemo(() => countWords(essay), [essay]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/themes?level=${level}`);
        const data = (await res.json()) as { topics?: WritingTopic[] };
        if (!cancelled) setSeedTopics(data.topics ?? []);
      } catch {
        if (!cancelled) setSeedTopics([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [level]);

  useEffect(() => {
    if (step !== "write" || mode !== "exam" || secondsLeft === null) return;
    if (secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s === null ? s : Math.max(0, s - 1)));
    }, 1000);
    return () => window.clearInterval(id);
  }, [step, mode, secondsLeft]);

  const startWithTopic = useCallback(
    (nextTopic: WritingTopic) => {
      const id = crypto.randomUUID();
      setAttemptId(id);
      setTopic(nextTopic);
      setEssay("");
      setCorrection(null);
      setError(null);
      setStep("write");
      setSecondsLeft(
        mode === "exam" ? LEVEL_WORD_TARGETS[nextTopic.level].timerMinutes * 60 : null,
      );
    },
    [mode],
  );

  async function handleRandomSeed() {
    const local = pickRandomSeedTopic(level);
    startWithTopic(local);
  }

  async function handleGenerate(genMode: "bank" | "current") {
    setLoading(genMode === "current" ? "current" : "generate");
    setError(null);
    try {
      const res = await fetch("/api/generate-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level,
          mode: genMode,
          hint: hint.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { topic?: WritingTopic; error?: string };
      if (!res.ok || !data.topic) {
        throw new Error(data.error ?? "Não foi possível gerar o tema.");
      }
      startWithTopic(data.topic);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao gerar tema.");
    } finally {
      setLoading(null);
    }
  }

  async function handleCorrect() {
    if (!topic || !attemptId) return;
    setLoading("correct");
    setError(null);
    try {
      const res = await fetch("/api/correct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: topic.level,
          prompt: topic.prompt,
          essay,
        }),
      });
      const data = (await res.json()) as {
        correction?: CorrectionResult;
        error?: string;
      };
      if (!res.ok || !data.correction) {
        throw new Error(data.error ?? "Não foi possível corrigir.");
      }
      setCorrection(data.correction);
      setStep("result");
      const record: AttemptRecord = {
        id: attemptId,
        createdAt: new Date().toISOString(),
        level: topic.level,
        mode,
        topic,
        essay,
        wordCount,
        correction: data.correction,
      };
      setHistory(upsertAttempt(record));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro na correção.");
    } finally {
      setLoading(null);
    }
  }

  function handleSaveDraft() {
    if (!topic || !attemptId) return;
    const record: AttemptRecord = {
      id: attemptId,
      createdAt: new Date().toISOString(),
      level: topic.level,
      mode,
      topic,
      essay,
      wordCount,
      correction: null,
    };
    setHistory(upsertAttempt(record));
  }

  function restoreAttempt(record: AttemptRecord) {
    setAttemptId(record.id);
    setLevel(record.level);
    setMode(record.mode);
    setTopic(record.topic);
    setEssay(record.essay);
    setCorrection(record.correction);
    setSecondsLeft(null);
    setStep(record.correction ? "result" : "write");
    setError(null);
  }

  const timerLabel =
    secondsLeft === null
      ? null
      : `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(
          secondsLeft % 60,
        ).padStart(2, "0")}`;

  const wordStatus =
    wordCount < targets.min
      ? "abaixo"
      : wordCount > targets.max
        ? "acima"
        : "ok";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-4 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Cambridge Writing Lab
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
            Part 1 · Essay trainer
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
            Gere um tema no formato do exame, escreva em modo prática ou prova, e
            receba bands, anotações e um model answer. Histórico fica só neste
            navegador.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["C1", "C2"] as ExamLevel[]).map((l) => (
            <button
              key={l}
              type="button"
              disabled={step === "write"}
              onClick={() => setLevel(l)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                level === l
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)]"
              } disabled:opacity-50`}
            >
              {l === "C1" ? "C1 Advanced" : "C2 Proficiency"}
            </button>
          ))}
        </div>
      </header>

      {error ? (
        <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      ) : null}

      {step === "setup" ? (
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
              Novo exercício
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Alvo {targets.min}–{targets.max} palavras · timer de exame{" "}
              {targets.timerMinutes} min
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {(["practice", "exam"] as PracticeMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-full px-4 py-2 text-sm ${
                    mode === m
                      ? "bg-[var(--ink)] text-white"
                      : "border border-[var(--line)] text-[var(--muted)]"
                  }`}
                >
                  {m === "practice" ? "Practice mode" : "Exam mode"}
                </button>
              ))}
            </div>

            <label className="mt-5 block text-sm text-[var(--muted)]">
              Dica opcional para geração
              <input
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="ex.: climate policy, urban loneliness…"
                className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-[var(--ink)] outline-none focus:border-[var(--accent)]"
              />
            </label>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleRandomSeed}
                className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Tema aleatório do banco
              </button>
              <button
                type="button"
                disabled={loading !== null}
                onClick={() => handleGenerate("bank")}
                className="rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-50"
              >
                {loading === "generate" ? "Gerando…" : "Gerar tema (IA)"}
              </button>
              <button
                type="button"
                disabled={loading !== null}
                onClick={() => handleGenerate("current")}
                className="rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-50"
              >
                {loading === "current" ? "Gerando…" : "Tema atual (IA)"}
              </button>
            </div>

            {seedTopics.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Banco {level} ({seedTopics.length})
                </h3>
                <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
                  {seedTopics.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => startWithTopic(t)}
                        className="w-full rounded-xl border border-transparent bg-[var(--bg)] px-3 py-2 text-left text-sm text-[var(--ink)] transition hover:border-[var(--accent)]"
                      >
                        {t.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <HistorySidebar
            history={history}
            onRestore={restoreAttempt}
            onDelete={(id) => setHistory(deleteAttempt(id))}
            onClear={() => {
              clearHistory();
              setHistory([]);
            }}
          />
        </section>
      ) : null}

      {step === "write" && topic ? (
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  {topic.level} · {topic.source} ·{" "}
                  {mode === "exam" ? "Exam" : "Practice"}
                </p>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
                  {topic.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep("setup");
                  setTopic(null);
                  setEssay("");
                  setCorrection(null);
                  setSecondsLeft(null);
                }}
                className="text-sm text-[var(--muted)] hover:text-[var(--accent)]"
              >
                ← Voltar
              </button>
            </div>

            <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-[var(--bg)] p-4 font-sans text-sm leading-6 text-[var(--ink)]">
              {topic.prompt}
            </pre>

            {mode === "practice" ? (
              <p className="mt-3 text-sm text-[var(--muted)]">
                Dica: planeje 2 pontos das notes (C1) ou sintetize os dois textos
                (C2) antes de escrever. Em Exam mode essas dicas somem.
              </p>
            ) : null}

            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              rows={16}
              placeholder="Write your essay in English…"
              className="mt-4 w-full resize-y rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-[15px] leading-7 text-[var(--ink)] outline-none focus:border-[var(--accent)]"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[var(--muted)]">
                Palavras:{" "}
                <span
                  className={
                    wordStatus === "ok"
                      ? "font-semibold text-emerald-700"
                      : "font-semibold text-amber-700"
                  }
                >
                  {wordCount}
                </span>{" "}
                (alvo {targets.min}–{targets.max})
                {timerLabel ? (
                  <span className="ml-3">
                    Timer:{" "}
                    <span
                      className={
                        secondsLeft !== null && secondsLeft < 60
                          ? "font-semibold text-rose-600"
                          : "font-semibold text-[var(--ink)]"
                      }
                    >
                      {timerLabel}
                    </span>
                  </span>
                ) : null}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink)]"
                >
                  Salvar rascunho
                </button>
                <button
                  type="button"
                  disabled={loading === "correct" || essay.trim().length < 80}
                  onClick={handleCorrect}
                  className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {loading === "correct" ? "Corrigindo…" : "Corrigir com IA"}
                </button>
              </div>
            </div>
          </div>

          <HistorySidebar
            history={history}
            onRestore={restoreAttempt}
            onDelete={(id) => setHistory(deleteAttempt(id))}
            onClear={() => {
              clearHistory();
              setHistory([]);
            }}
          />
        </section>
      ) : null}

      {step === "result" && topic && correction ? (
        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                {topic.level} · {topic.title}
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
                Correção
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setStep("write")}
                className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm"
              >
                Editar texto
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("setup");
                  setTopic(null);
                  setEssay("");
                  setCorrection(null);
                }}
                className="rounded-xl bg-[var(--ink)] px-4 py-2 text-sm text-white"
              >
                Novo exercício
              </button>
            </div>
          </div>
          <CorrectionPanel
            essay={essay}
            correction={correction}
            showPt={showPt}
            onTogglePt={() => setShowPt((v) => !v)}
          />
        </section>
      ) : null}
    </div>
  );
}

function HistorySidebar({
  history,
  onRestore,
  onDelete,
  onClear,
}: {
  history: AttemptRecord[];
  onRestore: (a: AttemptRecord) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}) {
  return (
    <aside className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Histórico
        </h2>
        {history.length > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-[var(--muted)] hover:text-rose-600"
          >
            Limpar
          </button>
        ) : null}
      </div>
      {history.length === 0 ? (
        <p className="mt-3 text-sm text-[var(--muted)]">
          Suas tentativas aparecem aqui (localStorage).
        </p>
      ) : (
        <ul className="mt-3 max-h-[28rem] space-y-2 overflow-y-auto">
          {history.map((item) => (
            <li
              key={item.id}
              className="rounded-xl bg-[var(--bg)] p-3 text-sm"
            >
              <button
                type="button"
                onClick={() => onRestore(item)}
                className="w-full text-left"
              >
                <p className="font-medium text-[var(--ink)]">{item.topic.title}</p>
                <p className="text-xs text-[var(--muted)]">
                  {item.level} · {new Date(item.createdAt).toLocaleString()} ·{" "}
                  {item.correction
                    ? `overall ${item.correction.overall.toFixed(1)}`
                    : "rascunho"}
                </p>
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="mt-1 text-xs text-rose-600 hover:underline"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
