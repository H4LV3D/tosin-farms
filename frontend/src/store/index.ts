import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice, AuthSlice } from "./slices/authSlice";

type StoreState = AuthSlice;

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      ...createAuthSlice(set),
    }),
    {
      name: "tosi-farms-store", // Name of the item in the storage (must be unique)
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }), // Persist user info so UI remains instantly available between reloads while we await interceptor
    },
  ),
);
