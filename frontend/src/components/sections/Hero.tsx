"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsLoaded } from "@/hooks/useIsLoaded";
import { StaggerContainer, StaggerItem } from "@/components/shared/MotionComponents";

const EASE = [0.22, 1, 0.36, 1] as const;

// Each hero block: opacity 0 + y 40 → 1 + y 0, triggered only once isLoaded is true.
function HeroBlock({
  children,
  delay = 0,
  isLoaded,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  isLoaded: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const isLoaded = useIsLoaded(1550); // slightly after the loader fade-out (1500 + 50ms buffer)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-10 h-screen w-full">
        <Image
          src="https://images.unsplash.com/photo-1507662228758-08d030c4820b?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Lush green farmland"
          fill
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#1c1917]/95 via-[#1c1917]/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#1c1917] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* ── Left column ─────────────────────────────────── */}
          <div className="lg:col-span-7">
            <HeroBlock isLoaded={isLoaded} delay={0}>
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Grown &amp; Processed Locally
              </div>
            </HeroBlock>

            <HeroBlock isLoaded={isLoaded} delay={0.12}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight mb-8">
                Fresh Crops.
                <br />
                <em className="not-italic text-gold">Real Harvest.</em>
                <br />
                Honest Food.
              </h1>
            </HeroBlock>

            <HeroBlock isLoaded={isLoaded} delay={0.22}>
              <p className="text-lg text-stone-300 max-w-lg mb-10 leading-relaxed font-light">
                From our cassava fields and maize farms to freshly processed garri
                — Tosi Farms brings the best of the land straight to your table.
                Grown with care, delivered with pride.
              </p>
            </HeroBlock>

            <HeroBlock isLoaded={isLoaded} delay={0.32}>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link
                  href="/shop"
                  className="btn-shimmer group inline-flex items-center justify-center gap-3 bg-amber-700 hover:bg-amber-600 text-white rounded-full py-4 px-8 shadow-xl shadow-amber-900/30 transition-all duration-300"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">
                    See Our Products
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="#difference"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white rounded-full py-4 px-8 hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  Our Farm Story
                </a>
              </div>
            </HeroBlock>

            <HeroBlock isLoaded={isLoaded} delay={0.42}>
              <div className="flex flex-wrap items-center gap-10 border-t border-white/10 pt-8">
                <StaggerContainer className="flex flex-wrap items-center gap-10">
                  {[
                    { value: "100%", label: "Locally Grown" },
                    { value: "20+", label: "Products Available" },
                    { value: "Farm-Fresh", label: "No Middlemen" },
                  ].map((stat) => (
                    <StaggerItem key={stat.label}>
                      <div className="font-display text-3xl font-semibold text-white">{stat.value}</div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mt-1">
                        {stat.label}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </HeroBlock>
          </div>

          {/* ── Right column ────────────────────────────────── */}
          <div className="lg:col-span-5 hidden lg:block">
            <HeroBlock isLoaded={isLoaded} delay={0.18}>
              <figure className="relative h-[68vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                <Image
                  src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=900&q=80"
                  alt="Freshly harvested cassava roots"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1c1917]/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="px-2 py-1 bg-white/10 backdrop-blur rounded text-[10px] text-white font-bold uppercase tracking-widest border border-white/10 inline-block mb-3">
                    Freshly Harvested
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white mb-1">
                    Straight from the Farm
                  </h3>
                  <p className="text-sm text-stone-300">
                    Cassava, maize, fruits &amp; more — picked at peak quality.
                  </p>
                </div>
              </figure>
            </HeroBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
