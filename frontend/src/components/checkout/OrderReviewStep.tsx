"use client";

import { useState } from "react";
import { Loader2, AlertCircle, Truck, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { checkoutOrder } from "@/lib/api";
import type { ShippingFormData } from "./ShippingStep";
import Image from "next/image";

interface OrderReviewStepProps {
  shippingData: ShippingFormData;
  shippingCost: number;
  onBack: () => void;
  onSuccess: (orderId: string, paymentUrl: string) => void;
}

export function OrderReviewStep({
  shippingData,
  shippingCost,
  onBack,
  onSuccess,
}: OrderReviewStepProps) {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = getTotalPrice();
  const shipping = shippingCost;
  const total = subtotal + shipping;

  async function handlePlaceOrder() {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await checkoutOrder({
        email: shippingData.email,
        dispatchType: shippingData.dispatchType,
        shippingAddress: {
          fullName: shippingData.fullName,
          phone: shippingData.phone,
          street: shippingData.street,
          city: shippingData.city,
          state: shippingData.state,
          zipCode: shippingData.zipCode,
        },
        note: shippingData.note,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      onSuccess(result.orderId, result.paymentUrl);
    } catch (err: unknown) {
      const errorObj = err as {
        response?: { data?: { message?: string | string[] } };
      };
      const msg =
        errorObj?.response?.data?.message ||
        "Failed to place order. Please try again.";
      setError(Array.isArray(msg) ? msg.join(". ") : msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-[#1c1917] mb-6">
        Confirm Your Order
      </h2>

      {/* ── Order Items ── */}
      <div className="bg-stone-50 rounded-2xl border border-stone-100 p-5 mb-5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
          Items ({items.length})
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                {item.product.images?.[0] ? (
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm">
                    🌾
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1c1917] line-clamp-1">
                  {item.product.name}
                </p>
                <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-bold text-[#1c1917]">
                ₦{(item.product.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Shipping Details ── */}
      <div className="bg-stone-50 rounded-2xl border border-stone-100 p-5 mb-5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
          Delivery Details
        </h3>
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5 text-sm">
            <MapPin className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#1c1917]">
                {shippingData.fullName}
              </p>
              <p className="text-stone-500 text-xs">
                {shippingData.street}, {shippingData.city}, {shippingData.state}
                {shippingData.zipCode ? ` ${shippingData.zipCode}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <Phone className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-stone-600">{shippingData.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <Mail className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-stone-600">{shippingData.email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <Truck className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-stone-600">
              {shippingData.dispatchType} Delivery
            </span>
          </div>
          {shippingData.note && (
            <p className="text-xs text-stone-400 italic border-t border-stone-100 pt-2 mt-2">
              Note: {shippingData.note}
            </p>
          )}
        </div>
      </div>

      {/* ── Pricing Summary ── */}
      <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5 mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
          Price Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Subtotal</span>
            <span className="font-medium text-[#1c1917]">
              ₦{subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">
              Shipping ({shippingData.dispatchType})
            </span>
            <span className="font-medium text-[#1c1917]">
              ₦{shipping.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-amber-100 pt-2 mt-2 flex justify-between">
            <span className="font-bold text-[#1c1917]">Total</span>
            <span className="font-bold text-xl text-amber-700">
              ₦{total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-5 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 h-12 border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl text-xs font-bold uppercase tracking-widest"
        >
          ← Back
        </Button>
        <Button
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className="flex-2 h-12 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-amber-900/20 btn-shimmer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Placing Order…
            </>
          ) : (
            "Place Order & Pay →"
          )}
        </Button>
      </div>

      <p className="text-center text-xs text-stone-400 mt-3">
        Secured by Paystack. You&apos;ll be redirected to complete payment.
      </p>
    </div>
  );
}
