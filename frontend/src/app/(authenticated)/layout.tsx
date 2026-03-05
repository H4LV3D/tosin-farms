import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwtPayload, isTokenExpired } from "@/lib/auth";
import Sidebar from "./sidebar";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("refreshToken");

  if (!tokenCookie?.value) {
    redirect("/login");
  }

  const payload = decodeJwtPayload(tokenCookie.value);

  if (!payload || isTokenExpired(payload)) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-[#f7f5f2]">
      <Sidebar userEmail={payload.email} userName={payload.name} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
