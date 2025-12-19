import { getCategories } from "~~/server/db/categories";

export default defineEventHandler(async (event) => {
	const categories = await getCategories(event.context.userId);
	return {
		categories,
	};
});
