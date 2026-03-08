import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="relative p-12 md:p-20 rounded-[4rem] bg-[#1c1917] overflow-hidden text-center group">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-amber-500/20 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-700/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl lg:leading-[72px] font-black text-white mb-8">
              Ready to <span className="text-gold">Experience</span> <br />
              Our Quality?
            </h2>
            <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed mb-12">
              Visit our shop to explore our full range of fresh, high-quality
              products delivered straight from our farm to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/shop"
                className="btn-shimmer group inline-flex items-center justify-center gap-3 bg-amber-700 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-widest px-10 py-5 rounded-full transition-all hover:scale-105 shadow-2xl shadow-amber-900/40"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest px-14 py-5 rounded-full border border-white/10 transition-all backdrop-blur-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
