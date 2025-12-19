<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center px-4 py-2 border text-sm font-medium shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors hover:opacity-70',
      {
        // Primary
        'border-transparent text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500':
          variant === 'primary',
        // Secondary
        'border-transparent text-indigo-700 rounded-md bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500':
          variant === 'secondary',
        // Outline
        'border-gray-300 text-gray-700 rounded-md bg-white hover:bg-gray-50 focus:ring-indigo-500':
          variant === 'outline',
        // Danger
        'border-transparent text-white rounded-md bg-red-600 hover:bg-red-700 focus:ring-red-500':
          variant === 'danger',
        // Text
        'border-transparent text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 focus:ring-indigo-500':
          variant === 'text',
        'border-transparent bg-blue-300 h-12 w-12 rounded-full text-base':
          variant === 'icon',
        // Sizes
        'px-2.5 py-1.5 text-xs': size === 'xs',
        'px-3 py-2 text-sm': size === 'sm',
        'px-4 py-2 text-sm': size === 'md',
        'px-6 py-3 text-base': size === 'lg',
        'px-8 py-4 text-base': size === 'xl',
        // Full width
        'w-full': fullWidth,
        // Disabled
        'opacity-50 cursor-not-allowed': disabled,
      },
      $attrs.class,
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <span v-if="loading" class="mr-2">
      <Loader class="animate-spin h-4 w-4 text-current" />
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { Loader } from "lucide-vue-next";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant =
	| "primary"
	| "secondary"
	| "outline"
	| "danger"
	| "text"
	| "icon";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

defineOptions({
	name: "ButtonUi",
});

defineProps({
	type: {
		type: String as PropType<ButtonType>,
		default: "button",
		validator: (value: string): value is ButtonType =>
			["button", "submit", "reset"].includes(value),
	},
	variant: {
		type: String as PropType<ButtonVariant>,
		default: "primary",
		validator: (value: string): value is ButtonVariant =>
			["primary", "secondary", "outline", "danger", "text", "icon"].includes(
				value,
			),
	},
	size: {
		type: String as PropType<ButtonSize>,
		default: "md",
		validator: (value: string): value is ButtonSize =>
			["xs", "sm", "md", "lg", "xl"].includes(value),
	},
	fullWidth: {
		type: Boolean,
		default: false,
	},
	loading: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
} as const);
</script>
