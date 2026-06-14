"use client";

import { motion } from "framer-motion";
import { timelineEvents } from "@/data/loveData";
import ChapterButton from "@/components/shared/ChapterButton";

interface Props { onAdvance: () => void; }

export default function FirstMomentSection({ onAdvance }: Props) {
  const moment = timelineEvents[0];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      {/* Deep cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 70% at 50% 45%, rgba(114,47,55,0.32) 0%, rgba(60,10,25,0.18) 45%, transparent 75%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 15% 75%, rgba(212,175,55,0.07) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 30% at 85% 20%, rgba(180,30,60,0.06) 0%, transparent 55%)" }} />
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }} />

      <div className="max-w-xl mx-auto w-full">
        {/* Cinematic top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-rose-400/45 text-[10px] tracking-[0.45em] uppercase font-light">
            Capítulo um · O começo de tudo
          </span>
        </motion.div>

        {/* Main cinematic card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(12,2,7,0.6)",
            border: "1px solid rgba(244,63,94,0.18)",
            boxShadow: "0 0 80px rgba(244,63,94,0.14), 0 0 160px rgba(114,47,55,0.08), 0 30px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Photo — cinematic letterbox */}
          <div className="relative overflow-hidden" style={{ height: "clamp(240px, 40vw, 360px)" }}>
            {/* Top letterbox bar */}
            <div className="absolute top-0 left-0 right-0 h-6 z-10" style={{ background: "rgba(8,0,4,0.85)" }} />
            {/* Bottom letterbox bar */}
            <div className="absolute bottom-0 left-0 right-0 h-6 z-10" style={{ background: "rgba(8,0,4,0.85)" }} />

            <motion.img
              src={moment.photo}
              alt={moment.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.14, filter: "brightness(0.6) saturate(0.8)" }}
              animate={{ scale: 1.02, filter: "brightness(0.78) saturate(1.1)" }}
              transition={{ duration: 2.2, ease: "easeOut" }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 z-[5]" style={{
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(8,0,4,0.65) 100%)"
            }} />

            {/* Gradient bottom fade */}
            <div className="absolute inset-0 z-[6]" style={{
              background: "linear-gradient(to bottom, rgba(8,0,4,0.2) 0%, transparent 30%, rgba(8,0,4,0.95) 100%)"
            }} />

            {/* Floating emoji */}
            <motion.div
              className="absolute top-8 right-5 w-12 h-12 rounded-full flex items-center justify-center text-xl z-20"
              style={{
                background: "rgba(8,0,4,0.55)",
                border: "1px solid rgba(244,63,94,0.25)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
              animate={{ y: [0, -7, 0], rotate: [0, 6, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {moment.emoji}
            </motion.div>

            {/* Date pill — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="absolute bottom-8 left-5 z-20"
            >
              <span className="glass-rose rounded-full px-4 py-1.5 text-rose-300 text-[10px] tracking-[0.3em] uppercase"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
                {moment.date}
              </span>
            </motion.div>

            {/* Scan line effect — subtle */}
            <motion.div
              className="absolute inset-0 z-[7] pointer-events-none"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px)",
              }}
            />
          </div>

          {/* Text content */}
          <div className="px-7 pb-9 pt-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2
                className="text-white font-bold leading-snug mb-1"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)",
                  textShadow: "0 2px 20px rgba(244,63,94,0.2)",
                }}
              >
                {moment.title}
              </h2>
              <div className="w-10 h-px mb-5 mt-3" style={{ background: "linear-gradient(90deg, rgba(244,63,94,0.6), transparent)" }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.8 }}
              className="leading-[1.85] text-white/60"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {moment.description}
            </motion.p>

            {/* Nostalgic pull-quote */}
            <motion.div
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-7 pl-4 border-l-2"
              style={{ borderColor: "rgba(244,63,94,0.35)" }}
            >
              <p className="text-white/30 text-xs italic leading-relaxed"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                "Às vezes um único momento tem o poder de mudar tudo.
                Esse foi o nosso."
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Cinematic caption */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="text-center text-white/20 text-[10px] tracking-[0.35em] uppercase mt-8 mb-2"
        >
          O dia em que o mundo mudou de forma
        </motion.p>

        <ChapterButton label="Ver nossa história" onClick={onAdvance} delay={1.7} />
      </div>
    </section>
  );
}
