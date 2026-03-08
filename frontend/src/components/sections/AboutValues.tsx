import React from "react";
import { Heart, Tractor, Users, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Quality",
    description:
      "We never compromise on the quality of our products, ensuring the best for our customers.",
  },
  {
    icon: Tractor,
    title: "Sustainability",
    description:
      "Our farming practices protect the environment and ensure long-term viability.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We're committed to supporting and uplifting our local community.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from farm to delivery.",
  },
];

export function AboutValues() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-800 mb-6 italic">
            Our Values
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
            The principles that guide every seed we plant and every product we
            process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-[2.5rem] border border-stone-100 bg-stone-50 hover:bg-white hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-700/5 flex items-center justify-center mb-6 group-hover:bg-amber-700 group-hover:scale-110 transition-all duration-500">
                <item.icon className="w-7 h-7 text-amber-700 group-hover:text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-stone-800 mb-4">
                {item.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
