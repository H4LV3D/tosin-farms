export interface AuthUser {
  name: string;
  email: string;
  role: string;
}

export interface AuthSlice {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setCredentials: (user: AuthUser, accessToken: string) => void;
  logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAuthSlice = (set: any): AuthSlice => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setCredentials: (user, accessToken) =>
    set({ user, accessToken, isAuthenticated: true }),
  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
});
