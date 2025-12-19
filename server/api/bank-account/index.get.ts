import { getAccounts } from "~~/server/db/bankAccount";

export default defineEventHandler(async (event) => {
	const accounts = await getAccounts(event.context.userId);
	return {
		accounts,
	};
});
