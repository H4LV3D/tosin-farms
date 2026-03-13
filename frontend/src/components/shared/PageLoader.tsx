"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Lock scroll so the page behind is completely hidden
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    const duration = 1300;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      setVisible(false);
      // Restore scroll once the loader exit animation begins
      document.body.style.overflow = "";
    }, 1500);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-10001 flex flex-col items-center justify-center bg-[#1c1917]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
              Tosi Farms
            </p>
            <h1 className="font-display text-white text-2xl lg:text-3xl font-semibold">
              From Our Fields to Your Table
            </h1>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-500 rounded-full origin-left"
              style={{ scaleX: progress / 100 }}
              transition={{ ease: "linear" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-[10px] text-stone-600 uppercase tracking-widest font-bold"
          >
            Loading&hellip;
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
