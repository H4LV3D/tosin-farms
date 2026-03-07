"use client";

import { useState, useEffect } from "react";
import { fetchWishlist, addToWishlist, removeFromWishlist } from "@/lib/api";
import { useStore } from "@/store";

export function useWishlist() {
    const [wishlist, setWishlist] = useState<string[]>([]); // Store product IDs
    const [isLoading, setIsLoading] = useState(false);
    const isAuthenticated = useStore((s) => s.isAuthenticated);

    const loadWishlist = async () => {
        if (!isAuthenticated) return;
        setIsLoading(true);
        try {
            const data = await fetchWishlist();
            setWishlist(data.map((item) => item.product.id));
        } catch (err) {
            console.error("Failed to fetch wishlist:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadWishlist();
    }, [isAuthenticated]);

    const toggleWishlist = async (productId: string) => {
        if (!isAuthenticated) return;
        const isSaved = wishlist.includes(productId);
        try {
            if (isSaved) {
                await removeFromWishlist(productId);
                setWishlist((prev) => prev.filter((id) => id !== productId));
            } else {
                await addToWishlist(productId);
                setWishlist((prev) => [...prev, productId]);
            }
        } catch (err) {
            console.error("Failed to toggle wishlist:", err);
        }
    };

    return {
        wishlist,
        toggleWishlist,
        isLoading,
        isSaved: (productId: string) => wishlist.includes(productId),
    };
}
