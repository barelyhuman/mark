<template>
  <BaseLayout>
    <Toast ref="toastRef" />
    <Editor v-on:change="handleChange" v-bind:initialCode="state.code"></Editor>
    <Toolbar>
      <Menu triggerLabel="Menu">
        <MenuItem label="Copy as HTML" @click="handleCopyAsHTML" />
        <MenuItem label="Save File" modifier="⌘ + s" @click="handleSaveFile" />
        <MenuItem
          label="Save File as HTML"
          modifier="⌘ + ⇧ + s "
          @click="handleSaveAsHTML"
        />
        <MenuItem label="Save File as PDF" @click="handleSaveAsPDF" />
        <MenuItem label="Save File as Image" @click="handleSaveAsImage" />
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
    <!-- <Editor v-if="!state.showPreview" class="mt-1" v-on:change="handleChange" v-bind:code="state.code"></Editor>
    <Preview v-if="state.showPreview" v-bind:code="marked(state.code)" /> -->
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "../components/base-layout.vue";
import Menu from "../components/menu.vue";
import MenuItem from "../components/menu-item.vue";
import Toolbar from "../components/toolbar.vue";
import Editor from "../components/editor-rich.vue";
import Button from "../components/button.vue";
import Preview from "../components/preview.vue";
import Toast from "../components/toast.vue";
import { copy } from "../lib/copy";
import { defaultMarkdownText } from "../resources/default-md";
import { reactive, onMounted, ref, onUnmounted } from "vue";
import marked from "../lib/marked";
import html2pdf from "html2pdf.js";
import getMDStyles from "../lib/get-md-styles";
import toImage from "dom-to-image";
import download from "downloadjs";

const toastRef = ref(null);

const STORAGE_TOKEN = Symbol("reaper-mark").toString();

const getDefaultCode = () => {
  const existingCode = localStorage.getItem(STORAGE_TOKEN);
  if (existingCode && existingCode.length) {
    return existingCode;
  }
  return defaultMarkdownText;
};

const state = reactive({
  copied: false,
  code: getDefaultCode(),
});

onMounted(() => {
  document.addEventListener("keydown", shortcutListener.bind(this));
});

onUnmounted(() => {
  document.removeEventListener("keydown", shortcutListener);
});

function shortcutListener(e) {
  if (e.key === "s" && (e.ctrlKey || e.metaKey) && e.shiftKey) {
    e.preventDefault();
    return handleSaveAsHTML();
  }

  if (e.key === "s" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
    e.preventDefault();
    return handleSaveFile();
  }
}

function handleChange(code) {
  state.code = code;
  localStorage.setItem(STORAGE_TOKEN, code);
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
  const fileName = prompt("Name your file", "mark.html");
  if (!fileName) {
    return;
  }
  const file = createFile(marked(state.code));
  const fileNameWithExt =
    fileName.replace(/.html$/, "") + ".html" || "mark.html";
  exportFile(fileNameWithExt, file);
}

function handleSaveFile() {
  const fileName = prompt("Name your file", "mark.md");
  if (!fileName) {
    return;
  }
  const file = createFile(state.code);
  const fileNameWithExt = fileName.replace(/.md$/, "") + ".md" || "mark.md";
  exportFile(fileNameWithExt, file);
}

async function handleSaveAsPDF() {
  try {
    let htmlString = marked(state.code);
    htmlString += `<style>
    ${getMDStyles()}
    </style>`;
    const options = {
      margin: 0.25,
      filename: "mark.pdf",
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(htmlString, "string").to("pdf").save();
  } catch (err) {
    console.error(err);
  }
}
async function handleSaveAsImage() {
  try {
    setTimeout(() => {
      toImage
        .toBlob(document.querySelector(".ql-editor"), {
          bgcolor: "var(--base)",
          style: {
            color: "var(--text)",
          },
        })
        .then((blob) => {
          download(blob, `mark.png`, "image/png");
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

<style scoped></style>
