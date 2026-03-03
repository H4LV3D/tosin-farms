"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

interface CartButtonProps {
  isDarkTheme?: boolean;
}

export function CartButton({ isDarkTheme = false }: CartButtonProps) {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = useCartStore((s) => s.getTotalItems)();

  return (
    <button
      onClick={toggleCart}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors cursor-pointer ${
        isDarkTheme ? "hover:bg-white/10" : "hover:bg-amber-50"
      }`}
      aria-label="Open cart"
    >
      <ShoppingCart
        className={`w-5 h-5 transition-colors ${
          isDarkTheme ? "text-stone-300" : "text-[#1c1917]"
        }`}
      />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-in zoom-in-50 duration-200">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
