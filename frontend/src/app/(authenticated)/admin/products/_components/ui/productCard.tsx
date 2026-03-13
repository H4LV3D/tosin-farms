"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product } from "../product";

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const hasImages = product.images.length > 0;

  return (
    <div className="bg-white rounded-lg border border-stone-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
      {/* ── Image area ── */}
      <div className="relative h-48 bg-stone-100 overflow-hidden">
        {hasImages ? (
          <>
            <Image
              src={product.images[imgIdx]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Navigation arrows — only when multiple images */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setImgIdx(
                      (i) =>
                        (i - 1 + product.images.length) % product.images.length,
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    setImgIdx((i) => (i + 1) % product.images.length)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === imgIdx ? "bg-white scale-125" : "bg-white/50"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-300">
            <Package className="w-10 h-10 mb-2" />
            <span className="text-xs">No images</span>
          </div>
        )}

        {/* Stock badge */}
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
            product.stock > 0
              ? "bg-white/90 text-stone-800 backdrop-blur"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>

      {/* ── Info ── */}
      <div className="p-4 flex-1 flex flex-col gap-1.5">
        {product.category && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
            {product.category}
          </span>
        )}
        <h3 className="font-semibold font-lato text-stone-900 leading-snug line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-stone-400 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="text-lg font-extrabold text-stone-900 mt-auto pt-1">
          ₦{product.price.toLocaleString()}
        </p>
      </div>

      {/* ── Actions ── */}
      <div className="px-4 pb-4 flex gap-2">
        <Button
          variant="outline"
          onClick={() => onEdit(product)}
          className="flex-1 h-9 text-xs font-bold border-stone-200 hover:border-amber-400 hover:text-amber-700 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5 mr-1.5" />
          Edit
        </Button>
        <Button
          onClick={() => onDelete(product)}
          className="flex-1 h-9 text-xs font-bold bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 transition-all shadow-none"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}
