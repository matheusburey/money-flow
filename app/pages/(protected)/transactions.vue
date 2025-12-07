<template>
  <div>
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
                {{ transaction?.category?.name }} •
                {{ formatDate(transaction?.date) }}
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from 'lucide-vue-next';

definePageMeta({
  title: 'Transações',
  layout: 'default-layout'
})

const dashboard = useDashboardStore();
const authStore = useAuthStore();

const isTransactionModalOpen = ref(false);

import * as icons from "lucide-vue-next";

function formatCurrency(value: number) {
  const toCents = value / 100;
  return toCents.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR");
}

function getIcon(icon: string) {
  const key = icon as keyof typeof icons;
  return (icons[key] || icons.List) as any;
}

const openTransactionModal = () => {
  isTransactionModalOpen.value = true;
};

const closeTransactionModal = () => {
  isTransactionModalOpen.value = false;
};

async function refreshDashboardData() {
  const token = await authStore.getToken();
  await dashboard.fetchDashboardData(token!);
}

onMounted(refreshDashboardData);
</script>
