import React from "react";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative h-[60vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=3400&auto=format&fit=crop"
          alt="Golden wheat field at sunset"
          className="object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full text-center">
        <div className="reveal inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          Our Legacy & Future
        </div>
        <h1 className="reveal font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight tracking-tight mb-6 italic">
          Cultivating <span className="text-gold">Excellence</span> <br />
          Since Day One.
        </h1>
        <p className="reveal text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
          Tosi Farms isn't just a business; it's a commitment to the land, the
          community, and the future of sustainable agriculture in Nigeria.
        </p>
      </div>
    </section>
  );
}
