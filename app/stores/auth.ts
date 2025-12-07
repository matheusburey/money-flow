import { ref } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

interface User {
  id: string;
  email: string;
  name: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

interface Response {
  token: string;
  user: User;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isAuthenticated = ref(false);
  const loading = ref<boolean>(true);

  function setUser(userData: User) {
    user.value = userData;
    isAuthenticated.value = true;
  }

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  }

  function clearAuth() {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("token");
  }

  async function login(email: string, password: string) {
    try {
      const response: Response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      setToken(response.token);
      setUser(response.user);
    } catch (error: any) {
      console.error("Login error:", error);
      return error.data?.message || "Erro ao fazer login";
    }
  }

  async function signup(name: string, email: string, password: string) {
    try {
      const response: Response = await $fetch("/api/auth/signup", {
        method: "POST",
        body: { name, email, password },
      });
      setToken(response.token);
      setUser(response.user);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error:
          error.data?.message ||
          "Estamos com problemas para criar sua conta, tente novamente mais tarde",
      };
    }
  }

  async function logout() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await $fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } finally {
      clearAuth();
      await navigateTo("/");
    }
  }

  async function checkAuth() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;

      const response: any = await $fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setToken(token);
      setUser(response.user);
      return true;
    } catch {
      clearAuth();
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function getToken() {
    let _token = token.value;
    if (!_token) {
      _token = localStorage.getItem("token");
    }
    return _token;
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    setUser,
    clearAuth,
    login,
    signup,
    logout,
    checkAuth,
    getToken,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
