import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { user, isAuthenticated, isLoading, error, initialize, login, loginWithGoogle, signup, logout } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    loginWithGoogle,
    signup,
    logout
  };
}

