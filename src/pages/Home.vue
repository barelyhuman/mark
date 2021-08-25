<template>
  <BaseLayout>
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
      </Menu>

      <Button @click="handlePreviewToggle"
        >Preview: {{ state.showPreview ? "on" : "off" }}</Button
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
import { copy } from "../lib/copy";
import { reactive, onMounted, onUnmounted } from "vue";
import marked from "marked";

const state = reactive({ code: "", showPreview: false });

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
}

async function handleCopyAsHTML() {
  if (!value) {
    return;
  }
  const htmlValue = marked(state.code);
  await copy(htmlValue);
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

function createFile(data) {
  return new Blob([data], { type: "text/plain" });
}

function exportFile(filename, file) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.href = window.URL.createObjectURL(file);
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