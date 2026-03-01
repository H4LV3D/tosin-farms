"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4">
      <div className="absolute inset-0 bg-[#fdf8f0]/90 backdrop-blur-md"></div>
      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="15" stroke="#b45309" strokeWidth="1.5" />
            <path
              d="M16 24 C16 24 9 18 9 12 A7 7 0 0 1 23 12 C23 18 16 24 16 24Z"
              stroke="#b45309"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M16 14 L16 24"
              stroke="#b45309"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M13 17 L16 14 L19 17"
              stroke="#b45309"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display font-bold text-[#1c1917] text-lg tracking-tight">
            Tosi Farms
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* <Link
            href="/#products"
            className="text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-700 transition-colors"
          >
            Our Products
          </Link>
          <Link
            href="/#difference"
            className="text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-700 transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="/#process"
            className="text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-700 transition-colors"
          >
            How We Farm
          </Link>
          <Link
            href="/#testimonials"
            className="text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-700 transition-colors"
          >
            Reviews
          </Link> */}
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

        <Link
          href="/#order"
          className="hidden sm:inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all hover:scale-105"
        >
          Order Now
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 text-stone-700"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#fdf8f0] border-b border-amber-200/60 shadow-lg py-6 px-6 space-y-4">
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/#products"
            className="block text-sm font-semibold text-stone-700 py-2 border-b border-stone-100"
          >
            Our Products
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/#difference"
            className="block text-sm font-semibold text-stone-700 py-2 border-b border-stone-100"
          >
            Our Story
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/#process"
            className="block text-sm font-semibold text-stone-700 py-2 border-b border-stone-100"
          >
            How We Farm
          </Link>
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
            href="/#order"
            className="block text-center bg-amber-700 text-white text-sm font-bold py-3 rounded-full mt-4"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}
