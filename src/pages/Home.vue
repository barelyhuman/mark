<template>
  <BaseLayout>
    <Toast ref="toastRef" />
    <div class="flex justify-between mb-2">
      <Menu triggerLabel="Menu">
        <MenuItem
          label="Toggle Preview"
          modifier="⌘ + k"
          @click="handlePreviewToggle"
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
      </Menu>

      <Button class="ghost" @click="handlePreviewToggle" title="Toggle preview state">
        <span
          class="preview-dot"
          v-bind:class="{ on: state.showPreview }"
        ></span>
      </Button>
    </div>
    <Editor
      v-if="!state.showPreview"
      class="mt-1"
      v-on:change="handleChange"
      v-bind:code="state.code"
    ></Editor>
    <Preview v-if="state.showPreview" v-bind:code="marked(state.code)" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "../components/base-layout.vue";
import Menu from "../components/menu.vue";
import MenuItem from "../components/menu-item.vue";
import Editor from "../components/editor.vue";
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

const state = reactive({ code: getDefaultCode(), showPreview: false });

onMounted(() => {
  document.addEventListener("keydown", shortcutListener.bind(this));
});

onUnmounted(() => {
  document.removeEventListener("keydown", shortcutListener);
});

function shortcutListener(e) {
  if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    return handlePreviewToggle();
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
  toastRef.value.createSuccessToast("Copied!");
}

function handlePreviewToggle() {
  state.showPreview = !state.showPreview;
  const _code = state.code;
  state.code = "";
  state.code = _code;
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
    state.showPreview = true;

    setTimeout(() => {
      toImage
        .toBlob(document.querySelector(".markdown-preview"), {
          bgcolor: "#fff",
        })
        .then((blob) => {
          download(blob, `mark.png`, "image/png");
          state.showPreview = false;
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
</style>
