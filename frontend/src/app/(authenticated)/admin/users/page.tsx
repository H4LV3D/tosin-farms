"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, AlertTriangle, Loader2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { fetchAdminUsers } from "@/lib/admin-api";
import { userColumns } from "./_components/columns";

export default function AdminUsersPage() {
    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ["admin-users"],
        queryFn: fetchAdminUsers,
    });

    return (
        <div className="p-8 space-y-7 max-w-[1400px]">

            {/* ── Header ── */}
            <div>
                <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Users</h1>
                <p className="text-sm text-stone-400 mt-0.5">
                    {isLoading
                        ? "Loading…"
                        : `${users.length} registered user${users.length !== 1 ? "s" : ""}`}
                </p>
            </div>

            {/* ── Loading ── */}
            {isLoading && (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                </div>
            )}

            {/* ── Error ── */}
            {isError && (
                <div className="flex items-center justify-center h-64 text-red-500 gap-2.5">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm font-medium">Failed to load users. Check your connection.</span>
                </div>
            )}

            {/* ── Empty ── */}
            {!isLoading && !isError && users.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 gap-3 text-stone-300">
                    <Users className="w-14 h-14" />
                    <p className="font-medium text-stone-500">No users yet</p>
                </div>
            )}

            {/* ── Table ── */}
            {!isLoading && !isError && users.length > 0 && (
                <DataTable
                    columns={userColumns}
                    data={users}
                    filterPlaceholder="Search by name or email…"
                />
            )}
        </div>
    );
}
