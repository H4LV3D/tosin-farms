"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
    "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
    "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const DISPATCH_OPTIONS = [
    {
        id: "DHL",
        label: "DHL Express",
        desc: "2–4 business days",
        price: "₦2,500",
    },
    {
        id: "FEDEX",
        label: "FedEx",
        desc: "3–5 business days",
        price: "₦2,000",
    },
] as const;

export const shippingSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
        .string()
        .regex(/^(\+234|0)[789][01]\d{8}$/, "Enter a valid Nigerian phone number"),
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().optional(),
    dispatchType: z.enum(["DHL", "FEDEX"]),
    note: z.string().max(300).optional(),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingStepProps {
    defaultValues?: Partial<ShippingFormData>;
    onBack: () => void;
    onContinue: (data: ShippingFormData) => void;
}

export function ShippingStep({ defaultValues, onBack, onContinue }: ShippingStepProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ShippingFormData>({
        resolver: zodResolver(shippingSchema),
        defaultValues: {
            dispatchType: "DHL",
            ...defaultValues,
        },
    });

    const dispatchType = watch("dispatchType");

    return (
        <form onSubmit={handleSubmit(onContinue)} noValidate>
            <h2 className="font-display text-xl font-semibold text-[#1c1917] mb-6">
                Shipping Information
            </h2>

            {/* ── Contact Info ── */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-amber-700 text-[10px] font-bold">1</span>
                    </div>
                    <h3 className="text-sm font-bold text-stone-700 uppercase tracking-widest">
                        Contact Details
                    </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="fullName" className="text-xs font-semibold text-stone-600 mb-1.5 block">
                            Full Name *
                        </Label>
                        <Input
                            id="fullName"
                            {...register("fullName")}
                            placeholder="Adaeze Okonkwo"
                            className={cn(
                                "h-11 rounded-xl border-stone-200 bg-white",
                                errors.fullName && "border-red-400 focus-visible:ring-red-400"
                            )}
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="phone" className="text-xs font-semibold text-stone-600 mb-1.5 block">
                            Phone Number *
                        </Label>
                        <Input
                            id="phone"
                            {...register("phone")}
                            placeholder="08012345678"
                            className={cn(
                                "h-11 rounded-xl border-stone-200 bg-white",
                                errors.phone && "border-red-400"
                            )}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    <div className="sm:col-span-2">
                        <Label htmlFor="email" className="text-xs font-semibold text-stone-600 mb-1.5 block">
                            Email Address *
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="adaeze@example.com"
                            className={cn(
                                "h-11 rounded-xl border-stone-200 bg-white",
                                errors.email && "border-red-400"
                            )}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Delivery Address ── */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-amber-700" />
                    </div>
                    <h3 className="text-sm font-bold text-stone-700 uppercase tracking-widest">
                        Delivery Address
                    </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <Label htmlFor="street" className="text-xs font-semibold text-stone-600 mb-1.5 block">
                            Street Address *
                        </Label>
                        <Input
                            id="street"
                            {...register("street")}
                            placeholder="12 Adeola Odeku Street"
                            className={cn(
                                "h-11 rounded-xl border-stone-200 bg-white",
                                errors.street && "border-red-400"
                            )}
                        />
                        {errors.street && (
                            <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="city" className="text-xs font-semibold text-stone-600 mb-1.5 block">
                            City *
                        </Label>
                        <Input
                            id="city"
                            {...register("city")}
                            placeholder="Lagos"
                            className={cn(
                                "h-11 rounded-xl border-stone-200 bg-white",
                                errors.city && "border-red-400"
                            )}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="state" className="text-xs font-semibold text-stone-600 mb-1.5 block">
                            State *
                        </Label>
                        <select
                            id="state"
                            {...register("state")}
                            className={cn(
                                "w-full h-11 px-3 rounded-xl border border-stone-200 bg-white text-sm text-[#1c1917]",
                                "focus:outline-none focus:ring-2 focus:ring-amber-500/50",
                                errors.state ? "border-red-400" : ""
                            )}
                        >
                            <option value="">Select state…</option>
                            {NIGERIAN_STATES.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        {errors.state && (
                            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="zipCode" className="text-xs font-semibold text-stone-600 mb-1.5 block">
                            Postal Code (optional)
                        </Label>
                        <Input
                            id="zipCode"
                            {...register("zipCode")}
                            placeholder="100001"
                            className="h-11 rounded-xl border-stone-200 bg-white"
                        />
                    </div>
                </div>
            </div>

            {/* ── Delivery Method ── */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-amber-700 text-[10px] font-bold">3</span>
                    </div>
                    <h3 className="text-sm font-bold text-stone-700 uppercase tracking-widest">
                        Delivery Method
                    </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                    {DISPATCH_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => setValue("dispatchType", opt.id as "DHL" | "FEDEX")}
                            className={cn(
                                "text-left p-4 rounded-xl border-2 transition-all",
                                dispatchType === opt.id
                                    ? "border-amber-700 bg-amber-50"
                                    : "border-stone-200 bg-white hover:border-amber-300"
                            )}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-[#1c1917]">{opt.label}</span>
                                <span className="text-sm font-bold text-amber-700">{opt.price}</span>
                            </div>
                            <p className="text-xs text-stone-500">{opt.desc}</p>
                            <div
                                className={cn(
                                    "w-4 h-4 rounded-full border-2 mt-2 flex items-center justify-center",
                                    dispatchType === opt.id
                                        ? "border-amber-700"
                                        : "border-stone-300"
                                )}
                            >
                                {dispatchType === opt.id && (
                                    <div className="w-2 h-2 rounded-full bg-amber-700" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Note ── */}
            <div className="mb-8">
                <Label htmlFor="note" className="text-xs font-semibold text-stone-600 mb-1.5 block">
                    Order Note (optional)
                </Label>
                <textarea
                    id="note"
                    {...register("note")}
                    rows={3}
                    placeholder="Special instructions, gate codes, or delivery preferences…"
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-[#1c1917] resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-stone-400"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex-1 h-12 border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl text-xs font-bold uppercase tracking-widest"
                >
                    ← Back
                </Button>
                <Button
                    type="submit"
                    className="flex-[2] h-12 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-amber-900/20"
                >
                    Review Order →
                </Button>
            </div>
        </form>
    );
}
