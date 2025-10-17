<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col"
  >
    <HeaderNoAuth>
      <span class="text-sm text-gray-600">Já tem uma conta?</span>
      <NuxtLink
        to="/auth/signin"
        class="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Entrar
      </NuxtLink>
    </HeaderNoAuth>

    <!-- Main Content -->
    <div
      class="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Crie sua conta</h1>
          <p class="mt-2 text-sm text-gray-600">
            Ou
            <NuxtLink
              to="/auth/signin"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              acesse sua conta existente
            </NuxtLink>
          </p>
        </div>

        <CardUi class="p-8">
          <form class="space-y-6" @submit.prevent="handleSignUp">
            <div class="space-y-4">
              <InputUi
                v-model="form.name"
                label="Nome"
                type="text"
                placeholder="Seu nome"
                autocomplete="given-name"
                :error="errors.name"
              />
              <InputUi
                v-model="form.email"
                label="Email"
                placeholder="seu@email.com"
                autocomplete="email"
                :error="errors.email"
              />
              <InputUi
                v-model="form.password"
                label="Senha"
                type="password"
                placeholder="Crie uma senha"
                autocomplete="new-password"
                :error="errors.password"
              />

              <InputUi
                v-model="form.confirmPassword"
                label="Confirme a senha"
                type="password"
                placeholder="Digite a senha novamente"
                autocomplete="new-password"
                :error="errors.confirmPassword"
              />

              <CheckboxUi
                v-model="form.acceptedTerms"
                class="mt-4"
                :error="errors.acceptedTerms"
              >
                Eu concordo com os
                <a href="#" class="text-indigo-600 hover:text-indigo-500"
                  >Termos de Serviço</a
                >
                e
                <a href="#" class="text-indigo-600 hover:text-indigo-500"
                  >Política de Privacidade</a
                >
              </CheckboxUi>
            </div>

            <ButtonUi type="submit" :loading="isLoading" class="w-full">
              Criar conta
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

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

const isLoading = ref(false);
const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
});
const errors = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: "",
});

function validateForm() {
  let isValid = true;
  const values = form.value;
  errors.value = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: "",
  };

  if (values.name.length < 5) {
    errors.value.name = "Nome deve ter pelo menos 5 caracteres";
    isValid = false;
  }
  if (!values.email.includes("@")) {
    errors.value.email = "Email inválido";
    isValid = false;
  }
  if (values.password.length < 8) {
    errors.value.password = "Senha deve ter pelo menos 8 caracteres";
    isValid = false;
  }
  if (!values.confirmPassword) {
    errors.value.confirmPassword = "Confirme a senha";
    isValid = false;
  }
  if (values.password !== values.confirmPassword) {
    errors.value.confirmPassword = "As senhas não conferem";
    isValid = false;
  }
  if (!values.acceptedTerms) {
    errors.value.acceptedTerms = "Você deve aceitar os termos de serviço";
    isValid = false;
  }
  return isValid;
}

const handleSignUp = async () => {
  try {
    if (!validateForm()) return;
    isLoading.value = true;

    const result = await authStore.signup(
      form.value.name,
      form.value.email,
      form.value.password
    );
    if (result.success) {
      toast.success({ title: "Conta criada com sucesso!" });
      await router.push("/dashboard");
    } else {
      toast.error({ title: result.error });
    }
  } catch (error) {
    console.error("Error signing up:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
