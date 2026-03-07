"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { format } from "date-fns";
import { Eye, Truck, CheckCircle2, Clock, XCircle } from "lucide-react";
import type { AdminOrder } from "@/lib/admin-api";

// ─── Status display map ───────────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; icon: React.ElementType; cls: string }> = {
    DELIVERED: { label: "Delivered", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    PAID: { label: "Paid", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    SHIPPED: { label: "Shipped", icon: Truck, cls: "bg-blue-50 text-blue-700 border-blue-200" },
    PENDING: { label: "Pending", icon: Clock, cls: "bg-amber-50 text-amber-700 border-amber-200" },
    CANCELLED: { label: "Cancelled", icon: XCircle, cls: "bg-red-50 text-red-700 border-red-200" },
};

// ─── Columns ──────────────────────────────────────────────────────────────────

export const orderColumns: ColumnDef<AdminOrder>[] = [
    {
        accessorKey: "id",
        header: "Order ID",
        cell: ({ row }) => (
            <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                #{row.original.id.slice(0, 8).toUpperCase()}
            </span>
        ),
    },
    {
        id: "customer",
        header: "Customer",
        accessorFn: (row) => row.user?.name ?? row.user?.email ?? "—",
        cell: ({ row }) => {
            const user = row.original.user;
            if (!user) return <span className="text-stone-300 text-xs">—</span>;
            return (
                <div>
                    <p className="font-medium text-stone-800 text-sm">{user.name ?? "—"}</p>
                    <p className="text-xs text-stone-400">{user.email}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const cfg = statusConfig[row.original.status] ?? statusConfig["PENDING"];
            const Icon = cfg.icon;
            return (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.cls}`}>
                    <Icon className="w-3 h-3" />
                    {cfg.label}
                </span>
            );
        },
    },
    {
        id: "items",
        header: "Items",
        accessorFn: (row) => row.items?.length ?? 0,
        cell: ({ row }) => {
            const count = row.original.items?.length ?? 0;
            return (
                <span className="text-sm text-stone-600">
                    {count} {count === 1 ? "item" : "items"}
                </span>
            );
        },
    },
    {
        accessorKey: "totalAmount",
        header: "Amount",
        cell: ({ row }) => (
            <span className="font-bold text-stone-800">
                ₦{row.original.totalAmount.toLocaleString()}
            </span>
        ),
    },
    {
        accessorKey: "dispatchProvider",
        header: "Dispatch",
        cell: ({ row }) =>
            row.original.dispatchProvider ? (
                <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                    {row.original.dispatchProvider}
                </span>
            ) : (
                <span className="text-stone-300 text-xs">—</span>
            ),
    },
    {
        accessorKey: "createdAt",
        header: "Date",
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
        cell: ({ row }) => (
            <Link
                href={`/admin/orders/${row.original.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-amber-700 transition-colors"
            >
                <Eye className="w-3.5 h-3.5" />
                View
            </Link>
        ),
    },
];
