import { useEffect, useRef, useState } from "react";

import Spacer from "components/spacer";
import Padding from "components/padding";
import Button from "components/button";
import placeholderText from "constants/placeholder";
import Preview from "components/preview";
import Editor from "components/editor";

export default function Home() {
  const [value, setValue] = useState(placeholderText);
  const [showPreview, setShowPreview] = useState(false);
  const previewAreaRef = useRef();
  const textAreaRef = useRef();

  useEffect(() => {
    if (
      !(textAreaRef && textAreaRef.current) ||
      !(previewAreaRef && previewAreaRef.current)
    ) {
      return;
    }

    textAreaRef.current.addEventListener("scroll", function () {
      console.log("scrolled");
      if (!previewAreaRef && previewAreaRef.current) {
        return;
      }
      previewAreaRef.current.scrollTop = textAreaRef.current.scrollTop;
    });
  }, [textAreaRef, previewAreaRef]);

  const exportFile = () => {
    const fileName = prompt("Name your file", "mark.md");
    if (!fileName) {
      return;
    }
    const a = document.createElement("a");
    document.body.appendChild(a);
    const file = new Blob([value], { type: "text/plain" });
    a.href = window.URL.createObjectURL(file);
    a.download = fileName.replace(/.md$/, "") + ".md" || "mark.md";
    a.click();
    document.body.removeChild(a);
  };

  const clearContent = () => {
    const shouldClear = window.confirm(
      "Are you sure you want to clear all content"
    );
    if (shouldClear) {
      setValue("");
      textAreaRef.current.innerHTML = "";
    }
  };

  return (
    <>
      <Padding all={2}>
        <h1>Mark</h1>
        <Spacer y={1} />
        <p>Web Markdown Editor</p>
        <Spacer y={2} />
        <div className="toolbar">
          <Button onClick={exportFile}>Save File</Button>
          <Spacer x={1} inline />
          <Button onClick={() => setShowPreview(!showPreview)}>
            Preview: {showPreview ? "On" : "Off"}
          </Button>
          <Spacer x={1} inline />
          <Button onClick={clearContent}>Clear</Button>
        </div>
        <Spacer y={2} />
        <main>
          <div className="container">
            <Editor
              ref={textAreaRef}
              value={value}
              onChangeText={(text) => setValue(text)}
            />
            {showPreview ? (
              <>
                <Spacer x={2} />
                <Preview ref={previewAreaRef} value={value} />
              </>
            ) : null}
          </div>
        </main>
      </Padding>
      <style jsx>
        {`
          h1,
          p {
            padding: 0;
            margin: 0;
          }

          main {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }

          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }

          .toolbar {
            border-bottom: 2px solid var(--bg-lighter);
            padding: 8px;
          }
        `}
      </style>
    </>
  );
}
