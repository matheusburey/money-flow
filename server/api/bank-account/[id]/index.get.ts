import { getAccountById } from "~~/server/db/bankAccount";

export default defineEventHandler(async (event) => {
	const accounts = await getAccountById(event.context.params!.id);
	return {
		accounts,
	};
});
