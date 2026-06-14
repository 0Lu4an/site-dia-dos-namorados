"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { lovingThings } from "@/data/loveData";
import ChapterButton from "@/components/shared/ChapterButton";
import { X } from "lucide-react";

interface Props { onAdvance: () => void; }

export default function LoveThingsSection({ onAdvance }: Props) {
  const [opened, setOpened] = useState<number | null>(null);
  const item = opened !== null ? lovingThings[opened] : null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 85% 55% at 50% 50%, rgba(159,18,57,0.1) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass-rose rounded-full px-4 py-2 mb-5 text-rose-300 text-xs tracking-wide"
          >💝 Por que eu te amo</motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-fluid-lg font-bold gradient-text mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >Coisas que me fazem te amar mais</motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/35 text-xs"
          >(Clique em cada card para ver a mensagem)</motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-6">
          {lovingThings.map((thing, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 38, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.06, y: -6 }}
              onClick={() => setOpened(i)}
              className="group relative rounded-2xl p-5 cursor-pointer transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(244,63,94,0.09), transparent 70%)", border: "1px solid rgba(244,63,94,0.22)" }} />

              <motion.div
                className="text-3xl mb-3 relative z-10 block"
                whileHover={{ scale: 1.22, rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
              >{thing.emoji}</motion.div>
              <h3 className="text-white font-semibold text-sm mb-1.5 relative z-10">{thing.title}</h3>
              <p className="text-white/35 text-xs leading-relaxed relative z-10 line-clamp-2">{thing.description}</p>
              <p className="text-rose-400/40 text-[10px] mt-2 relative z-10 font-medium">Ver mais →</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
          className="text-center text-white/25 text-xs italic mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >(Mas a lista é infinita...)</motion.p>

        <ChapterButton label="Última surpresa" onClick={onAdvance} delay={1.2} icon="✨" />
      </div>

      {/* Card detail modal */}
      <AnimatePresence>
        {item !== null && opened !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setOpened(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.78, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.78, y: 30 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10 max-w-sm w-full rounded-3xl p-8 text-center"
              style={{
                background: "linear-gradient(145deg, rgba(28,5,14,0.97), rgba(14,0,7,0.99))",
                border: "1px solid rgba(244,63,94,0.2)",
                boxShadow: "0 0 60px rgba(244,63,94,0.12), 0 24px 70px rgba(0,0,0,0.5)",
              }}
            >
              <motion.div
                className="text-6xl mb-5"
                animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >{item.emoji}</motion.div>
              <h3 className="text-white text-xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              <button onClick={() => setOpened(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white/45 hover:text-white transition-colors">
                <X size={13} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
