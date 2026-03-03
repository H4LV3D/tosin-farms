import React from "react";

export function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 pattern-bg">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <span className="reveal inline-block text-[10px] uppercase tracking-[0.2em] text-amber-700 font-bold mb-6">
              Our Process
            </span>
            <h2 className="reveal font-display text-3xl lg:text-4xl font-semibold text-[#1c1917] mb-10">
              From Planting to
              <br />
              Your Doorstep
            </h2>

            <div className="space-y-10">
              <div className="reveal flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-[#1c1917] group-hover:bg-amber-700 group-hover:text-white transition-colors duration-300 font-display font-bold text-lg">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-[#1c1917] mb-2">
                    Soil Preparation &amp; Planting
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    We prepare our land with organic compost and plant
                    high-yielding, disease-resistant varieties of cassava,
                    maize, and fruits.
                  </p>
                </div>
              </div>
              <div className="reveal flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-[#1c1917] group-hover:bg-amber-700 group-hover:text-white transition-colors duration-300 font-display font-bold text-lg">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-[#1c1917] mb-2">
                    Careful Cultivation
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Our team monitors every crop — weeding, mulching, and
                    managing pests naturally so you receive clean, healthy
                    produce.
                  </p>
                </div>
              </div>
              <div className="reveal flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-[#1c1917] group-hover:bg-amber-700 group-hover:text-white transition-colors duration-300 font-display font-bold text-lg">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-[#1c1917] mb-2">
                    On-Farm Processing
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Our garri and flours are processed fresh on the farm using
                    hygienic equipment — from peeling and grating to frying and
                    sieving.
                  </p>
                </div>
              </div>
              <div className="reveal flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-[#1c1917] group-hover:bg-amber-700 group-hover:text-white transition-colors duration-300 font-display font-bold text-lg">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-[#1c1917] mb-2">
                    Delivered Locally
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    We supply households, markets, and businesses within our
                    region — quickly and reliably, straight from the farm.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <figure className="reveal relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=900&q=80"
                alt="Farmer working in cassava field"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1c1917]/20"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/90 backdrop-blur p-6 rounded-xl border border-white/40 shadow-lg">
                  <p className="font-display text-[#1c1917] font-medium italic text-sm leading-relaxed">
                    "We grow what we know. Every crop on Tosi Farms is handled
                    with experience passed down through generations of farming."
                  </p>
                  <p className="text-xs text-stone-500 mt-3 font-semibold uppercase tracking-widest">
                    — Tosi Farms Team
                  </p>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
