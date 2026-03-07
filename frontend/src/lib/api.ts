import axios from "axios";
import appAxios from "@/config/axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode?: string;
}

export interface CheckoutPayload {
  email: string;
  dispatchType: "DHL" | "FEDEX" | "GIG";
  shippingAddress: ShippingAddress;
  note?: string;
  items?: { productId: string; quantity: number }[];
}

export interface CheckoutResult {
  orderId: string;
  amount: number;
  shipping: number;
  subtotal: number;
  currency: string;
  paymentUrl: string;
  itemCount: number;
}

export interface Order {
  id: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  dispatchProvider?: string;
  trackingNumber?: string;
  shippingAddress?: string;
  customerNote?: string;
  createdAt: string;
  items: OrderItem[];
}

export interface SavedAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingOption {
  id: "DHL" | "FEDEX" | "GIG";
  price: number;
  label: string;
  desc: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Pick<Product, "id" | "name" | "images">;
}

// ─── Legacy aliases (old api.ts compat) ──────────────────────────────────────
export type Category = { id: string; name: string; slug: string };

// ─── HTTP Client ──────────────────────────────────────────────────────────────
export const apiClient = appAxios;

// ─── Products ─────────────────────────────────────────────────────────────────

export async function fetchProducts(
  category?: string,
  search?: string,
): Promise<Product[]> {
  try {
    const params: Record<string, string> = {};
    if (category && category !== "all") params.category = category;
    if (search) params.search = search;
    const res = await apiClient.get<Product[]>("/products", { params });
    return res.data;
  } catch {
    return [];
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const res = await apiClient.get<Product>(`/products/${id}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const res = await apiClient.get<string[]>("/products/categories");
    return res.data;
  } catch {
    return [];
  }
}

// ─── Cart (authenticated, server-persisted) ───────────────────────────────────

export async function fetchServerCart(): Promise<Cart> {
  const res = await apiClient.get<Cart>("/cart");
  return res.data;
}

export async function upsertCartItem(
  productId: string,
  quantity: number,
): Promise<Cart> {
  const res = await apiClient.post<Cart>("/cart/items", {
    productId,
    quantity,
  });
  return res.data;
}

export async function removeCartItem(productId: string): Promise<Cart> {
  const res = await apiClient.delete<Cart>(`/cart/items/${productId}`);
  return res.data;
}

export async function clearServerCart(): Promise<void> {
  await apiClient.delete("/cart");
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function checkoutOrder(
  payload: CheckoutPayload,
): Promise<CheckoutResult> {
  const res = await apiClient.post<CheckoutResult>("/orders/checkout", payload);
  return res.data;
}

export async function fetchMyOrders(): Promise<Order[]> {
  const res = await apiClient.get<Order[]>("/orders");
  return res.data;
}

export async function fetchOrder(id: string): Promise<Order> {
  const res = await apiClient.get<Order>(`/orders/${id}`);
  return res.data;
}

export async function fetchShippingOptions(
  shippingAddress: ShippingAddress,
  items?: { productId: string; quantity: number }[],
): Promise<ShippingOption[]> {
  const res = await apiClient.post<ShippingOption[]>(
    "/orders/shipping-options",
    { shippingAddress, items },
  );
  return res.data;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  bio: string | null;
  role: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  createdAt: string;
}

// ─── Users & Profile ─────────────────────────────────────────────────────────

export async function updateProfile(data: {
  name?: string;
  bio?: string;
  avatarUrl?: string;
}): Promise<UserProfile> {
  const res = await apiClient.put<UserProfile>("/users/profile", data);
  return res.data;
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export async function fetchWishlist(): Promise<WishlistItem[]> {
  const res = await apiClient.get<WishlistItem[]>("/users/wishlist");
  return res.data;
}

export async function addToWishlist(productId: string): Promise<WishlistItem> {
  const res = await apiClient.post<WishlistItem>(`/users/wishlist/${productId}`);
  return res.data;
}

export async function removeFromWishlist(productId: string): Promise<void> {
  await apiClient.delete(`/users/wishlist/${productId}`);
}

// ─── Users & Addresses (authenticated) ────────────────────────────────────────

export async function fetchUserAddresses(): Promise<SavedAddress[]> {
  const res = await apiClient.get<SavedAddress[]>("/users/addresses");
  return res.data;
}

export async function addUserAddress(
  data: Omit<SavedAddress, "id" | "createdAt" | "updatedAt">,
): Promise<SavedAddress> {
  const res = await apiClient.post<SavedAddress>("/users/addresses", data);
  return res.data;
}

export async function updateUserAddress(
  id: string,
  data: Partial<SavedAddress>,
): Promise<SavedAddress> {
  const res = await apiClient.put<SavedAddress>(`/users/addresses/${id}`, data);
  return res.data;
}

export async function deleteUserAddress(id: string): Promise<void> {
  await apiClient.delete(`/users/addresses/${id}`);
}
// ─── Passkeys (WebAuthn) ───────────────────────────────────────────────────
export interface PasskeyRegistrationOptions {
  challenge: string;
  rp: { name: string; id: string };
  user: { id: string; name: string; displayName: string };
  pubKeyCredParams: { type: string; alg: number }[];
  authenticatorSelection?: any;
  timeout?: number;
  attestation?: string;
  excludeCredentials?: any[];
}

export const getPasskeyRegistrationOptions = async () => {
  const response = await apiClient.get<PasskeyRegistrationOptions>(
    "/auth/passkey/register-options",
  );
  return response.data;
};

export const verifyPasskeyRegistration = async (body: any) => {
  const response = await apiClient.post<{ verified: boolean }>(
    "/auth/passkey/register-verify",
    body,
  );
  return response.data;
};

export const getPasskeyLoginOptions = async (email?: string) => {
  const response = await apiClient.post<any>("/auth/passkey/login-options", {
    email,
  });
  return response.data;
};

export const verifyPasskeyLogin = async (response: any, email?: string) => {
  const res = await apiClient.post<{
    id: string;
    token: string;
    role: string;
    email: string;
    name: string;
  }>("/auth/passkey/login-verify", { response, email });
  return res.data;
};

export const fetchPasskeyStatus = async () => {
  const response = await apiClient.get<{ hasPasskey: boolean }>(
    "/users/passkey-status",
  );
  return response.data;
};
