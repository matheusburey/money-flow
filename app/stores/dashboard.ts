import type { BankAccount } from "@prisma/client";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface Account {
	id: string;
	name: string;
	balance: number;
	currency: string;
	color: string;
	icon: string;
}

interface RecentTransactions {
	id: string;
	amount: number;
	description: string | null;
	date: string;
	type: string;
	category: {
		id: string;
		icon: string;
		name: string;
		color: string;
	};
}

interface Summary {
	totalBalance: number;
	totalIncome: number;
	totalExpenses: number;
	totalCredit: number;
}

interface Category {
	id: string;
	name: string;
	description: string;
	color: string;
	icon: string;
	type: string;
}

interface TransactionByCategory {
	categoryId: string;
	categoryName: string;
	categoryColor: string;
	amount: number;
}

interface TransactionType {
	income: TransactionByCategory[];
	expense: TransactionByCategory[];
	credit: TransactionByCategory[];
}

interface DashboardData {
	accounts: Account[];
	recentTransactions: RecentTransactions[];
	summary: Summary;
	transactionsType: TransactionType;
}

export const useDashboardStore = defineStore("dashboard", () => {
	const accounts = ref([] as Account[]);
	const recentTransactions = ref([] as RecentTransactions[]);
	const summary = ref({} as Summary);
	const categories = ref([] as Category[]);
	const transactionsType = ref({} as TransactionType);
	const loading = ref(true);
	const error = ref<string | null>(null);

	const getCategories = computed(() => (categoryType?: string | null) => {
		if (!categoryType) return categories.value;
		return categories.value.filter(
			(category) => category.type === categoryType,
		);
	});

	async function fetchDashboardData() {
		try {
			loading.value = true;
			const response = await useApi<DashboardData>("/api/dashboard");
			if (!response) {
				return;
			}
			accounts.value = response.accounts;
			recentTransactions.value = response.recentTransactions;
			summary.value = response.summary;
			transactionsType.value = response.transactionsType;
		} catch (error: any) {
			console.error("Error fetching dashboard data:", error);
			error.value = error.message || "Erro ao buscar dados do dashboard";
		}
		loading.value = false;
	}

	async function fetchCategories() {
		const response = await useApi<{ categories: Category[] }>(
			"/api/categories",
		);

		if (response) {
			categories.value = response.categories;
		}
	}

	async function fetchBankAccount() {
		const response = await useApi<{ accounts: BankAccount[] }>(
			"/api/bank-account",
		);

		if (response) {
			accounts.value = response.accounts;
		}
	}

	return {
		accounts,
		recentTransactions,
		summary,
		categories,
		transactionsType,
		loading,
		error,

		getCategories,

		fetchDashboardData,
		fetchCategories,
		fetchBankAccount,
	};
});
