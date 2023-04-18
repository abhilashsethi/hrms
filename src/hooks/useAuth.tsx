import { User } from "types";
import { create } from "zustand";
import { BASE_URL } from "./useAPI";

type AuthState = {
  user?: Partial<User>;
  setUser: (user: Partial<User>) => Promise<void>;
  setToken: (token: string) => void;
  token: string | null;
  validateUser: () => Promise<User | undefined>;
  logout: () => void;
};
const useAuth = create<AuthState>((set) => ({
  setUser: async (user: Partial<User>) => {
    set({
      user: { ...user },
    });
  },
  setToken(token) {
    localStorage.setItem("accessToken", JSON.stringify(token));
  },
  token:
    typeof window !== "undefined"
      ? typeof localStorage.getItem("accessToken") === "string"
        ? JSON.parse(localStorage.getItem("accessToken")!)
        : null
      : null,
  async validateUser() {
    try {
      if (typeof window === "undefined") {
        throw new Error("Window is undefined");
      }
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No Access Token Found");
      }
      const res = await fetch(`${BASE_URL}/auth/current-user`, {
        method: "GET",
        headers: { "x-access-token": JSON.parse(token) },
      });
      if (res.status !== 200) {
        throw new Error("Server Side Error");
      }
      const { data: currentUser } = (await res.json()) as { data: User };
      return currentUser;
    } catch (error) {
      console.log(error);
      set({ user: undefined });
    }
  },
  logout() {
    set({ user: undefined });
    if (typeof window !== "undefined") localStorage.removeItem("accessToken");
  },
}));

export default useAuth;
