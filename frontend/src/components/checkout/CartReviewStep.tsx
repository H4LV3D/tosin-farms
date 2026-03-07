"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";

interface CartReviewStepProps {
  onContinue: () => void;
}

export function CartReviewStep({ onContinue }: CartReviewStepProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } =
    useCartStore();

  const total = getTotalPrice();
  const count = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
          <ShoppingBag className="w-9 h-9 text-amber-300" />
        </div>
        <p className="font-display text-xl text-stone-600">
          Your cart is empty
        </p>
        <p className="text-stone-400 text-sm">
          Add some products to get started.
        </p>
        <Link href="/shop">
          <Button className="mt-2 bg-amber-700 hover:bg-amber-600 text-white rounded-full px-8 text-xs font-bold uppercase tracking-widest">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-[#1c1917] mb-6">
        Review Your Order ({count} item{count !== 1 ? "s" : ""})
      </h2>

      <div className="space-y-3 mb-8">
        {items.map((item) => {
          const img = item.product.images?.[0];
          return (
            <div
              key={item.product.id}
              className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl border border-stone-100"
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-200 shrink-0 relative">
                {img ? (
                  <Image
                    src={img}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    🌾
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1c1917] line-clamp-1 mb-0.5">
                  {item.product.name}
                </p>
                {item.product.category && (
                  <p className="text-[11px] text-stone-400 mb-2 uppercase tracking-widest">
                    {item.product.category}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-700 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-bold text-[#1c1917] w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.product.stock}
                    className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-700 transition-colors disabled:opacity-40"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-bold text-[#1c1917]">
                  ₦{(item.product.price * item.quantity).toLocaleString()}
                </span>
                <span className="text-xs text-stone-400">
                  ₦{item.product.price.toLocaleString()} each
                </span>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-stone-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="p-5 bg-amber-50/60 border border-amber-100 rounded-2xl mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-stone-500">Subtotal</span>
          <span className="font-bold text-[#1c1917]">
            ₦{total.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-500">Shipping</span>
          <span className="text-stone-400">Calculated at next step</span>
        </div>
      </div>

      <Button
        onClick={onContinue}
        className="w-full h-13 bg-amber-700 hover:bg-amber-600 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-amber-900/20 btn-shimmer"
      >
        Continue to Shipping →
      </Button>
    </div>
  );
}
