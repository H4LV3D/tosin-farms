import appAxios from "@/config/axios";
import type { Order } from "./api";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminStats {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
}

export interface MonthlyDataPoint {
    month: string;
    revenue: number;
    orders: number;
}

export interface OrderStatusPoint {
    name: string;
    value: number;
    fill: string;
}

export interface TopProduct {
    name: string;
    sold: number;
    revenue: number;
}

export interface AdminOrder {
    id: string;
    status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    totalAmount: number;
    dispatchProvider?: string;
    trackingNumber?: string;
    shippingAddress?: string;
    customerNote?: string;
    createdAt: string;
    items: Array<{
        id: string;
        productId: string;
        quantity: number;
        price: number;
        product?: { id: string; name: string; images: string[] };
    }>;
    user?: {
        id: string;
        name: string | null;
        email: string;
    };
}

export interface AdminUser {
    id: string;
    email: string;
    name: string | null;
    role: string;
    createdAt: string;
    _count?: {
        orders: number;
    };
}

export interface AdminUserDetail extends AdminUser {
    orders: Order[];
    bio: string | null;
    avatarUrl: string | null;
}

// ─── Dashboard Analytics ──────────────────────────────────────────────────────

export async function fetchAdminStats(): Promise<AdminStats> {
    const { data } = await appAxios.get<AdminStats>("/admin/stats");
    return data;
}

export async function fetchAdminMonthlyData(): Promise<MonthlyDataPoint[]> {
    const { data } = await appAxios.get<MonthlyDataPoint[]>("/admin/analytics/monthly");
    return data;
}

export async function fetchAdminOrderStatus(): Promise<OrderStatusPoint[]> {
    const { data } = await appAxios.get<OrderStatusPoint[]>("/admin/analytics/order-status");
    return data;
}

export async function fetchAdminTopProducts(): Promise<TopProduct[]> {
    const { data } = await appAxios.get<TopProduct[]>("/admin/analytics/top-products");
    return data;
}

export async function fetchAdminRecentOrders(): Promise<AdminOrder[]> {
    const { data } = await appAxios.get<AdminOrder[]>("/admin/orders/recent");
    return data;
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function fetchAdminOrders(): Promise<AdminOrder[]> {
    const { data } = await appAxios.get<AdminOrder[]>("/admin/orders");
    return data;
}

export async function fetchAdminOrder(id: string): Promise<AdminOrder> {
    const { data } = await appAxios.get<AdminOrder>(`/admin/orders/${id}`);
    return data;
}

export async function updateOrderStatus(id: string, status: string): Promise<AdminOrder> {
    const { data } = await appAxios.patch<AdminOrder>(`/admin/orders/${id}/status`, { status });
    return data;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function fetchAdminUsers(): Promise<AdminUser[]> {
    const { data } = await appAxios.get<AdminUser[]>("/admin/users");
    return data;
}

export async function fetchAdminUserDetail(id: string): Promise<AdminUserDetail> {
    const { data } = await appAxios.get<AdminUserDetail>(`/admin/users/${id}`);
    return data;
}
