import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1c1917] text-white py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="15"
                  stroke="#d97706"
                  strokeWidth="1.5"
                />
                <path
                  d="M16 24 C16 24 9 18 9 12 A7 7 0 0 1 23 12 C23 18 16 24 16 24Z"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M16 14 L16 24"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M13 17 L16 14 L19 17"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display font-bold text-xl text-white">
                Tosi Farms
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              A local farm growing and processing quality cassava, maize,
              fruits, and garri for households, traders, and businesses in our
              region.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M11.94 0C5.335 0 0 5.335 0 11.94a11.9 11.9 0 001.6 5.985L0 24l6.278-1.572A11.9 11.9 0 0011.94 23.88C18.545 23.88 24 18.545 24 11.94S18.545 0 11.94 0zm0 21.818a9.843 9.843 0 01-5.017-1.373l-.36-.214-3.728.932.978-3.636-.235-.374A9.876 9.876 0 012.06 11.94c0-5.45 4.43-9.878 9.88-9.878 5.45 0 9.878 4.428 9.878 9.878 0 5.45-4.428 9.878-9.878 9.878z" />
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>
                <Link
                  href="/#products"
                  className="hover:text-amber-400 transition-colors"
                >
                  Our Products
                </Link>
              </li>
              <li>
                <Link
                  href="/#difference"
                  className="hover:text-amber-400 transition-colors"
                >
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-amber-400 transition-colors"
                >
                  Online Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-amber-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>📍 Off Farm Road, Local Gov, State.</li>
              <li>📞 +234 000 000 0000</li>
              <li>✉️ hello@tosifarms.com</li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-amber-400 transition-colors inline-block mt-2"
                >
                  Send us a message →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} Tosi Farms. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link
              href="/terms"
              className="hover:text-amber-400 transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
