"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { galleryPhotos } from "@/data/loveData";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ChapterButton from "@/components/shared/ChapterButton";

interface Props { onAdvance: () => void; }

export default function GallerySection({ onAdvance }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const nav = (d: 1 | -1) => {
    if (selected === null) return;
    setSelected((selected + d + galleryPhotos.length) % galleryPhotos.length);
  };

  return (
    <section className="relative min-h-screen py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 45% at 70% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass-rose rounded-full px-4 py-2 mb-5 text-rose-300 text-xs tracking-wide"
          >📸 Nossas memórias</motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-fluid-lg font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >Galeria de momentos</motion.h2>
        </div>

        {/* Polaroid grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mb-14">
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50, rotate: photo.rotation }}
              whileInView={{ opacity: 1, y: 0, rotate: photo.rotation }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.06, rotate: 0, y: -8, zIndex: 10,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(244,63,94,0.18)" }}
              className="polaroid cursor-pointer group"
              onClick={() => setSelected(i)}
            >
              <div className="relative overflow-hidden aspect-square">
                <img src={photo.src} alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-rose-900/15 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-center text-gray-500 text-[11px] mt-3 font-light italic tracking-wide">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>

        <ChapterButton label="Tenho algo para te mostrar" onClick={onAdvance} delay={0.2} icon="✨" />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-black/92 backdrop-blur-2xl" onClick={() => setSelected(null)} />
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 max-w-sm w-full mx-4"
            >
              <div className="polaroid">
                <img src={galleryPhotos[selected].src} alt={galleryPhotos[selected].caption}
                  className="w-full aspect-square object-cover" />
                <p className="text-center text-gray-500 text-sm mt-4 italic font-light">
                  {galleryPhotos[selected].caption}
                </p>
              </div>
            </motion.div>
            <button onClick={() => nav(-1)}
              className="absolute left-4 z-10 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-white/10">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => nav(1)}
              className="absolute right-4 z-10 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-white/10">
              <ChevronRight size={18} />
            </button>
            <button onClick={() => setSelected(null)}
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full glass flex items-center justify-center text-white/60 hover:text-white">
              <X size={14} />
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {galleryPhotos.map((_, i) => (
                <button key={i} onClick={() => setSelected(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{ background: i === selected ? "#f43f5e" : "rgba(255,255,255,0.3)" }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
