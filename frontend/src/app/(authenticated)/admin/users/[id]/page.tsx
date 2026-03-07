"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
    ArrowLeft,
    Mail,
    Calendar,
    ShieldCheck,
    User,
    ShoppingCart,
    Package,
    Loader2,
    AlertTriangle,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAdminUserDetail } from "@/lib/admin-api";
import type { Order } from "@/lib/api";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; icon: React.ElementType; cls: string }> = {
    DELIVERED: { label: "Delivered", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    PAID: { label: "Paid", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    SHIPPED: { label: "Shipped", icon: Truck, cls: "bg-blue-50 text-blue-700 border-blue-200" },
    PENDING: { label: "Pending", icon: Clock, cls: "bg-amber-50 text-amber-700 border-amber-200" },
    CANCELLED: { label: "Cancelled", icon: XCircle, cls: "bg-red-50 text-red-700 border-red-200" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminUserDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["admin-user", id],
        queryFn: () => fetchAdminUserDetail(id),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="p-8 flex flex-col items-center justify-center h-96 gap-3 text-red-500">
                <AlertTriangle className="w-10 h-10" />
                <p className="font-medium">User not found or failed to load.</p>
                <button
                    onClick={() => router.back()}
                    className="text-sm text-stone-500 hover:text-stone-700 underline underline-offset-2"
                >
                    Go back
                </button>
            </div>
        );
    }

    const isAdmin = user.role?.toUpperCase() === "ADMIN";
    const totalSpend = (user.orders ?? []).reduce(
        (sum: number, o: Order) => (o.status !== "CANCELLED" ? sum + o.totalAmount : sum),
        0
    );

    return (
        <div className="p-8 space-y-7 max-w-[1100px]">

            {/* ── Back + Header ── */}
            <div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-stone-700 mb-5 transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Users
                </button>

                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 text-2xl font-extrabold text-amber-700">
                        {(user.name ?? user.email).slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
                                {user.name ?? "Unnamed User"}
                            </h1>
                            <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${isAdmin
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-stone-100 text-stone-600 border-stone-200"
                                    }`}
                            >
                                {isAdmin ? <ShieldCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                {user.role}
                            </span>
                        </div>
                        <p className="text-sm text-stone-400 mt-0.5">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* ── Info Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                            <Mail className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">Email</p>
                            <p className="text-sm font-semibold text-stone-800 mt-0.5 truncate">{user.email}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">Joined</p>
                            <p className="text-sm font-semibold text-stone-800 mt-0.5">
                                {format(new Date(user.createdAt), "d MMM yyyy")}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                            <ShoppingCart className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">Total Spend</p>
                            <p className="text-sm font-semibold text-stone-800 mt-0.5">
                                ₦{totalSpend.toLocaleString()}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ── Orders ── */}
            <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                <CardHeader className="px-6">
                    <CardTitle className="text-base font-bold text-stone-800">Order History</CardTitle>
                    <p className="text-xs text-stone-400 mt-0.5">
                        {(user.orders ?? []).length} order{(user.orders ?? []).length !== 1 ? "s" : ""}
                    </p>
                </CardHeader>
                <CardContent className="px-0">
                    {(user.orders ?? []).length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 text-stone-300">
                            <Package className="w-10 h-10" />
                            <p className="text-sm font-medium text-stone-400">No orders placed yet</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-stone-100 bg-stone-50/60">
                                        <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-6 pb-3">Order ID</th>
                                        <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3">Items</th>
                                        <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3">Amount</th>
                                        <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3">Status</th>
                                        <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-6 pb-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-50">
                                    {(user.orders as Order[]).map((order) => {
                                        const cfg = statusConfig[order.status] ?? statusConfig["PENDING"];
                                        const StatusIcon = cfg.icon;
                                        return (
                                            <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                                                <td className="px-6 py-3.5">
                                                    <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                                                        #{order.id.slice(0, 8).toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3.5 text-stone-500 text-xs">
                                                    {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? "s" : ""}
                                                </td>
                                                <td className="px-3 py-3.5">
                                                    <span className="font-bold text-stone-800">
                                                        ₦{order.totalAmount.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3.5">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.cls}`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {cfg.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3.5 text-xs text-stone-400">
                                                    {format(new Date(order.createdAt), "d MMM yyyy")}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
