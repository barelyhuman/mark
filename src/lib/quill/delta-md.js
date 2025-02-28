import { marked } from "marked";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import Quill from "quill";
import TurndownService from "turndown";
const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
  headingStyle: "atx",
});

turndownService.addRule("code-fence-language", {
  filter: ["pre"],
  replacement(content, node) {
    const lang = node.dataset.language || "";
    return "```" + lang + "\n" + content + "\n```";
  },
});

export const htmlToMarkdown = (html) => turndownService.turndown(html);

export const deltaToMarkdown = (delta) => {
  const html = new QuillDeltaToHtmlConverter(delta, {});
  html.beforeRender((groupType, data) => {
    if (groupType !== "block") return;
    if (!(data.op && data.op.attributes && data.op.attributes["code-block"]))
      return;
    const codeContent = data.ops
      .map((d) =>
        typeof d.insert === "string"
          ? d.insert
          : d.insert && d.insert.value
            ? d.insert.value
            : ""
      )
      .join("");
    return `<pre data-language="${data.op.attributes["code-block"]}"><code>${codeContent}</code></pre>`;
  });
  return htmlToMarkdown(html.convert());
};

export const markdownToDelta = (markdown) => {
  const html = marked(markdown);
  const container = document.createElement("div");
  container.innerHTML = html;
  const quillInstance = new Quill(container);
  return quillInstance.getContents().ops;
};
