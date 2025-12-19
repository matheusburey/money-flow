import { getTransactions } from "~~/server/db/transaction";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const transactions = await getTransactions(
		event.context.userId,
		new Date((query.startDate as string) || "2020-01-01"),
	);
	return {
		transactions,
	};
});
