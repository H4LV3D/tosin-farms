import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    category_id: string;
    image_url?: string;
    is_active: boolean;
}

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function fetchCategories(): Promise<Category[]> {
    try {
        const res = await apiClient.get<Category[]>("/categories");
        return res.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return []; // Return empty array on failure so UI doesn't break
    }
}

export async function fetchProducts(
    categoryId?: string,
): Promise<Product[]> {
    try {
        const params = categoryId && categoryId !== "all" ? { category_id: categoryId } : {};
        const res = await apiClient.get<Product[]>("/products", { params });
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
