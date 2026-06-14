"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { quizQuestions } from "@/data/loveData";
import ChapterButton from "@/components/shared/ChapterButton";

function confetti() {
  if (typeof window === "undefined") return;
  import("canvas-confetti").then((m) => {
    m.default({ particleCount: 80, spread: 60, origin: { y: 0.65 },
      colors: ["#f43f5e", "#fda4af", "#D4AF37", "#be123c"] });
  });
}

interface Props { onAdvance: () => void; }

export default function QuizSection({ onAdvance }: Props) {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showExp, setShowExp] = useState(false);

  const q = quizQuestions[cur];

  const answer = useCallback((idx: number) => {
    if (sel !== null) return;
    setSel(idx);
    setShowExp(true);
    if (idx === q.correct) { setScore(s => s + 1); confetti(); }
  }, [sel, q.correct]);

  const next = () => {
    const newScore = score + (sel === q.correct ? 1 : 0);
    setSel(null); setShowExp(false);
    if (cur + 1 >= quizQuestions.length) {
      setDone(true);
      if (newScore >= quizQuestions.length - 1) setTimeout(confetti, 300);
    } else { setCur(c => c + 1); }
  };

  const finalScore = done ? score : score + (sel === q?.correct ? 1 : 0);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 45% at 40% 55%, rgba(114,47,55,0.1) 0%, transparent 60%)" }} />

      <div className="max-w-xl mx-auto w-full">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass-rose rounded-full px-4 py-2 mb-5 text-rose-300 text-xs tracking-wide"
          >🧠 Quiz do casal</motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-fluid-lg font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >Você nos conhece bem?</motion.h2>
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={`q-${cur}`}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.38 }}
              className="rounded-3xl p-6 md:p-8"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/30 text-xs">{cur + 1} / {quizQuestions.length}</span>
                <div className="flex gap-1">
                  {quizQuestions.map((_, i) => (
                    <div key={i} className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: 24,
                        background: i < cur ? "#f43f5e" : i === cur ? "rgba(244,63,94,0.5)" : "rgba(255,255,255,0.1)",
                      }} />
                  ))}
                </div>
              </div>

              <h3 className="text-white text-base md:text-lg font-semibold mb-6 leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{q.question}</h3>

              <div className="space-y-3 mb-5">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.correct, isSel = i === sel;
                  let bg = "rgba(255,255,255,0.04)", border = "rgba(255,255,255,0.08)", color = "rgba(255,255,255,0.65)";
                  if (sel !== null) {
                    if (isCorrect) { bg = "rgba(34,197,94,0.1)"; border = "rgba(34,197,94,0.4)"; color = "#86efac"; }
                    else if (isSel) { bg = "rgba(244,63,94,0.1)"; border = "rgba(244,63,94,0.4)"; color = "#fda4af"; }
                  }
                  return (
                    <motion.button key={i}
                      whileHover={sel === null ? { scale: 1.02, x: 4 } : {}}
                      whileTap={sel === null ? { scale: 0.98 } : {}}
                      onClick={() => answer(i)}
                      className="w-full text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center gap-3"
                      style={{ background: bg, border: `1px solid ${border}`, color }}
                    >
                      <span className="w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.05)" }}>
                        {["A","B","C","D"][i]}
                      </span>
                      <span className="text-sm">{opt}</span>
                      {sel !== null && isCorrect && <span className="ml-auto text-green-400">✓</span>}
                      {sel !== null && isSel && !isCorrect && <span className="ml-auto text-rose-400">✗</span>}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showExp && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 rounded-xl text-xs text-white/65"
                    style={{ background: "rgba(244,63,94,0.07)", border: "1px solid rgba(244,63,94,0.15)" }}>
                    💭 {q.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {sel !== null && (
                <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={next}
                  className="w-full py-4 rounded-xl font-semibold text-white text-sm"
                  style={{ background: "linear-gradient(135deg, #9f1239, #f43f5e)" }}>
                  {cur + 1 >= quizQuestions.length ? "Ver resultado" : "Próxima →"}
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div key="result"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-center rounded-3xl p-8 md:p-12"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(244,63,94,0.18)" }}
            >
              <motion.div className="text-6xl mb-5"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8, delay: 0.3 }}>
                {finalScore >= quizQuestions.length ? "🏆" : finalScore >= quizQuestions.length / 2 ? "🌟" : "💪"}
              </motion.div>
              <h3 className="text-2xl font-bold gradient-text mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {finalScore === quizQuestions.length ? "Perfeito! Você me conhece tão bem! 💕"
                  : finalScore >= quizQuestions.length - 1 ? "Incrível! Quase perfeito! 💖"
                  : "Muito bem! Continuamos aprendendo juntos! 💝"}
              </h3>
              <p className="text-white/45 text-sm mb-2">
                {finalScore} de {quizQuestions.length} acertos
              </p>
              <ChapterButton label="Continuar" onClick={onAdvance} delay={0.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
