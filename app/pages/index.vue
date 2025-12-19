<template>
  <div class="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Navigation -->
    <nav
      class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <NuxtLink to="/">
            <LogoUi />
          </NuxtLink>
          <div class="flex items-center space-x-3">
            <NuxtLink
              to="/auth/signin"
              class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >Entrar</NuxtLink
            >
            <NuxtLink
              to="/auth/signup"
              class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg hover:opacity-90 transition-all shadow-sm hover:shadow-md"
            >
              Começar Agora
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50"
    >
      <div
        class="absolute inset-0 bg-grid-indigo-500/10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
      ></div>
      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32"
      >
        <div class="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          <div class="lg:col-span-6">
            <h1
              class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span class="block">Controle suas finanças</span>
              <span
                class="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600"
                >de forma simples</span
              >
            </h1>
            <p class="mt-6 text-lg text-gray-600 max-w-xl">
              Gerencie seus gastos, receitas e economias em um só lugar. Tome o
              controle das suas finanças pessoais de forma fácil e intuitiva.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row gap-4">
              <NuxtLink
                to="/auth/signup"
                class="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 shadow-sm hover:shadow-md transition-all"
              >
                Comece Grátis
              </NuxtLink>
              <a
                href="#features"
                class="flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm hover:shadow transition-all"
              >
                Saiba Mais
              </a>
            </div>
          </div>
          <div class="mt-16 lg:mt-0 lg:col-span-6 flex justify-center">
            <div
              class="bg-white/50 backdrop-blur-sm p-2 rounded-2xl shadow-xl ring-1 ring-black/5 max-w-md w-full"
            >
              <img
                class="w-full h-auto rounded-lg shadow-md"
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Controle financeiro"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="py-16 sm:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <span
            class="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-4"
            >Recursos Poderosos</span
          >
          <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
            Tudo que você precisa para controlar suas finanças
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            Nossa plataforma oferece ferramentas poderosas para ajudar você a
            gerenciar seu dinheiro de forma eficiente.
          </p>
        </div>

        <div class="mt-16">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div
                class="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white mb-4"
              >
                <component :is="feature.icon" class="h-6 w-6" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-indigo-600 to-blue-600">
      <div
        class="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8"
      >
        <div class="relative">
          <div
            class="absolute -top-2 -left-2 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-pulse"
          ></div>
          <div
            class="absolute -bottom-4 -right-4 w-20 h-20 bg-pink-400 rounded-full opacity-20 animate-pulse"
          ></div>
          <div class="relative z-10">
            <h2 class="text-3xl font-bold text-white sm:text-4xl">
              <span class="block">Pronto para começar?</span>
              <span class="block">Cadastre-se gratuitamente hoje mesmo.</span>
            </h2>
            <p class="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já estão no controle de suas
              finanças.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <NuxtLink
                to="/auth/signup"
                class="px-6 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-700 bg-white hover:bg-indigo-50 shadow-md hover:shadow-lg transition-all"
              >
                Comece Agora
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-100">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <LogoUi />
          <div class="mt-4 md:mt-0 flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Termos de Uso</span>
              <span class="text-sm">Termos</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Política de Privacidade</span>
              <span class="text-sm">Privacidade</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Contato</span>
              <span class="text-sm">Contato</span>
            </a>
          </div>
        </div>
        <p class="mt-8 text-center text-sm text-gray-400">
          &copy; 2023 Gerenciador de Gastos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import {
	ChartBarIcon,
	DollarSign,
	TrendingUpIcon,
	CreditCardIcon,
	ClockIcon,
	Users,
} from "lucide-vue-next";

const features = [
	{
		title: "Acompanhamento em Tempo Real",
		description:
			"Monitore suas finanças em tempo real com gráficos e relatórios detalhados.",
		icon: ClockIcon,
	},
	{
		title: "Orçamento Personalizado",
		description:
			"Defina orçamentos por categoria e receba alertas quando estiver perto do limite.",
		icon: ChartBarIcon,
	},
	{
		title: "Controle de Gastos",
		description:
			"Categorize seus gastos e identifique para onde seu dinheiro está indo.",
		icon: DollarSign,
	},
	{
		title: "Metas Financeiras",
		description: "Estabeleça e acompanhe metas de economia e investimentos.",
		icon: TrendingUpIcon,
	},
	{
		title: "Cartões e Contas",
		description:
			"Gerencie todos os seus cartões e contas bancárias em um só lugar.",
		icon: CreditCardIcon,
	},
	{
		title: "Compartilhamento Familiar",
		description:
			"Compartilhe suas finanças com familiares para um melhor planejamento em equipe.",
		icon: Users,
	},
];
</script>
