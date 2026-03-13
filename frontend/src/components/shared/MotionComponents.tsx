"use client";

import { motion, Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: false, margin: "0px 0px -60px 0px" };

// ─── FadeSlideUp ─────────────────────────────────────────────────────────────
// Wraps any child with a fade + slide-up animation triggered by viewport entry.
// Elements animate back to their initial state when leaving the viewport.

interface FadeSlideUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeSlideUp({
  children,
  delay = 0,
  className = "",
}: FadeSlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerContainer ─────────────────────────────────────────────────────────
// Parent wrapper that triggers staggered children on viewport entry.

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export function StaggerContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ──────────────────────────────────────────────────────────────
// Direct child of StaggerContainer. Animates in sequence with siblings.

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
