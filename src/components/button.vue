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
  background: #f3f3f3;
  outline: black;
  border: 0px;
  border-radius: 6px;
}

button:hover {
  background: #ddd;
}

button.ghost {
  background: transparent;
}

button.ghost:hover {
  background: transparent;
}
</style>
