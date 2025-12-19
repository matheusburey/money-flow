<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black opacity-60 transition-opacity" @click="closeModal"></div>

    <!-- Modal Container -->
    <div class="flex min-h-screen items-center justify-center p-4 text-center">
      <!-- Modal Content -->
      <div
        class="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
        @click.stop>
        <!-- Close Button -->
        <button type="button" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500" @click="closeModal">
          <span class="sr-only">Fechar</span>
          <icons.X />
        </button>

        <!-- Modal Header -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ bankId ? "Editar Banco" : "Novo Banco" }}
          </h3>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Nome da Conta
            </label>
            <input type="text" id="name" v-model="form.name"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-10 px-3"
              placeholder="Nome da conta bancária" required />
          </div>

          <!-- Initial Balance -->
          <div class="mb-4">
            <label for="balance" class="block text-sm font-medium text-gray-700 mb-1">
              Saldo Inicial
            </label>
            <div class="relative rounded-md shadow-sm">
              <input type="text" id="balance" :value="formattedBalance" @input="onBalanceInput"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 sm:text-sm border-gray-300 rounded-md h-10"
                placeholder="0,00" />
            </div>
          </div>

          <!-- Currency -->
          <div class="mb-4">
            <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">
              Moeda
            </label>
            <select id="currency" v-model="form.currency"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10">
              <option value="BRL">Real Brasileiro (R$)</option>
              <option value="USD">Dólar Americano ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>

          <!-- Icon -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Ícone
            </label>
            <div class="flex overflow-x-auto">
              <div v-for="value in iconsOptions" :key="value" @click="form.icon = value" class="p-3 hover:bg-gray-300 rounded">
                <component :is="getIcon(value)" :class="{ 'text-blue-500':value === form.icon}" />
              </div>
            </div>
          </div>

          <!-- Color -->
          <div class="mb-4">
            <label for="color" class="block text-sm font-medium text-gray-700 mb-1">
              Cor
            </label>
            <div class="grid grid-cols-8 gap-2">
              <button
                v-for="color in colorOptions"
                :key="color"
                type="button"
                @click="form.color = color"
                class="w-8 h-8 rounded-full border-2"
                :class="form.color === color ? 'border-gray-600' : 'border-gray-300'"
                :style="{ backgroundColor: color }">
              </button>
            </div>
            <input type="color" v-model="form.color" class="mt-2 block w-full h-10 border-gray-300 rounded-md" />
          </div>

          <!-- Include in Budget -->
          <div class="mb-6">
            <CheckboxUi
              id="includeInBudget"
              :checked="form.include_in_budget"
              @update:checked="form.include_in_budget = $event"
              description="Incluir esta conta no orçamento"
            />
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3">
            <ButtonUi type="button" variant="outline" @click="closeModal" :disabled="isSubmitting">
              Cancelar
            </ButtonUi>
            <ButtonUi type="submit" variant="primary" :loading="isSubmitting" :disabled="isSubmitting">
              {{ bankId ? "Atualizar" : "Salvar" }}
            </ButtonUi>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as icons from "lucide-vue-next";
import { ref } from "vue";

const props = defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
	bankId: {
		type: String,
		default: "",
	},
});

const dashboard = useDashboardStore();
const authStore = useAuthStore();

const emit = defineEmits(["close"]);

const isSubmitting = ref(false);

const form = ref({
	name: "",
	balance: 0,
	currency: "BRL",
	icon: "",
	color: "#808080",
	include_in_budget: true,
});

const colorOptions = [
	"#e11d48",
	"#dc2626",
	"#ea580c",
	"#d97706",
	"#ca8a04",
	"#65a30d",
	"#16a34a",
	"#059669",
];

const iconsOptions = [
	"Landmark",
	"CreditCard",
	"Bitcoin",
	"Banknote",
	"Wallet",
	"PiggyBank",
	"Euro",
	"DollarSign",
	"ChartCandlestick",
];

const formattedBalance = computed(() => {
	const value = form.value.balance;
	if (!value) return "";

	const number = Number(value) / 100;
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(number);
});

const onBalanceInput = (e: any) => {
	const value = e.target.value.replace(/\D/g, "");
	form.value.balance = Number(value);
};

function getIcon(icon: string) {
	const key = icon as keyof typeof icons;
	return (icons[key] || icons.List) as any;
}

const closeModal = () => {
	emit("close");
};

const handleSubmit = async () => {
	try {
		if (isSubmitting.value) return;
		isSubmitting.value = true;
		const token = await authStore.getToken();
		const payload = { ...form.value };
		await $fetch("/api/bank-account", {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		await dashboard.fetchDashboardData(token!);
		closeModal();
		// Reset form
		form.value = {
			name: "",
			balance: 0,
			currency: "BRL",
			icon: "",
			color: "#808080",
			include_in_budget: true,
		};
	} catch (error) {
		console.error("Error saving bank account:", error);
	}

	isSubmitting.value = false;
};

// Load existing bank data if editing
watch(
	() => props.bankId,
	async (newBankId) => {
		if (newBankId && props.isOpen) {
			try {
				const token = await authStore.getToken();
				const bankData = await $fetch(`/api/bank-account/${newBankId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				/* form.value = {
        name: bankData.name || "",
        balance: bankData.balance || 0,
        currency: bankData.currency || "BRL",
        icon: bankData.icon || "",
        color: bankData.color || "#808080",
        include_in_budget: bankData.include_in_budget ?? true,
      }; */
			} catch (error) {
				console.error("Error loading bank data:", error);
			}
		}
	},
	{ immediate: true },
);
</script>
