"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/confirmDialog";
import { Plus, Package, AlertTriangle, Loader2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import {
    Product,
    fetchProducts,
    deleteProduct,
} from "./_components/product";
import { buildProductColumns } from "./_components/columns";
import ProductFormDialog from "./_components/forms/productForm";

export default function AdminProductsPage() {
    const qc = useQueryClient();

    // ── Dialog state ──────────────────────────────────────────────────────────
    const [formOpen, setFormOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

    // ── Data ──────────────────────────────────────────────────────────────────
    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ["admin-products"],
        queryFn: () => fetchProducts("", "all"),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-products"] });
            setDeleteTarget(null);
        },
    });

    // ── Column factory (memoised so callbacks are stable) ─────────────────────
    const columns = useMemo(
        () =>
            buildProductColumns(
                (p) => { setEditProduct(p); setFormOpen(true); },
                (p) => setDeleteTarget(p),
            ),
        [],
    );

    // ── Handlers ──────────────────────────────────────────────────────────────
    function openCreate() {
        setEditProduct(null);
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
                            : `${products.length} product${products.length !== 1 ? "s" : ""}`}
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

            {/* ── Loading ── */}
            {isLoading && (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                </div>
            )}

            {/* ── Error ── */}
            {isError && (
                <div className="flex items-center justify-center h-64 text-red-500 gap-2.5">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                        Failed to load products. Check your connection and try again.
                    </span>
                </div>
            )}

            {/* ── Empty ── */}
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

            {/* ── Table ── */}
            {!isLoading && !isError && products.length > 0 && (
                <DataTable
                    columns={columns}
                    data={products}
                    filterPlaceholder="Search products…"
                />
            )}

            {/* ── Dialogs ── */}
            <ProductFormDialog
                open={formOpen}
                onClose={closeForm}
                product={editProduct}
            />

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
