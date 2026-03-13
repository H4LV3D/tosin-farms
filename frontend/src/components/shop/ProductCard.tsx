"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/api";
import { useCartStore } from "@/store/cart.store";
import { useWishlist } from "@/hooks/useWishlist";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  /** Optional: star rating 0–5 */
  rating?: number;
  /** Optional: number of reviews */
  reviewCount?: number;
  /** Optional: unit label e.g. "kg", "bag", "litre" */
  unit?: string;
}

const LOW_STOCK_THRESHOLD = 5;

export function ProductCard({
  product,
  className,
  rating,
  reviewCount,
  unit = "unit",
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const { isSaved, toggleWishlist } = useWishlist();

  const inCart = cartItems.some((i) => i.product.id === product.id);
  const saved = isSaved(product.id);
  const isOutOfStock = product.stock === 0;
  const isLowStock = !isOutOfStock && product.stock <= LOW_STOCK_THRESHOLD;
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
        "group relative bg-white rounded-2xl overflow-hidden flex flex-col",
        "border border-stone-100 shadow-sm",
        "hover:shadow-2xl hover:-translate-y-2 transition-all duration-300",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-amber-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300",
        "hover:after:scale-x-100",
        className,
      )}
    >
      {/* ── Image ─────────────────────────────────────────────── */}
      <div className="relative h-64 overflow-hidden bg-stone-50 shrink-0">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-amber-50 to-stone-100">
            <span className="text-stone-300 text-5xl">🌾</span>
          </div>
        )}

        {/* Scrim for readability of overlaid elements */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist */}
        <button
          onClick={handleToggleWishlist}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className={cn(
            "absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center",
            "transition-all duration-300 backdrop-blur-sm shadow-md",
            saved
              ? "bg-amber-700 text-white scale-110 opacity-100"
              : "bg-white/90 text-stone-400 hover:text-amber-700 hover:bg-white opacity-0 group-hover:opacity-100",
          )}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors duration-300",
              saved && "fill-current text-white",
            )}
          />
        </button>

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isOutOfStock && (
            <Badge className="bg-red-600 text-white border-0 text-[9px] font-bold uppercase tracking-widest rounded-full px-2.5 py-0.5 shadow-sm">
              Out of Stock
            </Badge>
          )}
          {isLowStock && (
            <Badge className="bg-amber-600 text-white border-0 text-[9px] font-bold uppercase tracking-widest rounded-full px-2.5 py-0.5 shadow-sm animate-pulse">
              Only {product.stock} left!
            </Badge>
          )}
          {inCart && !isOutOfStock && (
            <Badge className="bg-[#1c1917] text-white border-0 text-[9px] font-bold uppercase tracking-widest rounded-full px-2.5 py-0.5 shadow-sm">
              In Cart
            </Badge>
          )}
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1 gap-2">
        {/* Category + rating row */}
        <div className="flex items-center justify-between gap-2">
          {product.category && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              {product.category}
            </span>
          )}

          {rating !== undefined && (
            <div className="flex items-center gap-1 ml-auto">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-[#1c1917]">
                {rating.toFixed(1)}
              </span>
              {reviewCount !== undefined && (
                <span className="text-[10px] text-stone-400">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-lato text-[15px] font-semibold text-[#1c1917] group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-stone-50 flex items-end justify-between gap-3">
          <div>
            <div className="text-xl font-bold text-[#1c1917] leading-none">
              ₦{product.price.toLocaleString()}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5 font-medium">
              per {unit}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "shrink-0 flex items-center gap-1.5 h-10 px-4 rounded-xl text-[11px] font-bold uppercase tracking-wide",
              "transition-all duration-200 z-10",
              isOutOfStock
                ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                : inCart
                  ? "bg-amber-700 text-white hover:bg-amber-600 shadow-md shadow-amber-700/20"
                  : "bg-[#1c1917] text-white hover:bg-amber-700 hover:shadow-md hover:shadow-amber-700/20",
            )}
          >
            <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
            {inCart ? "In Cart" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}
