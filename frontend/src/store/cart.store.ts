import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/lib/api";

export interface LocalCartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: LocalCartItem[];
    isOpen: boolean;

    // Actions
    addItem: (product: Product, qty?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;

    // Computed helpers (called as functions since zustand doesn't support computed getters natively)
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product, qty = 1) => {
                set((state) => {
                    const existing = state.items.find(
                        (i) => i.product.id === product.id
                    );
                    if (existing) {
                        const newQty = Math.min(
                            existing.quantity + qty,
                            product.stock // never exceed stock
                        );
                        return {
                            items: state.items.map((i) =>
                                i.product.id === product.id ? { ...i, quantity: newQty } : i
                            ),
                            isOpen: true,
                        };
                    }
                    return {
                        items: [...state.items, { product, quantity: Math.min(qty, product.stock) }],
                        isOpen: true,
                    };
                });
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((i) => i.product.id !== productId),
                }));
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }
                set((state) => ({
                    items: state.items.map((i) =>
                        i.product.id === productId
                            ? { ...i, quantity: Math.min(quantity, i.product.stock) }
                            : i
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

            getTotalItems: () =>
                get().items.reduce((sum, i) => sum + i.quantity, 0),

            getTotalPrice: () =>
                get().items.reduce(
                    (sum, i) => sum + i.product.price * i.quantity,
                    0
                ),
        }),
        {
            name: "tosi-cart",
            storage: createJSONStorage(() =>
                typeof window !== "undefined" ? localStorage : sessionStorage
            ),
            // Only persist items, not the open/close state
            partialize: (state) => ({ items: state.items }),
        }
    )
);
