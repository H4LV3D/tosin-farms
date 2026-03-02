import BrandLogo from "@/components/shared/brandLogo/brandLogo";
import { Card } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-y-4">
      <BrandLogo size={48} />
      <Card className="w-full max-w-md shadow-none bg-white">{children}</Card>
    </div>
  );
}
