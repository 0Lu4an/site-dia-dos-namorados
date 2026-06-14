"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { memoryMapLocations } from "@/data/loveData";
import { MapPin, X } from "lucide-react";

export default function MemoryMapSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const selectedLocation = memoryMapLocations.find((l) => l.id === selected);

  return (
    <section className="relative py-24 md:py-40 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(114,47,55,0.1) 0%, transparent 60%)" }}
      />

      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 glass-rose rounded-full px-4 py-2 mb-6 text-rose-300 text-sm tracking-wide"
          >
            📍 Mapa das memórias
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-fluid-lg font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Lugares que nos pertencem
          </motion.h2>
        </div>

        {/* Map-like grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {memoryMapLocations.map((location, i) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setSelected(location.id)}
              className="relative rounded-2xl p-5 md:p-6 cursor-pointer group transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ border: "1px solid rgba(244,63,94,0.3)", boxShadow: "0 0 30px rgba(244,63,94,0.1)" }}
              />

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.2)" }}
                >
                  {location.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={12} className="text-rose-400/60 flex-shrink-0" />
                    <span className="text-rose-400/70 text-xs font-medium tracking-wide truncate">
                      {(location as any).city}
                    </span>
                  </div>
                  <h3
                    className="text-white font-semibold text-base mb-1 leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {location.name}
                  </h3>
                  <p className="text-white/40 text-sm">{location.place}</p>
                </div>
              </div>

              <p className="mt-4 text-white/50 text-sm leading-relaxed line-clamp-2">
                {location.memory}
              </p>

              <motion.p
                className="text-rose-400/50 text-xs mt-3 font-medium"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ver memória →
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && selectedLocation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setSelected(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10 max-w-md w-full rounded-3xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(30,5,15,0.97), rgba(15,0,8,0.99))",
                border: "1px solid rgba(244,63,94,0.2)",
                boxShadow: "0 0 60px rgba(244,63,94,0.1), 0 30px 80px rgba(0,0,0,0.5)",
              }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white/50 hover:text-white"
              >
                <X size={14} />
              </button>

              <motion.div
                className="text-5xl mb-6 text-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {selectedLocation.emoji}
              </motion.div>

              <div className="flex items-center gap-2 mb-2 justify-center">
                <MapPin size={12} className="text-rose-400/60" />
                <span className="text-rose-400/70 text-xs">{selectedLocation.city}</span>
              </div>

              <h3
                className="text-white text-xl font-bold mb-1 text-center"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {selectedLocation.name}
              </h3>
              <p className="text-white/40 text-sm text-center mb-6">{selectedLocation.place}</p>
              <p className="text-white/70 text-base leading-relaxed text-center italic"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "{selectedLocation.memory}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
