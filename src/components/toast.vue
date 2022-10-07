<template>
  <div
    v-if="state.show"
    v-bind:class="{
      'bg-black text-white': !state.error && !state.success,
      'bg-green-500 text-white': state.success,
      'bg-red-500 text-white': state.error,
    }"
    class="toast-container"
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
.bg-black {
  background: black;
}
.text-white {
  color: white;
}
.bg-green-500 {
  background: #98c379;
}
.bg-red-500 {
  background: #e06c75;
}

.toast-container {
  position: fixed;
  top: calc(var(--base-spacing) * 2);
  right: calc(var(--base-spacing) * 2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  border: 0px;
  width: 30em;
  padding-left: calc(var(--base-spacing) * 5);
  padding-right: calc(var(--base-spacing) * 5);
  padding-top: calc(var(--base-spacing) * 4);
  padding-bottom: calc(var(--base-spacing) * 4);
  border-radius: calc(var(--base-spacing) * 4);
  z-index: 20;
}
</style>
