"use client";

import { useState, useCallback } from "react";

export type ChapterId =
  | "loading"
  | "hero"
  | "counter"
  | "first-moment"
  | "timeline"
  | "gallery"
  | "quiz"
  | "letters"
  | "love-things"
  | "finale";

export const CHAPTERS: ChapterId[] = [
  "loading",
  "hero",
  "counter",
  "first-moment",
  "timeline",
  "gallery",
  "quiz",
  "letters",
  "love-things",
  "finale",
];

export const CHAPTER_LABELS: Record<ChapterId, string> = {
  loading: "Carregando",
  hero: "Início",
  counter: "Tempo juntos",
  "first-moment": "Nosso primeiro momento",
  timeline: "Nossa história",
  gallery: "Memórias",
  quiz: "Quiz do casal",
  letters: "Cartas secretas",
  "love-things": "Por que eu te amo",
  finale: "Surpresa final",
};

// chapters that show progress indicator (not loading, not hero intro)
export const VISIBLE_CHAPTERS = CHAPTERS.filter((c) => c !== "loading");

export function useChapterFlow() {
  const [current, setCurrent] = useState<ChapterId>("loading");

  const advance = useCallback(() => {
    setCurrent((prev) => {
      const idx = CHAPTERS.indexOf(prev);
      if (idx < CHAPTERS.length - 1) return CHAPTERS[idx + 1];
      return prev;
    });
  }, []);

  const goTo = useCallback((id: ChapterId) => setCurrent(id), []);

  const chapterNumber = VISIBLE_CHAPTERS.indexOf(current as typeof VISIBLE_CHAPTERS[number]) + 1;
  const totalChapters = VISIBLE_CHAPTERS.length;
  const progress = Math.max(0, chapterNumber - 1) / (totalChapters - 1);

  return { current, advance, goTo, chapterNumber, totalChapters, progress };
}
