import { marked } from "marked";
import { escape } from "./helpers";
import hljs from "highlight.js";

marked.setOptions({
  highlight: function (code, lang, callback) {
    const highlightedCode = hljs.highlight(code, {
      language: lang || "plaintext",
    }).value;
    return highlightedCode;
  },
});

const renderer = {
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    code = code.replace(/\n$/, "") + "\n";

    if (!lang) {
      return (
        "<pre class='codeblock'" +
        (escaped ? code : escape(code, true)) +
        "</pre>\n"
      );
    }

    return (
      '<pre class="codeblock ' +
      this.options.langPrefix +
      escape(lang, true) +
      '">' +
      (escaped ? code : escape(code, true)) +
      "</pre>\n"
    );
  },
};

marked.use({ renderer });

export default marked;
