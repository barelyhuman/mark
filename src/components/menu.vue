<template>
  <div class="container">
    <Button
      v-click-outside="onClickOutside"
      @click="state.dropdownOpen = !state.dropdownOpen"
      class="ghost trigger"
    >
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

const onClickOutside = () => {
  state.dropdownOpen = false;
};

const vClickOutside = {
  mounted: (el, binding, vnode) => {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

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
  bottom: calc(var(--toolbar-height) + 10px);
  margin-top: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 15em;
  background: var(--overlay);
  color: var(--subtle);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  z-index: 20;
}
</style>
