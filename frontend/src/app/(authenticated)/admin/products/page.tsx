"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/shared/confirmDialog";
import { Plus, Search, Package, AlertTriangle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// ── Local split components ──────────────────────────────────────────────────
import {
    Product,
    PAGE_SIZE,
    fetchProducts,
    deleteProduct,
} from "./_components/product";
import ProductCard from "./_components/ui/productCard";
import ProductFormDialog from "./_components/forms/productForm";

// ── Page ────────────────────────────────────────────────────────────────────

export default function AdminProductsPage() {
    const qc = useQueryClient();

    // UI state
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [page, setPage] = useState(1);

    // Dialog state
    const [formOpen, setFormOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── Data ──────────────────────────────────────────────────────────────────

    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ["admin-products", debouncedSearch, activeCategory],
        queryFn: () => fetchProducts(debouncedSearch, activeCategory),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-products"] });
            setDeleteTarget(null);
        },
    });

    // ── Derived values ────────────────────────────────────────────────────────

    // Build category tabs dynamically from returned products
    const categories = [
        "all",
        ...Array.from(
            new Set(products.map((p) => p.category).filter(Boolean) as string[])
        ),
    ];

    const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
    const paginated = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // ── Handlers ──────────────────────────────────────────────────────────────

    function handleSearchChange(value: string) {
        setSearch(value);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            setDebouncedSearch(value);
            setPage(1);
        }, 350);
    }

    function handleCategoryChange(cat: string) {
        setActiveCategory(cat);
        setPage(1);
    }

    function openCreate() {
        setEditProduct(null);
        setFormOpen(true);
    }

    function openEdit(product: Product) {
        setEditProduct(product);
        setFormOpen(true);
    }

    function closeForm() {
        setFormOpen(false);
        setEditProduct(null);
    }

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="p-8 space-y-7 max-w-[1400px]">

            {/* ── Header ── */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Products</h1>
                    <p className="text-sm text-stone-400 mt-0.5">
                        {isLoading
                            ? "Loading…"
                            : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
                    </p>
                </div>
                <Button
                    onClick={openCreate}
                    className="h-11 px-5 bg-amber-700 hover:bg-amber-600 text-white font-bold tracking-wide gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </Button>
            </div>

            {/* ── Search + Category filter ── */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                        placeholder="Search products…"
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10 h-11 bg-white border-stone-200 focus-visible:ring-amber-500 rounded-xl"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${activeCategory === cat
                                ? "bg-amber-700 text-white border-amber-700 shadow-md shadow-amber-900/20"
                                : "bg-white text-stone-500 border-stone-200 hover:border-amber-400 hover:text-amber-700"
                                }`}
                        >
                            {cat === "all" ? "All" : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Loading state ── */}
            {isLoading && (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                </div>
            )}

            {/* ── Error state ── */}
            {isError && (
                <div className="flex items-center justify-center h-64 text-red-500 gap-2.5">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                        Failed to load products. Check your connection and try again.
                    </span>
                </div>
            )}

            {/* ── Empty state ── */}
            {!isLoading && !isError && products.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 gap-3 text-stone-300">
                    <Package className="w-14 h-14" />
                    <p className="font-medium text-stone-500">No products yet</p>
                    <Button
                        onClick={openCreate}
                        variant="outline"
                        className="h-10 px-5 mt-1 border-stone-200"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add your first product
                    </Button>
                </div>
            )}

            {/* ── Product grid ── */}
            {!isLoading && !isError && paginated.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginated.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={openEdit}
                            onDelete={setDeleteTarget}
                        />
                    ))}
                </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-stone-400">
                        Page {page} of {totalPages} · {products.length} total
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="h-9 w-9 p-0 border-stone-200"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`h-9 w-9 p-0 text-xs font-bold ${page === p
                                    ? "bg-amber-700 text-white border-0"
                                    : "bg-white text-stone-600 border border-stone-200 hover:border-amber-400 shadow-none"
                                    }`}
                            >
                                {p}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="h-9 w-9 p-0 border-stone-200"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* ── Dialogs ── */}

            {/* Add / Edit form */}
            <ProductFormDialog
                open={formOpen}
                onClose={closeForm}
                product={editProduct}
            />

            {/* Delete confirmation — using global ConfirmDialog */}
            <ConfirmDialog
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
                isPending={deleteMutation.isPending}
                title="Delete Product"
                description={
                    <>
                        Are you sure you want to delete{" "}
                        <strong className="text-stone-800">"{deleteTarget?.name}"</strong>?{" "}
                        This action cannot be undone.
                    </>
                }
                confirmLabel="Delete"
                variant="danger"
            />
        </div>
    );
}
