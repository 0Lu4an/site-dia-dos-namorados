"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { memoryCards } from "@/data/loveData";

interface Card {
  uniqueId: string;
  id: number;
  emoji: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function buildDeck(): Card[] {
  const doubled = [...memoryCards, ...memoryCards];
  return doubled
    .sort(() => Math.random() - 0.5)
    .map((c, i) => ({
      uniqueId: `${c.id}-${i}`,
      id: c.id,
      emoji: c.emoji,
      label: c.label,
      isFlipped: false,
      isMatched: false,
    }));
}

function launchCelebration() {
  if (typeof window === "undefined") return;
  import("canvas-confetti").then((m) => {
    const confetti = m.default;
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#f43f5e", "#fda4af", "#D4AF37"] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#f43f5e", "#fda4af", "#D4AF37"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  });
}

export default function MemoryGameSection() {
  const [deck, setDeck] = useState<Card[]>(buildDeck);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (flipped.length < 2) return;
    const [a, b] = flipped;
    const cardA = deck.find((c) => c.uniqueId === a)!;
    const cardB = deck.find((c) => c.uniqueId === b)!;

    setLocked(true);
    setMoves((m) => m + 1);

    if (cardA.id === cardB.id) {
      setDeck((d) =>
        d.map((c) =>
          c.uniqueId === a || c.uniqueId === b ? { ...c, isMatched: true } : c
        )
      );
      setFlipped([]);
      setLocked(false);
    } else {
      setTimeout(() => {
        setDeck((d) =>
          d.map((c) =>
            c.uniqueId === a || c.uniqueId === b ? { ...c, isFlipped: false } : c
          )
        );
        setFlipped([]);
        setLocked(false);
      }, 1000);
    }
  }, [flipped]);

  useEffect(() => {
    if (deck.length > 0 && deck.every((c) => c.isMatched)) {
      setWon(true);
      launchCelebration();
    }
  }, [deck]);

  const handleClick = useCallback(
    (card: Card) => {
      if (locked || card.isFlipped || card.isMatched || flipped.length >= 2) return;

      setDeck((d) =>
        d.map((c) => (c.uniqueId === card.uniqueId ? { ...c, isFlipped: true } : c))
      );
      setFlipped((f) => [...f, card.uniqueId]);
    },
    [locked, flipped]
  );

  const reset = () => {
    setDeck(buildDeck());
    setFlipped([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  };

  return (
    <section className="relative py-24 md:py-40 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 60% 50%, rgba(159,18,57,0.08) 0%, transparent 60%)" }}
      />

      <div className="max-w-2xl mx-auto">
        <div ref={ref} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 glass-rose rounded-full px-4 py-2 mb-6 text-rose-300 text-sm tracking-wide"
          >
            🃏 Jogo da memória
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-fluid-lg font-bold gradient-text mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Jogo da Memória
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm"
          >
            Movimentos: <span className="text-rose-400 font-semibold">{moves}</span>
          </motion.p>
        </div>

        <AnimatePresence>
          {won ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: 3 }}
              >
                🎉
              </motion.div>
              <h3
                className="text-2xl font-bold gradient-text mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Parabéns!
              </h3>
              <p className="text-white/50 mb-6">
                Você completou em <span className="text-rose-400 font-bold">{moves}</span> movimentos!
              </p>
              <button
                onClick={reset}
                className="px-6 py-3 rounded-full text-white font-medium text-sm"
                style={{ background: "linear-gradient(135deg, #9f1239, #f43f5e)" }}
              >
                Jogar novamente
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-4 gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {deck.map((card) => (
                <div
                  key={card.uniqueId}
                  className="perspective-card aspect-square cursor-pointer"
                  onClick={() => handleClick(card)}
                >
                  <motion.div
                    className="card-inner w-full h-full"
                    animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {/* Back */}
                    <div
                      className="card-front rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #1a0010, #2d0018)",
                        border: "1px solid rgba(244,63,94,0.2)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                      }}
                    >
                      <span className="text-rose-900/60 text-2xl">❤</span>
                    </div>

                    {/* Front */}
                    <div
                      className="card-back rounded-xl flex flex-col items-center justify-center gap-1"
                      style={{
                        background: card.isMatched
                          ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.08))"
                          : "linear-gradient(135deg, rgba(244,63,94,0.15), rgba(159,18,57,0.08))",
                        border: `1px solid ${card.isMatched ? "rgba(34,197,94,0.4)" : "rgba(244,63,94,0.3)"}`,
                        boxShadow: card.isMatched ? "0 0 15px rgba(34,197,94,0.2)" : "0 0 15px rgba(244,63,94,0.15)",
                      }}
                    >
                      <span className="text-2xl">{card.emoji}</span>
                      <span className="text-xs text-white/50 font-light">{card.label}</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
