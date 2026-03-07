import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Products() {
  const products = [
    {
      id: "cassava",
      title: "Cassava",
      desc: "Fresh, starchy cassava tubers harvested at peak quality. Available in bulk.",
      img: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=600&q=75",
      badge: "Staple Crop",
      badgeColor: "bg-green-600/90",
      perk: "Bulk Available",
    },
    {
      id: "maize",
      title: "Maize (Corn)",
      desc: "Sun-dried and fresh maize, ideal for milling, animal feed, and direct consumption.",
      img: "https://images.unsplash.com/photo-1601593768799-76e3ee3b8e4e?w=600&q=75",
      badge: "In Season",
      badgeColor: "bg-yellow-600/90",
      perk: "Dried & Fresh",
    },
    {
      id: "fruits",
      title: "Fresh Fruits",
      desc: "Seasonal tropical fruits — mangoes, pineapples, plantains, pawpaw. Picked ripe.",
      img: "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=600&q=75",
      badge: "Tropical Fresh",
      badgeColor: "bg-orange-600/90",
      perk: "Seasonal Picks",
    },
    {
      id: "garri",
      title: "Garri & Processed",
      desc: "Freshly processed garri (white & yellow), cassava flour, and dried maize flour.",
      img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=75",
      badge: "Small Batch",
      badgeColor: "bg-amber-700/90",
      perk: "Retail & Wholesale",
    },
  ];

  return (
    <section
      id="products"
      className="py-24 lg:py-32 dark-section text-white relative overflow-hidden"
    >
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-green-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <span className="reveal inline-block text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">
            What We Sell
          </span>
          <h2 className="reveal font-display text-3xl lg:text-5xl font-semibold tracking-tight mb-6">
            Our Crops,
            <br />
            Our Products
          </h2>
          <p className="reveal text-stone-400 text-lg leading-relaxed">
            From staple crops to artisan-processed foods — everything you need,
            grown and made right here.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link
              href={`/shop?category=${p.id}`}
              key={p.id}
              className="reveal product-card bg-white/5 border border-white/10 rounded-2xl overflow-hidden group cursor-pointer block"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <span
                  className={`absolute top-4 left-4 ${p.badgeColor} text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full`}
                >
                  {p.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed mb-4">
                  {p.desc}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold uppercase tracking-widest">
                    {p.perk}
                  </span>
                  <svg
                    className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-colors"
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
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats strip */}
        <div className="reveal mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-amber-400 mb-1">
              20+
            </div>
            <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Products
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-amber-400 mb-1">
              Year-Round
            </div>
            <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Supply
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-amber-400 mb-1">
              Same-Day
            </div>
            <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Processing
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-amber-400 mb-1">
              Zero
            </div>
            <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Artificial Additives
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
