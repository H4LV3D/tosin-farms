"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { format } from "date-fns";
import { Eye, ShieldCheck, User } from "lucide-react";
import { AdminUser } from "@/lib/admin-api";

export const userColumns: ColumnDef<AdminUser>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name = row.original.name;
            const email = row.original.email;
            return (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-amber-700">
                            {(name ?? email).slice(0, 1).toUpperCase()}
                        </span>
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-stone-800 truncate">
                            {name ?? <span className="text-stone-400 italic">No name</span>}
                        </p>
                        <p className="text-xs text-stone-400 truncate">{email}</p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        // hidden column used only for global filtering
        enableHiding: true,
        // hide from rendered table — filtering still works via accessorKey
        size: 0,
        cell: () => null,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.original.role;
            const isAdmin = role?.toUpperCase() === "ADMIN";
            return (
                <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${isAdmin
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-stone-100 text-stone-600 border-stone-200"
                        }`}
                >
                    {isAdmin ? <ShieldCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    {role}
                </span>
            );
        },
    },
    {
        accessorFn: (row) => row._count?.orders ?? 0,
        id: "orders",
        header: "Orders",
        cell: ({ row }) => {
            const count = row.original._count?.orders ?? 0;
            return (
                <span className="font-semibold text-stone-700">
                    {count}
                    <span className="text-stone-400 font-normal ml-1">
                        {count === 1 ? "order" : "orders"}
                    </span>
                </span>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => (
            <span className="text-xs text-stone-400">
                {format(new Date(row.original.createdAt), "d MMM yyyy")}
            </span>
        ),
    },
    {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
            <Link
                href={`/admin/users/${row.original.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-amber-700 transition-colors"
            >
                <Eye className="w-3.5 h-3.5" />
                View
            </Link>
        ),
    },
];
