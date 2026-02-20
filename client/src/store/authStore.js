import { create } from 'zustand';
import { authService } from "../services/authService";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: "",

  initialize: async () => {
    const user = await authService.getCurrentUser();
    set({ user, isAuthenticated: Boolean(user) });
  },

  login: async (credentials) => {
    set({ isLoading: true, error: "" });
    try {
      const user = await authService.login(credentials);
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      set({ error: error.message || "Unable to log in", isLoading: false });
      throw error;
    }
  },

  loginWithGoogle: async () => {
    set({ isLoading: true, error: "" });
    try {
      const user = await authService.loginWithGoogle();
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      set({ error: error.message || "Unable to log in with Google", isLoading: false });
      throw error;
    }
  },

  signup: async (data) => {
    set({ isLoading: true, error: "" });
    try {
      const user = await authService.signup(data);
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      set({ error: error.message || "Unable to sign up", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false, error: "" });
  },
}));

