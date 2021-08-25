<template>
  <div
    v-if="state.show"
    v-bind:class="{
      'bg-black text-white': !state.error && !state.success,
      'bg-green-500 text-white': state.success,
      'bg-red-500 text-white': state.error,
    }"
    class="fixed top-2 right-2 shadow-xl border w-60 px-5 py-4 rounded-md z-20"
  >
    {{ state.message }}
  </div>
</template>

<script setup>
import { reactive } from "vue";

const state = reactive({
  message: "",
  show: false,
  success: false,
  error: false,
});

function createToast(message, options = { delay: 2500 }) {
  state.message = message;
  state.show = true;
  setTimeout(() => {
    state.show = false;
  }, options.delay);
}

function createSuccessToast(message, options) {
  state.success = true;
  state.error = false;
  createToast(message, options);
}

function createErrorToast(message, options) {
  state.success = false;
  state.error = true;
  createToast(message, options);
}

defineExpose({
  createToast,
  createSuccessToast,
  createErrorToast,
});
</script>


<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>