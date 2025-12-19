// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["@pinia/nuxt", "nuxt-toast", "nuxt-svgo"],
	css: ["~/assets/css/main.css"],
	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],
	vite: { plugins: [tailwindcss()] },
	svgo: {
		autoImportPath: "~/assets/icons/",
	},
});
