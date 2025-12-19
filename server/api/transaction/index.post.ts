import { updateAccount } from "~~/server/db/bankAccount";
import { createTransaction } from "~~/server/db/transaction";

export default defineEventHandler(async (event) => {
	const { amount, description, date, type, categoryId, bankAccountId } =
		await readBody(event);
	const userId = event.context.userId;
	const transaction = await createTransaction({
		amount: amount,
		description,
		date: date,
		type,
		category: { connect: { id: categoryId } },
		bankAccount: { connect: { id: bankAccountId } },
		user: { connect: { id: userId } },
	});
	if (type === "expense") {
		await updateAccount(bankAccountId, {
			balance: {
				decrement: amount,
			},
		});
	} else {
		await updateAccount(bankAccountId, {
			balance: {
				increment: amount,
			},
		});
	}
	return {
		transaction,
	};
});
