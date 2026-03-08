import React from "react";

const stats = [
  { label: "Acres of Land", value: "50+" },
  { label: "Years of Heritage", value: "10+" },
  { label: "Loyal Customers", value: "1.2k+" },
  { label: "Farm Fresh Products", value: "25+" },
];

export function AboutStats() {
  return (
    <section className="py-20 bg-stone-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="reveal-delayed">
              <div className="font-display text-5xl md:text-6xl font-black text-amber-500 mb-2 italic">
                {stat.value}
              </div>
              <div className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
