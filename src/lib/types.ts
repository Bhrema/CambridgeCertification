export type ExamLevel = "C1" | "C2";

export type PracticeMode = "practice" | "exam";

export type TopicSource = "seed" | "generated" | "current";

export type AnnotationCategory =
  | "grammar"
  | "vocabulary"
  | "style"
  | "task"
  | "organisation"
  | "strength";

export type AnnotationSeverity = "error" | "suggestion" | "strength";

export interface WritingTopic {
  id: string;
  level: ExamLevel;
  title: string;
  prompt: string;
  notes?: string;
  source: TopicSource;
}

export interface BandScores {
  content: number;
  communicativeAchievement: number;
  organisation: number;
  language: number;
}

export interface Annotation {
  quote: string;
  category: AnnotationCategory;
  severity: AnnotationSeverity;
  messageEn: string;
  messagePt: string;
}

export interface CorrectionResult {
  bands: BandScores;
  overall: number;
  summaryEn: string;
  summaryPt: string;
  criterionComments: {
    content: string;
    communicativeAchievement: string;
    organisation: string;
    language: string;
  };
  annotations: Annotation[];
  modelAnswer: string;
  explanationsPt: string;
}

export interface AttemptRecord {
  id: string;
  createdAt: string;
  level: ExamLevel;
  mode: PracticeMode;
  topic: WritingTopic;
  essay: string;
  wordCount: number;
  correction: CorrectionResult | null;
}

export const LEVEL_WORD_TARGETS: Record<
  ExamLevel,
  { min: number; max: number; timerMinutes: number }
> = {
  C1: { min: 220, max: 260, timerMinutes: 40 },
  C2: { min: 240, max: 280, timerMinutes: 45 },
};
