<template>
  <div class="home-container">
    <Sidebar />
    <BaseLayout>
      <Toast ref="toastRef" />
      <Editor
        v-if="settings.value.rawMode"
        class="mt-1"
        v-on:change="handleRawChange"
        v-bind:code="state.code"
        :key="activeTabKey"
      />
      <RichEditor
        v-if="!settings.value.rawMode"
        v-on:change="handleChange"
        v-bind:initialCode="state.code"
        v-bind:opsState="state.opsFromStorage"
        :key="activeTabKey"
      />
      <Toolbar>
        <Menu triggerLabel="Menu">
          <MenuItem
            label="Copy as Markdown"
            @click="handleCopyAsMD"
            modifier="⌘ + ⇧ + c"
          />
          <MenuItem label="Copy as HTML" @click="handleCopyAsHTML" />
          <MenuItem label="Save File" modifier="⌘ + s" @click="handleSaveFile" />
          <MenuItem
            label="Save File as HTML"
            modifier="⌘ + ⇧ + s "
            @click="handleSaveAsHTML"
          />
          <MenuItem label="Save File as PDF" @click="handleSaveAsPDF" />
          <MenuItem label="Save File as Image" @click="handleSaveAsImage" />
          <MenuItem label="Settings" @click="openSettings" />
        </Menu>
        <div class="flex align-center">
          <Button
            class="trigger ghost"
            v-bind:class="{ active: state.copied }"
            @click="handleCopyAsHTML"
          >
            <svg
              v-if="!state.copied"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <rect x="8" y="8" width="12" height="12" rx="2"></rect>
              <path
                d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
              ></path>
            </svg>
            <svg
              v-if="state.copied"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M9 12l2 2l4 -4"></path>
            </svg>
          </Button>
        </div>
      </Toolbar>
      <!-- <Preview v-if="state.showPreview" v-bind:code="marked(state.code)" /> -->
      <SettingsModal
        v-if="state.modals.settings"
        :onClose="onSettingsModalClose"
      />
    </BaseLayout>
  </div>
</template>

<script setup>
import BaseLayout from "../components/base-layout.vue";
import Button from "../components/button.vue";
import RichEditor from "../components/editor-rich.vue";
import Editor from "../components/editor.vue";
import MenuItem from "../components/menu-item.vue";
import Menu from "../components/menu.vue";
import Sidebar from "../components/sidebar.vue";
import Toolbar from "../components/toolbar.vue";
import toImage from "dom-to-image";
import download from "downloadjs";
import html2pdf from "html2pdf.js";
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import SettingsModal from "../components/settings-modal.vue";
import Toast from "../components/toast.vue";
import { copy } from "../lib/copy";
import getMDStyles from "../lib/get-md-styles";
import marked from "../lib/marked";
import { deltaToMarkdown, markdownToDelta } from "../lib/quill/delta-md.js";
import { defaultMarkdownText } from "../resources/default-md";
import { settings } from "../stores/settings.js";
import {
  tabsState,
  getActiveTab,
  updateTabContent,
  createTab,
  closeTab,
  setActiveTab,
} from "../stores/tabs.js";

const toastRef = ref(null);

const STORAGE_TOKEN = Symbol("reaper-mark").toString();
const STORAGE_TOKEN_RAW = Symbol("reaper-mark-raw-text").toString();

// Migrate old single-file storage to tabs if needed
function migrateOldStorage() {
  const oldContent = localStorage.getItem(STORAGE_TOKEN_RAW);
  if (oldContent && tabsState.tabs.length === 1 && !tabsState.tabs[0].content) {
    // Migrate to first tab
    tabsState.tabs[0].rawContent = oldContent;
    tabsState.tabs[0].content = JSON.stringify(markdownToDelta(oldContent));
    updateTabContent(
      tabsState.tabs[0].id,
      tabsState.tabs[0].content,
      tabsState.tabs[0].rawContent,
    );
  }
}

migrateOldStorage();

const activeTabKey = computed(() => tabsState.activeTabId);

const getDefaultCode = () => {
  const activeTab = getActiveTab();
  return activeTab?.rawContent || defaultMarkdownText;
};

const getFromStorage = () => {
  const activeTab = getActiveTab();
  if (activeTab?.content) {
    return activeTab.content;
  }
  const existingCode = activeTab?.rawContent || defaultMarkdownText;
  return JSON.stringify(markdownToDelta(existingCode));
};

const state = reactive({
  copied: false,
  modals: {
    settings: false,
  },
  code: getDefaultCode(),
  opsFromStorage: getFromStorage(),
});

// Watch for active tab changes and update editor content
watch(
  () => tabsState.activeTabId,
  () => {
    state.code = getDefaultCode();
    state.opsFromStorage = getFromStorage();
  },
);

watch(
  () => settings.value.rawMode,
  () => {
    state.code = getDefaultCode();
    state.opsFromStorage = getFromStorage();
  },
);

onMounted(() => {
  document.addEventListener("keydown", shortcutListener.bind(this));
});

onUnmounted(() => {
  document.removeEventListener("keydown", shortcutListener);
});

function shortcutListener(e) {
  // Cmd/Ctrl + T - New Tab
  if (e.key === "t" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
    e.preventDefault();
    createTab();
    state.code = getDefaultCode();
    state.opsFromStorage = getFromStorage();
    return;
  }

  // Cmd/Ctrl + W - Close Tab
  if (e.key === "w" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
    e.preventDefault();
    if (tabsState.tabs.length > 1) {
      closeTab(tabsState.activeTabId);
      state.code = getDefaultCode();
      state.opsFromStorage = getFromStorage();
    }
    return;
  }

  // Cmd/Ctrl + 1-9 - Switch to tab
  if ((e.ctrlKey || e.metaKey) && e.key >= "1" && e.key <= "9") {
    const index = parseInt(e.key) - 1;
    if (index < tabsState.tabs.length) {
      e.preventDefault();
      setActiveTab(tabsState.tabs[index].id);
      state.code = getDefaultCode();
      state.opsFromStorage = getFromStorage();
    }
    return;
  }

  if (e.key === "c" && (e.ctrlKey || e.metaKey) && e.shiftKey) {
    e.preventDefault();
    return handleCopyAsMD();
  }

  if (e.key === "s" && (e.ctrlKey || e.metaKey) && e.shiftKey) {
    e.preventDefault();
    return handleSaveAsHTML();
  }

  if (e.key === "s" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
    e.preventDefault();
    return handleSaveFile();
  }
}

function openSettings() {
  state.modals.settings = true;
}

function onSettingsModalClose() {
  state.modals.settings = false;
}

function handleRawChange(code) {
  state.code = code;
  const ops = markdownToDelta(code);
  const activeTab = getActiveTab();
  if (activeTab) {
    updateTabContent(activeTab.id, JSON.stringify(ops), code);
  }
}

function handleChange({ code, ops }) {
  state.code = code;
  const activeTab = getActiveTab();
  if (activeTab) {
    updateTabContent(activeTab.id, ops, code);
  }
}

async function handleCopyAsMD() {
  if (!state.code) {
    return;
  }
  await copy(state.code);
  state.copied = true;
  setTimeout(() => {
    state.copied = false;
  }, 2500);
}

async function handleCopyAsHTML() {
  if (!state.code) {
    return;
  }
  const htmlValue = marked(state.code);
  await copy(htmlValue);
  state.copied = true;
  setTimeout(() => {
    state.copied = false;
  }, 2500);
}

function handleSaveAsHTML() {
  const activeTab = getActiveTab();
  const defaultName = activeTab?.title || "mark";
  const fileName = prompt("Name your file", `${defaultName}.html`);
  if (!fileName) {
    return;
  }
  const file = createFile(marked(state.code));
  const fileNameWithExt =
    fileName.replace(/.html$/, "") + ".html" || "mark.html";
  exportFile(fileNameWithExt, file);
}

function handleSaveFile() {
  const activeTab = getActiveTab();
  const defaultName = activeTab?.title || "mark";
  const fileName = prompt("Name your file", `${defaultName}.md`);
  if (!fileName) {
    return;
  }
  const file = createFile(state.code);
  const fileNameWithExt = fileName.replace(/.md$/, "") + ".md" || "mark.md";
  exportFile(fileNameWithExt, file);
}

async function handleSaveAsPDF() {
  try {
    const activeTab = getActiveTab();
    const defaultName = activeTab?.title || "mark";
    let htmlString = marked(state.code);
    htmlString += `<style>
    ${getMDStyles()}
    </style>`;
    const options = {
      margin: 0.25,
      filename: `${defaultName}.pdf`,
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(htmlString, "string").to("pdf").save();
  } catch (err) {
    console.error(err);
  }
}
async function handleSaveAsImage() {
  try {
    const activeTab = getActiveTab();
    const defaultName = activeTab?.title || "mark";
    setTimeout(() => {
      toImage
        .toBlob(document.querySelector(".ql-editor"), {
          bgcolor: "var(--base)",
          style: {
            color: "var(--text)",
          },
        })
        .then((blob) => {
          download(blob, `${defaultName}.png`, "image/png");
        })
        .catch((err) => {
          console.error(err);
        });
    }, 250);
  } catch (err) {
    console.error(err);
  }
}

function createFile(data) {
  return new Blob([data], { type: "text/plain" });
}

function exportFile(filename, file, generateDataURI = true) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  let uri;
  if (generateDataURI) {
    uri = window.URL.createObjectURL(file);
  } else {
    uri = file;
  }
  a.href = uri;
  a.download = filename;
  a.click();
  document.body.removeChild(a);
}
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>
