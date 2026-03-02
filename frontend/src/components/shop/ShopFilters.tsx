"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ShopFiltersProps {
    categories: string[];
    activeCategory: string;
    searchQuery: string;
    onCategoryChange: (cat: string) => void;
    onSearchChange: (q: string) => void;
    totalProducts: number;
}

export function ShopFilters({
    categories,
    activeCategory,
    searchQuery,
    onCategoryChange,
    onSearchChange,
    totalProducts,
}: ShopFiltersProps) {
    const allCategories = ["all", ...categories];

    return (
        <div className="space-y-5">
            {/* Search + results count */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                        id="shop-search"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search products..."
                        className="pl-10 h-11 bg-white border-stone-200 focus-visible:ring-amber-500 rounded-full w-full shadow-sm text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-500">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>{totalProducts} product{totalProducts !== 1 ? "s" : ""}</span>
                </div>
            </div>

            {/* Category pills */}
            <div className="flex overflow-x-auto gap-2.5 pb-2 scrollbar-hide">
                {allCategories.map((cat) => (
                    <button
                        key={cat}
                        id={`category-${cat}`}
                        onClick={() => onCategoryChange(cat)}
                        className={cn(
                            "whitespace-nowrap px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all flex-shrink-0",
                            activeCategory === cat
                                ? "bg-amber-700 text-white shadow-md shadow-amber-900/20"
                                : "bg-white text-stone-500 border border-stone-200 hover:border-amber-400 hover:text-amber-700"
                        )}
                    >
                        {cat === "all" ? "All Products" : cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
