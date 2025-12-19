<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col"
  >
    <HeaderNoAuth>
      <span class="text-sm text-gray-600">Não tem uma conta?</span>
      <NuxtLink
        to="/auth/signup"
        class="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Cadastre-se
      </NuxtLink>
    </HeaderNoAuth>

    <!-- Main Content -->
    <div
      class="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Acesse sua conta</h1>
          <p class="mt-2 text-sm text-gray-600">
            Ou
            <NuxtLink
              to="/auth/signup"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              crie uma conta gratuita
            </NuxtLink>
          </p>
        </div>

        <CardUi class="p-8">
          <form class="space-y-6" @submit.prevent="handleSignIn">
            <div class="space-y-4">
              <InputUi
                v-model="email"
                label="Email"
                type="email"
                :error="errors ? 'Email inválido' : ''"
                placeholder="seu@email.com"
                autocomplete="email"
                @input="errors = false"
              />

              <div>
                <InputUi
                  v-model="password"
                  label="Senha"
                  type="password"
                  :error="errors ? 'Senha inválida' : ''"
                  placeholder="Sua senha"
                  autocomplete="current-password"
                  @input="errors = false"
                />
                <NuxtLink
                  to="/auth/forgot-password"
                  class="text-xs text-indigo-600 hover:text-indigo-500"
                >
                  Esqueceu sua senha?
                </NuxtLink>
              </div>
            </div>

            <ButtonUi
              type="submit"
              :loading="isLoading"
              :disabled="isLoading"
              class="w-full"
            >
              Entrar
            </ButtonUi>
          </form>
        </CardUi>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} Gerenciador de Gastos. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errors = ref(false);

const handleSignIn = async () => {
	try {
		if (!email.value || !password.value) {
			errors.value = true;
			toast.error({ title: "Preencha todos os campos" });
			return;
		}

		isLoading.value = true;
		const mensagemError = await authStore.login(email.value, password.value);
		if (mensagemError) {
			errors.value = true;
			toast.error({ title: mensagemError });
			isLoading.value = false;
		} else {
			toast.success({ title: "Login realizado com sucesso!" });
			await router.push("/dashboard");
		}
	} catch (error) {
		console.error("Error signing in:", error);
	}
};
</script>
