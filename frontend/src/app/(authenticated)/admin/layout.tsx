import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwtPayload, isTokenExpired } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("auth_token");

    if (!tokenCookie?.value) {
        redirect("/login");
    }

    const payload = decodeJwtPayload(tokenCookie.value);

    if (!payload || isTokenExpired(payload)) {
        redirect("/login");
    }

    // Case-insensitive match, backend uses uppercase "ADMIN"
    if (payload.role?.toUpperCase() !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen bg-[#f7f5f2]">
            <AdminSidebar userEmail={payload.email} />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
