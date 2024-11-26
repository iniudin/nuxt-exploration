<script setup lang="ts">
defineProps<{ variant: "success" | "danger" | "primary" }>();

const variantClasses = {
  success: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  primary: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
};
</script>
<template>
  <button
    :class="variantClasses[variant]"
    class="px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
  >
    <slot />
  </button>
</template>
