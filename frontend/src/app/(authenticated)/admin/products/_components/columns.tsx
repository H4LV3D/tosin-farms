"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { format } from "date-fns";
import { Eye, Pencil, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "./product";

// ─── Column factory ───────────────────────────────────────────────────────────
// Takes callbacks so the columns can trigger edit / delete dialogs in the page.

export function buildProductColumns(
    onEdit: (p: Product) => void,
    onDelete: (p: Product) => void,
): ColumnDef<Product>[] {
    return [
        {
            id: "product",
            header: "Product",
            accessorKey: "name",
            cell: ({ row }) => {
                const p = row.original;
                const img = p.images?.[0];
                return (
                    <div className="flex items-center gap-3 min-w-[180px]">
                        {img ? (
                            <img
                                src={img}
                                alt={p.name}
                                className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        "https://placehold.co/80x80?text=No+Image";
                                }}
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
                                <Package className="w-4 h-4 text-stone-300" />
                            </div>
                        )}
                        <div className="min-w-0">
                            <p className="font-semibold text-stone-800 truncate">{p.name}</p>
                            {p.description && (
                                <p className="text-xs text-stone-400 truncate max-w-[180px]">{p.description}</p>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) =>
                row.original.category ? (
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                        {row.original.category}
                    </span>
                ) : (
                    <span className="text-xs text-stone-300">—</span>
                ),
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => (
                <span className="font-bold text-stone-800">
                    ₦{row.original.price.toLocaleString()}
                </span>
            ),
        },
        {
            accessorKey: "stock",
            header: "Stock",
            cell: ({ row }) => {
                const stock = row.original.stock;
                return (
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${stock > 0
                            ? "bg-stone-100 text-stone-700 border-stone-200"
                            : "bg-red-50 text-red-600 border-red-200"
                            }`}
                    >
                        {stock > 0 ? `${stock} in stock` : "Out of stock"}
                    </span>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: "Added",
            cell: ({ row }) => (
                <span className="text-xs text-stone-400">
                    {format(new Date(row.original.createdAt), "d MMM yyyy")}
                </span>
            ),
        },
        {
            id: "actions",
            header: "",
            enableSorting: false,
            cell: ({ row }) => {
                const p = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/admin/products/${p.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-stone-400 hover:text-amber-700 transition-colors"
                        >
                            <Eye className="w-3.5 h-3.5" />
                            View
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(p)}
                            className="h-7 px-2 text-xs text-stone-500 hover:text-amber-700 hover:bg-amber-50"
                        >
                            <Pencil className="w-3.5 h-3.5 mr-1" />
                            Edit
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(p)}
                            className="h-7 px-2 text-xs text-stone-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];
}
