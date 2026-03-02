"use client";

import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface OrderSuccessProps {
    orderId: string;
    paymentUrl: string;
}

export function OrderSuccess({ orderId, paymentUrl }: OrderSuccessProps) {
    return (
        <div className="flex flex-col items-center text-center py-10">
            {/* Icon */}
            <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-in zoom-in-50 duration-500">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-700">🌾</span>
                </div>
            </div>

            <h2 className="font-display text-3xl font-semibold text-[#1c1917] mb-2">
                Order Placed!
            </h2>
            <p className="text-stone-500 mb-1 text-sm">
                Your order has been successfully created.
            </p>
            <p className="text-xs text-stone-400 mb-8">
                Order ID:{" "}
                <span className="font-mono font-semibold text-stone-600">
                    {orderId.slice(0, 8).toUpperCase()}…
                </span>
            </p>

            {/* Payment CTA */}
            <div className="w-full max-w-sm space-y-3">
                <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full h-13 bg-amber-700 hover:bg-amber-600 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-amber-900/20 btn-shimmer group">
                        Complete Payment
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </a>

                <p className="text-xs text-stone-400">
                    You&apos;ll be taken to Paystack to complete your secure payment.
                </p>

                <div className="pt-2">
                    <Link
                        href="/shop"
                        className="flex items-center justify-center gap-2 text-sm text-amber-700 hover:text-amber-600 font-semibold transition-colors"
                    >
                        <Package className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                </div>
            </div>

            {/* Steps */}
            <div className="mt-10 w-full max-w-sm border-t border-stone-100 pt-8">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-5">
                    What happens next
                </p>
                <div className="space-y-4">
                    {[
                        { step: "1", label: "Complete payment via Paystack" },
                        { step: "2", label: "We prepare and pack your order" },
                        { step: "3", label: "Shipped via your chosen carrier" },
                        { step: "4", label: "Delivered to your door!" },
                    ].map(({ step, label }) => (
                        <div key={step} className="flex items-center gap-3 text-sm text-left">
                            <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                                <span className="text-amber-700 text-xs font-bold">{step}</span>
                            </div>
                            <span className="text-stone-600">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
