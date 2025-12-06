<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black opacity-60 transition-opacity" @click="closeModal"></div>

    <!-- Modal Container -->
    <div class="flex min-h-screen items-center justify-center p-4 text-center">
      <!-- Modal Content -->
      <div
        class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
        @click.stop>
        <!-- Close Button -->
        <button type="button" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500" @click="closeModal">
          <span class="sr-only">Fechar</span>
          <X />
        </button>

        <!-- Modal Header -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ transactionId ? "Editar Transação" : "Nova Transação" }}
          </h3>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Transaction Type -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de transação</label>
            <div class="flex space-x-4">
              <label v-for="type in transactionTypes" :key="type.value" class="flex items-center cursor-pointer">
                <input type="radio" v-model="form.type" :value="type.value"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                <span class="ml-2 text-sm text-gray-700">{{ type.label }}</span>
              </label>
            </div>
          </div>

          <!-- Amount -->
          <div class="mb-4">
            <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
              Valor
            </label>
            <div class="relative rounded-md shadow-sm">
              <input type="text" id="amount" :value="formatted" @input="onInput"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 sm:text-sm border-gray-300 rounded-md h-10"
                required />
            </div>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <input type="text" id="description" v-model="form.description"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-10 px-3"
              placeholder="O que foi essa transação?" />
          </div>

          <!-- Date -->
          <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <input type="date" id="date" v-model="form.date"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-10 px-3"
              required />
          </div>

          <!-- Category -->
          <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select id="category" v-model="form.categoryId"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10"
              required>
              <option value="">Selecione uma categoria</option>
              <option v-for="category in dashboard.getCategories(form.type)" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Bank Account -->
          <div class="mb-6">
            <label for="bankAccount" class="block text-sm font-medium text-gray-700 mb-1">
              Conta
            </label>
            <select id="bankAccount" v-model="form.bankAccountId"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10"
              required>
              <option value="">Selecione uma conta</option>
              <option v-for="account in dashboard.accounts" :key="account.id" :value="account.id">
                {{ account.name }}
              </option>
            </select>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3">
            <ButtonUi type="button" variant="outline" @click="closeModal" :disabled="isSubmitting">
              Cancelar
            </ButtonUi>
            <ButtonUi type="submit" variant="primary" :loading="isSubmitting" :disabled="isSubmitting">
              {{ transactionId ? "Atualizar" : "Salvar" }}
            </ButtonUi>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";
import { ref } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  transactionId: {
    type: String,
    default: "",
  },
});

const dashboard = useDashboardStore();
const authStore = useAuthStore();

const emit = defineEmits(["close", "refreshDashboardData"]);

const isSubmitting = ref(false);

const form = ref({
  type: "expense",
  amount: 0,
  description: "",
  date: new Date().toISOString().split("T")[0],
  categoryId: "",
  bankAccountId: "",
});

const transactionTypes = [
  { value: "expense", label: "Despesa" },
  { value: "income", label: "Receita" },
];

const formatted = computed(() => {
  const value = form.value.amount;
  if (!value) return "R$ 0,00"

  const number = Number(value) / 100
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number)
})

const onInput = (e: any) => {
  console.log(e.target.value)
  const value = e.target.value.replace(/\D/g, "")
  form.value.amount = Number(value);
}


const closeModal = () => {
  emit("close");
};

const handleSubmit = async () => {
  try {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    const token = await authStore.getToken();
    const payload = {
      ...form.value,
      date: new Date(form.value.date!).toISOString(),
    };
    await $fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    await dashboard.fetchDashboardData(token!);
    emit("refreshDashboardData");
    closeModal();
    form.value = {
      type: "expense",
      amount: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
      categoryId: "",
      bankAccountId: "",
    };
  } catch (error) {
    console.error("Error creating transaction:", error);
  }

  isSubmitting.value = false;
};
</script>
