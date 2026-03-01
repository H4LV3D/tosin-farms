"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { fetchCategories, fetchProducts, Category, Product } from "@/lib/api";
import PageLayout from "@/components/layout/pageLayout";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", activeCategory],
    queryFn: () => fetchProducts(activeCategory),
  });

  const isLoading = isCategoriesLoading || isProductsLoading;

  // With React Query fetching the specific category, products is already filtered by backend (or API utility).
  // We can just use the returned products directly.
  const filteredProducts = products;

  return (
    <PageLayout>
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
            <button
              onClick={() => setActiveCategory("all")}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === "all"
                ? "bg-amber-700 text-white shadow-md shadow-amber-900/20"
                : "bg-white text-stone-500 border border-stone-200 hover:border-amber-400 hover:text-amber-700"
                }`}
            >
              All Products
            </button>
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
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-amber-700" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-500">No products found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-60 overflow-hidden bg-stone-100">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-200">
                        <span className="text-stone-400 text-sm">No Image</span>
                      </div>
                    )}
                    {p.stock > 0 ? (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#1c1917] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                        In Stock
                      </span>
                    ) : (
                      <span className="absolute top-4 left-4 bg-red-100 backdrop-blur text-red-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-earth mb-2 group-hover:text-amber-700 transition-colors">
                      {p.name}
                    </h3>
                    <div className="text-xl font-bold text-[#1c1917] mb-6">
                      ₦{p.price.toLocaleString()}
                    </div>
                    <Button
                      disabled={p.stock === 0}
                      className="w-full h-11 bg-white border border-stone-200 text-earth font-bold text-xs uppercase tracking-widest hover:bg-amber-700 hover:text-white transition-all shadow-none"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
