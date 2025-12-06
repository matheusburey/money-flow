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
  date: Date;
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
      (category) => category.type === categoryType
    );
  });

  async function fetchDashboardData(token: string) {
    try {
      loading.value = true;
      await fetchDashboard(token);
      await fetchCategories(token);
    } catch (error: any) {
      console.error("Error fetching dashboard data:", error);
      error.value = error.message || "Erro ao buscar dados do dashboard";
    }
    loading.value = false;
  }
  async function fetchDashboard(token: string) {
    const response: DashboardData = await $fetch("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    accounts.value = response.accounts;
    recentTransactions.value = response.recentTransactions;
    summary.value = response.summary;
    transactionsType.value = response.transactionsType;
  }
  async function fetchCategories(token: string) {
    const response: { categories: Category[] } = await $fetch(
      "/api/categories",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    categories.value = response.categories;
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
  };
});
