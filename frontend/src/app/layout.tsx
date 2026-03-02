import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/QueryProvider";
import { Toaster } from "react-hot-toast";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tosi Farms — From Our Fields to Your Table",
  description:
    "Fresh cassava, maize, fruits and artisan-processed foods like garri, grown and processed locally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${lora.variable} font-sans antialiased text-earth bg-cream selection:bg-amber-800 selection:text-amber-100`}
      >
        <QueryProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                borderRadius: "8px",
              },
              success: {
                iconTheme: { primary: "#b45309", secondary: "#fff" },
              },
            }}
          />
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
