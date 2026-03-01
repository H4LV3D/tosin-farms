import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwtPayload, isTokenExpired } from "@/lib/auth";

export default async function AuthenticatedLayout({
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

    return <>{children}</>;
}
