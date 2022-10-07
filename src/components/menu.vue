<template>
  <div class="container">
    <Button @click="state.dropdownOpen = !state.dropdownOpen" class="trigger">
      {{ triggerLabel }}
    </Button>

    <div
      v-if="state.dropdownOpen"
      class="dropdown"
      @click="state.dropdownOpen = false"
    ></div>

    <div v-if="state.dropdownOpen" class="dropdown-items">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Button from "./button.vue";

defineProps({
  menuItems: Array,
  triggerLabel: String,
});

const state = reactive({ dropdownOpen: false });
</script>

<style scoped>
.container {
  position: relative;
}

.trigger {
  position: relative;
}
.dropdown {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 10;
}

.dropdown-items {
  position: absolute;
  left: 0;
  margin-top: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 30em;
  background: var(--overlay);
  color:var(--subtle);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  z-index: 20;
}
</style>
