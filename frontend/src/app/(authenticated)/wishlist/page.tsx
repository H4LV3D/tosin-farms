"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, ShoppingCart, Trash2, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchWishlist, removeFromWishlist } from "@/lib/api";
import { useCartStore } from "@/store/cart.store";
import Link from "next/link";
import { AuthenticatedPageContainer, PageHeader, EmptyState, GridSkeleton } from "@/components/shared/AuthenticatedPageLayout";

export default function WishlistPage() {
    const queryClient = useQueryClient();
    const addItem = useCartStore((s) => s.addItem);

    // ─── Queries ──────────────────────────────────────────────────────────────
    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: fetchWishlist,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    // ─── Mutations ────────────────────────────────────────────────────────────
    const removeMutation = useMutation({
        mutationFn: (productId: string) => removeFromWishlist(productId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
    });

    const handleAddToCart = (product: any) => {
        addItem(product);
    };

    if (isLoading) {
        return (
            <AuthenticatedPageContainer>
                <GridSkeleton count={3} />
            </AuthenticatedPageContainer>
        );
    }

    return (
        <AuthenticatedPageContainer>
            <PageHeader
                title="Your Saved Favorites"
                description="Curated list of items you're watching for your next harvest."
            />

            {wishlist.length === 0 ? (
                <EmptyState
                    icon={Heart}
                    title="Your dream harvest is empty"
                    description="Start browsing our fresh products and save them here for later!"
                    actionLabel="Explore Products"
                    actionHref="/shop"
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {wishlist.map((item) => (
                        <Card
                            key={item.id}
                            className="group border-none shadow-2xl shadow-stone-200/50 hover:shadow-amber-900/10 rounded-[3rem] overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeMutation.mutate(item.product.id)}
                                        className="h-10 w-10 bg-white/90 backdrop-blur-sm rounded-xl text-red-500 hover:text-white hover:bg-red-500 shadow-lg border-none"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                {item.product.stock <= 0 && (
                                    <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center">
                                        <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/20">
                                            Out of Stock
                                        </span>
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-8">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="max-w-[70%]">
                                        <h3 className="text-xl font-bold text-[#1c1917] mb-1 group-hover:text-amber-700 transition-colors uppercase tracking-tight truncate">
                                            {item.product.name}
                                        </h3>
                                        <span className="bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-100/50">
                                            {item.product.category}
                                        </span>
                                    </div>
                                    <p className="text-xl font-display font-black text-amber-700">
                                        ₦{item.product.price.toLocaleString()}
                                    </p>
                                </div>

                                <p className="text-sm text-stone-500 mb-8 line-clamp-2 leading-relaxed font-medium">
                                    {item.product.description}
                                </p>

                                <div className="flex gap-3">
                                    <Link href={`/shop/${item.product.id}`} className="flex-1">
                                        <Button
                                            variant="outline"
                                            className="w-full h-12 rounded-xl border-stone-200 text-stone-600 hover:bg-stone-50 text-[10px] font-black uppercase tracking-widest gap-2"
                                        >
                                            <PackageSearch className="w-4 h-4" />
                                            Details
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => handleAddToCart(item.product)}
                                        disabled={item.product.stock <= 0}
                                        className="flex-[2] h-12 bg-[#1c1917] hover:bg-[#2c2927] text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-[#1c1917]/20 gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Move to Cart
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </AuthenticatedPageContainer>
    );
}
