"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  ChevronRight,
  Sprout,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const userNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
];

const adminNavItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
];

export default function Sidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const { logout, user } = useAuth();

  const navItems =
    user?.role?.toUpperCase() === "ADMIN" ? adminNavItems : userNavItems;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <aside className="w-64 h-screen bg-[#1a1a0e] text-stone-200 flex flex-col shrink-0 shadow-xl">
      {/* Brand */}
      <Link href="/">
        <div className="px-6 py-7 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-base leading-tight">
                Tosi Farms
              </p>
              <p className="text-[11px] text-amber-400 font-medium tracking-widest uppercase">
                {user?.role?.toUpperCase()} Panel
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                active
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-900/40"
                  : "text-stone-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer / user */}
      <div className="px-4 py-5 border-t border-white/10 space-y-3">
        <div className="px-3 py-2.5 rounded-xl bg-white/5">
          <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">
            Signed in as
          </p>
          <p className="text-xs text-stone-300 mt-0.5 truncate font-medium">
            {userEmail}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-stone-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
