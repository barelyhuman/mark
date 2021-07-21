import { highlightJSTheme } from "constants/generic";
import NextHead from "next/head";

const Head = (props) => {
  return (
    <NextHead>
      {/* <!-- Primary Meta Tags --> */}
      <title>Mark | Quick Web Markdown Editor with Live Preview</title>
      <meta
        name="title"
        content="Mark | Quick Web Markdown Editor with Live Preview"
      />
      <meta
        name="description"
        content="Minimal and Simple markdown editor with an optional live preview for quick markdown magic."
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mark.reaper.im/" />
      <meta
        property="og:title"
        content="Mark | Quick Web Markdown Editor with Live Preview"
      />
      <meta
        property="og:description"
        content="Minimal and Simple markdown editor with an optional live preview for quick markdown magic."
      />
      <meta
        property="og:image"
        content="https://og.reaper.im/api?fontSize=16&title=Mark&subtitle=Minimal%20Markdown%20Editor"
      />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mark.reaper.im/" />
      <meta
        property="twitter:title"
        content="Mark | Quick Web Markdown Editor with Live Preview"
      />
      <meta
        property="twitter:description"
        content="Minimal and Simple markdown editor with an optional live preview for quick markdown magic."
      />
      <meta
        property="twitter:image"
        content="https://og.reaper.im/api?fontSize=16&title=Mark&subtitle=Minimal%20Markdown%20Editor"
      />

      <link rel="icon" href="https://reaper.im/logo.svg" />

      <link
        href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://unpkg.com/open-color@1.8.0/open-color.css"
      />

      <link
        rel="stylesheet"
        href={highlightJSTheme.light}
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="stylesheet"
        href={highlightJSTheme.dark}
        media="(prefers-color-scheme: dark)"
      />

      {props.children}
    </NextHead>
  );
};
export default Head;
