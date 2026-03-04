"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Plus, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  fetchUserAddresses,
  addUserAddress,
  fetchShippingOptions,
  SavedAddress,
  ShippingOption,
  ShippingAddress,
} from "@/lib/api";
import { useStore } from "@/store";
import { useCartStore } from "@/store/cart.store";
import { AddressForm, AddressFormData } from "./AddressForm";

const contactSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .regex(/^(\+234|0)[789][01]\d{8}$/, "Enter a valid Nigerian phone number"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export type ShippingFormData = ContactFormData &
  ShippingAddress & {
    dispatchType: "DHL" | "FEDEX" | "GIG";
    note?: string;
  };

interface ShippingStepProps {
  defaultValues?: Partial<ShippingFormData>;
  onBack: () => void;
  onContinue: (data: ShippingFormData, cost: number) => void;
}

export function ShippingStep({
  defaultValues,
  onBack,
  onContinue,
}: ShippingStepProps) {
  const user = useStore((s) => s.user);
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const cartItems = useCartStore((s) => s.items);

  // Form for contact details
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: defaultValues?.fullName || user?.name || "",
      email: defaultValues?.email || user?.email || "",
      phone: defaultValues?.phone || "",
    },
  });

  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(isAuthenticated);

  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedDispatch, setSelectedDispatch] = useState<
    "DHL" | "FEDEX" | "GIG" | null
  >(defaultValues?.dispatchType || null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);

  const [note, setNote] = useState(defaultValues?.note || "");

  // Load addresses on mount if authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoadingAddresses(false);
      return;
    }

    const loadAddresses = async () => {
      try {
        const data = await fetchUserAddresses();
        setAddresses(data);
        if (data.length > 0) {
          const defaultAddr = data.find((a) => a.isDefault) || data[0];
          setSelectedAddressId(defaultAddr.id);
        }
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    loadAddresses();
  }, [isAuthenticated]);

  // Fetch dynamic shipping options when selected address changes
  useEffect(() => {
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    if (!selectedAddress) {
      setShippingOptions([]);
      setSelectedDispatch(null);
      return;
    }

    const loadRates = async () => {
      setIsLoadingRates(true);
      try {
        const payload: ShippingAddress = {
          fullName: "Customer", // Temporary bypass since backend doesn't technically need it for rate
          phone: "08000000000",
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode || undefined,
        };
        const itemsPayload = cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        }));
        const rates = await fetchShippingOptions(payload, itemsPayload);
        setShippingOptions(rates);

        // Auto-select cheapest if nothing selected yet or current selection not returned
        if (rates.length > 0) {
          if (
            !selectedDispatch ||
            !rates.some((r) => r.id === selectedDispatch)
          ) {
            setSelectedDispatch(rates[0].id as "DHL" | "FEDEX" | "GIG");
          }
        }
      } catch (err) {
        console.error("Failed to fetch shipping rates:", err);
      } finally {
        setIsLoadingRates(false);
      }
    };

    loadRates();
  }, [selectedAddressId, addresses, selectedDispatch, cartItems]);

  const handleAddAddress = async (data: AddressFormData) => {
    setIsSubmittingAddress(true);
    try {
      if (isAuthenticated) {
        const newAddr = await addUserAddress(data);
        setAddresses((prev) => [
          newAddr,
          ...prev.map((a) =>
            data.isDefault && a.isDefault ? { ...a, isDefault: false } : a,
          ),
        ]);
        setSelectedAddressId(newAddr.id);
      } else {
        // Guest Address flow - just saving temporarily to state
        const guestAddr: SavedAddress = {
          id: Math.random().toString(),
          ...data,
          isDefault: true,
        };
        setAddresses([guestAddr]);
        setSelectedAddressId(guestAddr.id);
      }
      setIsAddAddressOpen(false);
    } catch (err) {
      console.error("Failed to add address", err);
    } finally {
      setIsSubmittingAddress(false);
    }
  };

  const onSubmit = (contactData: ContactFormData) => {
    if (!selectedAddressId) {
      alert("Please select or add a delivery address.");
      return;
    }
    if (!selectedDispatch) {
      alert("Please select a delivery method.");
      return;
    }

    const address = addresses.find((a) => a.id === selectedAddressId)!;
    const selectedOption = shippingOptions.find(
      (o) => o.id === selectedDispatch,
    )!;

    onContinue(
      {
        ...contactData,
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        dispatchType: selectedDispatch,
        note,
      },
      selectedOption.price,
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="font-display text-xl font-semibold text-[#1c1917] mb-6">
        Shipping Information
      </h2>

      {/* ── Contact Info ── */}
      <div className="mb-8">
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
            <Label
              htmlFor="fullName"
              className="text-xs font-semibold text-stone-600 mb-1.5 block"
            >
              Full Name *
            </Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="Adaeze Okonkwo"
              className={cn(
                "h-11 rounded-xl border-stone-200 bg-white",
                errors.fullName && "border-red-400 focus-visible:ring-red-400",
              )}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="text-xs font-semibold text-stone-600 mb-1.5 block"
            >
              Phone Number *
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="08012345678"
              className={cn(
                "h-11 rounded-xl border-stone-200 bg-white",
                errors.phone && "border-red-400",
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <Label
              htmlFor="email"
              className="text-xs font-semibold text-stone-600 mb-1.5 block"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="adaeze@example.com"
              className={cn(
                "h-11 rounded-xl border-stone-200 bg-white",
                errors.email && "border-red-400",
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Delivery Address ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
              <MapPin className="w-3 h-3 text-amber-700" />
            </div>
            <h3 className="text-sm font-bold text-stone-700 uppercase tracking-widest">
              Delivery Address
            </h3>
          </div>

          <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl px-3 h-8"
              >
                <Plus className="w-3 h-3 mr-1" /> Add New
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="font-lato font-semibold text-xl">
                  Add Shipping Address
                </DialogTitle>
              </DialogHeader>
              <div className="pt-4">
                <AddressForm
                  onSubmit={handleAddAddress}
                  onCancel={() => setIsAddAddressOpen(false)}
                  isLoading={isSubmittingAddress}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoadingAddresses ? (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50">
            <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center p-6 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50">
            <p className="text-sm text-stone-500 mb-3">
              No delivery address provided yet.
            </p>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl font-bold uppercase tracking-widest text-xs"
              onClick={() => setIsAddAddressOpen(true)}
            >
              <Plus className="w-3 h-3 mr-1.5" /> Add Address
            </Button>
          </div>
        ) : (
          <div className="grid gap-3">
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer relative",
                  selectedAddressId === addr.id
                    ? "border-amber-700 bg-amber-50/30"
                    : "border-stone-200 bg-white hover:border-amber-300",
                )}
              >
                <input
                  type="radio"
                  name="addressSelection"
                  value={addr.id}
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                    selectedAddressId === addr.id
                      ? "border-amber-700"
                      : "border-stone-300",
                  )}
                >
                  {selectedAddressId === addr.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <p className="text-sm font-semibold text-[#1c1917] mb-1">
                    {addr.street}
                  </p>
                  <p className="text-xs text-stone-500">
                    {addr.city}, {addr.state} {addr.zipCode}
                  </p>
                </div>
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    Default
                  </span>
                )}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── Delivery Method ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-amber-700 text-[10px] font-bold">3</span>
          </div>
          <h3 className="text-sm font-bold text-stone-700 uppercase tracking-widest">
            Delivery Method
          </h3>
        </div>

        {isLoadingRates ? (
          <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50">
            <Loader2 className="w-5 h-5 animate-spin text-stone-400 mb-2" />
            <p className="text-xs font-medium text-stone-500">
              Calculating cheapest options for you...
            </p>
          </div>
        ) : !selectedAddressId ? (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50">
            <p className="text-sm font-medium text-stone-500">
              Select an address to see shipping rates
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {shippingOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  setSelectedDispatch(opt.id as "DHL" | "FEDEX" | "GIG")
                }
                className={cn(
                  "text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden",
                  selectedDispatch === opt.id
                    ? "border-amber-700 bg-amber-50/30"
                    : "border-stone-200 bg-white hover:border-amber-300",
                )}
              >
                {selectedDispatch === opt.id && (
                  <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center bg-amber-700 text-white rounded-bl-xl">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                <div className="mb-2">
                  <span className="text-sm font-bold text-[#1c1917]">
                    {opt.label}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-xs text-stone-500">{opt.desc}</p>
                  <span className="text-sm font-bold text-amber-700">
                    ₦{opt.price.toLocaleString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Note ── */}
      <div className="mb-8">
        <Label
          htmlFor="note"
          className="text-xs font-semibold text-stone-600 mb-1.5 block"
        >
          Order Note (optional)
        </Label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
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
          className="flex-2 h-12 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-amber-900/20"
        >
          Review Order →
        </Button>
      </div>
    </form>
  );
}
