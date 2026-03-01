import React from "react";

export function WhyChooseUs() {
  return (
    <section id="difference" className="py-24 lg:py-32 pattern-bg">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <figure className="reveal relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] ring-1 ring-black/5 group">
              <img
                src="https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?w=900&q=80"
                alt="African farmer in the field"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="px-3 py-1.5 bg-amber-600/90 backdrop-blur rounded-full text-[10px] uppercase font-bold text-white tracking-widest mb-3 inline-block">
                  Rooted in Community
                </span>
                <p className="font-display text-white text-2xl font-medium tracking-tight">
                  Grown with purpose. Shared with pride.
                </p>
              </div>
            </figure>
          </div>

          <div>
            <span className="reveal inline-block text-[10px] uppercase tracking-[0.2em] text-amber-700 font-bold mb-6">
              Why Choose Tosi Farms
            </span>
            <h2 className="reveal font-display text-3xl lg:text-4xl font-semibold text-[#1c1917] mb-6 leading-snug">
              The Challenge of Finding
              <br />
              <em>Truly</em> Fresh, Local Food
            </h2>
            <p className="reveal text-lg text-stone-600 leading-relaxed mb-10">
              Markets are flooded with produce that travels far and sits long.
              At Tosi Farms, everything — from our cassava tubers to our garri
              — is grown right here and processed with traditional care, so you
              get the best nutritional value and flavour every time.
            </p>

            <div className="reveal p-8 bg-white rounded-2xl border border-stone-100 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-amber-800 mb-6 flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                The Tosi Farms Promise
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-amber-700"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1M4.22 4.22l.71.71m14.14 14.14l.71.71M1 12h2m18 0h2M4.22 19.78l.71-.71M18.36 5.64l.71-.71"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#1c1917] mb-1">
                      Farm-Direct Quality
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      No middlemen. You buy straight from us — fresher produce,
                      fairer prices.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-amber-700"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#1c1917] mb-1">
                      Naturally Grown
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      We rely on good soil, rain, and traditional knowledge — no
                      harmful shortcuts.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-amber-700"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#1c1917] mb-1">
                      Local &amp; Community-First
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      We serve our region first. Every purchase supports local
                      farming families and livelihoods.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
