"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChapterFlow } from "@/hooks/useChapterFlow";

import LoadingScreen from "@/components/sections/LoadingScreen";
import HeroSection from "@/components/sections/HeroSection";
import CounterSection from "@/components/sections/CounterSection";
import FirstMomentSection from "@/components/sections/FirstMomentSection";
import TimelineSection from "@/components/sections/TimelineSection";
import GallerySection from "@/components/sections/GallerySection";
import QuizSection from "@/components/sections/QuizSection";
import SecretLettersSection from "@/components/sections/SecretLettersSection";
import LoveThingsSection from "@/components/sections/LoveThingsSection";
import FinalSurpriseSection from "@/components/sections/FinalSurpriseSection";

import MusicPlayer from "@/components/shared/MusicPlayer";
import HeartHunt from "@/components/shared/HeartHunt";

export default function Home() {
  const { current, advance } = useChapterFlow();
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    if (loadingDone) advance();
  }, [loadingDone]);

  return (
    <main className="noise relative bg-[#080004] min-h-screen overflow-hidden">
      <AnimatePresence>
        {current === "loading" && (
          <LoadingScreen key="loading" onComplete={() => setLoadingDone(true)} />
        )}
      </AnimatePresence>

      {current !== "loading" && (
        <>
          <HeartHunt />
          <MusicPlayer />

          <AnimatePresence mode="wait">
            {current === "hero" && (
              <Chapter key="hero" dir={1}>
                <HeroSection onAdvance={advance} />
              </Chapter>
            )}
            {current === "counter" && (
              <Chapter key="counter" dir={1}>
                <CounterSection onAdvance={advance} />
              </Chapter>
            )}
            {current === "first-moment" && (
              <Chapter key="first-moment" dir={1}>
                <FirstMomentSection onAdvance={advance} />
              </Chapter>
            )}
            {current === "timeline" && (
              <Chapter key="timeline" dir={1}>
                <TimelineSection onAdvance={advance} />
              </Chapter>
            )}
            {current === "gallery" && (
              <Chapter key="gallery" dir={1}>
                <GallerySection onAdvance={advance} />
              </Chapter>
            )}
            {current === "quiz" && (
              <Chapter key="quiz" dir={1}>
                <QuizSection onAdvance={advance} />
              </Chapter>
            )}
            {current === "letters" && (
              <Chapter key="letters" dir={1}>
                <SecretLettersSection onAdvance={advance} />
              </Chapter>
            )}
            {current === "love-things" && (
              <Chapter key="love-things" dir={1}>
                <LoveThingsSection onAdvance={advance} />
              </Chapter>
            )}
            {current === "finale" && (
              <Chapter key="finale" dir={1}>
                <FinalSurpriseSection />
              </Chapter>
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}

function Chapter({ children, dir = 1 }: { children: React.ReactNode; dir?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: dir * 60, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: dir * -50, scale: 0.96 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
}
