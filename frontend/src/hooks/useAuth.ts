"use client";

import { useStore } from "@/store";

export const useAuth = () => {
  const user = useStore((state) => state.user);
  const accessToken = useStore((state) => state.accessToken);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setCredentials = useStore((state) => state.setCredentials);
  const logout = useStore((state) => state.logout);

  return {
    user,
    accessToken,
    isAuthenticated,
    setCredentials,
    logout,
  };
};
