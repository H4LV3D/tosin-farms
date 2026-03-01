"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isPending?: boolean;
    /** Dialog heading */
    title?: string;
    /** Body copy — supports a React node for rich text */
    description?: React.ReactNode;
    /** Label on the confirm button (default: "Confirm") */
    confirmLabel?: string;
    /** Variant: "danger" renders a red confirm btn, "default" uses amber */
    variant?: "danger" | "default";
}

/**
 * Global reusable confirmation dialog.
 * Use for any destructive / irreversible action (delete, archive, etc.)
 *
 * @example
 * <ConfirmDialog
 *   open={!!toDelete}
 *   onClose={() => setToDelete(null)}
 *   onConfirm={() => deleteProduct(toDelete!.id)}
 *   isPending={deleteMutation.isPending}
 *   title="Delete Product"
 *   description={<>Are you sure you want to delete <strong>"{toDelete?.name}"</strong>? This cannot be undone.</>}
 *   confirmLabel="Delete"
 *   variant="danger"
 * />
 */
export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    isPending = false,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmLabel = "Confirm",
    variant = "danger",
}: ConfirmDialogProps) {
    const confirmCls =
        variant === "danger"
            ? "bg-red-600 hover:bg-red-500 text-white border-0"
            : "bg-amber-700 hover:bg-amber-600 text-white border-0";

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-w-sm bg-white rounded-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        {variant === "danger" && (
                            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                        )}
                        <DialogTitle className="text-lg font-bold text-stone-900">
                            {title}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="py-1">
                    <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isPending}
                        className="flex-1 h-11 border-stone-200"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isPending}
                        className={`flex-1 h-11 font-bold ${confirmCls}`}
                    >
                        {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                        {confirmLabel}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
