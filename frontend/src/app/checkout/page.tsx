"use client";

import { useState } from "react";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { CartReviewStep } from "@/components/checkout/CartReviewStep";
import {
  ShippingStep,
  type ShippingFormData,
} from "@/components/checkout/ShippingStep";
import { OrderReviewStep } from "@/components/checkout/OrderReviewStep";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";
import { useCartStore } from "@/store/cart.store";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

type CheckoutState =
  | { step: 1 }
  | { step: 2 }
  | { step: 3; shipping: ShippingFormData; shippingCost: number }
  | { step: 4; orderId: string; paymentUrl: string };

export default function CheckoutPage() {
  const [state, setState] = useState<CheckoutState>({ step: 1 });
  const cartItems = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.getTotalPrice)();

  const currentStep = state.step <= 3 ? state.step : 3;

  return (
    <main className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-8">
        <div className="text-start">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-earth mb-2">
            Checkout
          </h1>
        </div>

        {/* ── Stepper (hidden on success) ── */}
        {state.step < 4 && (
          <div className="">
            <CheckoutStepper currentStep={currentStep} />
          </div>
        )}

        {/* ── Two-column layout (form + summary) ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* ── Main Form Panel ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 lg:p-8">
            {state.step === 1 && (
              <CartReviewStep onContinue={() => setState({ step: 2 })} />
            )}
            {state.step === 2 && (
              <ShippingStep
                onBack={() => setState({ step: 1 })}
                onContinue={(data, cost) =>
                  setState({ step: 3, shipping: data, shippingCost: cost })
                }
              />
            )}
            {state.step === 3 && "shippingCost" in state && (
              <OrderReviewStep
                shippingData={state.shipping}
                shippingCost={state.shippingCost}
                onBack={() => setState({ step: 2 })}
                onSuccess={(orderId, paymentUrl) =>
                  setState({ step: 4, orderId, paymentUrl })
                }
              />
            )}

            {state.step === 4 && "orderId" in state && (
              <OrderSuccess
                orderId={state.orderId}
                paymentUrl={state.paymentUrl}
              />
            )}
          </div>

          {/* ── Order Summary Sidebar ── */}
          {state.step < 4 && (
            <aside className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sticky top-28">
              <div className="flex items-center gap-2 mb-5">
                <ShoppingBag className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-[#1c1917] uppercase tracking-widest">
                  Order Summary
                </h3>
              </div>

              {/* Items list */}
              <div className="space-y-3 mb-5">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-stone-400 text-center py-4">
                    No items in cart
                  </p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3"
                    >
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        {item.product.images?.[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center text-sm">
                            🌾
                          </span>
                        )}
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#1c1917] line-clamp-1">
                          {item.product.name}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#1c1917]">
                        ₦{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-stone-100 my-4" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="font-semibold text-base text-[#1c1917]">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Shipping</span>
                  <span className="text-stone-400 text-xs">
                    {state.step >= 3 && "shippingCost" in state
                      ? `₦${state.shippingCost.toLocaleString()}`
                      : "--"}
                  </span>
                </div>
                <div className="border-t border-stone-100 pt-2 flex justify-between">
                  <span className="font-bold text-sm text-[#1c1917]">
                    Total
                  </span>
                  <span className="font-bold text-xl text-amber-700">
                    ₦
                    {(
                      totalPrice +
                      (state.step >= 3 && "shippingCost" in state
                        ? state.shippingCost
                        : 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-5 pt-5 border-t border-stone-100 flex flex-col gap-1.5">
                {[
                  "🔒 256-bit SSL encryption",
                  "✅ Quality guaranteed",
                  "🚚 Nationwide delivery",
                ].map((badge) => (
                  <p key={badge} className="text-xs text-stone-400">
                    {badge}
                  </p>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
