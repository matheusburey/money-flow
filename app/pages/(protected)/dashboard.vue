<template>
  <div>
    <!-- Transaction Form Modal -->
    <TransactionFormModal :is-open="isTransactionModalOpen" @close="closeTransactionModal" @refreshDashboardData="refreshDashboardData" />
    <div class="absolute bottom-6 right-6">
      <ButtonUi @click="openTransactionModal" variant="icon">
        <Plus class="h-6 w-6 text-blue-500" />
      </ButtonUi>
    </div>

    <!-- Balance Card -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <BalanceCard :value="dashboard.summary?.totalBalance || 0" :icon="Landmark" label="Saldo atual"
        color="text-blue-500" />
      <BalanceCard :value="dashboard.summary?.totalIncome || 0" :icon="TrendingUp" label="Receita"
        color="text-green-500" />
      <BalanceCard :value="dashboard.summary?.totalExpenses || 0" :icon="TrendingDown" label="Despesas"
        color="text-red-500" />
      <BalanceCard :value="dashboard.summary?.totalCredit || 0" :icon="CreditCard" label="Cartões"
        color="text-yellow-500" />
    </div>

    <!-- Doughnut Chart -->
    <div class="flex gap-4">
      <div class="bg-white rounded-2xl shadow-md p-6 mb-6 w-1/2 h-[350px]">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-gray-500 text-sm font-medium">Despesas</h2>
        </div>
        <div class="w-full h-[270px]">
          <Doughnut :data="chartDataExpense" :options="options" />
        </div>
      </div>
      <div class="bg-white rounded-2xl shadow-md p-6 mb-6 w-1/2 h-[350px]">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-gray-500 text-sm font-medium">Receitas</h2>
        </div>
        <div class="w-full h-[270px]">
          <Doughnut :data="chartDataIncome" :options="options" />
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="rounded-2xl shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Transações Recentes</h2>
        <button class="text-blue-500 text-sm font-medium">Ver Todas</button>
      </div>

      <div class="space-y-4">
        <div v-if="dashboard.recentTransactions">
          <div v-for="transaction in dashboard.recentTransactions" :key="transaction.id"
            class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="flex items-center">
              <div class="p-3 rounded-full text-white" :style="{ backgroundColor: transaction.category.color }">
                <component :is="getIcon(transaction?.category?.icon)" />
              </div>
              <div class="ml-4">
                <h3 class="font-medium text-gray-800">
                  {{ transaction?.description || "Sem descrição" }}
                </h3>
                <p class="text-xs text-gray-500">
                  {{ transaction?.category?.name || "Sem categoria" }} •
                  {{ transaction?.date }}
                </p>
              </div>
            </div>
            <div class="font-medium" :style="{ color: transaction.category.color }">
              {{ transaction.type === "expense" ? "-" : "+" }}
              {{ formatCurrency(transaction.amount) }}
            </div>
          </div>
        </div>
        <div v-else class="flex justify-center items-center p-8">
          <p class="text-gray-500">Nenhuma transação recente</p>
        </div>
      </div>

      <button
        class="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center"
        @click="openTransactionModal">
        <Plus class="h-5 w-5 mr-2" />
        Adicionar Transação
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
	Plus,
	TrendingUp,
	TrendingDown,
	CreditCard,
	Landmark,
} from "lucide-vue-next";
import * as icons from "lucide-vue-next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

definePageMeta({
	title: "Dashboard",
	layout: "default-layout",
});

const authStore = useAuthStore();
const dashboard = useDashboardStore();

const isTransactionModalOpen = ref(false);

const chartDataIncome = computed(() => {
	const income = dashboard.transactionsType.income || [];
	console.log(income);
	return {
		labels: income.map((t) => t.categoryName),
		datasets: [
			{
				data: income.map((t) => t.amount / 100),
				backgroundColor: income.map((t) => t.categoryColor),
			},
		],
	};
});

const chartDataExpense = computed(() => {
	const expense = dashboard.transactionsType?.expense || [];
	return {
		labels: expense.map((t) => t.categoryName),
		datasets: [
			{
				data: expense.map((t) => t.amount / 100),
				backgroundColor: expense.map((t) => t.categoryColor),
			},
		],
	};
});

const openTransactionModal = () => {
	isTransactionModalOpen.value = true;
};

const closeTransactionModal = () => {
	isTransactionModalOpen.value = false;
};

async function refreshDashboardData() {
	await dashboard.fetchDashboardData();
}

function getIcon(icon: string) {
	const key = icon as keyof typeof icons;
	return (icons[key] || icons.List) as any;
}

function formatCurrency(value: number) {
	const toCents = value / 100;
	return toCents.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
}

onMounted(refreshDashboardData);

const options = {
	responsive: true,
	maintainAspectRatio: false,
};
</script>
