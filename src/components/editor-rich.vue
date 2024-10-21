<template>
  <div name="" ref="texteditor" autofocus="true" class="flex-1 w-full code-editor" id="editor"></div>
</template>
<script>
import "quill/dist/quill.bubble.css";
import "quilljs-markdown/dist/quilljs-markdown-common-style.css";
import hljs from "highlight.js";

import Quill from "quill";
import QuillMarkdown from "quilljs-markdown";
import { onMounted, ref } from "vue";
import { deltaToMarkdown } from "../lib/quill/delta-md.js";
import { MarkdownToQuill } from "md-to-quill-delta";

export default {
  name: "EditorRich",
  emits: ["change"],
  props: {
    opsState: String,
    initialCode: String,
  },
  setup(props, { emit }) {
    const texteditor = ref(null);
    let quill;
    onMounted(() => {
      quill = new Quill("#editor", {
        theme: "bubble",
        modules: {
          syntax: {
            hljs,
          },
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
          ],
        },
      });

      // enable markdown conversion
      new QuillMarkdown(quill, {
        debug: true,
      });

      const converter = new MarkdownToQuill({});
      let ops = [];

      try {
        ops = JSON.parse(props.opsState);
      } catch (err) {
        // Migration change to move from 
        // storing markdown to quill delta 
        // if a syntax error is found, try converting it 
        if (err instanceof SyntaxError) {
          ops = converter.convert(props.opsState);
        }
      }

      quill.setContents(ops);

      quill.on("text-change", () => {
        const { ops } = quill.getContents();
        const markdownCode = deltaToMarkdown(ops);
        emit("change", {
          code: markdownCode,
          ops: JSON.stringify(ops),
        });
      });

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
