import { create } from "zustand";
import { loginUser } from "../services/auth.service";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await loginUser(payload);

      localStorage.setItem("accessToken", res.data.AccessToken);

      set({
        user: res.data.user,
        loading: false,
      });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null });
  },
}));
