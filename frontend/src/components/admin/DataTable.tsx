"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterPlaceholder?: string;
    pageSize?: number;
}

// ─── Smart Pagination ─────────────────────────────────────────────────────────

function getPageNumbers(current: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);

    const pages: (number | "…")[] = [];

    if (current <= 3) {
        pages.push(0, 1, 2, 3, 4, "…", total - 1);
    } else if (current >= total - 4) {
        pages.push(0, "…", total - 5, total - 4, total - 3, total - 2, total - 1);
    } else {
        pages.push(0, "…", current - 1, current, current + 1, "…", total - 1);
    }

    return pages;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<TData, TValue>({
    columns,
    data,
    filterPlaceholder = "Search…",
    pageSize = 10,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        state: { sorting, columnFilters, globalFilter },
        initialState: { pagination: { pageSize } },
    });

    const currentPage = table.getState().pagination.pageIndex;
    const totalPages = table.getPageCount();
    const pageNumbers = getPageNumbers(currentPage, totalPages);
    const filteredCount = table.getFilteredRowModel().rows.length;

    return (
        <div className="space-y-4">

            {/* ── Global Search ── */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input
                    placeholder={filterPlaceholder}
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-10 h-10 bg-white border-stone-200 focus-visible:ring-amber-500 rounded-xl"
                />
            </div>

            {/* ── Table ── */}
            <div className="rounded-2xl border border-stone-100 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="border-b border-stone-100 bg-stone-50/60">
                                    {headerGroup.headers.map((header) => {
                                        const canSort = header.column.getCanSort();
                                        const sorted = header.column.getIsSorted();
                                        return (
                                            <th
                                                key={header.id}
                                                className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-5 py-3.5 whitespace-nowrap"
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <button
                                                        className={`flex items-center gap-1.5 ${canSort
                                                            ? "cursor-pointer hover:text-stone-600 select-none"
                                                            : "cursor-default"
                                                            }`}
                                                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {canSort && (
                                                            sorted === "asc" ? (
                                                                <ChevronUp className="w-3.5 h-3.5 text-amber-600" />
                                                            ) : sorted === "desc" ? (
                                                                <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
                                                            ) : (
                                                                <ChevronsUpDown className="w-3 h-3 text-stone-300" />
                                                            )
                                                        )}
                                                    </button>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="hover:bg-stone-50/60 transition-colors"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-5 py-3.5">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="text-center py-12 text-stone-400 text-sm"
                                    >
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-xs text-stone-400">
                        {filteredCount} result{filteredCount !== 1 ? "s" : ""}{" · "}
                        Page {currentPage + 1} of {totalPages}
                    </p>
                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 w-8 p-0 border-stone-200 rounded-lg"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        {pageNumbers.map((p, i) =>
                            p === "…" ? (
                                <span key={`ellipsis-${i}`} className="text-xs text-stone-300 px-1">
                                    …
                                </span>
                            ) : (
                                <Button
                                    key={p}
                                    size="sm"
                                    onClick={() => table.setPageIndex(p)}
                                    className={`h-8 w-8 p-0 text-xs font-bold rounded-lg ${currentPage === p
                                        ? "bg-amber-700 text-white border-0 shadow-sm"
                                        : "bg-white text-stone-600 border border-stone-200 hover:border-amber-400 shadow-none"
                                        }`}
                                >
                                    {p + 1}
                                </Button>
                            )
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="h-8 w-8 p-0 border-stone-200 rounded-lg"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
