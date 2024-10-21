import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import TurndownService from "turndown";

const turndownService = new TurndownService();

export const htmlToMarkdown = (html) => turndownService.turndown(html);

export const deltaToMarkdown = (delta) => {
  const html = new QuillDeltaToHtmlConverter(delta, {});
  html.beforeRender((groupType, data) => {
    if (groupType !== "block") return;
    if (!(data.op && "code-block" in data.op.attributes)) return;

    return `<pre><code>${data.ops
      .map((d) => {
        return d.insert.value;
      })
      .join("")}</code></pre>`;
  });
  return htmlToMarkdown(html.convert());
};
