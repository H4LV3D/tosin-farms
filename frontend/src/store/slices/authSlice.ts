export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  avatarUrl?: string | null;
  bio?: string | null;
}

export interface AuthSlice {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setCredentials: (user: AuthUser, accessToken: string) => void;
  updateUser: (user: Partial<AuthUser>) => void;
  logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAuthSlice = (set: any): AuthSlice => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setCredentials: (user, accessToken) =>
    set({ user, accessToken, isAuthenticated: true }),
  updateUser: (data) =>
    set((state: any) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
});
