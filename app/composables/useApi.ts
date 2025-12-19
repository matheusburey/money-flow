import { useAuthStore } from "~/stores/auth";

export const useApi = async <T>(url: string, options: any = {}) => {
	const authStore = useAuthStore();

	const fetchOptions = {
		...options,
		headers: {
			...options.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${await authStore.getAccessToken()}`,
		},
	};

	try {
		return await $fetch<T>(url, fetchOptions);
	} catch (error: any) {
		if (error.statusCode === 401) {
			const newToken = await authStore.refreshTokens();
			if (newToken) {
				fetchOptions.headers.Authorization = `Bearer ${newToken}`;
				return await $fetch<T>(url, fetchOptions);
			}
		}
		throw error;
	}
};
