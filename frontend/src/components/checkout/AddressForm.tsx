import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const addressSchema = z.object({
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().optional(),
  isDefault: z.boolean(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  defaultValues?: Partial<AddressFormData>;
  onSubmit: (data: AddressFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function AddressForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      isDefault: false,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-4">
        <div className="sm:col-span-2">
          <Label
            htmlFor="street"
            className="text-xs font-semibold text-stone-600 mb-1.5 block"
          >
            Street Address *
          </Label>
          <Input
            id="street"
            {...register("street")}
            placeholder="12 Adeola Odeku Street"
            className={cn(
              "h-11 rounded-lg border-stone-200 bg-white",
              errors.street && "border-red-400",
            )}
          />
          {errors.street && (
            <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="city"
              className="text-xs font-semibold text-stone-600 mb-1.5 block"
            >
              City *
            </Label>
            <Input
              id="city"
              {...register("city")}
              placeholder="Lagos"
              className={cn(
                "h-11 rounded-lg border-stone-200 bg-white",
                errors.city && "border-red-400",
              )}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="state"
              className="text-xs font-semibold text-stone-600 mb-1.5 block"
            >
              State *
            </Label>
            <select
              id="state"
              {...register("state")}
              className={cn(
                "w-full h-11 px-3 rounded-lg border border-stone-200 bg-white text-sm text-[#1c1917]",
                "focus:outline-none focus:ring-2 focus:ring-amber-500/50",
                errors.state ? "border-red-400" : "",
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
              <p className="text-red-500 text-xs mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label
            htmlFor="zipCode"
            className="text-xs font-semibold text-stone-600 mb-1.5 block"
          >
            Postal Code (optional)
          </Label>
          <Input
            id="zipCode"
            {...register("zipCode")}
            placeholder="100001"
            className="h-11 rounded-lg border-stone-200 bg-white"
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="isDefault"
            {...register("isDefault")}
            className="w-4 h-4 rounded text-amber-700 focus:ring-amber-700"
          />
          <Label
            htmlFor="isDefault"
            className="text-sm text-stone-600 cursor-pointer"
          >
            Set as default address
          </Label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 h-11 border-stone-200 text-stone-600 hover:bg-stone-50 rounded-lg text-xs font-bold uppercase tracking-widest"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-2 h-11 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-amber-900/20"
        >
          {isLoading ? "Saving..." : "Save Address"}
        </Button>
      </div>
    </form>
  );
}
