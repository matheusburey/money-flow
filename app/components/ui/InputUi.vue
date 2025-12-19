<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <div class="relative">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="prefix" />
      </div>
      <input
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        :class="[
          'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
          { 'pl-10': $slots.prefix },
          { 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': error }
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <div v-if="$slots.suffix" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <slot name="suffix" />
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
	label: {
		type: String,
		default: "",
	},
	type: {
		type: String,
		default: "text",
		validator: (value: string) =>
			["text", "email", "password", "tel", "number", "url", "search"].includes(
				value,
			),
	},
	modelValue: {
		type: [String, Number],
		default: "",
	},
	error: {
		type: String,
		default: "",
	},
	hint: {
		type: String,
		default: "",
	},
});

defineEmits(["update:modelValue"]);
</script>
