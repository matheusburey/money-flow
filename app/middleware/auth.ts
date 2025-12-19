import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
	console.log("defineEventHandler frontend", to.path, from.path);
	if (import.meta.server) return;
	const authStore = useAuthStore();
	await authStore.checkAuth();

	// If user is authenticated and trying to access auth pages (login/register)
	if (authStore.user) {
		return navigateTo("/");
	}
});
