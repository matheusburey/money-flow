<template>
  <aside class="w-54 py-2">
    <nav>
      <NuxtLink to="/dashboard">
        <LogoUi />
      </NuxtLink>
      <div class="pl-4">
        <div v-for="link in links" :key="link.label" class="my-2 w-full">
          <NuxtLink :to="link.to" class="flex items-center gap-2 p-2 rounded-lg w-full transition-colors hover:bg-gray-200"
            :class="{ 'bg-blue-500 text-white': activeLink === link }">
            <component class="h-4 w-4" :is="link.icon" />
            <span class="text-sm">{{ link.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </aside>
</template>
<script lang="ts" setup>
import * as icons from "lucide-vue-next";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: icons.LayoutDashboard },
  { to: "/banks", label: "Bancos", icon: icons.Landmark },
  { to: "/transactions", label: "Transações", icon: icons.List },
];

const route = useRoute();

const activeLink = computed(() => {
  return links.find((link) => link.to === route.path);
});
</script>
