"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { coupleData } from "@/data/loveData";
import ChapterButton from "@/components/shared/ChapterButton";

function getDiff() {
  const start = new Date(2024, 2, 9); // 9 de março de 2024 (mês começa em 0)
  const now = new Date();

  const diff = now.getTime() - start.getTime();
  const s = Math.floor(diff / 1000);

  return {
    days: Math.floor(s / 86400),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}

function Unit({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className="relative w-[4.5rem] h-[4.5rem] md:w-28 md:h-28 rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(244,63,94,0.18)",
          boxShadow: "0 0 20px rgba(244,63,94,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="absolute inset-0 shimmer" />
        <motion.span
          key={value}
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative z-10 font-bold tabular-nums text-white"
          style={{
            fontSize: "clamp(1.5rem, 5vw, 2.4rem)",
            textShadow: "0 0 18px rgba(244,63,94,0.5)",
          }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
        <div className="absolute bottom-0 right-0 w-8 h-8 opacity-20 rounded-full"
          style={{ background: "radial-gradient(circle, #f43f5e, transparent)" }} />
      </div>
      <span className="text-white/35 text-[10px] md:text-xs font-medium tracking-[0.22em] uppercase">
        {label}
      </span>
    </motion.div>
  );
}

interface Props { onAdvance: () => void; }

export default function CounterSection({ onAdvance }: Props) {
  const [t, setT] = useState(getDiff);

  useEffect(() => {
    const iv = setInterval(() => setT(getDiff()), 1000);
    return () => clearInterval(iv);
  }, []);

  const startDate = new Date("2024-03-09T00:00:00");
  const dateLabel = "9 de março de 2024";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% 50%, rgba(159,18,57,0.14) 0%, transparent 70%)" }} />

      <div className="max-w-3xl mx-auto text-center w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-rose rounded-full px-4 py-2 mb-8 text-rose-300 text-xs tracking-wide"
        >
          <span className="heartbeat inline-block text-sm">❤️</span>
          Nossa jornada em números
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-fluid-lg font-bold gradient-text mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Estamos juntos há
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-white/35 text-xs tracking-widest uppercase mb-14"
        >
          Desde {dateLabel}
        </motion.p>

        {/* Counters */}
        <div className="flex items-center justify-center gap-3 md:gap-7 mb-16">
          <Unit value={t.days}    label="Dias"    delay={0.3} />
          <Colon delay={0.45} />
          <Unit value={t.hours}   label="Horas"   delay={0.4} />
          <Colon delay={0.55} />
          <Unit value={t.minutes} label="Minutos" delay={0.5} />
          <Colon delay={0.65} blink />
          <Unit value={t.seconds} label="Seg"     delay={0.6} />
        </div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="text-white/25 text-sm italic mb-12"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          "E cada segundo ao seu lado vale uma eternidade."
        </motion.p>

        <ChapterButton label="Continuar" onClick={onAdvance} delay={1.4} />
      </div>
    </section>
  );
}

function Colon({ delay, blink }: { delay: number; blink?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: blink ? [0.4, 1, 0.4] : 0.4 }}
      transition={blink ? { duration: 1, repeat: Infinity } : { delay }}
      className="text-rose-500/50 text-2xl md:text-3xl font-light mb-5 select-none"
    >:</motion.div>
  );
}
