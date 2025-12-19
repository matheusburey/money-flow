<template>
  <nav class="bg-white/80 backdrop-blur-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <NuxtLink to="/">
          <LogoUi />
        </NuxtLink>
        <div class="flex items-center">
          <slot />
        </div>
      </div>
    </div>
  </nav>
</template>
