<template>
  <div class="flex bg-gray-100 h-screen">
    <SidebarDashboard />
    <div class="w-full p-3 overflow-auto">
      <div class="w-full rounded-xl bg-white shadow-md">
        <header class="flex items-center px-4 py-2 h-1/12 border-b border-gray-300">
          <button class="hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <PanelLeftIcon class="h-4 w-4 text-gray-600" />
          </button>
          <div class="w-[1px] h-4 bg-gray-300 mx-4"></div>
          <h1 class="text-base font-bold">{{ getTitle() }}</h1>
        </header>
        <div class="h-11/12 p-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PanelLeftIcon } from 'lucide-vue-next';

const url = useRoute();
function getTitle() {
  const name = url.name as string;
  const names: Record<string, string> = {
    dashboard: "Dashboard",
    banks: "Bancos",
    transactions: "Transações",
  };
  return names[name] || "Dashboard";
}
</script>
