"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, MapPin, Edit2, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    fetchUserAddresses,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    SavedAddress,
} from "@/lib/api";
import { AddressForm, AddressFormData } from "@/components/shared/AddressForm";
import { ConfirmDialog } from "@/components/shared/confirmDialog";
import { cn } from "@/lib/utils";
import { AuthenticatedPageContainer, PageHeader, EmptyState, ListSkeleton } from "@/components/shared/AuthenticatedPageLayout";

export default function AddressPage() {
    const queryClient = useQueryClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [addressToEdit, setAddressToEdit] = useState<SavedAddress | null>(null);
    const [addressToDelete, setAddressToDelete] = useState<SavedAddress | null>(null);

    // ─── Queries ──────────────────────────────────────────────────────────────
    const { data: addresses = [], isLoading } = useQuery({
        queryKey: ["addresses"],
        queryFn: fetchUserAddresses,
        staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    });

    // ─── Mutations ────────────────────────────────────────────────────────────
    const mutation = useMutation({
        mutationFn: async (data: AddressFormData) => {
            if (addressToEdit) {
                return updateUserAddress(addressToEdit.id, data);
            } else {
                return addUserAddress(data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            setIsFormOpen(false);
            setAddressToEdit(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteUserAddress(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            setAddressToDelete(null);
        },
    });

    const setDefaultMutation = useMutation({
        mutationFn: (address: SavedAddress) => updateUserAddress(address.id, { ...address, isDefault: true }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses"] }),
    });

    if (isLoading) {
        return (
            <AuthenticatedPageContainer maxWidth="5xl">
                <ListSkeleton count={2} cardHeight="h-56" />
            </AuthenticatedPageContainer>
        );
    }

    return (
        <AuthenticatedPageContainer maxWidth="5xl">
            <PageHeader
                title="My Addresses"
                description="Manage your saved delivery addresses for a faster checkout."
                action={
                    <Button
                        onClick={() => {
                            setAddressToEdit(null);
                            setIsFormOpen(true);
                        }}
                        className="bg-amber-700 hover:bg-amber-600 text-white gap-2 h-11 px-6 rounded-xl shadow-lg shadow-amber-900/20 font-bold uppercase tracking-widest text-[10px]"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Address
                    </Button>
                }
            />

            {addresses.length === 0 ? (
                <EmptyState
                    icon={MapPin}
                    title="No addresses yet"
                    description="You haven't saved any delivery addresses yet. Add one to make checkout easier."
                    actionLabel="Create Your First Address"
                    onAction={() => setIsFormOpen(true)}
                />
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                        <Card
                            key={address.id}
                            className={cn(
                                "border-2 transition-all duration-300 overflow-hidden relative group rounded-3xl",
                                address.isDefault
                                    ? "border-amber-700/50 shadow-xl shadow-amber-900/5 bg-amber-50/10"
                                    : "border-stone-100 hover:border-amber-200 shadow-sm",
                            )}
                        >
                            <CardHeader className="flex flex-row items-start justify-between pb-2">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                                            address.isDefault
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-stone-100 text-stone-400 group-hover:bg-amber-50 group-hover:text-amber-600",
                                        )}
                                    >
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        {address.isDefault && (
                                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-100/50 px-2.5 py-1 rounded-full mb-1 inline-block">
                                                Default
                                            </span>
                                        )}
                                        <CardTitle className="text-lg font-black text-[#1c1917]">
                                            {address.city}, {address.state}
                                        </CardTitle>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            setAddressToEdit(address);
                                            setIsFormOpen(true);
                                        }}
                                        className="h-9 w-9 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setAddressToDelete(address)}
                                        className="h-9 w-9 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="text-stone-600">
                                        <p className="font-bold text-stone-800">{address.street}</p>
                                        <p className="text-sm mt-0.5 font-medium">
                                            {address.city}, {address.state} {address.zipCode}
                                        </p>
                                        <p className="text-[10px] text-stone-400 mt-2 font-black uppercase tracking-widest">
                                            Nigeria
                                        </p>
                                    </div>

                                    {!address.isDefault && (
                                        <Button
                                            variant="ghost"
                                            onClick={() => setDefaultMutation.mutate(address)}
                                            className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 text-[10px] font-black uppercase tracking-widest px-0 h-auto"
                                        >
                                            Set as default
                                        </Button>
                                    )}
                                </div>

                                {address.isDefault && (
                                    <div className="absolute -bottom-1 -right-1 w-12 h-12 flex items-end justify-end pointer-events-none">
                                        <div className="w-8 h-8 bg-amber-700 text-white rounded-tl-2xl flex items-center justify-center">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add/Edit Dialog */}
            <Dialog
                open={isFormOpen}
                onOpenChange={(open) => {
                    setIsFormOpen(open);
                    if (!open) setAddressToEdit(null);
                }}
            >
                <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden border-none shadow-2xl rounded-[2.5rem]">
                    <div className="bg-stone-50 px-8 py-8 border-b border-stone-100">
                        <DialogHeader>
                            <DialogTitle className="font-display font-bold text-3xl text-[#1c1917]">
                                {addressToEdit ? "Edit Address" : "New Address"}
                            </DialogTitle>
                            <p className="text-stone-500 font-medium mt-1">
                                {addressToEdit
                                    ? "Update your delivery details below."
                                    : "Fill in the details for your new delivery location."}
                            </p>
                        </DialogHeader>
                    </div>
                    <div className="p-8">
                        <AddressForm
                            defaultValues={addressToEdit || undefined}
                            onSubmit={(data) => mutation.mutate(data)}
                            onCancel={() => {
                                setIsFormOpen(false);
                                setAddressToEdit(null);
                            }}
                            isLoading={mutation.isPending}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={!!addressToDelete}
                onClose={() => setAddressToDelete(null)}
                title="Delete Address?"
                description="Are you sure you want to remove this address? This action cannot be undone."
                onConfirm={() => addressToDelete && deleteMutation.mutate(addressToDelete.id)}
                isPending={deleteMutation.isPending}
                variant="danger"
            />
        </AuthenticatedPageContainer>
    );
}
