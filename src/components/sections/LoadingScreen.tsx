"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { coupleData, galleryPhotos, timelineEvents } from "@/data/loveData";

// Todas as fotos do casal reunidas numa sequência cinematográfica
const ALL_PHOTOS = [
  ...coupleData.loadingPhotos,
  ...timelineEvents.map(e => e.photo),
  ...galleryPhotos.map(g => g.src),
].filter(Boolean) as string[];

// 6 slots de memória flutuando pela tela — posições fixas, fotos rodam
const SLOTS = [
  { x: "8%",  y: "18%", w: 180, rotate: -6,  delay: 0.3,  dur: 7,   glow: "rose"  },
  { x: "72%", y: "10%", w: 135, rotate:  5,  delay: 0.7,  dur: 8.5, glow: "gold"  },
  { x: "82%", y: "52%", w: 170, rotate:  7,  delay: 1.1,  dur: 7.5, glow: "rose"  },
  { x: "5%",  y: "58%", w: 122, rotate: -8,  delay: 0.9,  dur: 9,   glow: "gold"  },
  { x: "60%", y: "76%", w: 112, rotate:  4,  delay: 1.4,  dur: 6.5, glow: "rose"  },
  { x: "22%", y: "80%", w: 126, rotate: -4,  delay: 1.6,  dur: 8,   glow: "gold"  },
];

const MSGS = [
  "Preparando algo especial...",
  "Reunindo nossas memórias...",
  "Enchendo de amor cada detalhe...",
  "Quase lá...",
];

// Partículas de fundo
const PARTICLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (i * 3.1) % 100,
  y: (i * 4.7) % 100,
  size: i % 9 === 0 ? 2.4 : (i % 3) * 0.8 + 0.4,
  dur: (i % 4) + 2.8,
  delay: (i % 10) * 0.26,
  opacity: ((i % 4) + 1) * 0.11,
  gold: i % 7 === 0,
  dy: (i % 2 === 0 ? -1 : 1) * ((i % 4) + 1) * 7,
}));

interface Props { onComplete: () => void; }

function MemorySlot({ slot, photoSrc, index }: {
  slot: typeof SLOTS[0];
  photoSrc: string;
  index: number;
}) {
  const isGold = slot.glow === "gold";
  const glowColor = isGold ? "rgba(212,175,55,0.35)" : "rgba(244,63,94,0.35)";
  const glowSoft  = isGold ? "rgba(212,175,55,0.12)" : "rgba(244,63,94,0.12)";

  return (
    <motion.div
      className="absolute hidden md:block"
      style={{ left: slot.x, top: slot.y }}
      initial={{ opacity: 0, scale: 0.6, rotate: slot.rotate - 8 }}
      animate={{ opacity: 1, scale: 1, rotate: slot.rotate }}
      transition={{ duration: 1.3, delay: slot.delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Float orgânico */}
      <motion.div
        animate={{
          y: [0, -14, 5, -10, 0],
          scale: [1, 1.03, 1, 1.02, 1],
          rotate: [
            slot.rotate,
            slot.rotate + 1.5,
            slot.rotate - 1,
            slot.rotate + 0.5,
            slot.rotate
          ],
        }}
        transition={{ duration: slot.dur, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glow atmosférico */}
        <motion.div
          className="absolute rounded-sm pointer-events-none"
          style={{
            inset: "-20px",
            background: `radial-gradient(circle, ${glowColor} 0%, ${glowSoft} 40%, transparent 70%)`,
            filter: "blur(16px)",
          }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Frame polaroid */}
        <div
          style={{
            width: slot.w,
            padding: "8px 8px 32px",
            background: "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(242,238,242,0.92))",
            borderRadius: "3px",
            boxShadow: `
              0 28px 70px rgba(0,0,0,0.7),
              0 10px 24px rgba(0,0,0,0.45),
              0 3px 8px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.9),
              0 0 50px ${glowSoft}
            `,
            position: "relative",
          }}
        >
          {/* Foto */}
          <div style={{
            width: "100%", paddingBottom: "100%",
            position: "relative", overflow: "hidden",
            borderRadius: "1px",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
          }}>
            <img
              src={photoSrc}
              alt=""
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                filter: "saturate(1.08) contrast(1.04) brightness(0.97)",
              }}
            />
            {/* Reflexo suave */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Rodapé polaroid */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "32px", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <motion.span
              style={{
                fontSize: "10px",
                color: isGold ? "rgba(212,175,55,0.6)" : "rgba(244,63,94,0.55)",
                letterSpacing: "0.15em",
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {isGold ? "✦" : "❤"}
            </motion.span>
          </div>

          {/* Sombra projetada */}
          <div style={{
            position: "absolute", bottom: "-20px", left: "8%", right: "8%",
            height: "20px",
            background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
            filter: "blur(7px)",
            pointerEvents: "none",
          }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx]     = useState(0);
  const [done, setDone]         = useState(false);

  // Distribui fotos pelos slots de forma circular
  const validPhotos = ALL_PHOTOS.filter(
    (photo) => photo && photo.trim() !== ""
  );

  const slotPhotos = SLOTS.map(
    (_, i) => validPhotos[i % validPhotos.length]
  );

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const next = p + 1.1;
        if (next >= 100) {
          clearInterval(iv);
          setDone(true);
          setTimeout(onComplete, 1200);
          return 100;
        }
        setMsgIdx(Math.floor((next / 100) * MSGS.length));
        return next;
      });
    }, 40);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#080004" }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(14px) brightness(1.5)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Fundo multi-camada ── */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 90% 70% at 50% 42%, rgba(159,18,57,0.22) 0%, rgba(80,5,30,0.1) 50%, transparent 75%)",
            }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 55% 45% at 20% 80%, rgba(212,175,55,0.07) 0%, transparent 65%)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 50% 40% at 80% 18%, rgba(180,30,60,0.06) 0%, transparent 60%)",
            }} />
            {/* Vinheta cinematográfica */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at center, transparent 28%, rgba(4,0,2,0.82) 100%)",
            }} />
            {/* Scanlines */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.016,
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.8) 3px, rgba(255,255,255,0.8) 4px)",
            }} />
          </div>

          {/* ── Partículas ── */}
          {PARTICLES.map(p => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`, top: `${p.y}%`,
                width: p.size, height: p.size,
                background: p.gold
                  ? `radial-gradient(circle, rgba(212,175,55,${p.opacity + 0.38}), transparent)`
                  : `radial-gradient(circle, rgba(244,63,94,${p.opacity + 0.32}), transparent)`,
              }}
              animate={{ opacity: [p.opacity, p.opacity + 0.5, p.opacity], y: [0, p.dy, 0], scale: [1, p.gold ? 1.7 : 1.3, 1] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* ── Slots de memória (fotos flutuando) ── */}
          {SLOTS.map((slot, i) => (
            <MemorySlot key={i} slot={slot} photoSrc={slotPhotos[i]} index={i} />
          ))}

          {/* ── Coração central ── */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 mb-10"
            style={{ width: 80, height: 80 }}
          >
            {/* Anel externo */}
            <motion.div className="absolute rounded-full" style={{
              width: 130, height: 130, top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              border: "1px solid rgba(244,63,94,0.2)",
            }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <div style={{ position: "absolute", top: -2.5, left: "50%", transform: "translateX(-50%)", width: 5, height: 5, borderRadius: "50%", background: "rgba(244,63,94,0.8)", boxShadow: "0 0 7px rgba(244,63,94,0.9)" }} />
            </motion.div>

            {/* Anel dourado */}
            <motion.div className="absolute rounded-full" style={{
              width: 102, height: 102, top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              border: "1px solid rgba(212,175,55,0.22)",
            }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div style={{ position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "rgba(212,175,55,0.85)", boxShadow: "0 0 6px rgba(212,175,55,0.9)" }} />
            </motion.div>

            {/* Núcleo */}
            <motion.div className="absolute rounded-full flex items-center justify-center" style={{
              width: 80, height: 80, top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(244,63,94,0.14), transparent 70%)",
            }}
              animate={{ boxShadow: ["0 0 22px rgba(244,63,94,0.28)", "0 0 60px rgba(244,63,94,0.7), 0 0 90px rgba(244,63,94,0.18)", "0 0 30px rgba(244,63,94,0.35)", "0 0 65px rgba(244,63,94,0.72)", "0 0 22px rgba(244,63,94,0.28)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                className="text-6xl select-none"
                style={{
                  filter: "drop-shadow(0 0 9px rgba(244,63,94,0.75))"
                }}
                animate={{
                  scale:
                    progress > 90
                      ? [1, 1.35, 0.95, 1.4, 1]
                      : [1, 1.24, 0.97, 1.18, 1]
                }}
                transition={{
                  duration: progress > 90 ? 0.9 : 1.9,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ❤️
              </motion.span>
            </motion.div>
          </motion.div>

          {/* ── Mensagem ── */}
          <motion.p
            key={msgIdx}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 text-white/65 text-sm font-light tracking-[0.22em] uppercase mb-10 text-center px-8"
            style={{
              textShadow: "0 0 20px rgba(244,63,94,0.35)",
              maxWidth: "500px"
            }}
          >
            {MSGS[Math.min(msgIdx, MSGS.length - 1)]}
          </motion.p>

          {/* ── Barra de progresso ── */}
          <div className="relative z-10" style={{ width: 200 }}>
            <div style={{ width: "100%", height: 3, borderRadius: 9999, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
              <motion.div style={{
                position: "absolute", left: 0, top: 0, height: "100%",
                width: `${progress}%`, borderRadius: 9999,
                background: "linear-gradient(90deg, #9f1239, #f43f5e 60%, #D4AF37)",
              }} transition={{ ease: "easeOut", duration: 0.08 }} />
              {/* Glow no tip */}
              <motion.div style={{
                position: "absolute", top: 0, height: "100%",
                left: `${Math.max(0, progress - 14)}%`, width: "14%",
                background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.85), rgba(212,175,55,0.6))",
                filter: "blur(2px)",
              }} transition={{ ease: "easeOut", duration: 0.08 }} />
            </div>
            {/* Leading dot */}
            <motion.div style={{
              position: "absolute", width: 5, height: 5, borderRadius: "50%",
              top: "50%", transform: "translateY(-50%)",
              left: `${progress}%`, marginLeft: -2.5,
              background: "#f43f5e",
              boxShadow: "0 0 8px rgba(244,63,94,0.9), 0 0 18px rgba(244,63,94,0.4)",
            }} transition={{ ease: "easeOut", duration: 0.08 }} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="reveal"
          className="fixed inset-0 z-[9998]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: "#080004" }}
        />
      )}
    </AnimatePresence>
  );
}