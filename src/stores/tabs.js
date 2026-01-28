import { reactive } from "vue";

const TABS_STORAGE_KEY = "mark:tabs";
const ACTIVE_TAB_KEY = "mark:activeTab";

// Generate unique ID for tabs
function generateId() {
  return `tab-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

// Load tabs from localStorage
function loadTabs() {
  try {
    const stored = localStorage.getItem(TABS_STORAGE_KEY);
    if (stored) {
      const tabs = JSON.parse(stored);
      return tabs.length > 0 ? tabs : [createDefaultTab()];
    }
  } catch (err) {
    console.error("Error loading tabs:", err);
  }
  return [createDefaultTab()];
}

// Load active tab ID from localStorage
function loadActiveTabId() {
  try {
    const stored = localStorage.getItem(ACTIVE_TAB_KEY);
    if (stored) {
      return stored;
    }
  } catch (err) {
    console.error("Error loading active tab:", err);
  }
  return null;
}

// Create a default tab
function createDefaultTab() {
  return {
    id: generateId(),
    title: "Untitled",
    content: "",
    rawContent: "",
  };
}

// Save tabs to localStorage
function saveTabs(tabs) {
  try {
    localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(tabs));
  } catch (err) {
    console.error("Error saving tabs:", err);
  }
}

// Save active tab ID to localStorage
function saveActiveTabId(tabId) {
  try {
    localStorage.setItem(ACTIVE_TAB_KEY, tabId);
  } catch (err) {
    console.error("Error saving active tab:", err);
  }
}

// Initialize tabs state
const initialTabs = loadTabs();
const initialActiveTabId = loadActiveTabId();
// Validate that the active tab ID exists in the tabs array
const validatedActiveTabId = initialTabs.find(tab => tab.id === initialActiveTabId) 
  ? initialActiveTabId 
  : initialTabs[0].id;

export const tabsState = reactive({
  tabs: initialTabs,
  activeTabId: validatedActiveTabId,
});

// Get active tab
export function getActiveTab() {
  return tabsState.tabs.find((tab) => tab.id === tabsState.activeTabId);
}

// Set active tab
export function setActiveTab(tabId) {
  const tab = tabsState.tabs.find((t) => t.id === tabId);
  if (tab) {
    tabsState.activeTabId = tabId;
    saveActiveTabId(tabId);
  }
}

// Create new tab
export function createTab(title = "Untitled") {
  const newTab = {
    id: generateId(),
    title,
    content: "",
    rawContent: "",
  };
  tabsState.tabs.push(newTab);
  tabsState.activeTabId = newTab.id;
  saveTabs(tabsState.tabs);
  saveActiveTabId(newTab.id);
  return newTab;
}

// Update tab content
export function updateTabContent(tabId, content, rawContent) {
  const tab = tabsState.tabs.find((t) => t.id === tabId);
  if (tab) {
    tab.content = content;
    tab.rawContent = rawContent;
    saveTabs(tabsState.tabs);
  }
}

// Update tab title
export function updateTabTitle(tabId, title) {
  const tab = tabsState.tabs.find((t) => t.id === tabId);
  if (tab) {
    tab.title = title;
    saveTabs(tabsState.tabs);
  }
}

// Close/delete tab
export function closeTab(tabId) {
  const index = tabsState.tabs.findIndex((t) => t.id === tabId);
  if (index === -1) return;

  // Don't allow closing the last tab
  if (tabsState.tabs.length === 1) {
    return;
  }

  tabsState.tabs.splice(index, 1);

  // If we closed the active tab, switch to another tab
  if (tabsState.activeTabId === tabId) {
    // Try to activate the previous tab, or the next one if we closed the first tab
    const newIndex = Math.max(0, index - 1);
    tabsState.activeTabId = tabsState.tabs[newIndex].id;
    saveActiveTabId(tabsState.activeTabId);
  }

  saveTabs(tabsState.tabs);
}

// Get tab by ID
export function getTabById(tabId) {
  return tabsState.tabs.find((t) => t.id === tabId);
}
