"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Loader2,
  CheckCircle2,
  Heart,
  Zap,
  Star,
  ChevronDown,
  Leaf,
  Thermometer,
  MapPin,
  CalendarDays,
  Package,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchProduct, fetchProducts } from "@/lib/api";
import { useCartStore } from "@/store/cart.store";
import { useWishlist } from "@/hooks/useWishlist";
import { useStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/pageLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { LoginModal } from "@/components/shared/LoginModal";
import { cn } from "@/lib/utils";

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Adaeze O.",
    rating: 5,
    date: "March 2, 2026",
    comment:
      "Absolutely fresh and well-packaged. Arrived in perfect condition and tasted exactly as expected. Will order again!",
  },
  {
    id: 2,
    name: "Emeka T.",
    rating: 4,
    date: "February 18, 2026",
    comment:
      "Great quality. The produce was clean and sorted. Delivery was a day later than expected but overall satisfied.",
  },
  {
    id: 3,
    name: "Sade A.",
    rating: 5,
    date: "February 5, 2026",
    comment:
      "Exactly what I needed for my restaurant. Ordered a full bag and everything was consistent in size and quality.",
  },
];

type Tab = "details" | "specifications" | "reviews";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [selectedUnit, setSelectedUnit] = useState<string>("kg");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const { isSaved, toggleWishlist } = useWishlist();
  const isAuthenticated = useStore((s) => s.isAuthenticated);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["products", product?.category],
    queryFn: () => fetchProducts(product?.category ?? undefined),
    enabled: !!product?.category,
  });

  const filteredRelated = relatedProducts
    .filter((p) => p.id !== id)
    .slice(0, 4);

  const inCart = cartItems.some((i) => i.product.id === id);
  const cartItem = cartItems.find((i) => i.product.id === id);

  // Derive available units: from product data or default to ["kg"]
  const availableUnits = product?.units?.length ? product.units : ["kg"];

  function handleAddToCart() {
    if (product) {
      addItem(product, qty);
      openCart();
    }
  }

  function handleBuyNow() {
    if (product) {
      addItem(product, qty);
      router.push("/checkout");
    }
  }

  const saved = isSaved(id);

  function handleToggleWishlist() {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    toggleWishlist(id);
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
  const subtotal = product.price * qty;

  return (
    <>
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => toggleWishlist(id)}
      />
      <PageLayout>
        <main className="min-h-screen pt-28 pb-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8">
              <Link
                href="/shop"
                className="flex items-center gap-1.5 hover:text-amber-700 transition-colors"
              >
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
              <span className="text-stone-600 font-medium line-clamp-1">
                {product.name}
              </span>
            </nav>

            {/* Product layout */}
            <div className="grid lg:grid-cols-2 gap-12 mb-10">
              {/* ── Image Gallery ── */}
              <div className="space-y-3">
                {/* Main image */}
                <div className="relative h-[420px] lg:h-[520px] rounded-2xl overflow-hidden bg-stone-100 border border-stone-100">
                  {images[activeImage] ? (
                    <Image
                      src={images[activeImage]!}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-all duration-500"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-amber-50 to-stone-100">
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
                          "relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0",
                          i === activeImage
                            ? "border-amber-700"
                            : "border-stone-200 opacity-60 hover:opacity-100",
                        )}
                      >
                        {img ? (
                          <Image
                            src={img}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
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

                <h1 className="font-lato text-3xl lg:text-4xl font-semibold tracking-tighter text-earth mb-4 leading-tight">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-3xl tracking-tighter font-bold text-amber-700 ">
                    ₦ {product.price.toLocaleString()}
                  </span>
                  <span className="text-stone-400 text-sm">
                    per {selectedUnit}
                  </span>
                </div>

                {/* Description */}
                {product.description && (
                  <p className="text-stone-500 leading-relaxed mb-7 text-[15px]">
                    {product.description}
                  </p>
                )}

                {/* Quantity + Unit + CTA */}
                {!isOutOfStock && (
                  <div className="mb-6 space-y-5">
                    {/* Unit & Quantity row */}
                    <div className="flex items-center gap-4">
                      {/* Quantity stepper */}
                      <div className="flex-1">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                          Quantity
                        </label>
                        <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-white h-12">
                          <button
                            onClick={() => setQty(Math.max(1, qty - 1))}
                            className="w-12 h-full flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-amber-700 transition-colors border-r border-stone-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="flex-1 text-center text-base font-bold text-[#1c1917]">
                            {qty}
                          </span>
                          <button
                            onClick={() =>
                              setQty(Math.min(product.stock, qty + 1))
                            }
                            disabled={qty >= product.stock}
                            className="w-12 h-full flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-amber-700 transition-colors border-l border-stone-100 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Unit dropdown */}
                      <div className="w-36">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                          Unit
                        </label>
                        <div className="relative">
                          <select
                            value={selectedUnit}
                            onChange={(e) => setSelectedUnit(e.target.value)}
                            className="w-full h-12 appearance-none bg-white border border-stone-200 rounded-md pl-4 pr-10 text-sm font-semibold text-[#1c1917] cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-colors"
                          >
                            {availableUnits.map((u) => (
                              <option key={u} value={u}>
                                {u.charAt(0).toUpperCase() + u.slice(1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Stock count */}
                      <div className="pt-6 text-base  text-stone-400 whitespace-nowrap">
                        {product.stock} in stock
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-center justify-between bg-stone-50 rounded-md px-4 py-3 border border-stone-100">
                      <span className="text-sm text-stone-500">
                        {qty} {selectedUnit} × ₦{product.price.toLocaleString()}
                      </span>
                      <span className="text-base font-bold text-[#1c1917]">
                        ₦ {subtotal.toLocaleString()}
                      </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3 flex gap-3">
                      {/* Buy Now – primary */}
                      <Button
                        onClick={handleBuyNow}
                        className="flex-1 h-13 text-sm font-bold uppercase tracking-widest rounded-md bg-amber-700 hover:bg-amber-600 text-white shadow-lg shadow-amber-900/20 transition-all btn-shimmer"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>

                      {/* Add to Cart + Wishlist row */}
                      <div className="flex gap-3">
                        <Button
                          onClick={handleAddToCart}
                          variant="outline"
                          className={cn(
                            "flex-1 px-8! h-13 text-sm font-bold uppercase tracking-widest rounded-md border transition-all",
                            inCart
                              ? "border-green-600 text-green-700 bg-green-50 hover:bg-green-100"
                              : "border-amber-700 text-amber-700 hover:bg-amber-50",
                          )}
                        >
                          {inCart ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              In Cart ({cartItem?.quantity})
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </>
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          onClick={handleToggleWishlist}
                          title={
                            saved ? "Remove from wishlist" : "Save to wishlist"
                          }
                          className={cn(
                            "h-13 w-14 rounded-md border-2 transition-all duration-300 shrink-0 shadow-none",
                            saved
                              ? "bg-amber-50 border-amber-300 text-amber-700"
                              : "border-stone-200 text-stone-400 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50",
                          )}
                        >
                          <Heart
                            className={cn("w-5 h-5", saved && "fill-current")}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {isOutOfStock && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 text-sm text-red-700">
                    This product is currently out of stock. Check back soon or
                    browse other products.
                  </div>
                )}

                {/* Perks */}
                {/* <div className="mt-auto pt-6 border-t border-stone-100 grid grid-cols-3 gap-4">
                {PERKS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="text-center">
                    <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-4 h-4 text-amber-700" />
                    </div>
                    <p className="text-[11px] font-bold text-[#1c1917] leading-tight mb-0.5">
                      {title}
                    </p>
                    <p className="text-[10px] text-stone-400 leading-tight">
                      {desc}
                    </p>
                  </div>
                ))}
              </div> */}
              </div>
            </div>

            {/* ── Tabs ── */}
            <div className="mb-20">
              {/* Tab bar */}
              <div className="flex border-b border-stone-200 mb-8 gap-1">
                {(["details", "specifications", "reviews"] as Tab[]).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "px-5 py-3 text-sm font-bold uppercase tracking-widest transition-all border-b-2 -mb-px",
                        activeTab === tab
                          ? "border-amber-700 text-amber-700"
                          : "border-transparent text-stone-400 hover:text-stone-600",
                      )}
                    >
                      {tab}
                      {tab === "reviews" && (
                        <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
                          {MOCK_REVIEWS.length}
                        </span>
                      )}
                    </button>
                  ),
                )}
              </div>

              {/* Tab content */}
              {activeTab === "details" && (
                <div className="grid lg:grid-cols-2 gap-10">
                  <div>
                    <h3 className="font-lato text-lg font-semibold text-earth mb-3">
                      About this Product
                    </h3>
                    <p className="text-stone-500 leading-relaxed text-[15px] mb-5">
                      {product.description ??
                        "A premium farm-fresh product sourced directly from our Ogun State farm. Each batch is hand-selected for quality and consistency before being carefully packed and dispatched to your door."}
                    </p>
                    <p className="text-stone-500 leading-relaxed text-[15px]">
                      All our products are grown without harmful chemicals and
                      harvested at peak ripeness to ensure maximum freshness and
                      nutritional value. We work directly with smallholder
                      farmers to bring you the best of Nigerian agriculture.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-lato text-lg font-semibold text-earth mb-4">
                      Key Highlights
                    </h3>
                    {[
                      {
                        icon: Leaf,
                        label: "100% Natural",
                        value: "No artificial additives or preservatives",
                      },
                      {
                        icon: MapPin,
                        label: "Origin",
                        value: "Ogun State, Nigeria",
                      },
                      {
                        icon: CalendarDays,
                        label: "Harvest",
                        value: "Freshly harvested weekly",
                      },
                      {
                        icon: Thermometer,
                        label: "Storage",
                        value: "Cool, dry place or refrigerate",
                      },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-amber-700" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-0.5">
                            {label}
                          </p>
                          <p className="text-sm text-[#1c1917] font-medium">
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="max-w-2xl">
                  <table className="w-full text-sm">
                    <tbody>
                      {[
                        { label: "Product Name", value: product.name },
                        {
                          label: "Category",
                          value: product.category ?? "General",
                        },
                        {
                          label: "Standard Unit",
                          value: availableUnits[0] ?? "kg",
                        },
                        {
                          label: "Available Units",
                          value: availableUnits.join(", "),
                        },
                        { label: "Stock Available", value: `${product.stock}` },
                        { label: "Origin", value: "Ogun State, Nigeria" },
                        { label: "Shelf Life", value: "5–10 days (fresh)" },
                        {
                          label: "Storage",
                          value: "Store in cool, dry place",
                        },
                        {
                          label: "Packaging",
                          value: "Temperature-controlled packaging",
                        },
                        {
                          label: "Certification",
                          value: "Farm-fresh, natural",
                        },
                      ].map(({ label, value }, i) => (
                        <tr
                          key={label}
                          className={cn(
                            "border-b border-stone-100",
                            i % 2 === 0 ? "bg-stone-50" : "bg-white",
                          )}
                        >
                          <td className="py-3 px-4 font-semibold text-stone-500 w-44 rounded-l-lg">
                            {label}
                          </td>
                          <td className="py-3 px-4 text-[#1c1917] rounded-r-lg">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6 max-w-2xl">
                  {/* Summary */}
                  <div className="flex items-center gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-100">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-amber-700">4.8</p>
                      <div className="flex gap-0.5 mt-1 justify-center">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        {MOCK_REVIEWS.length} reviews
                      </p>
                    </div>
                    <div className="flex-1 space-y-1.5 pl-4 border-l border-amber-200">
                      {[
                        { stars: 5, pct: 75 },
                        { stars: 4, pct: 20 },
                        { stars: 3, pct: 5 },
                      ].map(({ stars, pct }) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-xs text-stone-400 w-4">
                            {stars}
                          </span>
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                          <div className="flex-1 bg-amber-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-stone-400 w-7 text-right">
                            {pct}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review list */}
                  {MOCK_REVIEWS.map((review) => (
                    <div
                      key={review.id}
                      className="p-5 rounded-2xl bg-white border border-stone-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-[#1c1917] text-sm">
                            {review.name}
                          </p>
                          <p className="text-xs text-stone-400">
                            {review.date}
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
    </>
  );
}
