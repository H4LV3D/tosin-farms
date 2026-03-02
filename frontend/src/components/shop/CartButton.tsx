"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

export function CartButton() {
    const toggleCart = useCartStore((s) => s.toggleCart);
    const count = useCartStore((s) => s.getTotalItems)();

    return (
        <button
            onClick={toggleCart}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-amber-50 transition-colors"
            aria-label="Open cart"
        >
            <ShoppingCart className="w-5 h-5 text-[#1c1917]" />
            {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-in zoom-in-50 duration-200">
                    {count > 99 ? "99+" : count}
                </span>
            )}
        </button>
    );
}
