"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  onClick: () => void;
  delay?: number;
  icon?: string;
}

export default function ChapterButton({ label, onClick, delay = 0, icon = "→" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className="flex justify-center mt-12"
    >
      <motion.button
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        className="relative inline-flex items-center gap-3 px-9 py-4 rounded-full text-white font-medium text-base overflow-hidden group cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #881337, #f43f5e)",
          boxShadow:
            "0 0 35px rgba(244,63,94,0.38), 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
        animate={{
          boxShadow: [
            "0 0 30px rgba(244,63,94,0.3), 0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
            "0 0 50px rgba(244,63,94,0.5), 0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
            "0 0 30px rgba(244,63,94,0.3), 0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="relative z-10">{label}</span>
        <motion.span
          className="relative z-10"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {icon}
        </motion.span>
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }}
        />
      </motion.button>
    </motion.div>
  );
}
