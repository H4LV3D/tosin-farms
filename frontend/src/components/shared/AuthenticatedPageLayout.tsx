"use client";

import { cn } from "@/lib/utils";
import { Search, ShoppingBag, type LucideIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ReactNode } from "react";

// ─── PAGE CONTAINER ─────────────────────────────────────────────────────────
interface PageContainerProps {
    children: ReactNode;
    className?: string;
    maxWidth?: "5xl" | "6xl" | "7xl";
    animate?: boolean;
}

export function AuthenticatedPageContainer({
    children,
    className,
    maxWidth = "6xl",
    animate = true
}: PageContainerProps) {
    const maxWidthClass = {
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl"
    }[maxWidth];

    return (
        <div className={cn(
            "mx-auto py-10 px-4 md:px-8 space-y-10 min-h-[calc(100vh-80px)]",
            maxWidthClass,
            animate && "animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out",
            className
        )}>
            {children}
        </div>
    );
}

// ─── PAGE HEADER ───────────────────────────────────────────────────────────
interface PageHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
    children?: ReactNode; // For filters or tabs
}

export function PageHeader({ title, description, action, children }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-display font-bold text-[#1c1917] tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-stone-500 font-medium text-lg max-w-2xl leading-relaxed italic">
                            {description}
                        </p>
                    )}
                </div>
                {action && (
                    <div className="shrink-0">{action}</div>
                )}
            </div>
            {children && (
                <div className="w-full">
                    {children}
                </div>
            )}
        </div>
    );
}

// ─── EMPTY STATE ────────────────────────────────────────────────────────────
interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
    className?: string;
}

export function EmptyState({
    icon: Icon = ShoppingBag,
    title,
    description,
    actionLabel,
    actionHref,
    onAction,
    className
}: EmptyStateProps) {
    return (
        <Card className={cn(
            "border-none shadow-2xl shadow-stone-200/40 rounded-[3rem] bg-white overflow-hidden py-20 px-8 text-center",
            className
        )}>
            <CardContent className="flex flex-col items-center max-w-md mx-auto space-y-8">
                <div className="w-28 h-28 rounded-[2rem] bg-stone-50 flex items-center justify-center relative shadow-inner rotate-3">
                    <Icon className="w-12 h-12 text-stone-200" />
                    <Search className="w-6 h-6 text-amber-500 absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md" />
                </div>

                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-[#1c1917] uppercase tracking-tighter italic">
                        {title}
                    </h3>
                    <p className="text-stone-500 font-medium leading-relaxed">
                        {description}
                    </p>
                </div>

                {actionHref ? (
                    <Link href={actionHref}>
                        <Button className="h-14 px-10 rounded-2xl bg-amber-700 hover:bg-amber-600 text-white font-black uppercase tracking-[0.2em] text-[10px] gap-3 shadow-xl shadow-amber-900/30 transition-all hover:scale-105 active:scale-95 group">
                            {actionLabel}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                ) : onAction ? (
                    <Button
                        onClick={onAction}
                        className="h-14 px-10 rounded-2xl bg-amber-700 hover:bg-amber-600 text-white font-black uppercase tracking-[0.2em] text-[10px] gap-3 shadow-xl shadow-amber-900/30 transition-all hover:scale-105 active:scale-95 group"
                    >
                        {actionLabel}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                ) : null}
            </CardContent>
        </Card>
    );
}

// ─── LOADING SKELETON ───────────────────────────────────────────────────────
export function ListSkeleton({ count = 3, cardHeight = "h-40" }: { count?: number; cardHeight?: string }) {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="h-10 w-64 bg-stone-200 animate-pulse rounded-2xl" />
                <div className="h-6 w-96 bg-stone-100 animate-pulse rounded-xl" />
            </div>

            <div className="grid gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-full bg-white border border-stone-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 shadow-sm",
                            cardHeight
                        )}
                    >
                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between">
                                <div className="h-4 w-32 bg-stone-100 animate-pulse rounded-full" />
                                <div className="h-6 w-24 bg-stone-50 animate-pulse rounded-full" />
                            </div>
                            <div className="h-6 w-48 bg-stone-200 animate-pulse rounded-lg" />
                            <div className="grid grid-cols-4 gap-4 pt-4">
                                <div className="h-8 bg-stone-50 animate-pulse rounded-xl" />
                                <div className="h-8 bg-stone-50 animate-pulse rounded-xl" />
                                <div className="h-8 col-span-2 bg-stone-50 animate-pulse rounded-xl" />
                            </div>
                        </div>
                        <div className="w-40 bg-stone-50 animate-pulse rounded-2xl shrink-0 hidden md:block" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="h-10 w-64 bg-stone-200 animate-pulse rounded-2xl mx-auto md:mx-0" />
                <div className="h-6 w-96 bg-stone-100 animate-pulse rounded-xl mx-auto md:mx-0" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="aspect-[4/5] bg-white rounded-[3rem] p-2 shadow-sm border border-stone-100 flex flex-col gap-4">
                        <div className="flex-1 w-full bg-stone-100 animate-pulse rounded-[2.5rem]" />
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="h-6 w-32 bg-stone-200 animate-pulse rounded-lg" />
                                <div className="h-6 w-16 bg-stone-100 animate-pulse rounded-lg" />
                            </div>
                            <div className="h-4 w-full bg-stone-50 animate-pulse rounded-full" />
                            <div className="flex gap-2">
                                <div className="h-12 flex-1 bg-stone-100 animate-pulse rounded-xl" />
                                <div className="h-12 flex-[2] bg-stone-200 animate-pulse rounded-xl" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
