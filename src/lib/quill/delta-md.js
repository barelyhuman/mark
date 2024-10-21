import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import TurndownService from "turndown";
const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
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
    if (!(data.op && "code-block" in data.op.attributes)) return;
    return `<pre data-language="${
      data.op.attributes["code-block"]
    }"><code>${data.ops
      .map((d) => {
        return d.insert.value;
      })
      .join("")}</code></pre>`;
  });
  return htmlToMarkdown(html.convert());
};
