"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { fetchCategories, fetchProducts } from "@/lib/api";
import PageLayout from "@/components/layout/pageLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ShopEmptyState } from "@/components/shop/ShopEmptyState";
import { useDebounce } from "@/hooks/useDebounce";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 350);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", activeCategory, debouncedSearch],
    queryFn: () =>
      fetchProducts(
        activeCategory !== "all" ? activeCategory : undefined,
        debouncedSearch || undefined,
      ),
    staleTime: 60 * 1000,
  });

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
  }, []);

  const handleReset = useCallback(() => {
    setActiveCategory("all");
    setSearchQuery("");
  }, []);

  return (
    <PageLayout>
      <main className="min-h-screen pt-28 pb-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Page header */}
          <div className="mb-10">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-3 block">
              Fresh from the Farm
            </span>
            <h1 className="font-lato text-4xl lg:text-5xl font-bold text-earth tracking-tight mb-3">
              Online Shop
            </h1>
            {/* <p className="text-stone-500 max-w-xl text-base leading-relaxed">
              Order fresh produce and processed goods directly from our farm to your
              doorstep. All products are grown and processed on our Ogun State farm.
            </p> */}
          </div>

          {/* Filters */}
          <div className="mb-10">
            <ShopFilters
              categories={categories}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onCategoryChange={handleCategoryChange}
              onSearchChange={setSearchQuery}
              totalProducts={products.length}
            />
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-amber-700" />
              <p className="text-stone-400 text-sm">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <ShopEmptyState
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              onReset={handleReset}
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
}
