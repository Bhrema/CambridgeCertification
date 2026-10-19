import type { AttemptRecord } from "@/lib/types";

const STORAGE_KEY = "cambridge-writing-history-v1";
const MAX_ATTEMPTS = 50;

export function loadHistory(): AttemptRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AttemptRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(attempts: AttemptRecord[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(attempts.slice(0, MAX_ATTEMPTS)),
  );
}

export function upsertAttempt(attempt: AttemptRecord): AttemptRecord[] {
  const current = loadHistory().filter((a) => a.id !== attempt.id);
  const next = [attempt, ...current].slice(0, MAX_ATTEMPTS);
  saveHistory(next);
  return next;
}

export function deleteAttempt(id: string): AttemptRecord[] {
  const next = loadHistory().filter((a) => a.id !== id);
  saveHistory(next);
  return next;
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
