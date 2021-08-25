<template>
  <div class="relative">
    <Button
      @click="state.dropdownOpen = !state.dropdownOpen"
      class="relative z-10"
    >
      {{ triggerLabel }}
    </Button>

    <div
      v-if="state.dropdownOpen"
      class="h-screen w-screen fixed z-10"
      @click="state.dropdownOpen = false"
    ></div>

    <div
      v-if="state.dropdownOpen"
      class="
        absolute
        left-0
        mt-2
        py-2
        w-60
        bg-white
        rounded-md
        shadow-xl
        border
        z-20
      "
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import MenuItem from "./menu-item.vue";
import Button from "./button.vue";

defineProps({
  menuItems: Array,
  triggerLabel: String,
});

const state = reactive({ dropdownOpen: false });
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
