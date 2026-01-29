<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h3 class="sidebar-title">Files</h3>
      <button
        class="new-tab-button"
        @click="handleNewTab"
        title="New Tab (Cmd/Ctrl + T)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
    <div class="tabs-list">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{ active: tab.id === tabsState.activeTabId }"
        @click="handleTabClick(tab.id)"
      >
        <input
          v-if="editingTabId === tab.id"
          v-model="editingTitle"
          @blur="handleTitleBlur"
          @keydown.enter="handleTitleBlur"
          @keydown.esc="cancelEdit"
          class="tab-title-input"
          :data-tab-id="tab.id"
          @click.stop
        />
        <span v-else class="tab-title" @dblclick="startEdit(tab)">
          {{ tab.title }}
        </span>
        <button
          v-if="tabs.length > 1"
          class="close-tab-button"
          @click.stop="handleCloseTab(tab.id)"
          title="Close Tab"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import {
  tabsState,
  createTab,
  setActiveTab,
  closeTab,
  updateTabTitle,
} from "../stores/tabs.js";

const tabs = tabsState.tabs;
const editingTabId = ref(null);
const editingTitle = ref("");

function handleNewTab() {
  createTab();
}

function handleTabClick(tabId) {
  setActiveTab(tabId);
}

function handleCloseTab(tabId) {
  closeTab(tabId);
}

function startEdit(tab) {
  editingTabId.value = tab.id;
  editingTitle.value = tab.title;
  nextTick(() => {
    const input = document.querySelector(`input[data-tab-id="${tab.id}"]`);
    if (input) {
      input.focus();
      input.select();
    }
  });
}

function handleTitleBlur() {
  if (editingTabId.value && editingTitle.value.trim()) {
    updateTabTitle(editingTabId.value, editingTitle.value.trim());
  }
  editingTabId.value = null;
  editingTitle.value = "";
}

function cancelEdit() {
  editingTabId.value = null;
  editingTitle.value = "";
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  min-width: 250px;
  flex-shrink: 0;
  background: var(--overlay);
  border-right: 1px solid var(--overlay);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--overlay);
}

.sidebar-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.new-tab-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: var(--text);
  opacity: 0.7;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 20;
}

.new-tab-button:hover {
  opacity: 1;
}

.tabs-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  gap: 0.5rem;
  position: relative;
  z-index: 15;
}

.tab-item:hover {
  background-color: var(--hover, rgba(0, 0, 0, 0.05));
}

.tab-item.active {
  background-color: var(--active, rgba(0, 0, 0, 0.1));
  font-weight: 500;
}

.tab-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  color: var(--text);
}

.tab-title-input {
  flex: 1;
  background: var(--base);
  border: 1px solid var(--border, #e1e4e8);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: var(--text);
  outline: none;
}

.tab-title-input:focus {
  border-color: var(--accent, #0066ff);
}

.close-tab-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.125rem;
  color: var(--text);
  opacity: 0;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-item:hover .close-tab-button {
  opacity: 0.5;
}

.close-tab-button:hover {
  opacity: 1 !important;
}

/* Scrollbar styling */
.tabs-list::-webkit-scrollbar {
  width: 6px;
}

.tabs-list::-webkit-scrollbar-track {
  background: transparent;
}

.tabs-list::-webkit-scrollbar-thumb {
  background: var(--border, #e1e4e8);
  border-radius: 3px;
}

.tabs-list::-webkit-scrollbar-thumb:hover {
  background: var(--text, #555);
}
</style>
