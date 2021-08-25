<template>
  <button
    v-bind="$attrs"
    class="
      block
      rounded-md
      bg-gray-100
      p-2
      focus:outline-none
      hover:bg-gray-200
    "
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  label: String,
});
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
