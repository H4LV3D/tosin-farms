import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/shop/CartDrawer";

interface PageLayoutProps {
  children: React.ReactNode;
  isHomePage?: boolean;
}

export default function PageLayout({
  children,
  isHomePage = false,
}: PageLayoutProps) {
  return (
    <>
      <Header isHomePage={isHomePage} />
      <CartDrawer />
      {children}
      <Footer />
    </>
  );
}
