<template>
  <div class="min-h-screen bg-gray-50">
    <HeaderNoAuth>
      <span class="text-sm text-gray-600">Já tem uma conta?</span>
      <NuxtLink
        to="/auth/signin"
        class="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Entrar
      </NuxtLink>
    </HeaderNoAuth>
    <div class="pt-24 px-4">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Recuperar senha
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Digite seu email para receber as instruções de recuperação de senha
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <CardUi class="p-8">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <InputUi
                v-model="email"
                label="Email"
                type="email"
                placeholder="seu@email.com"
                required
                autocomplete="email"
              />
            </div>

            <div>
              <ButtonUi
                type="submit"
                :loading="isLoading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar link de recuperação
              </ButtonUi>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                  Lembrou sua senha?
                </span>
              </div>
            </div>

            <div class="mt-6">
              <NuxtLink
                to="/auth/signin"
                class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Voltar para o login
              </NuxtLink>
            </div>
          </div>
        </CardUi>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref("");
const isLoading = ref(false);
const router = useRouter();

const handleSubmit = async () => {
	try {
		isLoading.value = true;
		// TODO: Implement password reset logic
		console.log("Sending reset email to:", email.value);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// Redirect to confirmation page or show success message
		router.push("/auth/reset-password");
	} catch (error) {
		console.error("Error sending reset email:", error);
	} finally {
		isLoading.value = false;
	}
};
</script>
