import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const hasAuth = cookieStore.get("has_auth");

    // Basic check for a placeholder authentication cookie.
    // Replace this with actual auth logic (e.g., verifying a JWT or session token).
    if (!hasAuth || hasAuth.value !== "true") {
        redirect("/auth/login");
    }

    return <>{children}</>;
}
