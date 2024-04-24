<template>
  <div
    name=""
    ref="texteditor"
    autofocus="true"
    class="flex-1 w-full code-editor"
    id="editor"
  ></div>
</template>
<script>
import "quill/dist/quill.bubble.css";
import "quilljs-markdown/dist/quilljs-markdown-common-style.css";

import Quill from "quill";
import QuillMarkdown from "quilljs-markdown";
import { onMounted, ref } from "vue";
import { deltaToMarkdown } from "quill-delta-to-markdown";

export default {
  name: "EditorRich",
  emits: ["change"],
  setup(props, { emit }) {
    const texteditor = ref(null);
    let quill;
    onMounted(() => {
      quill = new Quill("#editor", {
        theme: "bubble",
      });

      quill.on("text-change", () => {
        const markdownCode = deltaToMarkdown(quill.getContents().ops);
        emit("change", markdownCode);
      });

      // enable markdown conversion
      new QuillMarkdown(quill, {});

      if (texteditor.value) {
        const editor = texteditor.value.querySelector(".ql-editor");
        texteditor.value.addEventListener("click", (e) => {
          if (e.target.id != "editor") {
            return;
          }
          editor.focus();
        });
        editor.focus();
      }
    });

    return {
      texteditor,
    };
  },
};
</script>
