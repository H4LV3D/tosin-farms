"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckoutStep {
  id: number;
  label: string;
  description: string;
}

export const CHECKOUT_STEPS: CheckoutStep[] = [
  { id: 1, label: "Bag", description: "Review items" },
  { id: 2, label: "Shipping", description: "Delivery address" },
  { id: 3, label: "Review", description: "Confirm order" },
];

interface CheckoutStepperProps {
  currentStep: number;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center w-full pr-10">
      {CHECKOUT_STEPS.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isLast = index === CHECKOUT_STEPS.length - 1;

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 text-xs font-bold",
                  isCompleted
                    ? "bg-amber-700 border-amber-700 text-white"
                    : isActive
                      ? "bg-white border-amber-700 text-amber-700"
                      : "bg-white border-stone-200 text-stone-400",
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              {/* Label */}
              <div className="mt-1.5 text-center">
                <p
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    isActive
                      ? "text-amber-700"
                      : isCompleted
                        ? "text-stone-600"
                        : "text-stone-400",
                  )}
                >
                  {step.label}
                </p>
              </div>
            </div>
            {/* Connector */}
            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 transition-all duration-500",
                  isCompleted ? "bg-amber-700" : "bg-stone-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
