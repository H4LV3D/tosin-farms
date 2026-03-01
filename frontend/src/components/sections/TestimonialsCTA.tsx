import React from "react";

export function TestimonialsCTA() {
  return (
    <>
      <section id="testimonials" className="py-24 lg:py-32 pattern-bg">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="reveal inline-block text-[10px] uppercase tracking-[0.2em] text-amber-700 font-bold mb-6">
              What Customers Say
            </span>
            <h2 className="reveal font-display text-3xl lg:text-4xl font-semibold text-[#1c1917]">
              Trusted by Local Families &amp; Traders
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="reveal bg-white rounded-2xl p-8 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4 text-amber-400">★★★★★</div>
              <p className="font-display text-[#1c1917] italic text-base leading-relaxed mb-6">
                "The garri from Tosi Farms is the best I've tasted — crunchy,
                clean, and properly dried. We now buy in bulk for our whole
                compound."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                  AA
                </div>
                <div>
                  <p className="font-bold text-sm text-[#1c1917]">Adaeze A.</p>
                  <p className="text-xs text-stone-500">Regular customer</p>
                </div>
              </div>
            </div>

            <div className="reveal bg-white rounded-2xl p-8 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4 text-amber-400">★★★★★</div>
              <p className="font-display text-[#1c1917] italic text-base leading-relaxed mb-6">
                "I buy their maize for my feed mill every season. Always
                consistent quality and they always have enough in stock. Highly
                reliable farmers."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                  KO
                </div>
                <div>
                  <p className="font-bold text-sm text-[#1c1917]">Kunle O.</p>
                  <p className="text-xs text-stone-500">Feed mill operator</p>
                </div>
              </div>
            </div>

            <div className="reveal bg-white rounded-2xl p-8 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4 text-amber-400">★★★★★</div>
              <p className="font-display text-[#1c1917] italic text-base leading-relaxed mb-6">
                "Their pineapples and plantains are always fresh. I stock my
                market stall from Tosi Farms every week. My customers always
                ask where I get them!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                  NB
                </div>
                <div>
                  <p className="font-bold text-sm text-[#1c1917]">Ngozi B.</p>
                  <p className="text-xs text-stone-500">Market trader</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 dark-section text-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="reveal p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all hover:-translate-y-1">
              <div className="text-amber-400 mb-5">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold mb-2">
                Local Delivery
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                We deliver fresh produce and processed goods within our region
                on scheduled days.
              </p>
            </div>

            <div className="reveal p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all hover:-translate-y-1">
              <div className="text-green-400 mb-5 font-display text-2xl font-bold">
                Bulk
              </div>
              <h3 className="font-display text-base font-semibold mb-2">
                Bulk Orders Welcome
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Whether you need a bag or a truckload — we supply households,
                traders, schools, and processors.
              </p>
            </div>

            <div className="reveal p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all hover:-translate-y-1">
              <div className="text-sky-400 mb-5">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold mb-2">
                Wholesale Supply
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Restaurants, canteens, and market traders — contact us for
                wholesale pricing and regular supply agreements.
              </p>
            </div>

            <div className="reveal p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all hover:-translate-y-1">
              <div className="text-rose-400 mb-5">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 12V22H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold mb-2">
                Farm Hampers
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Gift hampers of our finest garri, dried produce, and seasonal
                fruits. Perfect for celebrations and occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="order" className="py-24 lg:py-32 pattern-bg">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="reveal mb-10">
            <div className="divider-leaf"></div>
            <h2 className="font-display text-3xl lg:text-5xl font-semibold text-[#1c1917] mb-6 leading-tight">
              Ready to Order from
              <br />
              <em className="not-italic text-gold">Tosi Farms?</em>
            </h2>
            <p className="text-lg text-stone-600 max-w-xl mx-auto leading-relaxed">
              Place an order for fresh cassava, maize, fruits, garri, and more.
              We supply households, traders, and businesses across the region.
            </p>
          </div>

          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
            <a
              href="tel:+2340000000000"
              className="btn-shimmer group inline-flex items-center justify-center gap-3 bg-amber-700 hover:bg-amber-600 text-white rounded-full py-4 px-10 shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm font-bold uppercase tracking-widest">
                Call Us to Order
              </span>
            </a>
            <a
              href="mailto:hello@tosifarms.com"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1c1917] py-2 border-b-2 border-transparent hover:border-amber-700 transition-all"
            >
              <span>Send an Email</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>

          <div className="reveal bg-white rounded-2xl border border-stone-100 shadow-sm p-8 text-left">
            <h3 className="font-display text-xl font-semibold text-[#1c1917] mb-6">
              Send Us a Message
            </h3>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Adaeze Johnson"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Phone or Email
                </label>
                <input
                  type="text"
                  placeholder="08012345678"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                What Are You Interested In?
              </label>
              <select className="w-full px-4 py-3 h-12 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition text-stone-700">
                <option value="">Select a product…</option>
                <option>Fresh Cassava</option>
                <option>Maize (Corn)</option>
                <option>
                  Fresh Fruits (Mango, Pineapple, Plantain, Pawpaw)
                </option>
                <option>Garri (White)</option>
                <option>Garri (Yellow)</option>
                <option>Cassava Flour</option>
                <option>Maize Flour</option>
                <option>Wholesale / Bulk Order</option>
                <option>Farm Hamper</option>
                <option>Other / Mixed Order</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                Message / Order Details
              </label>
              <textarea
                rows={3}
                placeholder="Tell us what quantity you need and your location…"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
              ></textarea>
            </div>
            <button
              type="button"
              className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-600 text-white rounded-full py-3.5 px-10 font-bold text-xs uppercase tracking-widest transition-all"
            >
              Send Message
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
