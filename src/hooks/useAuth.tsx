import { User } from "types";
import { create } from "zustand";

type AuthState = {
  user?: Partial<User>;
  setUser: (user: Partial<User>) => Promise<void>;
  setToken: (token: string) => void;
};
const useAuth = create<AuthState>((set) => ({
  setUser: async (user: Partial<User>) => {
    set({ user: { ...user } });
  },
  setToken(token) {
    localStorage.setItem("accessToken", JSON.stringify(token));
  },
}));

export default useAuth;
