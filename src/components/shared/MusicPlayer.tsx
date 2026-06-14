"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { coupleData } from "@/data/loveData";

const BARS = [3, 5, 4, 7, 3, 5, 4];

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(coupleData.music.src);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const update = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", update);
    return () => { audio.removeEventListener("timeupdate", update); audio.pause(); };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); } else { a.play().catch(() => {}); }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 16, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 16 }}
            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-60 rounded-2xl p-4"
            style={{
              background: "rgba(10,0,5,0.92)",
              border: "1px solid rgba(244,63,94,0.22)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 30px rgba(244,63,94,0.12), 0 12px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #9f1239, #f43f5e)" }}>
                <Music size={14} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{coupleData.music.title}</p>
                <p className="text-white/40 text-[10px] truncate">{coupleData.music.artist}</p>
              </div>
            </div>

            <div className="h-0.5 rounded-full mb-3 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #9f1239, #f43f5e)" }} />
            </div>

            <div className="flex items-center justify-between">
              <button onClick={toggleMute} className="text-white/35 hover:text-white/70 transition-colors">
                {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
              <button onClick={toggle}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #9f1239, #f43f5e)" }}>
                {playing ? <Pause size={13} className="text-white" /> : <Play size={13} className="text-white ml-0.5" />}
              </button>
              <span className="text-white/25 text-[10px]">Nossa música</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="relative w-13 h-13 rounded-full flex items-center justify-center"
        style={{
          width: 52, height: 52,
          background: "linear-gradient(135deg, #881337, #f43f5e)",
          boxShadow: "0 0 22px rgba(244,63,94,0.38), 0 4px 14px rgba(0,0,0,0.4)",
        }}
      >
        {playing ? (
          <div className="flex items-end gap-px h-5">
            {BARS.map((h, i) => (
              <motion.div key={i} className="w-0.5 rounded-full bg-white"
                animate={{ height: [h * 2, h * 4, h * 2] }}
                transition={{ duration: 0.5, delay: i * 0.09, repeat: Infinity }}
                style={{ height: h * 2 }} />
            ))}
          </div>
        ) : (
          <Music size={19} className="text-white" />
        )}

        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full border border-rose-400/40"
            animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
