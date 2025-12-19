<template>
  <div 
    :class="[
      'bg-white rounded-2xl shadow-sm',
      { 'p-6': !noPadding },
      { 'border border-gray-200': !noBorder },
      { 'overflow-hidden': !noOverflow },
      $attrs.class
    ]"
  >
    <div v-if="$slots.header" class="border-b border-gray-200 pb-4 mb-4">
      <slot name="header" />
    </div>
    
    <slot />
    
    <div v-if="$slots.footer" class="mt-6 pt-4 border-t border-gray-200">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
	noPadding: {
		type: Boolean,
		default: false,
	},
	noBorder: {
		type: Boolean,
		default: false,
	},
	noOverflow: {
		type: Boolean,
		default: false,
	},
});
</script>
