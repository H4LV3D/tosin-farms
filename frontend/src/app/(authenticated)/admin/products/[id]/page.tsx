"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowLeft,
  Package,
  Tag,
  Calendar,
  Pencil,
  Trash2,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/confirmDialog";
import { fetchProduct } from "@/lib/api";
import { deleteProduct } from "../_components/product";
import ProductFormDialog from "../_components/forms/productForm";
import type { Product } from "../_components/product";

export default function AdminProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const qc = useQueryClient();

  const [imgIdx, setImgIdx] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      router.push("/admin/products");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-96 gap-3 text-red-500">
        <AlertTriangle className="w-10 h-10" />
        <p className="font-medium">Product not found or failed to load.</p>
        <button
          onClick={() => router.back()}
          className="text-sm text-stone-500 hover:text-stone-700 underline underline-offset-2"
        >
          Go back
        </button>
      </div>
    );
  }

  const hasImages = product.images.length > 0;

  return (
    <div className="p-8 space-y-7 max-w-[1100px]">
      {/* ── Back ── */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-stone-700 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Products
      </button>

      {/* ── Top Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="relative h-80 bg-stone-100 rounded-2xl overflow-hidden">
            {hasImages ? (
              <>
                <img
                  src={product.images[imgIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/800x600?text=No+Image";
                  }}
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setImgIdx(
                          (i) =>
                            (i - 1 + product.images.length) %
                            product.images.length,
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setImgIdx((i) => (i + 1) % product.images.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {product.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIdx(i)}
                          className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? "bg-white scale-125" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-stone-300 gap-3">
                <Package className="w-14 h-14" />
                <span className="text-sm">No images</span>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${i === imgIdx ? "border-amber-500" : "border-transparent"}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/80x80?text=img";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            {product.category && (
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                {product.category}
              </span>
            )}
            <h1 className="text-2xl font-bold text-stone-900 mt-1 leading-snug">
              {product.name}
            </h1>
            {product.description && (
              <p className="text-sm text-stone-500 mt-2 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <p className="text-xl font-extrabold text-amber-700">
                ₦{product.price.toLocaleString()}
              </p>
              <p className="text-[11px] font-semibold text-amber-600 mt-0.5 uppercase tracking-wide">
                Price
              </p>
            </div>
            <div
              className={`rounded-xl p-4 text-center ${product.stock > 0 ? "bg-stone-100" : "bg-red-50"}`}
            >
              <p
                className={`text-xl font-extrabold ${product.stock > 0 ? "text-stone-800" : "text-red-600"}`}
              >
                {product.stock}
              </p>
              <p
                className={`text-[11px] font-semibold mt-0.5 uppercase tracking-wide ${product.stock > 0 ? "text-stone-500" : "text-red-500"}`}
              >
                In Stock
              </p>
            </div>
            <div className="bg-stone-100 rounded-xl p-4 text-center">
              <p className="text-xl font-extrabold text-stone-800">
                {product.images.length}
              </p>
              <p className="text-[11px] font-semibold text-stone-500 mt-0.5 uppercase tracking-wide">
                Images
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Calendar className="w-3.5 h-3.5" />
              Added {format(new Date(product.createdAt), "d MMM yyyy")}
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Tag className="w-3.5 h-3.5" />
              ID: <span className="font-mono">{product.id}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => setFormOpen(true)}
              className="flex-1 h-11 bg-amber-700 hover:bg-amber-600 text-white font-bold gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Product
            </Button>
            <Button
              onClick={() => setDeleteOpen(true)}
              className="flex-1 h-11 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 font-bold gap-2 shadow-none"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* ── Dialogs ── */}
      <ProductFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        product={product as Product}
      />

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        title="Delete Product"
        description={
          <>
            Are you sure you want to delete{" "}
            <strong className="text-stone-800">
              &quot;{product.name}&quot;
            </strong>
            ? This cannot be undone.
          </>
        }
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}
