"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyOrders, Order } from "@/lib/api";
import {
  ChevronRight,
  CircleDollarSign,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  ShoppingBag,
} from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  AuthenticatedPageContainer,
  PageHeader,
  EmptyState,
  ListSkeleton,
} from "@/components/shared/AuthenticatedPageLayout";

const statusConfig = {
  PENDING: {
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Clock,
  },
  PAID: {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: CircleDollarSign,
  },
  SHIPPED: {
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    icon: Truck,
  },
  DELIVERED: {
    color: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
  },
  CANCELLED: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
};

export default function OrdersPage() {
  const [filter, setFilter] = useState<Order["status"] | "ALL">("ALL");

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchMyOrders,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const filteredOrders = orders?.filter(
    (order) => filter === "ALL" || order.status === filter,
  );

  if (isLoading) {
    return (
      <AuthenticatedPageContainer>
        <ListSkeleton count={3} />
      </AuthenticatedPageContainer>
    );
  }

  return (
    <AuthenticatedPageContainer>
      <PageHeader
        title="My Orders"
        description="Keep track of your farm-fresh deliveries and history."
      >
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-stone-100 overflow-x-auto scrollbar-hide w-fit">
          {["ALL", "PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"].map(
            (status) => (
              <button
                key={status}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setFilter(status as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                  filter === status
                    ? "bg-amber-700 text-white shadow-lg shadow-amber-900/20"
                    : "text-stone-400 hover:text-stone-600 hover:bg-stone-50",
                )}
              >
                {status}
              </button>
            ),
          )}
        </div>
      </PageHeader>

      {!filteredOrders || filteredOrders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders found"
          description={
            filter === "ALL"
              ? "It looks like you haven't placed any orders yet. Start shopping to fill this space!"
              : `You don't have any orders with status "${filter}" at the moment.`
          }
          actionLabel="Start Shopping"
          actionHref="/"
        />
      ) : (
        <div className="grid gap-6">
          {filteredOrders.map((order) => {
            const Config = statusConfig[order.status];
            const StatusIcon = Config.icon;

            const formatAddress = (addressStr: string | null | undefined) => {
              if (!addressStr) return "N/A";
              try {
                const addr = JSON.parse(addressStr);
                return `${addr.street}, ${addr.city}, ${addr.state}`;
              } catch {
                return addressStr;
              }
            };

            return (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <Card className="group border-none shadow-sm hover:shadow-2xl hover:shadow-stone-200/50 rounded-3xl transition-all duration-300 bg-white overflow-hidden border border-stone-50">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left Info Section */}
                      <div className="flex-1 p-6 md:p-8 space-y-6">
                        <div className="flex flex-wrap items-center justify-between md:grid grid-cols-3 gap-4">
                          <div className="flex md:flex-col items-center md:items-start gap-2 ">
                            <span className="text-stone-400 font-medium text-sm">
                              Order ID
                            </span>
                            <span className="text-xl text-stone-800 font-bold uppercase">
                              #{order.id.slice(-8).toUpperCase()}
                            </span>
                          </div>

                          <div className="flex items-center md:flex-col md:items-start">
                            <span className="text-stone-400 font-medium text-sm">
                              Date
                            </span>
                            <span className="text-xl font-bold text-stone-800">
                              {format(
                                new Date(order.createdAt),
                                "MMMM d, yyyy",
                              )}
                            </span>
                          </div>

                          <div className="flex items-center md:flex-col md:items-start">
                            <span className="text-stone-400 font-medium text-sm">
                              Status
                            </span>
                            <Badge
                              className={cn(
                                "px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest gap-2",
                                Config.color,
                              )}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {order.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-6 border-t border-stone-50">
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-stone-400">
                              Total Amount
                            </p>
                            <p className="text-xl font-black text-amber-700">
                              ₦{order.totalAmount.toLocaleString()}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-stone-400">
                              Items
                            </p>
                            <p className="text-xl font-black text-stone-800">
                              {order.items.length}
                            </p>
                          </div>
                          <div className="space-y-1 col-span-2">
                            <p className="text-sm font-bold text-stone-400">
                              Shipping To
                            </p>
                            <p className="text-sm font-bold text-stone-800 truncate max-w-[200px]">
                              {formatAddress(order.shippingAddress)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Action Section */}
                      <div className="lg:w-48 bg-stone-50 lg:border-l border-stone-100 flex items-center justify-center p-6 group-hover:bg-amber-50 transition-colors">
                        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs text-stone-400 group-hover:text-amber-700 transition-all group-hover:translate-x-1">
                          Details
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </AuthenticatedPageContainer>
  );
}
