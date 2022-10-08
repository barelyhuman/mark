<template>
  <button v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  label: String,
});
</script>

<style scoped>
button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: var(--overlay);
  color: var(--text);
  outline: black;
  border: 0px;
  border-radius: 6px;
}

button:hover {
  cursor: pointer;
  background: var(--surface);
}

button.ghost {
  background: transparent;
}

button.ghost:hover {
  background: transparent;
}
</style>
