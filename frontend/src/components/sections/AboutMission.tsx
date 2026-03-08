import React from "react";
import { Target, Eye } from "lucide-react";

export function AboutMission() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <div className="group p-10 rounded-[3rem] bg-white border border-stone-100 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-700/10 flex items-center justify-center mb-8 group-hover:bg-amber-700 group-hover:text-white transition-all duration-500">
              <Target className="w-8 h-8 text-amber-700 group-hover:text-white" />
            </div>
            <h3 className="font-display text-3xl font-bold text-stone-800 mb-6 italic">
              Our Mission
            </h3>
            <p className="text-stone-600 leading-relaxed text-lg font-light">
              To be the trusted source of premium agricultural products in our
              region, supporting local communities through sustainable farming
              practices and exceptional customer service. We believe in food
              that is as honest as the people who grow it.
            </p>
          </div>

          {/* Vision */}
          <div className="group p-10 rounded-[3rem] bg-[#1c1917] text-white shadow-2xl shadow-stone-900/20 hover:shadow-amber-900/20 transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
              <Eye className="w-8 h-8 text-amber-400 group-hover:text-white" />
            </div>
            <h3 className="font-display text-3xl font-bold text-white mb-6 italic">
              Our Vision
            </h3>
            <p className="text-stone-400 leading-relaxed text-lg font-light">
              To create a thriving agricultural ecosystem that benefits farmers,
              customers, and the environment, while preserving traditional
              farming knowledge for future generations. We aim to set the gold
              standard for modern agriculture in Africa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
