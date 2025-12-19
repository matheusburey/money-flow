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

interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: User;
}

export const useAuthStore = defineStore("auth", () => {
	const user = ref<User | null>(null);
	const accessToken = ref<string | null>(null);
	const refreshToken = ref<string | null>(null);
	const isAuthenticated = ref(false);
	const loading = ref<boolean>(true);

	function setUser(userData: User) {
		user.value = userData;
		isAuthenticated.value = true;
	}

	function setTokens(access: string, refresh: string) {
		accessToken.value = access;
		refreshToken.value = refresh;
		localStorage.setItem("accessToken", access);
		localStorage.setItem("refreshToken", refresh);
	}

	function clearAuth() {
		user.value = null;
		accessToken.value = null;
		refreshToken.value = null;
		isAuthenticated.value = false;
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	}

	async function login(email: string, password: string) {
		try {
			const response: AuthResponse = await $fetch("/api/auth/login", {
				method: "POST",
				body: { email, password },
			});

			setTokens(response.accessToken, response.refreshToken);
			setUser(response.user);
		} catch (error: any) {
			console.error("Login error:", error);
			return error.data?.message || "Erro ao fazer login";
		}
	}

	async function signup(name: string, email: string, password: string) {
		try {
			const response: AuthResponse = await $fetch("/api/auth/signup", {
				method: "POST",
				body: { name, email, password },
			});
			setTokens(response.accessToken, response.refreshToken);
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
			const token = localStorage.getItem("accessToken");
			if (!token) return;
			await $fetch("/api/auth/logout", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (_error) {
			// Ignore error on logout
		} finally {
			clearAuth();
			await navigateTo("/");
		}
	}

	async function refreshTokens() {
		try {
			const refresh = localStorage.getItem("refreshToken");
			if (!refresh) throw new Error("No refresh token");

			const response: { accessToken: string; refreshToken: string } =
				await $fetch("/api/auth/refresh", {
					method: "POST",
					body: { refreshToken: refresh },
				});

			setTokens(response.accessToken, response.refreshToken);
			return response.accessToken;
		} catch (error) {
			clearAuth();
			return null;
		}
	}

	async function checkAuth() {
		try {
			let token = localStorage.getItem("accessToken");
			if (!token) return false;

			try {
				const response: any = await $fetch("/api/auth/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				accessToken.value = token;
				refreshToken.value = localStorage.getItem("refreshToken");
				setUser(response.user);
				return true;
			} catch (error: any) {
				if (error.statusCode === 401) {
					const newToken = await refreshTokens();
					if (newToken) {
						const response: any = await $fetch("/api/auth/me", {
							headers: {
								Authorization: `Bearer ${newToken}`,
							},
						});
						setUser(response.user);
						return true;
					}
				}
				throw error;
			}
		} catch {
			clearAuth();
			return false;
		} finally {
			loading.value = false;
		}
	}

	async function getAccessToken() {
		let token = accessToken.value;
		if (!token) {
			token = localStorage.getItem("accessToken");
		}
		return token;
	}

	return {
		user,
		accessToken,
		refreshToken,
		isAuthenticated,
		loading,
		setUser,
		clearAuth,
		login,
		signup,
		logout,
		refreshTokens,
		checkAuth,
		getAccessToken,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
