import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwtPayload } from "@/lib/auth";

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

    if (!payload) {
        redirect("/login");
    }

    // Case-insensitive match, backend uses uppercase "ADMIN"
    if (payload.role?.toUpperCase() !== "ADMIN") {
        redirect("/");
    }

    return (
        <>{children}</>
    );
}
