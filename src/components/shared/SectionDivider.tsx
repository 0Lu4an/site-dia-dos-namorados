"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative flex items-center justify-center py-2 overflow-hidden">
      <motion.div
        className="divider-gradient w-full max-w-3xl mx-6"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className="absolute flex items-center gap-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <span className="text-rose-500/40 text-xs">✦</span>
      </motion.div>
    </div>
  );
}
