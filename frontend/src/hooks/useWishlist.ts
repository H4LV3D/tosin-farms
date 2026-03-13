"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWishlist, addToWishlist, removeFromWishlist } from "@/lib/api";
import { useStore } from "@/store";

export function useWishlist() {
    const queryClient = useQueryClient();
    const isAuthenticated = useStore((s) => s.isAuthenticated);

    const { data: wishlistData = [], isLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: fetchWishlist,
        enabled: isAuthenticated,
    });

    // Extract product IDs for quick lookup
    const wishlistIds = wishlistData.map((item) => item.product.id);

    const addMutation = useMutation({
        mutationFn: (productId: string) => addToWishlist(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });

    const removeMutation = useMutation({
        mutationFn: (productId: string) => removeFromWishlist(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });

    const toggleWishlist = async (productId: string) => {
        if (!isAuthenticated) return;
        
        const isCurrentlySaved = wishlistIds.includes(productId);
        
        if (isCurrentlySaved) {
            await removeMutation.mutateAsync(productId);
        } else {
            await addMutation.mutateAsync(productId);
        }
    };

    return {
        wishlist: wishlistIds,
        toggleWishlist,
        isLoading,
        isSaved: (productId: string) => wishlistIds.includes(productId),
    };
}
