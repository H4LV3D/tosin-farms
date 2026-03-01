import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const hasAuth = cookieStore.get("has_auth");
    const role = cookieStore.get("user_role");

    // Basic check for a placeholder authentication cookie and admin role.
    if (!hasAuth || hasAuth.value !== "true") {
        redirect("/auth/login");
    }

    if (!role || role.value !== "admin") {
        // If authenticated but not admin, redirect to a safe page (e.g., home or profile)
        redirect("/");
    }

    return (
        <div className="flex min-h-screen bg-stone-50">
            {/* Sidebar for Admin can be added here later */}
            <aside className="w-64 bg-white border-r border-stone-200 hidden md:block">
                <div className="p-6">
                    <h2 className="text-xl font-display font-bold text-earth">
                        Admin Panel
                    </h2>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <a
                        href="/dashboard"
                        className="block px-4 py-2 rounded-md hover:bg-stone-100 text-stone-700"
                    >
                        Dashboard
                    </a>
                    <a
                        href="/products"
                        className="block px-4 py-2 rounded-md hover:bg-stone-100 text-stone-700"
                    >
                        Products
                    </a>
                    <a
                        href="/orders"
                        className="block px-4 py-2 rounded-md hover:bg-stone-100 text-stone-700"
                    >
                        Orders
                    </a>
                </nav>
            </aside>
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
