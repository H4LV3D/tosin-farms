"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { CartButton } from "@/components/shop/CartButton";
import BrandLogo from "../shared/brandLogo/brandLogo";

interface HeaderProps {
  isHomePage?: boolean;
}

export function Header({ isHomePage = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

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
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-3">
        {/* Logo */}
        <BrandLogo />

        {/* Nav */}
        <nav className="hidden lg:flex items-center justify-center gap-8">
          <Link
            href="/"
            className={`text-xs uppercase tracking-widest font-semibold hover:text-amber-700 transition-colors ${
              isDarkTheme ? "text-stone-300" : "text-stone-700"
            }`}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={`text-xs uppercase tracking-widest font-semibold hover:text-amber-700 transition-colors ${
              isDarkTheme ? "text-stone-300" : "text-stone-700"
            }`}
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className={`text-xs uppercase tracking-widest font-semibold hover:text-amber-700 transition-colors ${
              isDarkTheme ? "text-stone-300" : "text-stone-700"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`text-xs uppercase tracking-widest font-semibold hover:text-amber-700 transition-colors ${
              isDarkTheme ? "text-stone-300" : "text-stone-700"
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center justify-end gap-2">
          <CartButton isDarkTheme={isDarkTheme} />

          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all hover:scale-105"
          >
            Login / Sign Up
          </Link>

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
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/"
            className={`block text-sm font-semibold py-2 border-b transition-colors ${
              isDarkTheme
                ? "text-stone-300 border-white/10"
                : "text-stone-700 border-stone-100"
            }`}
          >
            Home
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/shop"
            className={`block text-sm font-semibold py-2 border-b transition-colors ${
              isDarkTheme
                ? "text-amber-400 border-white/10"
                : "text-amber-700 border-stone-100"
            }`}
          >
            Shop Now
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/about"
            className={`block text-sm font-semibold py-2 border-b transition-colors ${
              isDarkTheme
                ? "text-stone-300 border-white/10"
                : "text-stone-700 border-stone-100"
            }`}
          >
            About Us
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/contact"
            className={`block text-sm font-semibold py-2 border-b transition-colors ${
              isDarkTheme
                ? "text-stone-300 border-white/10"
                : "text-stone-700 border-stone-100"
            }`}
          >
            Contact Us
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/login"
            className="block text-center bg-amber-700 text-white text-sm font-bold py-3 rounded-full mt-4"
          >
            Login / Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
