"use client";

import { useEffect, useState } from "react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure the Zustend store is mounted on the client before rendering to avoid hydration matches
    // especially with the persist middleware.
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) {
    return null; // or a minimal loading screen, but usually null is fine for CSR hydration
  }

  return <>{children}</>;
}
