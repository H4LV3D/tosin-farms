"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CartButton } from "@/components/shop/CartButton";
import BrandLogo from "../shared/brandLogo/brandLogo";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4">
      <div className="absolute inset-0 bg-cream/90 backdrop-blur-md"></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <BrandLogo />

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/shop"
            className="text-xs uppercase tracking-widest font-bold text-amber-700 hover:text-amber-600 transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/login"
            className="text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-700 transition-colors"
          >
            Login
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <CartButton />
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all hover:scale-105"
          >
            Order Now
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 text-stone-700 ml-1"
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-cream border-b border-amber-200/60 shadow-lg py-6 px-6 space-y-4">
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/shop"
            className="block text-sm font-semibold text-amber-700 py-2 border-b border-stone-100"
          >
            Shop Online
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/login"
            className="block text-sm font-semibold text-stone-700 py-2 border-b border-stone-100"
          >
            Login
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/shop"
            className="block text-center bg-amber-700 text-white text-sm font-bold py-3 rounded-full mt-4"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}
