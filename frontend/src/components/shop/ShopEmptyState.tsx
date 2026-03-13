"use client";

import { motion } from "framer-motion";
import { Search, RotateCcw, Leaf } from "lucide-react";

interface ShopEmptyStateProps {
  searchQuery?: string;
  activeCategory?: string;
  onReset: () => void;
}

const SEED_DOTS = [
  { cx: "20%", cy: "30%", r: 3, delay: 0 },
  { cx: "75%", cy: "20%", r: 2, delay: 0.4 },
  { cx: "85%", cy: "65%", r: 2.5, delay: 0.8 },
  { cx: "10%", cy: "70%", r: 2, delay: 0.2 },
  { cx: "60%", cy: "85%", r: 3, delay: 0.6 },
  { cx: "40%", cy: "10%", r: 1.5, delay: 1.0 },
];

export function ShopEmptyState({
  searchQuery,
  activeCategory,
  onReset,
}: ShopEmptyStateProps) {
  const hasFilters =
    (searchQuery && searchQuery.trim().length > 0) ||
    (activeCategory && activeCategory !== "all");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="relative flex flex-col items-center justify-center py-24 px-6 select-none overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[420px] h-[420px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      {/* Floating seed dots */}
      {SEED_DOTS.map((dot, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-amber-400/20"
          style={{
            left: dot.cx,
            top: dot.cy,
            width: dot.r * 2,
            height: dot.r * 2,
          }}
          animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main illustration */}
      <motion.div
        className="relative mb-8 z-10"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Outer ring */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Dashed orbit ring */}
          <svg
            viewBox="0 0 144 144"
            className="absolute inset-0 w-full h-full"
            aria-hidden
          >
            <circle
              cx="72"
              cy="72"
              r="66"
              fill="none"
              stroke="#d97706"
              strokeOpacity="0.15"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          </svg>

          {/* Inner circle with icon */}
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-amber-50 to-stone-100 border border-amber-200/60 shadow-inner flex items-center justify-center">
            {hasFilters ? (
              <Search className="w-9 h-9 text-amber-700/50" strokeWidth={1.5} />
            ) : (
              <Leaf className="w-9 h-9 text-amber-700/50" strokeWidth={1.5} />
            )}
          </div>

          {/* Small orbiting leaves */}
          {[0, 120, 240].map((deg, i) => (
            <motion.div
              key={i}
              aria-hidden
              className="absolute w-5 h-5 flex items-center justify-center"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
              }}
              animate={{ rotate: [deg, deg + 360] }}
              transition={{
                duration: 18 + i * 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span
                className="block text-amber-500/30 text-xs leading-none"
                style={{
                  transform: `translate(${Math.cos((deg * Math.PI) / 180) * 58}px, ${Math.sin((deg * Math.PI) / 180) * 58}px)`,
                }}
              >
                ✦
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Text */}
      <div className="relative z-10 text-center max-w-sm">
        <h3 className="font-display text-earth text-2xl font-semibold mb-2 tracking-tight">
          {hasFilters ? "No matches found" : "The harvest is on its way"}
        </h3>
        <p className="text-stone-400 text-sm leading-relaxed mb-1">
          {hasFilters ? (
            <>
              We couldn&apos;t find any products
              {searchQuery && (
                <>
                  {" "}
                  for &ldquo;
                  <span className="text-amber-700 font-medium">
                    {searchQuery}
                  </span>
                  &rdquo;
                </>
              )}
              {activeCategory && activeCategory !== "all" && (
                <>
                  {" "}
                  in{" "}
                  <span className="text-amber-700 font-medium capitalize">
                    {activeCategory}
                  </span>
                </>
              )}
              .
            </>
          ) : (
            "Our farmhands are stocking the shelves. Check back soon for fresh produce and farm goods."
          )}
        </p>

        {hasFilters && (
          <p className="text-stone-400 text-sm mb-7">
            Try broadening your search or clearing your filters.
          </p>
        )}

        {!hasFilters && <div className="mb-7" />}

        {/* Suggestion chips */}
        {hasFilters && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {["All Products", "Vegetables", "Grains", "Dairy"].map((label) => (
              <span
                key={label}
                className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/70 cursor-default"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        {hasFilters && (
          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-700 text-white text-sm font-medium shadow-sm hover:bg-amber-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear filters
          </motion.button>
        )}
      </div>

      {/* Bottom ornament */}
      <motion.p
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative z-10 mt-10 text-[10px] text-stone-300 uppercase tracking-[0.25em] font-bold"
      >
        Tosin Farms · Ogun State
      </motion.p>
    </motion.div>
  );
}
