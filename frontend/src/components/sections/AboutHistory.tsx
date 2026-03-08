import React from "react";
import Image from "next/image";

export function AboutHistory() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl z-10">
              <Image
                src="https://images.unsplash.com/photo-1622123651884-e3d30eebfbff?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Farmer working in the field"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                fill
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-700 rounded-[2rem] -z-10 animate-pulse-slow"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-amber-200 rounded-full -z-10"></div>
          </div>

          <div className="space-y-8">
            <div className="reveal inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-700/10 border border-amber-700/20 text-amber-700 text-[10px] font-bold uppercase tracking-widest">
              Established 2014
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-800">
              Our Story
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed text-lg font-light">
              <p>
                Tosi Farms began with a simple vision: to provide fresh,
                high-quality agricultural products to our local community while
                maintaining sustainable farming practices.
              </p>
              <p>
                For years, we&apos;ve been cultivating the finest cassava,
                maize, fruits, and garri, building strong relationships with
                households, traders, and businesses throughout our region.
              </p>
              <p>
                Our commitment to quality starts with the soil and extends
                through every step of our process, ensuring that what reaches
                your table is nothing but the best.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
