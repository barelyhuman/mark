<template>
  <div class="bg-white p-3">
    <div
      name=""
      ref="texteditor"
      autofocus="true"
      class="code-editor outline-none min-h-screen w-full"
    ></div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { CodeJar } from "codejar";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import markdown from "highlight.js/lib/languages/markdown";
import golang from "highlight.js/lib/languages/go";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("go", golang);

const props = {
  code: String,
};

const highligher = (editor) => {
  const code = editor.textContent;
  editor.innerHTML = hljs.highlightAuto(code, ["markdown"]).value;
};

export default {
  props,
  emits: ["change"],
  setup(props, { emit }) {
    const texteditor = ref(null);
    let jar;
    onMounted(() => {
      jar = CodeJar(texteditor.value, highligher, { tab: "\t" });
      jar.updateCode(props.code);
      jar.onUpdate((code) => {
        emit("change", code);
      });

      texteditor.value.focus();
    });

    return {
      texteditor,
    };
  },
};
</script>
