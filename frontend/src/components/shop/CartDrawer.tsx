"use client";

import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/dist/client/components/navigation";
import Image from "next/image";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const total = getTotalPrice();
  const count = getTotalItems();
  const router = useRouter();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-60 transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white z-70 shadow-2xl",
          "flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-amber-700" />
            <span className="font-display text-lg font-semibold text-[#1c1917]">
              Your Cart
            </span>
            {count > 0 && (
              <span className="bg-amber-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-amber-300" />
              </div>
              <p className="font-display text-lg text-stone-600 mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-stone-400 mb-6">
                Add some fresh farm produce to get started.
              </p>
              <Button
                onClick={() => {
                  closeCart();
                  router.push("/shop");
                }}
                className="bg-amber-700 hover:bg-amber-600 text-white rounded-full px-6 text-xs font-bold uppercase tracking-widest"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            items.map((item) => {
              const img = item.product.images?.[0];
              return (
                <div
                  key={item.product.id}
                  className="flex items-start gap-4 p-3 rounded-xl bg-stone-50 group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                    {img ? (
                      <Image
                        src={img}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">
                        🌾
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1c1917] line-clamp-1 mb-0.5">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-stone-500 mb-2">
                      ₦{item.product.price.toLocaleString()} each
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:border-amber-500 hover:text-amber-700 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold text-[#1c1917] w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                        className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:border-amber-500 hover:text-amber-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Price & delete */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-bold text-[#1c1917]">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
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
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-100 bg-stone-50/50 space-y-3">
            <div className="flex items-center justify-between text-sm text-stone-500">
              <span>Subtotal ({count} items)</span>
              <span className="font-bold text-[#1c1917]">
                ₦{total.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Shipping calculated at checkout
            </p>
            <Link href="/checkout" onClick={closeCart}>
              <Button className="w-full h-12 bg-amber-700 hover:bg-amber-600 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-amber-900/20 btn-shimmer group">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link
              href="/shop"
              onClick={closeCart}
              className="block text-center text-xs text-stone-400 hover:text-amber-700 transition-colors py-1"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
