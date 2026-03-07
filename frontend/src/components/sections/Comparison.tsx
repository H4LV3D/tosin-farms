import React from "react";
import Image from "next/image";

export function Comparison() {
  return (
    <section className="py-24 lg:py-32 dark-section text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-900/15 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <span className="reveal inline-block text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">
            Why It Matters
          </span>
          <h2 className="reveal font-display text-3xl lg:text-5xl font-semibold tracking-tight mb-6">
            Farm-Direct vs. Market:
            <br />
            The Real Difference
          </h2>
          <p className="reveal text-stone-400 text-lg leading-relaxed">
            When you buy from Tosi Farms, you&apos;re not just getting food —
            you&apos;re getting quality, freshness, and trust you can taste.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="reveal bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest font-bold text-stone-500">
                <div className="col-span-1">What You Get</div>
                <div className="text-right">Market / Trader</div>
                <div className="text-right text-amber-400">Tosi Farms</div>
                <div className="text-right">Advantage</div>
              </div>
              <div className="divide-y divide-white/5 text-sm">
                <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/5 transition-colors items-center group">
                  <div className="col-span-1 font-medium text-white group-hover:text-amber-300 transition-colors">
                    Days since harvest
                  </div>
                  <div className="text-right text-stone-500">3–10 days</div>
                  <div className="text-right text-white font-medium">
                    Same day
                  </div>
                  <div className="text-right">
                    <span className="inline-block py-1 px-2 rounded bg-green-500/20 text-green-400 text-xs font-bold">
                      Far Fresher
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/5 transition-colors items-center group">
                  <div className="col-span-1 font-medium text-white group-hover:text-amber-300 transition-colors">
                    Garri quality
                  </div>
                  <div className="text-right text-stone-500">Mixed sources</div>
                  <div className="text-right text-white font-medium">
                    Single-farm batch
                  </div>
                  <div className="text-right">
                    <span className="inline-block py-1 px-2 rounded bg-green-500/20 text-green-400 text-xs font-bold">
                      Consistent
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/5 transition-colors items-center group">
                  <div className="col-span-1 font-medium text-white group-hover:text-amber-300 transition-colors">
                    Traceability
                  </div>
                  <div className="text-right text-stone-500">
                    Unknown origin
                  </div>
                  <div className="text-right text-white font-medium">
                    100% traceable
                  </div>
                  <div className="text-right">
                    <span className="inline-block py-1 px-2 rounded bg-green-500/20 text-green-400 text-xs font-bold">
                      Full Trust
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/5 transition-colors items-center group">
                  <div className="col-span-1 font-medium text-white group-hover:text-amber-300 transition-colors">
                    Artificial additives
                  </div>
                  <div className="text-right text-stone-500">Sometimes</div>
                  <div className="text-right text-white font-medium">Never</div>
                  <div className="text-right">
                    <span className="inline-block py-1 px-2 rounded bg-amber-500/20 text-amber-400 text-xs font-bold">
                      Pure
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-6 bg-amber-900/10 hover:bg-amber-900/20 transition-colors items-center border-l-2 border-amber-500">
                  <div className="col-span-1 font-bold text-white">
                    Who you support
                  </div>
                  <div className="text-right text-stone-500">
                    Long supply chain
                  </div>
                  <div className="text-right font-bold text-amber-400">
                    Local farmers
                  </div>
                  <div className="text-right">
                    <span className="inline-block py-1 px-2 rounded bg-amber-500 text-white text-xs font-bold">
                      Community
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="reveal relative h-full min-h-[400px] rounded-2xl overflow-hidden group border border-white/5">
              <Image
                src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=75"
                alt="Fresh farm produce basket"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black via-black/80 to-transparent pt-24">
                <div className="p-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                  <p className="text-[10px] text-amber-400 uppercase tracking-widest font-bold mb-2">
                    The Bottom Line
                  </p>
                  <div className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
                    You Know Your Farmer.
                  </div>
                  <span className="text-sm text-stone-300 leading-snug block">
                    Fresh, naturally grown, processed on-site. That&apos;s the
                    Tosi Farms difference.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
