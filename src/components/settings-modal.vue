<template>
  <div class="modal">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Settings</h3>
          <Button @click="onClose">
            <svg xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </Button>
        </div>
        <div class="modal-body">
          <label>
            <input v-model="settings.value.rawMode" type="checkbox" />
            Raw Edit Mode
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { settings } from '../stores/settings';
import Button from './button.vue';

const props = defineProps(["onClose"]);
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
  background: rgb(from var(--base) r g b/.5);
}

.modal-content {
  background-color: var(--overlay);
  box-shadow: rgba(0, 0, 0, 0.12);
  padding: 10px;
  border-radius: 10px;
  min-height: 50%;
  min-width: 50%;
  display: flex;
  flex-direction: column;
}

.modal-content .modal-header{
  height: 32px;
  padding-left:10px;
  padding-right:10px;
  border-bottom :1px solid var(--surface);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.modal-content .modal-body{
  padding-left:10px;
  padding-right:10px;
  padding-top:10px;
}

.modal-content .modal-header h3{
  padding:0px;
  margin:0px;
}
</style>
