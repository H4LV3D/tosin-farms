import appAxios from "@/config/axios";
import { z } from "zod";


// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    category: string | null;
    images: string[];
    createdAt: string;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    price: z.preprocess(
        (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
        z.number({ message: "Price must be a number" }).positive("Price must be greater than 0")
    ),
    stock: z.preprocess(
        (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
        z.number({ message: "Stock must be a number" }).int().min(0, "Stock cannot be negative")
    ),
    category: z.string().optional(),
    images: z.array(z.string().url("Must be a valid URL")).optional(),
});

/** Validated and typed form values — use for useForm generic and API calls. */
export type ProductFormValues = z.infer<typeof productSchema>;

// ─── API helpers ──────────────────────────────────────────────────────────────

export const PAGE_SIZE = 9;

export async function fetchProducts(search: string, category: string): Promise<Product[]> {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category && category !== "all") params.set("category", category);
    const { data } = await appAxios.get(`/products?${params.toString()}`);
    return data;
}

export async function createProduct(dto: ProductFormValues): Promise<Product> {
    const { data } = await appAxios.post("/products", dto);
    return data;
}

export async function updateProduct({ id, dto }: { id: string; dto: ProductFormValues }): Promise<Product> {
    const { data } = await appAxios.patch(`/products/${id}`, dto);
    return data;
}

export async function deleteProduct(id: string): Promise<void> {
    await appAxios.delete(`/products/${id}`);
}