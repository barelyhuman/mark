<template>
  <BaseLayout>
    <Toast ref="toastRef" />
    <h1
      class="
        mb-12
        text-2xl
        font-semibold
        leading-none
        tracking-tighter
        text-black
        title-font
      "
    >
      Mark
      <br />
      <small class="text-sm tracking-normal">
        ~ Quick Web Markdown Editor</small
      >
    </h1>
    <div class="flex justify-between">
      <Menu triggerLabel="Menu" class="mr-2">
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

      <Button
        v-bind:class="{
          'bg-green-600 text-white hover:bg-green-400': state.showPreview,
          'bg-gray-100': !state.showPreview,
        }"
        @click="handlePreviewToggle"
        >Preview</Button
      >
    </div>
    <div class="border my-2"></div>
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
    const fileName = prompt("Name your file", "mark.pdf");
    if (!fileName) {
      return;
    }
    state.showPreview = true;
    const htmlString = marked(state.code);
    const options = {
      margin: 0.25,
      filename: fileName,
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    setTimeout(() => {
      html2pdf()
        .set(options)
        .from(htmlString, "string")
        .to("pdf")
        .save()
        .then(() => {
          state.showPreview = false;
        });
    }, 250);
  } catch (err) {
    console.error(err);
  }
}
async function handleSaveAsImage() {
  try {
    const fileName = prompt("Name your file", "mark.jpeg");
    if (!fileName) {
      return;
    }
    state.showPreview = true;
    const htmlString = marked(state.code);
    const options = {
      margin: 0.25,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
    };

    setTimeout(() => {
      html2pdf()
        .set(options)
        .from(htmlString, "string")
        .to("container")
        .toImg()
        .outputImg("datauri")
        .then((dataURL) => {
          exportFile(fileName,dataURL,false)
          state.showPreview = false;
        })
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
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
