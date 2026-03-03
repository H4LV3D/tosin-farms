"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/shared/imageInput";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
    Product,
    ProductFormValues,
    createProduct,
    productSchema,
    updateProduct,
} from "../product";

export default function ProductFormDialog({
    open,
    onClose,
    product,
}: {
    open: boolean;
    onClose: () => void;
    product: Product | null;
}) {
    const qc = useQueryClient();
    const isEdit = !!product;

    const form = useForm<ProductFormValues>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(productSchema) as any,
        defaultValues: product
            ? {
                name: product.name,
                description: product.description ?? "",
                price: product.price,
                stock: product.stock,
                category: product.category ?? "",
                images: product.images,
            }
            : { name: "", description: "", price: 0, stock: 0, category: "", images: [] },
    });

    const images = form.watch("images") ?? [];

    const createMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-products"] });
            onClose();
            form.reset();
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-products"] });
            onClose();
        },
    });

    const isPending = createMutation.isPending || updateMutation.isPending;
    const error = createMutation.error || updateMutation.error;

    // onSubmit receives the transformed (coerced) values from the 3rd generic
    function onSubmit(values: ProductFormValues) {
        if (isEdit) {
            updateMutation.mutate({ id: product.id, dto: values });
        } else {
            createMutation.mutate(values);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-stone-900">
                        {isEdit ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">

                        {/* Name */}
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                    Product Name *
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Premium Garri (5kg)" className="h-11" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Description */}
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <textarea
                                        {...field}
                                        rows={3}
                                        placeholder="Describe the product…"
                                        className="w-full rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 resize-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Price + Stock */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="price" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                        Price (₦) *
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" min="0" step="50" placeholder="0" className="h-11" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="stock" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                        Stock (units) *
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" min="0" placeholder="0" className="h-11" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        {/* Category */}
                        <FormField control={form.control} name="category" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                    Category
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Grains, Cassava, Fruits…" className="h-11" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Images — using global ImageInput */}
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-stone-500 block mb-2">
                                Product Images
                            </label>
                            <ImageInput
                                images={images}
                                onChange={(imgs) => form.setValue("images", imgs)}
                                maxImages={6}
                            />
                        </div>

                        {/* Error banner */}
                        {error && (
                            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                                {(error as any)?.response?.data?.message ??
                                    "Something went wrong. Please try again."}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isPending}
                                className="h-11 px-6"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="h-11 px-6 bg-amber-700 hover:bg-amber-600 text-white font-bold"
                            >
                                {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                                {isEdit ? "Save Changes" : "Create Product"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}