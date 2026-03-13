"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { motion } from "framer-motion";
import { CartButton } from "@/components/shop/CartButton";
import BrandLogo from "../shared/brandLogo/brandLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop Now" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
] as const;

interface HeaderProps {
  isHomePage?: boolean;
}

export function Header({ isHomePage = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height (approximately)
      const heroHeight = window.innerHeight * 0.8; // 80vh approximate
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Determine if we should show the dark theme (on home page and not scrolled)
  const isDarkTheme = isHomePage && !isScrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4">
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          isDarkTheme ? "bg-transparent" : "bg-cream/90 backdrop-blur-md"
        }`}
      ></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <BrandLogo />

        {/* Nav */}
        <nav className="hidden lg:flex items-center justify-center gap-10 pl-40">
          {NAV_LINKS.map(({ href, label }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={href}
                className={`text-[15px] uppercase tracking-widest font-semibold hover:text-amber-700 transition-colors ${
                  isDarkTheme ? "text-stone-300" : "text-stone-700"
                }`}
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center justify-end gap-2">
          <CartButton isDarkTheme={isDarkTheme} />

          {user ? (
            <div className="hidden sm:flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors outline-none cursor-pointer">
                  <div className="bg-amber-100 p-1.5 rounded-full text-amber-700">
                    <User className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-sm font-semibold max-w-[100px] truncate ${
                      isDarkTheme ? "text-stone-200" : "text-stone-700"
                    }`}
                  >
                    {user?.name?.split(" ")[0]}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-cream border-amber-200"
                >
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer font-semibold text-stone-700 focus:bg-amber-100"
                  >
                    <Link
                      href={
                        user.role === "ADMIN" ? "/admin/dashboard" : "/profile"
                      }
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer font-semibold text-red-600 focus:bg-red-50 focus:text-red-700 mt-1"
                    onClick={() => {
                      logout();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all hover:scale-105"
            >
              Login / Sign Up
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden flex flex-col gap-1.5 p-2 ml-1 transition-colors ${
              isDarkTheme ? "text-stone-300" : "text-stone-700"
            }`}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden absolute top-full left-0 right-0 border-b shadow-lg py-6 px-6 space-y-4 transition-colors ${
            isDarkTheme
              ? "bg-[#1c1917]/95 border-white/10"
              : "bg-cream border-amber-200/60"
          }`}
        >
          {NAV_LINKS.map(({ href, label }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                href={href}
                className={`block text-sm font-semibold py-2 border-b transition-colors ${
                  isDarkTheme
                    ? "text-stone-300 border-white/10"
                    : "text-stone-700 border-stone-100"
                }`}
              >
                {label}
              </Link>
            </motion.div>
          ))}
          {user ? (
            <div className="pt-2 mt-4 border-t border-amber-200/60">
              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                  <User className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-stone-800 dark:text-stone-200 truncate pr-2">
                    {user.name}
                  </p>
                  <p className="text-xs text-stone-500 truncate pr-2">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                href={user.role === "ADMIN" ? "/admin/dashboard" : "/profile"}
                className="block text-sm font-semibold py-2 text-stone-700 dark:text-stone-300 mb-1"
              >
                Profile
              </Link>

              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                className="block w-full text-left text-sm font-semibold py-2 text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/login"
              className="block text-center bg-amber-700 text-white text-sm font-bold py-3 rounded-full mt-4"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
