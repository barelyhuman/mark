<template>
  <div class="modal">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Settings</h3>
          <Button @click="onClose">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-x"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <div class="modal-body">
          <label class="checkbox-container">
            <input
              v-model="settings.value.rawMode"
              type="checkbox"
              name="rawMode"
            />
            <span class="checkbox">
              <span class="checkbox-overlay"></span>
            </span>
            <span class="checkbox-label">Raw Edit Mode </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { settings } from "../stores/settings";
import Button from "./button.vue";

const props = defineProps(["onClose"]);
</script>

<style>
.modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}

.modal-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: var(--overlay);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 20px;
  border-radius: 12px;
  min-height: 50%;
  min-width: 50%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-content .modal-header {
  height: auto;
  padding: 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--surface);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.modal-content .modal-header h3 {
  margin: 0;
  font-weight: 600;
  color: var(--text-primary);
}

.modal-content .modal-body {
  padding: 15px 10px 0 10px;
  font-size: 14px;
  color: var(--text-secondary);
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-container {
  display: inline-flex;
  position: relative;
  gap: 0.5rem;
}

.checkbox-container input[type="checkbox"] {
  display: none;
  cursor: pointer;
}

.checkbox-container input[type="checkbox"]:after {
  opacity: 1;
}

.checkbox-container .checkbox {
  display: inline-flex;
  position: absolute;
  top: 0px;
  left: 0px;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.375rem;
  border-width: 2px;
  background: overlay;
  border-color: var(--text);
  border-style: solid;
}

.checkbox-container .checkbox-overlay {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 2px;
  opacity: 0;
  background: var(--text);
}

.checkbox-container .checkbox-label { 
  margin-left: 2rem;
}

input[type="checkbox"]:checked ~ .checkbox > .checkbox-overlay{
  opacity:1
}
</style>
