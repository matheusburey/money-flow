<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        v-bind="$attrs"
        type="checkbox"
        :checked="modelValue"
        :class="[
          'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
          { 'border-red-300 text-red-900 focus:ring-red-500': error }
        ]"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      >
    </div>
    <div class="ml-3 text-sm">
      <label class="font-medium text-gray-700">
        <slot />
      </label>
      <p v-if="description" class="text-gray-500">{{ description }}</p>
      <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	error: {
		type: String,
		default: "",
	},
	description: {
		type: String,
		default: "",
	},
});

defineEmits(["update:modelValue"]);
</script>
