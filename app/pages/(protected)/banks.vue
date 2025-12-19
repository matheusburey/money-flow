<template>
  <div>
    <BankFormModal :is-open="isTransactionModalOpen" @close="closeBank" />
    <div class="space-y-4">
      <div v-if="dashboard.accounts.length">
        <div
          v-for="account in dashboard.accounts"
          :key="account.id"
          class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div class="flex items-center">
            <div
              class="p-3 rounded-full text-white"
              :style="{ backgroundColor: account.color }"
            >
              <component :is="getIcon(account?.icon)" />
            </div>
            <h3 class="ml-4 font-medium text-gray-800">
              {{ account?.name || "Sem descrição" }}
            </h3>
          </div>
          <div
            class="font-medium"
            :style="{ color: account.balance > 0 ? account.color : 'red' }"
          >
            {{ formatCurrency(account.balance, account.currency) }}
          </div>
        </div>
      </div>
      <div v-else class="flex justify-center items-center p-8">
        <p class="text-gray-500">Nenhuma transação recente</p>
      </div>
    </div>

    <button
      class="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center"
      @click="openBank"
    >
      <Plus class="h-5 w-5 mr-2" />
      Adicionar Banco
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Plus } from "lucide-vue-next";

definePageMeta({
	title: "Bancos",
	layout: "default-layout",
});

const authStore = useAuthStore();
const dashboard = useDashboardStore();

const isTransactionModalOpen = ref(false);

import * as icons from "lucide-vue-next";

function formatCurrency(value: number, currency: string) {
	const toCents = value / 100;
	return toCents.toLocaleString("pt-BR", {
		style: "currency",
		currency: currency,
	});
}

function getIcon(icon: string) {
	const key = icon as keyof typeof icons;
	return (icons[key] || icons.List) as any;
}

const openBank = () => {
	isTransactionModalOpen.value = true;
};

const closeBank = () => {
	isTransactionModalOpen.value = false;
};

async function refreshDashboardData() {
	await dashboard.fetchBankAccount();
}

onMounted(refreshDashboardData);
</script>
