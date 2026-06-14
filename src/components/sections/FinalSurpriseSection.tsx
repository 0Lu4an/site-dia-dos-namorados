"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { coupleData } from "@/data/loveData";

/* ─── Stars field ─── */
const STARS = Array.from({ length: 260 }, (_, i) => ({
  id: i,
  x: (i * 3.71) % 100,
  y: (i * 5.29) % 100,
  size: i % 7 === 0 ? 1.8 : (i % 3) * 0.45 + 0.25,
  dur: (i % 5) + 2,
  delay: (i % 14) * 0.28,
  gold: i % 9 === 0,
}));

/* ─── Rising hearts ─── */
const BG_HEARTS = Array.from({ length: 20 }, (_, i) => ({
  id: i, x: (i * 5.2) % 94, delay: i * 0.55, size: (i % 3) * 0.4 + 0.75, dur: (i % 5) + 8,
  gold: i % 4 === 0,
}));

/* ─── Narrative messages — better rhythm ─── */
const MESSAGES: { text: string; pause: number; speed: number }[] = [
  { text: "Se eu pudesse voltar no tempo...", pause: 1100, speed: 55 },
  { text: "e escolher tudo de novo...", pause: 1000, speed: 52 },
  { text: "Eu escolheria você.", pause: 1400, speed: 45 },
  { text: "Todas as vezes.", pause: 1200, speed: 60 },
  { text: "Obrigado por fazer a minha vida ser mais bonita.", pause: 900, speed: 48 },
  { text: "Eu te amo ❤️", pause: 0, speed: 70 },
];

function useTypewriter(text: string, active: boolean, speed: number) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) { setDisplayed(""); setDone(false); return; }
    let i = 0;
    setDisplayed("");
    setDone(false);
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setTimeout(() => setDone(true), 420); }
    }, speed);
    return () => clearInterval(iv);
  }, [active, text, speed]);

  return { displayed, done };
}

function fireExplosion(wave = 0) {
  if (typeof window === "undefined") return;
  import("canvas-confetti").then(m => {
    const c = m.default;
    const colors = ["#f43f5e", "#fda4af", "#D4AF37", "#ffd700", "#be123c", "#fff", "#fb7185", "#fecdd3"];
    if (wave === 0) {
      c({ particleCount: 250, spread: 130, origin: { x: 0.5, y: 0.5 }, colors, scalar: 1.4, ticks: 500 });
      setTimeout(() => {
        c({ particleCount: 110, angle: 52, spread: 80, origin: { x: 0 }, colors, scalar: 1.2 });
        c({ particleCount: 110, angle: 128, spread: 80, origin: { x: 1 }, colors, scalar: 1.2 });
      }, 350);
    } else if (wave === 1) {
      c({ particleCount: 160, spread: 100, origin: { x: 0.5, y: 0.35 }, colors, scalar: 0.9, ticks: 400 });
      c({ particleCount: 90, spread: 140, origin: { x: 0.2, y: 0.75 }, colors, startVelocity: 50 });
      c({ particleCount: 90, spread: 140, origin: { x: 0.8, y: 0.75 }, colors, startVelocity: 50 });
    } else {
      c({ particleCount: 200, spread: 120, origin: { x: 0.5, y: 0.6 }, colors, scalar: 1.1, ticks: 350 });
    }
  });
}

/* ─── Animated message line ─── */
function Line({
  text, speed, active, isLast, onDone,
}: {
  text: string; speed: number; active: boolean; isLast: boolean; onDone: () => void;
}) {
  const { displayed, done } = useTypewriter(text, active, speed);
  useEffect(() => { if (done) onDone(); }, [done]);
  if (!active) return null;

  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`leading-relaxed ${
        isLast
          ? "text-2xl md:text-3xl lg:text-4xl font-semibold gradient-text-soft text-glow"
          : "text-white/80 text-lg md:text-xl lg:text-2xl font-light"
      }`}
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-5 ml-1 align-middle rounded-full"
          style={{ background: "rgba(244,63,94,0.8)", boxShadow: "0 0 6px rgba(244,63,94,0.7)" }}
        />
      )}
    </motion.p>
  );
}

export default function FinalSurpriseSection() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [shownLines, setShownLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"idle" | "typing" | "photo" | "button" | "finale">("idle");
  const [accepted, setAccepted] = useState(false);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleLineDone = () => {
    const msg = MESSAGES[msgIdx];
    const next = msgIdx + 1;

    pauseRef.current = setTimeout(() => {
      setShownLines(p => [...p, msg.text]);
      if (next < MESSAGES.length) {
        setMsgIdx(next);
      } else {
        // All messages done
        setTimeout(() => setPhase("photo"), 600);
        setTimeout(() => setPhase("button"), 2400);
      }
    }, msg.pause);
  };

  useEffect(() => () => { if (pauseRef.current) clearTimeout(pauseRef.current); }, []);

  const handleAccept = () => {
    setAccepted(true);
    setPhase("finale");
    fireExplosion(0);
    setTimeout(() => fireExplosion(1), 1800);
    setTimeout(() => fireExplosion(2), 3600);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-28 px-6">
      {/* Multi-layer deep background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 130% 100% at 50% 58%, rgba(130,18,55,0.32) 0%, rgba(80,5,30,0.14) 45%, transparent 72%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 45% at 20% 15%, rgba(212,175,55,0.06) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 80% 85%, rgba(244,63,94,0.06) 0%, transparent 60%)" }} />
      </div>

      {/* Stars */}
      {STARS.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            background: s.gold ? "rgba(212,175,55,0.9)" : "white",
          }}
          animate={{ opacity: [0.1, s.gold ? 0.9 : 0.75, 0.1], scale: [1, s.gold ? 1.8 : 1.5, 1] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Rising hearts */}
      {BG_HEARTS.map(h => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${h.x}%`, bottom: "-4%",
            fontSize: `${h.size}rem`,
            color: h.gold ? "rgba(212,175,55,0.1)" : "rgba(244,63,94,0.09)",
          }}
          animate={{ y: [0, -1000], opacity: [0.8, 0] }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >❤</motion.div>
      ))}

      <div className="relative z-10 max-w-2xl mx-auto text-center w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="inline-flex items-center gap-2.5 glass-rose rounded-full px-5 py-2.5 mb-16 text-rose-300 text-xs tracking-widest uppercase"
          style={{ boxShadow: "0 0 30px rgba(244,63,94,0.14), inset 0 1px 0 rgba(255,255,255,0.07)" }}
        >
          <motion.span animate={{ scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>✨</motion.span>
          Surpresa final
          <motion.span animate={{ scale: [1, 1.4, 1], rotate: [0, -15, 15, 0] }} transition={{ duration: 2.2, delay: 0.6, repeat: Infinity }}>✨</motion.span>
        </motion.div>

        <AnimatePresence>
          {!accepted ? (
            <motion.div key="story">
              {/* Accumulated lines */}
              <div className="space-y-4 mb-2">
                {shownLines.map((line, i) => {
                  const isLast = i === shownLines.length - 1 && phase !== "typing";
                  return (
                    <motion.p
                      key={i}
                      animate={{
                        opacity: isLast ? 0.65 : 0.38,
                        y: 0,
                      }}
                      className={`leading-relaxed ${
                        line === "Eu te amo ❤️"
                          ? "text-2xl md:text-3xl font-semibold gradient-text-soft"
                          : "text-white/40 text-lg md:text-xl font-light"
                      }`}
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {line}
                    </motion.p>
                  );
                })}

                {/* Active typing line */}
                {phase === "typing" && (
                  <Line
                    key={msgIdx}
                    text={MESSAGES[msgIdx].text}
                    speed={MESSAGES[msgIdx].speed}
                    active={true}
                    isLast={msgIdx === MESSAGES.length - 1}
                    onDone={handleLineDone}
                  />
                )}
              </div>

              {/* Photo reveal */}
              <AnimatePresence>
                {(phase === "photo" || phase === "button") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.78, y: 36 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center my-12"
                  >
                    <div className="relative">
                      {/* Outer atmosphere */}
                      <motion.div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          inset: "-50px",
                          background: "radial-gradient(circle, rgba(244,63,94,0.22) 0%, rgba(159,18,57,0.08) 45%, transparent 70%)",
                        }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {/* Gold orbiting ring */}
                      <motion.div
                        className="absolute rounded-full"
                        style={{
                          inset: "-18px",
                          border: "1px solid rgba(212,175,55,0.5)",
                          boxShadow: "0 0 24px rgba(212,175,55,0.12) inset, 0 0 24px rgba(212,175,55,0.1)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                      />
                      {/* Rose counter-ring */}
                      <motion.div
                        className="absolute rounded-full"
                        style={{
                          inset: "-8px",
                          border: "1px solid rgba(244,63,94,0.35)",
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      />
                      {/* Photo */}
                      <motion.div
                        className="w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden"
                        style={{
                          border: "2.5px solid rgba(244,63,94,0.55)",
                          boxShadow: "0 0 70px rgba(244,63,94,0.38), 0 0 140px rgba(244,63,94,0.12), 0 16px 50px rgba(0,0,0,0.75)",
                        }}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <img src={coupleData.couplePhoto} alt="Nós" className="w-full h-full object-cover" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Accept button */}
              <AnimatePresence>
                {phase === "button" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
                    className="pt-4"
                  >
                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-white/28 text-xs mb-8 tracking-[0.35em] uppercase"
                    >
                      Uma última pergunta
                    </motion.p>
                    <motion.button
                      whileHover={{ scale: 1.06, y: -6 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={handleAccept}
                      className="relative inline-flex items-center gap-3 px-8 py-5 rounded-full text-white font-semibold text-base md:text-lg overflow-hidden cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #881337, #f43f5e, #c2185b)",
                        boxShadow: "0 0 40px rgba(244,63,94,0.4), 0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)",
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 35px rgba(244,63,94,0.38), 0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)",
                          "0 0 80px rgba(244,63,94,0.7), 0 0 140px rgba(244,63,94,0.15), 0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)",
                          "0 0 35px rgba(244,63,94,0.38), 0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)",
                        ],
                      }}
                      transition={{ duration: 2.8, repeat: Infinity }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity }}
                      >❤️</motion.span>
                      <span>Você aceita continuar essa aventura comigo?</span>
                      {/* Shimmer */}
                      <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)" }}
                        animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* ─── FINALE — memorável ─── */
            <motion.div
              key="finale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="py-8"
            >
              {/* Central glow burst */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 600, height: 600,
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, rgba(244,63,94,0.22) 0%, rgba(159,18,57,0.06) 40%, transparent 70%)",
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 1.6, 1.2], opacity: [0, 1, 0.5] }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />

              {/* Emoji */}
              <motion.div
                className="text-7xl md:text-9xl mb-8 block select-none"
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
              >
                <motion.span
                  className="inline-block"
                  animate={{ scale: [1, 1.3, 1.1, 1.2, 1], rotate: [0, 12, -12, 8, 0] }}
                  transition={{ duration: 2, repeat: 2, delay: 0.2 }}
                >😘</motion.span>
              </motion.div>

              {/* Main message */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2
                  className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-4 text-glow"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    Resposta certa, sempre.
                  </motion.span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-white/55 text-lg md:text-xl mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Para sempre minha resposta favorita.
              </motion.p>

              {/* Rising hearts — grand finale */}
              {Array.from({ length: 28 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none select-none"
                  style={{
                    left: `${2 + i * 3.5}%`,
                    top: "58%",
                    color: i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#f43f5e" : "#fecdd3",
                    fontSize: `${(i % 4) * 0.3 + 0.8}rem`,
                  }}
                  initial={{ y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    y: -(350 + (i % 5) * 60),
                    opacity: 0,
                    scale: 0.2,
                    rotate: (i % 2 === 0 ? 1 : -1) * (15 + (i % 3) * 8),
                  }}
                  transition={{ duration: 2.8 + (i % 5) * 0.25, delay: i * 0.08, ease: "easeOut" }}
                >❤</motion.div>
              ))}

              {/* Sparkles */}
              {Array.from({ length: 10 }, (_, i) => (
                <motion.div
                  key={`sp-${i}`}
                  className="absolute pointer-events-none select-none"
                  style={{ left: `${8 + i * 9}%`, top: "48%", fontSize: "1rem" }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 1.8, 0], opacity: [1, 1, 0], y: -180, x: (i % 2 === 0 ? 1 : -1) * 40 }}
                  transition={{ duration: 1.8, delay: 0.4 + i * 0.12, ease: "easeOut" }}
                >✨</motion.div>
              ))}

              {/* Closing signature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="mt-16 space-y-2"
              >
                <div className="w-24 h-px mx-auto mb-5" style={{
                  background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.4), transparent)"
                }} />
                <p className="text-white/30 text-sm italic"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Feito com todo meu amor
                </p>
                <p className="text-white/18 text-xs tracking-widest">
                  Para {coupleData.partnerName} · {new Date().getFullYear()}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
