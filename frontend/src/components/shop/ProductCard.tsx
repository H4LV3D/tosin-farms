"use client";

import Link from "next/link";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/api";
import { useCartStore } from "@/store/cart.store";
import { useWishlist } from "@/hooks/useWishlist";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    const addItem = useCartStore((s) => s.addItem);
    const cartItems = useCartStore((s) => s.items);
    const isAuthenticated = useStore((s) => s.isAuthenticated);
    const { isSaved, toggleWishlist } = useWishlist();

    const inCart = cartItems.some((i) => i.product.id === product.id);
    const saved = isSaved(product.id);
    const isOutOfStock = product.stock === 0;
    const imgSrc = product.images?.[0];

    function handleAddToCart(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (!isOutOfStock) addItem(product);
    }

    function handleToggleWishlist(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (isAuthenticated) toggleWishlist(product.id);
    }

    return (
        <Link
            href={`/shop/${product.id}`}
            className={cn(
                "group relative bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm",
                "hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col",
                className
            )}
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-stone-100 flex-shrink-0">
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100">
                        <span className="text-stone-300 text-4xl">🌾</span>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300" />

                {/* Quick view button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur text-[#1c1917] text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        View Details
                    </span>
                </div>

                {/* Wishlist Heart */}
                <button
                    onClick={handleToggleWishlist}
                    className={cn(
                        "absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md",
                        saved
                            ? "bg-amber-700 text-white shadow-lg"
                            : "bg-white/80 text-[#1c1917] hover:bg-white hover:text-amber-700 opacity-0 group-hover:opacity-100 shadow-sm"
                    )}
                >
                    <Heart className={cn("w-4.5 h-4.5", saved && "fill-current")} />
                </button>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {isOutOfStock ? (
                        <Badge className="bg-red-100 text-red-800 border-0 text-[10px] font-bold uppercase tracking-widest rounded-full px-2.5">
                            Out of Stock
                        </Badge>
                    ) : (
                        <Badge className="bg-white/95 backdrop-blur text-[#1c1917] border-0 text-[10px] font-bold uppercase tracking-widest rounded-full px-2.5 shadow-sm">
                            In Stock
                        </Badge>
                    )}
                    {inCart && !isOutOfStock && (
                        <Badge className="bg-amber-700 text-white border-0 text-[10px] font-bold uppercase tracking-widest rounded-full px-2.5 shadow-sm">
                            In Cart
                        </Badge>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-display text-base font-semibold text-[#1c1917] group-hover:text-amber-700 transition-colors line-clamp-1 flex-1">
                        {product.name}
                    </h3>
                    {product.category && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                            {product.category}
                        </span>
                    )}
                </div>

                {product.description && (
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-3">
                        {product.description}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="text-xl font-bold text-[#1c1917]">
                        ₦{product.price.toLocaleString()}
                    </div>

                    <Button
                        size="sm"
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className={cn(
                            "h-9 px-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all z-10",
                            inCart && !isOutOfStock
                                ? "bg-amber-700 text-white hover:bg-amber-600"
                                : "bg-[#1c1917] text-white hover:bg-amber-700"
                        )}
                    >
                        <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                        {inCart ? "In Cart" : "Add"}
                    </Button>
                </div>
            </div>
        </Link>
    );
}
