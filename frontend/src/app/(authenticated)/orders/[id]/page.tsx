"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchOrder, ShippingAddress } from "@/lib/api";
import {
    ChevronLeft,
    Package,
    Calendar,
    MapPin,
    Truck,
    CreditCard,
    History,
    CheckCircle2,
    Clock,
    XCircle,
    CircleDollarSign,
    ExternalLink,
    HelpCircle
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AuthenticatedPageContainer } from "@/components/shared/AuthenticatedPageLayout";

const statusConfig = {
    PENDING: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
    PAID: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: CircleDollarSign },
    SHIPPED: { color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: Truck },
    DELIVERED: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
    CANCELLED: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
};

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: order, isLoading, error } = useQuery({
        queryKey: ["order", id],
        queryFn: () => fetchOrder(id),
    });

    if (isLoading) {
        return (
            <AuthenticatedPageContainer maxWidth="5xl">
                <div className="space-y-8">
                    <div className="h-10 w-32 bg-stone-200 animate-pulse rounded-lg" />
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-64 w-full bg-stone-100 animate-pulse rounded-[3rem]" />
                            <div className="h-96 w-full bg-stone-100 animate-pulse rounded-[3rem]" />
                        </div>
                        <div className="h-[500px] w-full bg-stone-100 animate-pulse rounded-[3rem]" />
                    </div>
                </div>
            </AuthenticatedPageContainer>
        );
    }

    if (error || !order) {
        return (
            <AuthenticatedPageContainer maxWidth="5xl">
                <div className="py-24 px-4 text-center space-y-6 flex flex-col items-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                        <XCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#1c1917]">Order Not Found</h1>
                    <p className="text-stone-500 max-w-sm mx-auto font-medium">
                        We couldn't find the order you're looking for. It might have been deleted or never existed.
                    </p>
                    <Button
                        onClick={() => router.push("/orders")}
                        variant="outline"
                        className="h-11 rounded-xl px-8 border-stone-200 text-[10px] font-black uppercase tracking-widest"
                    >
                        Back to Orders
                    </Button>
                </div>
            </AuthenticatedPageContainer>
        );
    }

    const Config = statusConfig[order.status];
    const StatusIcon = Config.icon;

    // Decode shipping address if it's a JSON string
    let shipping: ShippingAddress | null = null;
    try {
        if (order.shippingAddress) {
            shipping = JSON.parse(order.shippingAddress);
        }
    } catch (e) {
        console.error("Failed to parse shipping address", e);
    }

    return (
        <AuthenticatedPageContainer maxWidth="5xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-stone-400 hover:text-amber-700 text-[10px] font-black uppercase tracking-widest transition-colors mb-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Go Back
                    </button>
                    <div className="flex flex-wrap items-center gap-4">
                        <h1 className="text-4xl font-display font-bold text-[#1c1917]">
                            Order Details
                        </h1>
                        <Badge className={cn("px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest gap-2", Config.color)}>
                            <StatusIcon className="w-3 h-3" />
                            {order.status}
                        </Badge>
                    </div>
                </div>

                <div className="text-left md:text-right">
                    <div className="text-stone-400 font-black uppercase tracking-[0.2em] text-[10px]">
                        Order Reference
                    </div>
                    <div className="text-lg font-black text-[#1c1917] mt-1">
                        #{order.id.slice(-12).toUpperCase()}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Status & Summary Card */}
                    <Card className="border-none shadow-2xl shadow-stone-200/40 rounded-[2.5rem] bg-white overflow-hidden">
                        <CardHeader className="px-8 pt-8 flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xl font-bold flex items-center gap-3">
                                <History className="w-5 h-5 text-amber-600" />
                                Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-8 pb-8 pt-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                                        <Calendar className="w-3 h-3" />
                                        Placed
                                    </p>
                                    <p className="font-bold text-stone-800">
                                        {format(new Date(order.createdAt), "MMM d, yyyy")}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                                        <Truck className="w-3 h-3" />
                                        Logistics
                                    </p>
                                    <p className="font-bold text-stone-800">
                                        {order.dispatchProvider || "GIG Logistics"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                                        <CreditCard className="w-3 h-3" />
                                        Payment
                                    </p>
                                    <p className="font-bold text-[#1c1917] flex items-center gap-1.5 uppercase text-[10px]">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        Confirmed
                                    </p>
                                </div>
                            </div>

                            {order.trackingNumber && (
                                <div className="mt-8 p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center shadow-lg shadow-indigo-200/20">
                                            <Package className="w-6 h-6 text-indigo-700" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Tracking Number</p>
                                            <p className="font-black text-indigo-900 text-lg">{order.trackingNumber}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="ghost" className="text-indigo-700 hover:bg-indigo-100 text-[10px] font-black uppercase tracking-widest gap-2">
                                        Track
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Order Items */}
                    <Card className="border-none shadow-2xl shadow-stone-200/40 rounded-[2.5rem] bg-white overflow-hidden">
                        <CardHeader className="px-8 pt-8">
                            <CardTitle className="text-xl font-bold flex items-center gap-3">
                                <Package className="w-5 h-5 text-amber-600" />
                                Items ({order.items.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-8 pb-8 pt-4">
                            <div className="space-y-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-6 group">
                                        <div className="w-24 h-24 rounded-[2rem] bg-stone-50 overflow-hidden shrink-0 border border-stone-100 shadow-sm transition-transform duration-500 group-hover:rotate-2">
                                            <img
                                                src={item.product?.images[0] || "https://placehold.co/100x100?text=Farm"}
                                                alt={item.product?.name || "Product"}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center min-w-0">
                                            <h4 className="font-bold text-[#1c1917] truncate text-lg group-hover:text-amber-700 transition-colors uppercase tracking-tight">{item.product?.name || "Premium Farm Produce"}</h4>
                                            <p className="text-xs text-stone-400 mt-1 font-black uppercase tracking-widest">
                                                Qty: {item.quantity} <span className="mx-2 text-stone-200">|</span> ₦{item.price.toLocaleString()} ea
                                            </p>
                                        </div>
                                        <div className="flex items-center text-[#1c1917] font-black text-lg">
                                            ₦{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-10 bg-stone-50" />

                            <div className="space-y-4 max-w-sm ml-auto">
                                <div className="flex justify-between text-stone-500 font-bold uppercase tracking-widest text-[10px]">
                                    <span>Subtotal</span>
                                    <span className="text-stone-800">₦{(order.totalAmount - (order.totalAmount > 5000 ? 2500 : 1500)).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-stone-500 font-bold uppercase tracking-widest text-[10px] pb-5 border-b border-stone-50">
                                    <span>Shipping Fee</span>
                                    <span className="text-stone-800">₦{(order.totalAmount > 5000 ? 2500 : 1500).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-end pt-3">
                                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Total Paid</span>
                                    <span className="text-3xl font-black text-amber-700 italic">₦{order.totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar (Right) */}
                <div className="space-y-8">
                    {/* Shipping Address */}
                    <Card className="border-none shadow-2xl shadow-stone-200/40 rounded-[2.5rem] bg-white overflow-hidden">
                        <CardHeader className="px-8 pt-8">
                            <CardTitle className="text-xl font-bold flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-amber-600" />
                                Delivery
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-8 pb-8 pt-2">
                            {shipping ? (
                                <div className="space-y-5">
                                    <div className="p-5 rounded-3xl bg-amber-50/50 border border-amber-100/50">
                                        <p className="text-sm font-black text-[#1c1917] uppercase tracking-tight">{shipping.fullName}</p>
                                        <p className="text-[11px] text-amber-700 font-black mt-1 uppercase tracking-widest">{shipping.phone}</p>
                                    </div>
                                    <div className="space-y-2 text-sm text-stone-500 font-medium leading-relaxed italic">
                                        <p>{shipping.street}</p>
                                        <p>{shipping.city}, {shipping.state}</p>
                                        {shipping.zipCode && <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest mt-2">{shipping.zipCode}</p>}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-stone-400 italic">Address details unavailable.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Support Nudge */}
                    <Card className="border-none shadow-2xl shadow-stone-200/40 rounded-[2.5rem] bg-[#1a1a0e] text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-amber-600/20 transition-all duration-700" />
                        <CardContent className="p-8 space-y-6 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shadow-2xl">
                                <HelpCircle className="w-7 h-7 text-amber-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold uppercase tracking-tight italic">Need Help?</h3>
                                <p className="text-stone-400 text-sm leading-relaxed font-medium">
                                    Something wrong with your order? Our farm support team is here to assist you 24/7.
                                </p>
                            </div>
                            <Button className="w-full h-14 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black uppercase tracking-[0.2em] text-[10px] gap-2 shadow-xl shadow-amber-900/40 transition-all active:scale-95">
                                Contact Support
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedPageContainer>
    );
}
