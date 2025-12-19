import { defineEventHandler, getRequestHeaders } from "h3";
import { BankAccount } from "@prisma/client";
import { getAccounts } from "../db/bankAccount";
import { getRecentTransactions } from "../db/transaction";

interface Transaction {
	id: string;
	amount: number;
	description: string | null;
	date: Date;
	type: string;
	category: {
		id: string;
		icon: string | null;
		name: string;
		color: string;
	};
}

interface transactionByCategory {
	categoryId: string;
	categoryName: string;
	categoryColor: string;
	amount: number;
}

interface DashboardData {
	accounts: BankAccount[];
	recentTransactions: Transaction[];
	summary: {
		totalBalance: number;
		totalIncome: number;
		totalExpenses: number;
		totalCredit: number;
	};
	transactionsType: {
		income: transactionByCategory[];
		expense: transactionByCategory[];
		credit: transactionByCategory[];
	};
}

export default defineEventHandler(async (event) => {
	try {
		const userId = event.context.userId;

		// Get current date range (last 30 days)
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(new Date().getDate() - 30);

		const accounts = await getAccounts(userId);
		const recentTransactions = await getRecentTransactions(
			userId,
			thirtyDaysAgo,
		);

		// Calculate summary
		const summary = recentTransactions.reduce(
			(acc, transaction) => {
				if (transaction.type === "income") {
					acc.totalIncome += transaction.amount;
				} else if (transaction.type === "expense") {
					acc.totalExpenses += transaction.amount;
				} else {
					acc.totalCredit += transaction.amount;
				}
				return acc;
			},
			{ totalIncome: 0, totalExpenses: 0, totalCredit: 0 },
		);

		const totalBalance = accounts.reduce(
			(sum, account) => sum + account.balance,
			0,
		);

		const transactionsType = recentTransactions.reduce(
			(acc, transaction) => {
				const byType =
					acc[transaction.type as keyof DashboardData["transactionsType"]];
				const byCategory = byType.find(
					(t) => t.categoryId === transaction.category.id,
				);

				if (byCategory) {
					byCategory.amount += transaction.amount;
				} else {
					byType.push({
						categoryId: transaction.category.id,
						categoryName: transaction.category.name,
						categoryColor: transaction.category.color,
						amount: transaction.amount,
					});
				}
				return acc;
			},
			{
				income: [],
				expense: [],
				credit: [],
			} as DashboardData["transactionsType"],
		);

		const response: DashboardData = {
			accounts,
			recentTransactions: recentTransactions.slice(0, 10),
			summary: {
				totalBalance,
				totalIncome: summary.totalIncome,
				totalExpenses: summary.totalExpenses,
				totalCredit: summary.totalCredit,
			},
			transactionsType,
		};

		return response;
	} catch (error) {
		console.error("Error fetching dashboard data:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch dashboard data",
		});
	}
});
