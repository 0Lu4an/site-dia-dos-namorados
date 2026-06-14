"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const TOTAL = 5;
const POSITIONS = [
  { id: 1, top: "14%", left: "2.5%" },
  { id: 2, top: "38%", right: "2%" },
  { id: 3, top: "55%", left: "1.5%" },
  { id: 4, top: "72%", right: "3%" },
  { id: 5, top: "88%", left: "4%" },
];

export default function HeartHunt() {
  const [found, setFound] = useState<number[]>([]);
  const [toast, setToast] = useState(false);
  const [reward, setReward] = useState(false);

  const find = (id: number) => {
    if (found.includes(id)) return;
    const next = [...found, id];
    setFound(next);
    if (next.length === TOTAL) { setReward(true); return; }
    setToast(true);
    setTimeout(() => setToast(false), 2600);
  };

  return (
    <>
      {POSITIONS.map(p => (
        <AnimatePresence key={p.id}>
          {!found.includes(p.id) && (
            <motion.button
              className="fixed z-30 cursor-pointer select-none"
              style={{ top: p.top, left: p.left, right: (p as any).right }}
              onClick={() => find(p.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0.7, 1, 0.7], opacity: [0.15, 0.25, 0.15], rotate: [0, 6, -6, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              title="Coração encontrado!"
            >
              <span className="text-rose-500 text-sm leading-none">♥</span>
            </motion.button>
          )}
        </AnimatePresence>
      ))}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -14, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.85 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-full px-4 py-2 text-xs text-white/85 flex items-center gap-2"
              style={{
                background: "rgba(10,0,5,0.88)",
                border: "1px solid rgba(244,63,94,0.28)",
                backdropFilter: "blur(16px)",
              }}>
              <span>❤️</span>
              <span>Coração encontrado! {found.length}/{TOTAL}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward */}
      <AnimatePresence>
        {reward && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setReward(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.72, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.72 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10 max-w-sm w-full rounded-3xl p-8 text-center"
              style={{
                background: "linear-gradient(145deg, rgba(159,18,57,0.28), rgba(10,0,5,0.97))",
                border: "1px solid rgba(244,63,94,0.28)",
                boxShadow: "0 0 60px rgba(244,63,94,0.18)",
              }}
            >
              <motion.div className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8, repeat: 3 }}>🏆</motion.div>
              <h3 className="text-white text-xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Conquista desbloqueada!
              </h3>
              <p className="text-rose-300/75 text-sm mb-2">Caçadora de Corações ❤️</p>
              <p className="text-white/45 text-sm mb-6 leading-relaxed">
                Você encontrou todos os {TOTAL} corações escondidos.<br />
                Assim como encontrou o meu.
              </p>
              <button onClick={() => setReward(false)}
                className="px-6 py-3 rounded-full text-white text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #9f1239, #f43f5e)" }}>
                ❤️ Obrigada!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
