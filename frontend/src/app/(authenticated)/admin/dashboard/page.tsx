/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  BarChart2,
} from "lucide-react";
import {
  fetchAdminStats,
  fetchAdminMonthlyData,
  fetchAdminOrderStatus,
  fetchAdminTopProducts,
  fetchAdminRecentOrders,
  type AdminOrder,
} from "@/lib/admin-api";

// ─── Chart configs ─────────────────────────────────────────────────────────────

const revenueChartConfig = {
  revenue: { label: "Revenue (₦)", color: "#d97706" },
  orders: { label: "Orders", color: "#10b981" },
} satisfies ChartConfig;

const orderStatusConfig = {
  Delivered: { label: "Delivered", color: "#10b981" },
  Pending: { label: "Pending", color: "#f59e0b" },
  Shipped: { label: "Shipped", color: "#3b82f6" },
  Cancelled: { label: "Cancelled", color: "#ef4444" },
} satisfies ChartConfig;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig: Record<
  string,
  { label: string; icon: React.ElementType; cls: string }
> = {
  DELIVERED: {
    label: "Delivered",
    icon: CheckCircle2,
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  PAID: {
    label: "Paid",
    icon: CheckCircle2,
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  SHIPPED: {
    label: "Shipped",
    icon: Truck,
    cls: "bg-blue-50 text-blue-700 border-blue-200",
  },
  PENDING: {
    label: "Pending",
    icon: Clock,
    cls: "bg-amber-50 text-amber-700 border-amber-200",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    cls: "bg-red-50 text-red-700 border-red-200",
  },
};

function formatRevenue(value: number) {
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `₦${(value / 1_000).toFixed(0)}K`;
  return `₦${value}`;
}

function NoDataPlaceholder({ height = 240 }: { height?: number }) {
  return (
    <div
      className="flex items-center justify-center bg-stone-50 rounded-xl"
      style={{ height }}
    >
      <div className="flex flex-col items-center gap-2 text-stone-300">
        <BarChart2 className="w-8 h-8" />
        <p className="text-xs font-medium">No data yet</p>
      </div>
    </div>
  );
}

// ─── Tooltips ─────────────────────────────────────────────────────────────────

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-stone-200 rounded-xl px-4 py-3 shadow-xl text-xs space-y-1.5">
      <p className="font-bold text-stone-700 text-sm">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: p.color }}
          />
          <span className="text-stone-500">
            {p.name === "revenue" ? "Revenue" : "Orders"}:
          </span>
          <span className="font-bold text-stone-800">
            {p.name === "revenue"
              ? formatRevenue(p.value)
              : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function StatusTooltip({ active, payload, total }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white border border-stone-200 rounded-xl px-4 py-3 shadow-xl text-xs">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: d.payload.fill }}
        />
        <span className="font-bold text-stone-800">{d.name}</span>
      </div>
      <p className="text-stone-500">
        {d.value} orders{" "}
        <span className="font-bold text-stone-700">
          ({total > 0 ? ((d.value / total) * 100).toFixed(0) : 0}%)
        </span>
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [orderTab, setOrderTab] = useState<"all" | "pending" | "delivered">(
    "all",
  );

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchAdminStats,
  });

  const { data: monthlyData = [], isLoading: monthlyLoading } = useQuery({
    queryKey: ["admin-monthly"],
    queryFn: fetchAdminMonthlyData,
  });

  const { data: orderStatusData = [], isLoading: statusLoading } = useQuery({
    queryKey: ["admin-order-status"],
    queryFn: fetchAdminOrderStatus,
  });

  const { data: topProducts = [], isLoading: topProductsLoading } = useQuery({
    queryKey: ["admin-top-products"],
    queryFn: fetchAdminTopProducts,
  });

  const { data: recentOrders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-recent-orders"],
    queryFn: fetchAdminRecentOrders,
  });

  const totalOrderStatus = orderStatusData.reduce((s, x) => s + x.value, 0);

  const filteredOrders = recentOrders.filter((o: AdminOrder) => {
    if (orderTab === "pending") return o.status === "PENDING";
    if (orderTab === "delivered") return o.status === "DELIVERED";
    return true;
  });

  const statCards = [
    {
      title: "Total Revenue",
      value: stats ? `₦ ${stats.totalRevenue.toLocaleString()}` : "—",
      icon: DollarSign,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      sub: "Across all paid orders",
    },
    {
      title: "Total Orders",
      value: stats ? stats.totalOrders.toLocaleString() : "—",
      icon: ShoppingCart,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      sub: "All time",
    },
    {
      title: "Total Users",
      value: stats ? stats.totalCustomers.toLocaleString() : "—",
      icon: Users,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      sub: "Registered users",
    },
    {
      title: "Active Products",
      value: stats ? stats.totalProducts.toLocaleString() : "—",
      icon: Package,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      sub: "In catalogue",
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1400px]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-stone-400 mt-0.5">
            Overview of your farm store
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400 font-medium">Live data</span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className=" border-neutral-200! bg-white rounded-xl"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={`p-2.5 rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {statsLoading && (
                    <Loader2 className="w-4 h-4 animate-spin text-stone-300" />
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-extrabold text-stone-900 tracking-tight">
                    {statsLoading ? (
                      <span className="text-stone-200">——</span>
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-xs text-stone-400 mt-1 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-[11px] text-stone-300 mt-0.5">
                    {stat.sub}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Charts Row 1: Revenue Area + Order Status Pie ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Revenue + Orders Area Chart */}
        <Card className="xl:col-span-2 p-6 border border-stone-100 bg-white shadow-sm rounded-2xl">
          <CardHeader className="px-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-stone-800">
                  Revenue & Orders
                </CardTitle>
                <p className="text-xs text-stone-400 mt-0.5">Monthly trend</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-0">
            {monthlyLoading ? (
              <div className="flex items-center justify-center h-[240px]">
                <Loader2 className="w-6 h-6 animate-spin text-stone-300" />
              </div>
            ) : monthlyData.length === 0 ? (
              <NoDataPlaceholder height={240} />
            ) : (
              <>
                <ChartContainer
                  config={revenueChartConfig}
                  className="h-[240px] w-full"
                >
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="gradRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#d97706"
                          stopOpacity={0.18}
                        />
                        <stop
                          offset="95%"
                          stopColor="#d97706"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradOrders"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f1ede6"
                      vertical={false}
                    />
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
                <div className="flex items-center gap-5 mt-4 px-1">
                  {[
                    { color: "#d97706", label: "Revenue" },
                    { color: "#10b981", label: "Orders" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-0.5 rounded-full block"
                        style={{ background: l.color }}
                      />
                      <span className="text-xs text-stone-400 font-medium">
                        {l.label}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Order Status Pie Chart */}
        <div className="border border-stone-100 bg-white shadow-sm rounded-2xl p-6 space-y-1">
          <CardTitle className="text-base font-bold text-stone-800">
            Order Status
          </CardTitle>
          <p className="text-xs text-stone-400">
            All-time breakdown
            {totalOrderStatus > 0
              ? ` · ${totalOrderStatus.toLocaleString()} total`
              : ""}
          </p>

          {statusLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <Loader2 className="w-6 h-6 animate-spin text-stone-300" />
            </div>
          ) : orderStatusData.length === 0 ? (
            <NoDataPlaceholder height={200} />
          ) : (
            <>
              <ChartContainer
                config={orderStatusConfig}
                className="h-[75%] w-full"
              >
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
                  <Tooltip
                    content={<StatusTooltip total={totalOrderStatus} />}
                  />
                </PieChart>
              </ChartContainer>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                {orderStatusData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: d.fill }}
                    />
                    <div>
                      <p className="text-xs font-semibold text-stone-700">
                        {d.name}
                      </p>
                      <p className="text-[11px] text-stone-400">
                        {d.value} ·{" "}
                        {totalOrderStatus > 0
                          ? ((d.value / totalOrderStatus) * 100).toFixed(0)
                          : 0}
                        %
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Charts Row 2: Weekly breakdown placeholder + Top Products ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* ── Recent Orders Table ── */}
        <Card className="col-span-2 border border-stone-100 bg-white shadow-sm p-6 rounded-2xl">
          <CardHeader className="px-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-stone-800">
                  Recent Orders
                </CardTitle>
                <p className="text-xs text-stone-400 mt-0.5">
                  Latest transactions
                </p>
              </div>
              <div className="flex rounded-xl bg-stone-100 p-1 gap-0.5">
                {(["all", "pending", "delivered"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setOrderTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      orderTab === tab
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
            {ordersLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-stone-300" />
              </div>
            ) : (
              <div className="overflow-x-auto h-[240px] ">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-100">
                      <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-6 pb-3">
                        Order ID
                      </th>
                      <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3">
                        Amount
                      </th>
                      <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-3 pb-3">
                        Status
                      </th>
                      <th className="text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 px-6 pb-3 hidden lg:table-cell">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {filteredOrders.map((order: AdminOrder) => {
                      const cfg =
                        statusConfig[order.status] ?? statusConfig["PENDING"];
                      const StatusIcon = cfg.icon;
                      return (
                        <tr
                          key={order.id}
                          className="hover:bg-stone-50/60 transition-colors"
                        >
                          <td className="px-6 py-3.5">
                            <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                              #{order.id.slice(0, 8).toUpperCase()}
                            </span>
                          </td>
                          <td className="px-3 py-3.5">
                            <span className="font-bold text-stone-800">
                              ₦{order.totalAmount.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-3 py-3.5">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.cls}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {cfg.label}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 hidden lg:table-cell">
                            <span className="text-xs text-stone-400">
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-NG",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <div className="text-center py-10 text-stone-400 text-sm">
                    {recentOrders.length === 0
                      ? "No orders yet."
                      : "No orders match this filter."}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border border-stone-100 bg-white shadow-sm p-6 rounded-2xl">
          <CardHeader className="px-0">
            <CardTitle className="text-base font-bold text-stone-800">
              Top Products
            </CardTitle>
            <p className="text-xs text-stone-400 mt-0.5">By units sold</p>
          </CardHeader>
          <CardContent className="px-0">
            {topProductsLoading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="w-6 h-6 animate-spin text-stone-300" />
              </div>
            ) : topProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 gap-2 text-stone-300">
                <Package className="w-8 h-8" />
                <p className="text-xs font-medium text-stone-400">
                  No product data yet
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {topProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="text-xs font-black text-stone-300 w-5 text-right shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-stone-800 truncate">
                        {p.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-1.5 rounded-full bg-stone-100 flex-1">
                          <div
                            className="h-1.5 rounded-full bg-amber-500 transition-all duration-700"
                            style={{
                              width: `${
                                topProducts[0]?.sold > 0
                                  ? (p.sold / topProducts[0].sold) * 100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] text-stone-400 shrink-0">
                          {p.sold}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-stone-700">
                        ₦{p.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
