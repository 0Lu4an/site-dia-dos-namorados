"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { coupleData } from "@/data/loveData";

const FLOATS = [
  { e: "✨", x: "8%",  y: "18%", d: 0   },
  { e: "🌹", x: "84%", y: "14%", d: 0.6 },
  { e: "💫", x: "5%",  y: "62%", d: 1.1 },
  { e: "✦",  x: "88%", y: "68%", d: 1.7 },
  { e: "🌸", x: "13%", y: "78%", d: 0.9 },
  { e: "⭐", x: "79%", y: "82%", d: 1.3 },
];

const BTN_LABELS = [
  "Continuar",
  "Quase lá😘",
  "Tem certeza que está pronta?",
  "Promete ir até o final?",
  "Já que insistiu, Então vem comigo ❤️",
];

interface Props { onAdvance: () => void; }

export default function HeroSection({ onAdvance }: Props) {
  const [clickCount, setClickCount] = useState(0);
  const [fleePos, setFleePos] = useState<{ x: number; y: number } | null>(null);
  const [isFleeAnim, setIsFleeAnim] = useState(false);

  const getRandomFlee = useCallback(() => {
    const directions = [
      { x: 180, y: -80 },
      { x: -160, y: 60 },
      { x: 100, y: 100 },
      { x: -120, y: -70 },
      { x: 200, y: 40 },
      { x: -180, y: 90 },
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  }, []);

  const handleClick = useCallback(() => {
    const next = clickCount + 1;

    if (next <= 3) {
      // Flee: 3 times
      setIsFleeAnim(true);
      const pos = getRandomFlee();
      setFleePos(pos);
      setTimeout(() => {
        setFleePos(null);
        setIsFleeAnim(false);
        setClickCount(next);
      }, 600);
    } else {
      // 4th click: go
      setClickCount(next);
      setTimeout(() => onAdvance(), 400);
    }
  }, [clickCount, getRandomFlee, onAdvance]);

  const btnLabel = BTN_LABELS[Math.min(clickCount, BTN_LABELS.length - 1)];
  const isReady = clickCount >= 4;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered background — more depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 38%, rgba(159,18,57,0.38) 0%, rgba(100,10,35,0.12) 50%, rgba(8,0,4,0) 75%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 50% at 15% 80%, rgba(212,175,55,0.09) 0%, transparent 55%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 45% 40% at 85% 20%, rgba(180,30,60,0.07) 0%, transparent 60%)"
        }} />
        <div className="absolute inset-0 opacity-[0.018]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />
      </div>

      {/* Floating elements */}
      {FLOATS.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-xl md:text-2xl pointer-events-none select-none hidden sm:block"
          style={{ left: el.x, top: el.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -14, 0], rotate: [0, 5, -5, 0], scale: 1 }}
          transition={{ duration: 5, delay: el.d + 1.2, repeat: Infinity, ease: "easeInOut" }}
        >{el.e}</motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">
        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center gap-2 glass-rose rounded-full px-4 py-2 mb-8 text-rose-300 text-xs font-medium tracking-[0.18em] uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          12 de Junho · Dia dos Namorados
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative mb-9"
        >
          {/* Glow layers */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-40px",
              background: "radial-gradient(circle, rgba(244,63,94,0.28) 0%, rgba(159,18,57,0.1) 50%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-14px",
              background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
            }}
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Orbiting ring */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-14px",
              border: "1px solid rgba(212,175,55,0.4)",
              boxShadow: "0 0 12px rgba(212,175,55,0.12) inset",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
          <div
            className="w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden"
            style={{
              border: "2px solid rgba(244,63,94,0.5)",
              boxShadow: "0 0 80px rgba(244,63,94,0.45), 0 0 140px rgba(244,63,94,0.15), 0 12px 40px rgba(0,0,0,0.7)"
            }}
          >
            <img src={coupleData.couplePhoto} alt="Nós dois" className="w-full h-full object-cover object-center" />
          </div>
        </motion.div>

        {/* "For" label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-rose-300/70 text-xs font-light tracking-[0.35em] uppercase mb-3"
        >
          Para {coupleData.partnerName}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="mb-5"
        >
          <span className="block text-fluid-xl font-bold gradient-text leading-[1.1] text-glow">
            Feliz Dia dos
          </span>
          <span className="block text-fluid-xl font-bold gradient-text leading-[1.1] text-glow">
            Namorados ❤️
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-white/45 text-fluid-md font-light max-w-md mx-auto mb-12 leading-relaxed"
        >
          {coupleData.heroSubtitle}
        </motion.p>

        {/* CTA — flee button */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.25 }}
        >
          <AnimatePresence mode="wait">
            <motion.button
              key={clickCount}
              animate={
                isFleeAnim && fleePos
                  ? { x: fleePos.x, y: fleePos.y, scale: 0.92, rotate: fleePos.x > 0 ? 8 : -8 }
                  : { x: 0, y: 0, scale: 1, rotate: 0 }
              }
              transition={
                isFleeAnim
                  ? { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
                  : { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }
              }
              whileHover={!isFleeAnim ? { scale: 1.05, y: -3 } : {}}
              whileTap={!isFleeAnim ? { scale: 0.96 } : {}}
              onClick={handleClick}
              disabled={isReady}
              className="relative inline-flex items-center gap-3 px-9 py-4 rounded-full text-white font-medium text-base overflow-hidden group cursor-pointer"
              style={{
                background: isReady
                  ? "linear-gradient(135deg, #881337, #f43f5e, #D4AF37)"
                  : "linear-gradient(135deg, #9f1239, #f43f5e)",
                boxShadow: isReady
                  ? "0 0 50px rgba(244,63,94,0.5), 0 0 100px rgba(212,175,55,0.15), 0 4px 24px rgba(0,0,0,0.5)"
                  : "0 0 35px rgba(244,63,94,0.35), 0 4px 24px rgba(0,0,0,0.45)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={btnLabel}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10"
                >
                  {btnLabel}
                </motion.span>
              </AnimatePresence>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >→</motion.span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }} />
            </motion.button>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
