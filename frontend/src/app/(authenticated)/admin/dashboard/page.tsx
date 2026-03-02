"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    type ChartConfig,
} from "@/components/ui/chart";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import {
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    Package,
    Users,
    DollarSign,
    ArrowUpRight,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const statsData = [
    {
        title: "Total Revenue",
        value: "₦4,285,000",
        change: "+18.2%",
        trend: "up",
        icon: DollarSign,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        sub: "vs last month",
    },
    {
        title: "Total Orders",
        value: "1,348",
        change: "+12.5%",
        trend: "up",
        icon: ShoppingCart,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        sub: "vs last month",
    },
    {
        title: "Active Products",
        value: "86",
        change: "+4",
        trend: "up",
        icon: Package,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        sub: "new this month",
    },
    {
        title: "Total Customers",
        value: "3,219",
        change: "-2.1%",
        trend: "down",
        icon: Users,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        sub: "vs last month",
    },
];

// Monthly revenue + order volume (dual-axis area chart)
const monthlyData = [
    { month: "Sep", revenue: 1850000, orders: 182 },
    { month: "Oct", revenue: 2400000, orders: 214 },
    { month: "Nov", revenue: 2100000, orders: 197 },
    { month: "Dec", revenue: 3100000, orders: 278 },
    { month: "Jan", revenue: 2800000, orders: 251 },
    { month: "Feb", revenue: 3600000, orders: 319 },
    { month: "Mar", revenue: 4285000, orders: 348 },
];

const revenueChartConfig = {
    revenue: { label: "Revenue (₦)", color: "#d97706" },
    orders: { label: "Orders", color: "#10b981" },
} satisfies ChartConfig;

// Order status pie chart
const orderStatusData = [
    { name: "Delivered", value: 824, fill: "#10b981" },
    { name: "Pending", value: 312, fill: "#f59e0b" },
    { name: "Shipped", value: 148, fill: "#3b82f6" },
    { name: "Cancelled", value: 64, fill: "#ef4444" },
];

const orderStatusConfig = {
    Delivered: { label: "Delivered", color: "#10b981" },
    Pending: { label: "Pending", color: "#f59e0b" },
    Shipped: { label: "Shipped", color: "#3b82f6" },
    Cancelled: { label: "Cancelled", color: "#ef4444" },
} satisfies ChartConfig;

// Weekly revenue bar chart (last 4 weeks)
const weeklyData = [
    { week: "Wk 1", garri: 480000, maize: 190000, cassava: 230000 },
    { week: "Wk 2", garri: 620000, maize: 240000, cassava: 310000 },
    { week: "Wk 3", garri: 550000, maize: 210000, cassava: 270000 },
    { week: "Wk 4", garri: 790000, maize: 310000, cassava: 385000 },
];

const weeklyConfig = {
    garri: { label: "Garri", color: "#d97706" },
    maize: { label: "Maize", color: "#10b981" },
    cassava: { label: "Cassava", color: "#6366f1" },
} satisfies ChartConfig;

// Top products
const topProducts = [
    { name: "Premium Garri (5kg)", sold: 892, revenue: "₦1,338,000", change: "+24%" },
    { name: "Cassava Flour (2kg)", sold: 674, revenue: "₦876,200", change: "+18%" },
    { name: "White Maize (10kg)", sold: 521, revenue: "₦677,300", change: "+11%" },
    { name: "Fresh Pineapple (crate)", sold: 398, revenue: "₦477,600", change: "+7%" },
    { name: "Plantain Chips (500g)", sold: 314, revenue: "₦282,600", change: "-3%" },
];

// Recent orders
const recentOrders = [
    { id: "TF-10048", customer: "Adebayo Ogundimu", product: "Premium Garri (5kg) ×3", amount: "₦4,500", status: "DELIVERED", date: "Mar 1, 2026" },
    { id: "TF-10047", customer: "Ngozi Eze", product: "Cassava Flour (2kg) ×5", amount: "₦6,500", status: "SHIPPED", date: "Mar 1, 2026" },
    { id: "TF-10046", customer: "Emeka Obi", product: "White Maize (10kg) ×2", amount: "₦2,600", status: "PENDING", date: "Feb 29, 2026" },
    { id: "TF-10045", customer: "Fatimah Bello", product: "Fresh Pineapple (crate) ×1", amount: "₦1,200", status: "DELIVERED", date: "Feb 28, 2026" },
    { id: "TF-10044", customer: "Chukwuemeka Nwosu", product: "Plantain Chips (500g) ×10", amount: "₦9,000", status: "CANCELLED", date: "Feb 28, 2026" },
    { id: "TF-10043", customer: "Sola Adeyemi", product: "Premium Garri (5kg) ×6", amount: "₦9,000", status: "DELIVERED", date: "Feb 27, 2026" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; icon: React.ElementType; cls: string }> = {
    DELIVERED: { label: "Delivered", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    SHIPPED: { label: "Shipped", icon: Truck, cls: "bg-blue-50 text-blue-700 border-blue-200" },
    PENDING: { label: "Pending", icon: Clock, cls: "bg-amber-50 text-amber-700 border-amber-200" },
    CANCELLED: { label: "Cancelled", icon: XCircle, cls: "bg-red-50 text-red-700 border-red-200" },
};

function formatRevenue(value: number) {
    if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `₦${(value / 1_000).toFixed(0)}K`;
    return `₦${value}`;
}

// ─── Custom Tooltip for Revenue Chart ────────────────────────────────────────

function RevenueTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-stone-200 rounded-xl px-4 py-3 shadow-xl text-xs space-y-1.5">
            <p className="font-bold text-stone-700 text-sm">{label}</p>
            {payload.map((p: any) => (
                <div key={p.dataKey} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                    <span className="text-stone-500">{p.name === "revenue" ? "Revenue" : "Orders"}:</span>
                    <span className="font-bold text-stone-800">
                        {p.name === "revenue" ? formatRevenue(p.value) : p.value.toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
}

// ─── Custom Tooltip for Pie Chart ─────────────────────────────────────────────

function StatusTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    const total = orderStatusData.reduce((s, x) => s + x.value, 0);
    return (
        <div className="bg-white border border-stone-200 rounded-xl px-4 py-3 shadow-xl text-xs">
            <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.payload.fill }} />
                <span className="font-bold text-stone-800">{d.name}</span>
            </div>
            <p className="text-stone-500">{d.value} orders <span className="font-bold text-stone-700">({((d.value / total) * 100).toFixed(0)}%)</span></p>
        </div>
    );
}

// ─── Custom Tooltip for Weekly Chart ─────────────────────────────────────────

function WeeklyTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-stone-200 rounded-xl px-4 py-3 shadow-xl text-xs space-y-1.5">
            <p className="font-bold text-stone-700">{label}</p>
            {payload.map((p: any) => (
                <div key={p.dataKey} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.fill }} />
                    <span className="text-stone-500 capitalize">{p.name}:</span>
                    <span className="font-bold text-stone-800">{formatRevenue(p.value)}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
    const [orderTab, setOrderTab] = useState<"all" | "pending" | "delivered">("all");

    const filteredOrders = recentOrders.filter((o) => {
        if (orderTab === "pending") return o.status === "PENDING";
        if (orderTab === "delivered") return o.status === "DELIVERED";
        return true;
    });

    return (
        <div className="p-8 space-y-8 max-w-[1400px]">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Dashboard</h1>
                    <p className="text-sm text-stone-400 mt-0.5">Sunday, March 1, 2026 — Welcome back, Admin</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400 font-medium">Live data</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {statsData.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className="border border-stone-100 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div className={`p-2.5 rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className={`flex items-center gap-1 text-xs font-bold rounded-full px-2 py-0.5 ${stat.trend === "up" ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"}`}>
                                        {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <p className="text-2xl font-extrabold text-stone-900 tracking-tight">{stat.value}</p>
                                    <p className="text-xs text-stone-400 mt-1 font-medium">{stat.title}</p>
                                    <p className="text-[11px] text-stone-300 mt-0.5">{stat.sub}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* ── Charts Row 1: Revenue Area + Order Status Pie ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                {/* Revenue + Orders Area Chart */}
                <Card className="xl:col-span-2 border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardHeader className="px-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-bold text-stone-800">Revenue & Orders</CardTitle>
                                <p className="text-xs text-stone-400 mt-0.5">Sep 2025 – Mar 2026</p>
                            </div>
                            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                                +18.2% MoM
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6">
                        <ChartContainer config={revenueChartConfig} className="h-[240px] w-full">
                            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#d97706" stopOpacity={0.18} />
                                        <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1ede6" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#a8a29e", fontSize: 11, fontWeight: 500 }}
                                    dy={6}
                                />
                                <YAxis
                                    yAxisId="revenue"
                                    orientation="left"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#a8a29e", fontSize: 10 }}
                                    tickFormatter={formatRevenue}
                                    width={52}
                                />
                                <YAxis
                                    yAxisId="orders"
                                    orientation="right"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#a8a29e", fontSize: 10 }}
                                    width={36}
                                />
                                <Tooltip content={<RevenueTooltip />} />
                                <Area
                                    yAxisId="revenue"
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#d97706"
                                    strokeWidth={2.5}
                                    fill="url(#gradRevenue)"
                                    dot={{ fill: "#d97706", r: 3, strokeWidth: 0 }}
                                    activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                                <Area
                                    yAxisId="orders"
                                    type="monotone"
                                    dataKey="orders"
                                    stroke="#10b981"
                                    strokeWidth={2.5}
                                    fill="url(#gradOrders)"
                                    dot={{ fill: "#10b981", r: 3, strokeWidth: 0 }}
                                    activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                            </AreaChart>
                        </ChartContainer>
                        {/* Legend */}
                        <div className="flex items-center gap-5 mt-4 px-1">
                            {[{ color: "#d97706", label: "Revenue" }, { color: "#10b981", label: "Orders" }].map((l) => (
                                <div key={l.label} className="flex items-center gap-1.5">
                                    <span className="w-3 h-0.5 rounded-full block" style={{ background: l.color }} />
                                    <span className="text-xs text-stone-400 font-medium">{l.label}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Order Status Pie Chart */}
                <div className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <div className="px-6">
                        <CardTitle className="text-base font-bold text-stone-800">Order Status</CardTitle>
                        <p className="text-xs text-stone-400 mt-0.5">All-time breakdown · 1,348 total</p>
                    </div>
                    <div className="px-6">
                        <ChartContainer config={orderStatusConfig} className="h-[200px] w-full">
                            <PieChart>
                                <Pie
                                    data={orderStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={3}
                                    dataKey="value"
                                    strokeWidth={0}
                                >
                                    {orderStatusData.map((entry, index) => (
                                        <Cell key={index} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip content={<StatusTooltip />} />
                            </PieChart>
                        </ChartContainer>
                        {/* Legend */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                            {orderStatusData.map((d) => {
                                const total = orderStatusData.reduce((s, x) => s + x.value, 0);
                                return (
                                    <div key={d.name} className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.fill }} />
                                        <div>
                                            <p className="text-xs font-semibold text-stone-700">{d.name}</p>
                                            <p className="text-[11px] text-stone-400">{d.value} · {((d.value / total) * 100).toFixed(0)}%</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Charts Row 2: Weekly Product Bar + Top Products ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                {/* Weekly Revenue by Product Category — Grouped Bar */}
                <Card className="xl:col-span-2 border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardHeader className="px-6 pt-6 pb-2">
                        <CardTitle className="text-base font-bold text-stone-800">Weekly Revenue by Category</CardTitle>
                        <p className="text-xs text-stone-400 mt-0.5">Last 4 weeks — March 2026</p>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-2">
                        <ChartContainer config={weeklyConfig} className="h-[220px] w-full">
                            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1ede6" vertical={false} />
                                <XAxis
                                    dataKey="week"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#a8a29e", fontSize: 11, fontWeight: 500 }}
                                    dy={6}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#a8a29e", fontSize: 10 }}
                                    tickFormatter={formatRevenue}
                                    width={52}
                                />
                                <Tooltip content={<WeeklyTooltip />} cursor={{ fill: "#f7f5f2" }} />
                                <Bar dataKey="garri" fill="#d97706" radius={[4, 4, 0, 0]} maxBarSize={22} />
                                <Bar dataKey="maize" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={22} />
                                <Bar dataKey="cassava" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={22} />
                            </BarChart>
                        </ChartContainer>
                        <div className="flex items-center gap-5 mt-4 px-1">
                            {[{ color: "#d97706", label: "Garri" }, { color: "#10b981", label: "Maize" }, { color: "#6366f1", label: "Cassava" }].map((l) => (
                                <div key={l.label} className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-[3px] block" style={{ background: l.color }} />
                                    <span className="text-xs text-stone-400 font-medium">{l.label}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Products */}
                <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                    <CardHeader className="px-6 ">
                        <CardTitle className="text-base font-bold text-stone-800">Top Products</CardTitle>
                        <p className="text-xs text-stone-400 mt-0.5">By units sold — Mar 2026</p>
                    </CardHeader>
                    <CardContent className="px-6 ">
                        <div className="space-y-4">
                            {topProducts.map((p, i) => (
                                <div key={p.name} className="flex items-center gap-3">
                                    <span className="text-xs font-black text-stone-300 w-5 text-right shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-stone-800 truncate">{p.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="h-1.5 rounded-full bg-stone-100 flex-1">
                                                <div
                                                    className="h-1.5 rounded-full bg-amber-500 transition-all duration-700"
                                                    style={{ width: `${(p.sold / topProducts[0].sold) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-[11px] text-stone-400 shrink-0">{p.sold}</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs font-bold text-stone-700">{p.revenue}</p>
                                        <p className={`text-[11px] font-bold ${p.change.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>
                                            {p.change}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ── Recent Orders Table ── */}
            <Card className="border border-stone-100 bg-white shadow-sm rounded-2xl">
                <CardHeader className="px-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base font-bold text-stone-800">Recent Orders</CardTitle>
                            <p className="text-xs text-stone-400 mt-0.5">Latest 6 transactions</p>
                        </div>
                        <div className="flex rounded-xl bg-stone-100 p-1 gap-0.5">
                            {(["all", "pending", "delivered"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setOrderTab(tab)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${orderTab === tab
                                        ? "bg-white text-stone-800 shadow-sm"
                                        : "text-stone-400 hover:text-stone-600"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-stone-100">
                                    <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-6 pb-3">Order</th>
                                    <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3">Customer</th>
                                    <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3 hidden md:table-cell">Item</th>
                                    <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3">Amount</th>
                                    <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3">Status</th>
                                    <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-6 pb-3 hidden lg:table-cell">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-50">
                                {filteredOrders.map((order) => {
                                    const cfg = statusConfig[order.status];
                                    const StatusIcon = cfg.icon;
                                    return (
                                        <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                                            <td className="px-6 py-3.5">
                                                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                                                    {order.id}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3.5">
                                                <span className="font-medium text-stone-700 text-sm">{order.customer}</span>
                                            </td>
                                            <td className="px-3 py-3.5 hidden md:table-cell">
                                                <span className="text-stone-500 text-xs truncate max-w-[160px] block">{order.product}</span>
                                            </td>
                                            <td className="px-3 py-3.5">
                                                <span className="font-bold text-stone-800">{order.amount}</span>
                                            </td>
                                            <td className="px-3 py-3.5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.cls}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {cfg.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5 hidden lg:table-cell">
                                                <span className="text-xs text-stone-400">{order.date}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {filteredOrders.length === 0 && (
                            <div className="text-center py-10 text-stone-400 text-sm">No orders match this filter.</div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
