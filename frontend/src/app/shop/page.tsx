"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "cassava", name: "Cassava" },
    { id: "maize", name: "Maize" },
    { id: "fruits", name: "Fresh Fruits" },
    { id: "processed", name: "Processed Foods" },
  ];

  const products = [
    {
      id: "p1",
      title: "Fresh Cassava Tubers (20kg)",
      price: "₦8,500",
      category: "cassava",
      img: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=600&q=75",
      badge: "In Stock",
    },
    {
      id: "p2",
      title: "Yellow Maize (50kg Bag)",
      price: "₦18,000",
      category: "maize",
      img: "https://images.unsplash.com/photo-1601593768799-76e3ee3b8e4e?w=600&q=75",
      badge: "Best Seller",
    },
    {
      id: "p3",
      title: "Tosi Farms Garri (10kg)",
      price: "₦9,000",
      category: "processed",
      img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=75",
      badge: "Small Batch",
    },
    {
      id: "p4",
      title: "Fresh Pineapples (1 Dozen)",
      price: "₦6,000",
      category: "fruits",
      img: "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=600&q=75",
      badge: "Seasonal",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-cream">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="font-display text-4xl lg:text-5xl font-semibold text-earth tracking-tight mb-4">
              Online Shop
            </h1>
            <p className="text-stone-600 max-w-xl line-clamp-2">
              Order fresh produce and processed goods directly from the farm to
              your doorstep.
            </p>
          </div>
          <div className="w-full md:w-80 relative">
            <Input
              placeholder="Search products..."
              className="pl-10 h-12 bg-white border-stone-200 focus-visible:ring-amber-500 rounded-full w-full shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto gap-3 pb-4 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat.id
                  ? "bg-amber-700 text-white shadow-md shadow-amber-900/20"
                  : "bg-white text-stone-500 border border-stone-200 hover:border-amber-400 hover:text-amber-700"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-60 overflow-hidden bg-stone-100">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#1c1917] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                  {p.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-earth mb-2 group-hover:text-amber-700 transition-colors">
                  {p.title}
                </h3>
                <div className="text-xl font-bold text-[#1c1917] mb-6">
                  {p.price}
                </div>
                <Button className="w-full h-11 bg-white border border-stone-200 text-earth font-bold text-xs uppercase tracking-widest hover:bg-amber-700 hover:text-white transition-all shadow-none">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
