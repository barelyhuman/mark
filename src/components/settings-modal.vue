<template>
  <div class="modal">
    <div class="modal-container">
      <div class="modal-content">
        <div>
          <label>
            <input v-model="modalState.settings.rawMode" type="checkbox" />
            Raw Edit Mode
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { effect, reactive } from "vue";
import { loadSettings, updateSettings } from "../lib/settings.js";

const props = defineProps(["onClose"]);
const modalState = reactive({ settings: loadSettings() });

effect(() => {
  const currentState = {};
  Object.keys(modalState.settings).forEach((k) => {
    currentState[k] = modalState.settings[k];
  });
  updateSettings(currentState);
});
</script>

<style>
.modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0px;
  left: 0px;
}

.modal-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(from var(--base) r g b/.12);
}

.modal-content {
  background-color: var(--overlay);
  box-shadow: rgba(0, 0, 0, 0.12);
  padding: 10px;
  border-radius: 6px;
  min-height: 100px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
}
</style>
