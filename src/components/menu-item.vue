<template>
  <a
    v-bind:href="href"
    class="
      block
      px-4
      py-2
      text-sm
      capitalize
      text-gray-700
      hover:bg-black hover:text-white
    "
  >
    <span class="flex justify-between">
      <span>{{ label }} </span>
      <span class="text-gray-400 text-xs"> {{ modifier }}</span>
    </span>
  </a>
</template>

<script setup>
defineProps({
  label: String,
  modifier: String,
  href: String,
});
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
