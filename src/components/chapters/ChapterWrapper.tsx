"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type ChapterId } from "@/hooks/useChapterFlow";

interface Props {
  chapterId: ChapterId;
  current: ChapterId;
  children: React.ReactNode;
}

export default function ChapterWrapper({ chapterId, current, children }: Props) {
  const isActive = chapterId === current;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={chapterId}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30, scale: 0.98 }}
          transition={{
            enter: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            exit: { duration: 0.45, ease: [0.4, 0, 1, 1] },
          }}
          className="min-h-screen w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
