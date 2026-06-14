"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { secretLetters, coupleData } from "@/data/loveData";
import { X } from "lucide-react";
import ChapterButton from "@/components/shared/ChapterButton";

interface Letter {
  id: string; title: string; preview: string; content: string; color: string;
}

const colorMap: Record<string, { bg: string; border: string; glow: string; accent: string; gradFrom: string; gradTo: string }> = {
  rose: {
    bg: "rgba(244,63,94,0.06)",
    border: "rgba(244,63,94,0.22)",
    glow: "rgba(244,63,94,0.22)",
    accent: "#f43f5e",
    gradFrom: "rgba(244,63,94,0.18)",
    gradTo: "rgba(159,18,57,0.06)",
  },
  pink: {
    bg: "rgba(236,72,153,0.06)",
    border: "rgba(236,72,153,0.22)",
    glow: "rgba(236,72,153,0.22)",
    accent: "#ec4899",
    gradFrom: "rgba(236,72,153,0.18)",
    gradTo: "rgba(131,24,67,0.06)",
  },
  wine: {
    bg: "rgba(159,18,57,0.1)",
    border: "rgba(159,18,57,0.3)",
    glow: "rgba(159,18,57,0.25)",
    accent: "#be123c",
    gradFrom: "rgba(159,18,57,0.22)",
    gradTo: "rgba(80,5,25,0.06)",
  },
};

const waxSeals = ["❤️", "💌", "💌"];

/* ── Partículas de fundo ── */
const BG_PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: (i * 3.7) % 98,
  y: (i * 5.3) % 98,
  size: (i % 3) * 0.7 + 0.4,
  dur: (i % 4) + 3,
  delay: (i % 8) * 0.4,
  gold: i % 6 === 0,
}));

function EnvelopeCard({ letter, index, onOpen }: { letter: Letter; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  const c = colorMap[letter.color] ?? colorMap.rose;

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -10 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpen}
      className="relative cursor-pointer select-none flex flex-col"
      style={{
        height: "100%",
        minHeight: 260,
        borderRadius: "24px",
        overflow: "hidden",
        background: `linear-gradient(170deg, ${c.gradFrom} 0%, ${c.gradTo} 100%)`,
        border: `1px solid ${hovered ? c.accent + "60" : c.border}`,
        boxShadow: hovered
          ? `0 32px 80px rgba(0,0,0,0.6), 0 0 60px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.09)`
          : `0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`,
        transition: "box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* Glow interno no hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${c.glow} 0%, transparent 60%)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Shimmer no hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.045) 50%, transparent 65%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: hovered ? ["−200% 0", "200% 0"] : "-200% 0" }}
        transition={{ duration: 1.2, ease: "linear" }}
      />

      {/* ── Flap do envelope ── */}
      <div style={{ height: 96, position: "relative", overflow: "hidden", flexShrink: 0 }}>
        {/* Fundo degradê do flap */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, ${c.accent}20 0%, transparent 100%)`,
        }} />

        {/* Triângulo */}
        <div className="absolute inset-0" style={{
          clipPath: "polygon(0 0, 50% 85%, 100% 0)",
          background: `linear-gradient(150deg, ${c.accent}28 0%, ${c.accent}08 100%)`,
        }} />

        {/* Borda diagonal esquerda do triângulo */}
        <div className="absolute inset-0 pointer-events-none" style={{
          clipPath: "polygon(0 0, 50% 85%, 51% 85%, 1% 0)",
          background: `linear-gradient(150deg, ${c.accent}60, transparent)`,
          opacity: 0.4,
        }} />
        {/* Borda diagonal direita */}
        <div className="absolute inset-0 pointer-events-none" style={{
          clipPath: "polygon(100% 0, 50% 85%, 49% 85%, 99% 0)",
          background: `linear-gradient(210deg, ${c.accent}60, transparent)`,
          opacity: 0.4,
        }} />

        {/* Linha divisória */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{
          background: `linear-gradient(90deg, transparent, ${c.accent}55, transparent)`,
        }} />

        {/* Cantos */}
        <span style={{ position: "absolute", top: 10, left: 14, fontSize: 7, opacity: 0.25, color: c.accent }}>✦</span>
        <span style={{ position: "absolute", top: 10, right: 14, fontSize: 7, opacity: 0.25, color: c.accent }}>✦</span>

        {/* Selo */}
        <motion.div
          style={{
            position: "absolute", bottom: 12,
            left: 0, right: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          animate={hovered
            ? { scale: [1, 1.3, 1.1], rotate: [0, -10, 10, 0], y: [0, -5, 0] }
            : { scale: 1, rotate: 0, y: 0 }
          }
          transition={{ duration: 0.55 }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: `radial-gradient(circle, ${c.accent}30, transparent 70%)`,
            border: `1px solid ${c.accent}35`,
            boxShadow: hovered ? `0 0 20px ${c.accent}55` : "none",
            transition: "box-shadow 0.35s ease",
            fontSize: "1.15rem", lineHeight: 1,
          }}>
            {waxSeals[index % waxSeals.length]}
          </div>
        </motion.div>
      </div>

      {/* ── Corpo ── */}
      <div className="flex flex-col flex-1 px-6 pb-8 pt-5 text-center">
        {/* Linhas de papel */}
        <div className="mb-5 space-y-1.5">
          <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${c.accent}30, transparent)` }} />
          <div className="h-px mx-6" style={{ background: `linear-gradient(90deg, transparent, ${c.accent}15, transparent)` }} />
        </div>

        {/* Título */}
        <h3
          className="font-semibold mb-3 leading-snug"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "rgba(255,255,255,0.92)",
            textShadow: hovered ? `0 0 24px ${c.accent}55` : "none",
            transition: "text-shadow 0.35s ease",
          }}
        >
          {letter.title}
        </h3>

        {/* Preview */}
        <p
          className="flex-1 text-xs italic leading-relaxed mb-6"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "rgba(255,255,255,0.38)",
          }}
        >
          {letter.preview}
        </p>

        {/* CTA */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.38, y: hovered ? 0 : 3 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-medium tracking-wide"
          style={{ color: c.accent }}
        >
          <span>Abrir carta</span>
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.3 }}>→</motion.span>
        </motion.div>
      </div>

      {/* Linha inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{
        background: `linear-gradient(90deg, transparent, ${c.accent}40, transparent)`,
      }} />
    </motion.div>
  );
}

function LetterModal({ letter, onClose }: { letter: Letter; onClose: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const c = colorMap[letter.color] ?? colorMap.rose;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{ background: "rgba(4,0,2,0.94)" }}
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.65, y: 80, rotateX: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.65, y: 80 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        onAnimationComplete={() => {
          setTimeout(() => setFlapOpen(true), 100);
          setTimeout(() => setRevealed(true), 600);
        }}
        className="relative z-10 w-full max-w-[92vw] sm:max-w-lg"
        style={{ perspective: "1000px" }}
      >
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #1e0510, #0c0005)",
            border: `1px solid ${c.border}`,
            boxShadow: `0 0 80px ${c.glow}, 0 0 160px ${c.glow.replace("0.22", "0.07")}, 0 40px 100px rgba(0,0,0,0.7)`,
          }}
        >
          {/* Flap modal */}
          <motion.div
            className="relative overflow-hidden"
            style={{ height: 72, transformOrigin: "top center" }}
            animate={{ scaleY: flapOpen ? -1 : 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="absolute inset-0" style={{
              clipPath: "polygon(0 0, 50% 88%, 100% 0)",
              background: `linear-gradient(150deg, ${c.accent}25, ${c.accent}08)`,
            }} />
            <div className="absolute inset-x-0 bottom-0 h-px" style={{
              background: `linear-gradient(90deg, transparent, ${c.accent}50, transparent)`,
            }} />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-2xl">
              {waxSeals[[...Object.keys(colorMap)].indexOf(letter.color) % 3]}
            </div>
          </motion.div>

          {/* Conteúdo */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="px-5 sm:px-7 pb-7 sm:pb-9 pt-5"
              >
                <div className="mb-6 pb-5" style={{ borderBottom: `1px solid ${c.border}` }}>
                  <p className="text-[10px] tracking-[0.35em] uppercase mb-1.5"
                    style={{ color: `${c.accent}80` }}>
                    Para {coupleData.partnerName}
                  </p>
                  <h3 className="text-white/92 text-base sm:text-lg font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {letter.title}
                  </h3>
                </div>

                <div
                  className="relative rounded-2xl p-5 sm:p-6 overflow-y-auto"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.055)",
                    boxShadow: "inset 0 2px 12px rgba(0,0,0,0.3)",
                    maxHeight: "55vh",
                  }}
                >
                  <div className="absolute left-10 top-0 bottom-0 w-px opacity-[0.055]"
                    style={{ background: c.accent }} />
                  <p
                    className="text-white/78 text-[13px] sm:text-sm leading-[2.0] whitespace-pre-line relative z-10"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {letter.content}
                  </p>
                </div>

                <div className="flex justify-end mt-5">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-2xl"
                  >💌</motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-200 z-20"
          style={{
            background: "rgba(20,4,12,0.9)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          <X size={14} />
        </button>
      </motion.div>
    </motion.div>
  );
}

interface Props { onAdvance: () => void; }

export default function SecretLettersSection({ onAdvance }: Props) {
  const [open, setOpen] = useState<Letter | null>(null);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6 overflow-hidden">

      {/* ── Fundo com profundidade ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 65% at 50% 50%, rgba(159,18,57,0.18) 0%, rgba(80,5,25,0.08) 50%, transparent 75%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 15% 25%, rgba(212,175,55,0.07) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 45% 35% at 85% 75%, rgba(244,63,94,0.06) 0%, transparent 60%)" }} />
        {/* Vinheta */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(4,0,2,0.65) 100%)" }} />
      </div>

      {/* ── Partículas ── */}
      {BG_PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.gold
              ? `rgba(212,175,55,0.55)`
              : `rgba(244,63,94,0.45)`,
          }}
          animate={{ opacity: [0.15, 0.6, 0.15], y: [0, -12, 0], scale: [1, 1.4, 1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Corações flutuantes ao fundo ── */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 25}%`,
            fontSize: `${(i % 3) * 0.4 + 0.6}rem`,
            color: i % 2 === 0 ? "rgba(244,63,94,0.06)" : "rgba(212,175,55,0.05)",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5 + (i % 4), delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}
        >❤</motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto w-full">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 glass-rose rounded-full px-5 py-2.5 mb-7 text-rose-300 text-xs tracking-widest uppercase"
            style={{ boxShadow: "0 0 30px rgba(244,63,94,0.14), inset 0 1px 0 rgba(255,255,255,0.07)" }}
          >
            <motion.span
              animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >✉️</motion.span>
            Cartas para você
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.9 }}
            className="font-bold gradient-text mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 6vw, 3.8rem)",
              textShadow: "0 0 60px rgba(244,63,94,0.25)",
            }}
          >
            Palavras que guardei<br />
            <span style={{ fontSize: "0.9em", opacity: 0.9 }}>só para você</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="text-white/30 text-sm italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Cada carta carrega um pedaço do que sinto
          </motion.p>

          {/* Divisor decorativo */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mt-6"
            style={{
              width: 80, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.5), rgba(212,175,55,0.5), transparent)",
            }}
          />
        </div>

        {/* ── Grid de cartas ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" style={{ alignItems: "stretch" }}>
          {secretLetters.map((letter, i) => (
            <motion.div
              key={letter.id}
              style={{ display: "flex", flexDirection: "column" }}
              initial={{ opacity: 0, y: 60, rotate: i === 0 ? -3 : i === 2 ? 3 : 0 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <EnvelopeCard letter={letter} index={i} onOpen={() => setOpen(letter)} />
            </motion.div>
          ))}
        </div>

        {/* ── Rodapé ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="text-center mb-4"
        >
          <motion.p
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-sm italic mb-8"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "rgba(255,255,255,0.6)",
              textShadow: "0 0 20px rgba(244,63,94,0.3), 0 0 40px rgba(244,63,94,0.1)",
              letterSpacing: "0.02em",
            }}
          >
            "Abra cada envelope e deixe as palavras chegarem até o seu coração."
          </motion.p>
          <ChapterButton label="Mais uma coisa..." onClick={onAdvance} delay={0} icon="💝" />
        </motion.div>

      </div>

      <AnimatePresence>
        {open && <LetterModal letter={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}