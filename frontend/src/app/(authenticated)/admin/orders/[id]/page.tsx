"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
    ArrowLeft,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
    Package,
    MapPin,
    StickyNote,
    Loader2,
    AlertTriangle,
    User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAdminOrder, updateOrderStatus, type AdminOrder } from "@/lib/admin-api";

// ─── Config ───────────────────────────────────────────────────────────────────

const ALL_STATUSES = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

const statusConfig: Record<string, { label: string; icon: React.ElementType; cls: string }> = {
    DELIVERED: { label: "Delivered", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    PAID: { label: "Paid", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    SHIPPED: { label: "Shipped", icon: Truck, cls: "bg-blue-50 text-blue-700 border-blue-200" },
    PENDING: { label: "Pending", icon: Clock, cls: "bg-amber-50 text-amber-700 border-amber-200" },
    CANCELLED: { label: "Cancelled", icon: XCircle, cls: "bg-red-50 text-red-700 border-red-200" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminOrderDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const qc = useQueryClient();

    const { data: order, isLoading, isError } = useQuery({
        queryKey: ["admin-order", id],
        queryFn: () => fetchAdminOrder(id),
        enabled: !!id,
    });

    const statusMutation = useMutation({
        mutationFn: (status: string) => updateOrderStatus(id, status),
        onSuccess: (updated) => {
            qc.setQueryData(["admin-order", id], updated);
            qc.invalidateQueries({ queryKey: ["admin-orders"] });
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="p-8 flex flex-col items-center justify-center h-96 gap-3 text-red-500">
                <AlertTriangle className="w-10 h-10" />
                <p className="font-medium">Order not found or failed to load.</p>
                <button
                    onClick={() => router.back()}
                    className="text-sm text-stone-500 hover:text-stone-700 underline underline-offset-2"
                >
                    Go back
                </button>
            </div>
        );
    }

    const cfg = statusConfig[order.status] ?? statusConfig["PENDING"];
    const StatusIcon = cfg.icon;

    return (
        <div className="p-8 space-y-7 max-w-[1100px]">

            {/* ── Back ── */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-stone-700 transition-colors"
            >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Orders
            </button>

            {/* ── Header ── */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                        </h1>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.cls}`}>
                            <StatusIcon className="w-3 h-3" />
                            {cfg.label}
                        </span>
                    </div>
                    <p className="text-sm text-stone-400 mt-0.5">
                        Placed on {format(new Date(order.createdAt), "d MMM yyyy, h:mm a")}
                    </p>
                </div>

                {/* Status updater */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-stone-400">Update status:</span>
                    <select
                        value={order.status}
                        disabled={statusMutation.isPending}
                        onChange={(e) => statusMutation.mutate(e.target.value)}
                        className="h-9 pl-3 pr-8 text-xs font-semibold rounded-lg border border-stone-200 bg-white text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                    >
                        {ALL_STATUSES.map((s) => (
                            <option key={s} value={s}>
                                {statusConfig[s]?.label ?? s}
                            </option>
                        ))}
                    </select>
                    {statusMutation.isPending && (
                        <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                    )}
                </div>
            </div>

            {/* ── Summary Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                            <Package className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">Total</p>
                            <p className="text-lg font-extrabold text-stone-900 mt-0.5">
                                ₦{order.totalAmount.toLocaleString()}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                            <Truck className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">Dispatch</p>
                            <p className="text-sm font-semibold text-stone-800 mt-0.5">
                                {order.dispatchProvider ?? "—"}
                            </p>
                            {order.trackingNumber && (
                                <p className="text-xs text-stone-400 font-mono mt-0.5">{order.trackingNumber}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">Customer</p>
                            <p className="text-sm font-semibold text-stone-800 mt-0.5 truncate">
                                {order.user?.name ?? order.user?.email ?? "—"}
                            </p>
                            {order.user?.name && (
                                <p className="text-xs text-stone-400 truncate">{order.user.email}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ── Order Items ── */}
            <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                <CardHeader className="px-6">
                    <CardTitle className="text-base font-bold text-stone-800">Items</CardTitle>
                    <p className="text-xs text-stone-400 mt-0.5">
                        {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? "s" : ""}
                    </p>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-stone-100 bg-stone-50/60">
                                    <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-6 pb-3">Product</th>
                                    <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3">Unit Price</th>
                                    <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3">Qty</th>
                                    <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-6 pb-3">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-50">
                                {(order.items ?? []).map((item) => (
                                    <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                {item.product?.images?.[0] ? (
                                                    <img
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src =
                                                                "https://placehold.co/80x80?text=img";
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
                                                        <Package className="w-4 h-4 text-stone-300" />
                                                    </div>
                                                )}
                                                <span className="font-medium text-stone-800">
                                                    {item.product?.name ?? `Product ${item.productId.slice(0, 6)}`}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3.5 text-stone-600">
                                            ₦{item.price.toLocaleString()}
                                        </td>
                                        <td className="px-3 py-3.5 text-stone-600">
                                            ×{item.quantity}
                                        </td>
                                        <td className="px-6 py-3.5 font-bold text-stone-800">
                                            ₦{(item.price * item.quantity).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t border-stone-100 bg-stone-50/60">
                                    <td colSpan={3} className="px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-400 text-right">
                                        Total
                                    </td>
                                    <td className="px-6 py-3.5 text-lg font-extrabold text-stone-900">
                                        ₦{order.totalAmount.toLocaleString()}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* ── Shipping & Notes ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardHeader className="px-6">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-stone-400" />
                            <CardTitle className="text-sm font-bold text-stone-800">Shipping Address</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        {order.shippingAddress ? (
                            <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                                {order.shippingAddress}
                            </p>
                        ) : (
                            <p className="text-sm text-stone-300 italic">No address provided.</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardHeader className="px-6">
                        <div className="flex items-center gap-2">
                            <StickyNote className="w-4 h-4 text-stone-400" />
                            <CardTitle className="text-sm font-bold text-stone-800">Customer Note</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        {order.customerNote ? (
                            <p className="text-sm text-stone-600 leading-relaxed">{order.customerNote}</p>
                        ) : (
                            <p className="text-sm text-stone-300 italic">No note added.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
