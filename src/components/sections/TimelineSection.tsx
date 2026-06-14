"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { timelineEvents } from "@/data/loveData";
import { X } from "lucide-react";
import ChapterButton from "@/components/shared/ChapterButton";

interface Event {
  id: string; date: string; title: string;
  description: string; photo: string; emoji: string; position?: string;
}

function EventCard({ event, index, onClick }: { event: Event; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      className="cursor-pointer group rounded-2xl overflow-hidden h-full flex flex-col"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div className="relative h-36 md:h-44 overflow-hidden">
        <img src={event.photo} alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" style={{ objectPosition: event.position || "center" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(8,0,4,0.85) 100%)" }} />
        <div className="absolute top-3 right-3 text-lg">{event.emoji}</div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-rose-400/70 text-[10px] tracking-widest uppercase mb-1">{event.date}</p>
        <h3 className="text-white font-semibold text-sm md:text-base leading-snug mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{event.title}</h3>
        <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{event.description}</p>
        <p className="text-rose-400/40 text-[10px] mt-auto pt-3 font-medium">Toque para expandir →</p>
      </div>
    </motion.div>
  );
}

interface Props { onAdvance: () => void; }

export default function TimelineSection({ onAdvance }: Props) {
  const [open, setOpen] = useState<Event | null>(null);

  return (
    <section className="relative min-h-screen py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 45% at 30% 50%, rgba(114,47,55,0.1) 0%, transparent 60%)" }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass-rose rounded-full px-4 py-2 mb-5 text-rose-300 text-xs tracking-wide"
          >📖 Nossa história</motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-fluid-lg font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >Momentos que guardaremos para sempre</motion.h2>
        </div>

        {/* Timeline grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {timelineEvents.map((e, i) => (
            <EventCard key={e.id} event={e} index={i} onClick={() => setOpen(e)} />
          ))}
        </div>

        <ChapterButton label="Continuar" onClick={onAdvance} delay={0.2} />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={() => setOpen(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 36 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, y: 36 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10 max-w-md w-full rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(28,5,14,0.97), rgba(12,0,7,0.99))",
                border: "1px solid rgba(244,63,94,0.2)",
                boxShadow: "0 0 60px rgba(244,63,94,0.12), 0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={open.photo} alt={open.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(28,5,14,0.95) 100%)" }} />
                <button onClick={() => setOpen(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-rose-400/70 text-xs tracking-widest uppercase mb-2">{open.emoji} {open.date}</p>
                <h3 className="text-white text-xl font-bold mb-4 leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{open.title}</h3>
                <p className="text-white/60 leading-relaxed">{open.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
