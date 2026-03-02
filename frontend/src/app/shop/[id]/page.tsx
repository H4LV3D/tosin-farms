"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    ShoppingCart,
    Plus,
    Minus,
    Loader2,
    CheckCircle2,
    Package,
    Truck,
    Shield,
} from "lucide-react";
import Link from "next/link";
import { fetchProduct, fetchProducts } from "@/lib/api";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/pageLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

const PERKS = [
    {
        icon: Truck,
        title: "Farm-to-Door Delivery",
        desc: "DHL & FedEx nationwide shipping",
    },
    {
        icon: Shield,
        title: "Quality Guaranteed",
        desc: "Freshness or full refund",
    },
    {
        icon: Package,
        title: "Carefully Packed",
        desc: "Temperature-controlled packaging",
    },
];

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const addItem = useCartStore((s) => s.addItem);
    const cartItems = useCartStore((s) => s.items);
    const openCart = useCartStore((s) => s.openCart);

    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProduct(id),
        enabled: !!id,
    });

    const { data: relatedProducts = [] } = useQuery({
        queryKey: ["products", product?.category],
        queryFn: () =>
            fetchProducts(product?.category ?? undefined),
        enabled: !!product?.category,
    });

    const filteredRelated = relatedProducts
        .filter((p) => p.id !== id)
        .slice(0, 4);

    const inCart = cartItems.some((i) => i.product.id === id);
    const cartItem = cartItems.find((i) => i.product.id === id);

    function handleAddToCart() {
        if (product) {
            addItem(product, qty);
            openCart();
        }
    }

    if (isLoading) {
        return (
            <PageLayout>
                <div className="min-h-screen pt-28 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-700" />
                </div>
            </PageLayout>
        );
    }

    if (!product) {
        return (
            <PageLayout>
                <div className="min-h-screen pt-28 flex flex-col items-center justify-center gap-4">
                    <Package className="w-16 h-16 text-stone-200" />
                    <h1 className="font-display text-2xl text-stone-600">
                        Product not found
                    </h1>
                    <Link
                        href="/shop"
                        className="text-amber-700 font-semibold text-sm hover:underline"
                    >
                        Back to Shop
                    </Link>
                </div>
            </PageLayout>
        );
    }

    const isOutOfStock = product.stock === 0;
    const images = product.images?.length ? product.images : [null];

    return (
        <PageLayout>
            <main className="min-h-screen pt-28 pb-24 bg-cream">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8">
                        <Link href="/shop" className="flex items-center gap-1.5 hover:text-amber-700 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Shop
                        </Link>
                        {product.category && (
                            <>
                                <span>/</span>
                                <Link
                                    href={`/shop?category=${product.category}`}
                                    className="hover:text-amber-700 transition-colors"
                                >
                                    {product.category}
                                </Link>
                            </>
                        )}
                        <span>/</span>
                        <span className="text-stone-600 font-medium line-clamp-1">{product.name}</span>
                    </nav>

                    {/* Product layout */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        {/* ── Image Gallery ── */}
                        <div className="space-y-3">
                            {/* Main image */}
                            <div className="relative h-[420px] lg:h-[500px] rounded-2xl overflow-hidden bg-stone-100 border border-stone-100">
                                {images[activeImage] ? (
                                    <img
                                        src={images[activeImage]!}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100">
                                        <span className="text-8xl opacity-30">🌾</span>
                                    </div>
                                )}
                                {/* Stock badge */}
                                <div className="absolute top-4 left-4">
                                    {isOutOfStock ? (
                                        <Badge className="bg-red-100 text-red-800 border-0 text-xs font-bold uppercase tracking-widest rounded-full px-3">
                                            Out of Stock
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-green-100 text-green-800 border-0 text-xs font-bold uppercase tracking-widest rounded-full px-3">
                                            In Stock · {product.stock} available
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="flex gap-2">
                                    {images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImage(i)}
                                            className={cn(
                                                "w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0",
                                                i === activeImage
                                                    ? "border-amber-700"
                                                    : "border-stone-200 opacity-60 hover:opacity-100"
                                            )}
                                        >
                                            {img ? (
                                                <img
                                                    src={img}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-stone-100" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── Product Info ── */}
                        <div className="flex flex-col">
                            {/* Category */}
                            {product.category && (
                                <span className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
                                    {product.category}
                                </span>
                            )}

                            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-earth mb-4 leading-tight">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-3xl font-bold text-[#1c1917]">
                                    ₦{product.price.toLocaleString()}
                                </span>
                                <span className="text-stone-400 text-sm">per unit</span>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <p className="text-stone-600 leading-relaxed mb-8 text-[15px]">
                                    {product.description}
                                </p>
                            )}

                            {/* Quantity + CTA */}
                            {!isOutOfStock && (
                                <div className="mb-6">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">
                                        Quantity
                                    </label>
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white">
                                            <button
                                                onClick={() => setQty(Math.max(1, qty - 1))}
                                                className="w-11 h-11 flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-amber-700 transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-12 text-center text-base font-bold text-[#1c1917]">
                                                {qty}
                                            </span>
                                            <button
                                                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                                                disabled={qty >= product.stock}
                                                className="w-11 h-11 flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-amber-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-sm text-stone-400">
                                            {product.stock} in stock
                                        </span>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            onClick={handleAddToCart}
                                            className={cn(
                                                "flex-1 h-13 text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg",
                                                inCart
                                                    ? "bg-green-700 hover:bg-green-600 text-white shadow-green-900/20"
                                                    : "bg-amber-700 hover:bg-amber-600 text-white shadow-amber-900/20 btn-shimmer"
                                            )}
                                        >
                                            {inCart ? (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                                    Added to Cart ({cartItem?.quantity})
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                                    Add to Cart
                                                </>
                                            )}
                                        </Button>

                                        {inCart && (
                                            <Link href="/checkout">
                                                <Button
                                                    variant="outline"
                                                    className="h-13 px-5 text-sm font-bold uppercase tracking-widest rounded-xl border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white"
                                                >
                                                    Checkout
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}

                            {isOutOfStock && (
                                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 text-sm text-red-700">
                                    This product is currently out of stock. Check back soon or
                                    browse other products.
                                </div>
                            )}

                            {/* Total if > 1 */}
                            {qty > 1 && !isOutOfStock && (
                                <div className="text-sm text-stone-500 mb-4">
                                    Subtotal:{" "}
                                    <span className="font-bold text-[#1c1917]">
                                        ₦{(product.price * qty).toLocaleString()}
                                    </span>
                                </div>
                            )}

                            {/* Perks */}
                            <div className="mt-auto pt-8 border-t border-stone-100 grid grid-cols-3 gap-4">
                                {PERKS.map(({ icon: Icon, title, desc }) => (
                                    <div key={title} className="text-center">
                                        <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-2">
                                            <Icon className="w-4 h-4 text-amber-700" />
                                        </div>
                                        <p className="text-[11px] font-bold text-[#1c1917] leading-tight mb-0.5">
                                            {title}
                                        </p>
                                        <p className="text-[10px] text-stone-400 leading-tight">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {filteredRelated.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <span className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-1 block">
                                        More in {product.category}
                                    </span>
                                    <h2 className="font-display text-2xl font-semibold text-earth">
                                        You Might Also Like
                                    </h2>
                                </div>
                                <Link
                                    href={`/shop?category=${product.category}`}
                                    className="text-xs font-bold uppercase tracking-widest text-amber-700 hover:text-amber-600 transition-colors"
                                >
                                    View All →
                                </Link>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {filteredRelated.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </PageLayout>
    );
}
