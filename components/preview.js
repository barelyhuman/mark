import React, { useState } from "react";
import marked from "marked";

const Preview = React.forwardRef(({ value, ...props }, ref) => {
  // const [previewHTML, setPreviewHTML] = useState("");

  // useState(() => {
  //   console.log({ value });
  //   setPreviewHTML(marked(value));
  // }, [value]);

  return (
    <>
      <article
        ref={ref}
        className="preview"
        dangerouslySetInnerHTML={{ __html: marked(value) }}
      />
      <style jsx>
        {`
          .preview {
            outline: #fff;
            line-height: 28.8px;
            font-size: 16px;
            flex: 1;
            font-family: "JetBrainsMono Nerd Font Mono", monospace;
            height: calc(100vh / 1.25);
            border-radius: 8px;
            resize: none !important;
            padding: 20px;
            overflow: auto;
            box-shadow: 0px 1px 4px var(--shadow-color);
          }
        `}
      </style>
    </>
  );
});

export default Preview;
