import { useEffect, useRef, useState } from "react";
import marked from "marked";
import Spacer from "components/spacer";
import Padding from "components/padding";
import Button from "components/button";
import placeholderText from "constants/placeholder";
import hljs from "highlight.js";

let CodeJar;

if (typeof window !== "undefined") {
  const mod = require("codejar");
  CodeJar = mod.CodeJar;
}

// hljs.highlightAuto
const KEYS = {
  TAB: 9,
};

const highligher = (editor) => {
  const code = editor.textContent;
  editor.innerHTML = hljs.highlightAuto(code, ["markdown"]).value;
};

const codeOptions = {
  tab: "  ",
  addClosing: false,
};

const initCodeJar = (tarea, codeRef, initialValue) => {
  if (CodeJar && !codeRef.current) {
    tarea.current = document.querySelector("#codejar-editor");
    codeRef.current = new CodeJar(tarea.current, highligher, codeOptions);
    codeRef.current.updateCode(initialValue);
  }
};

export default function Home() {
  const [value, setValue] = useState(placeholderText);
  const [dark, setDark] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const textAreaRef = useRef();
  const codeJarRef = useRef();
  const previewAreaRef = useRef();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", "light");
    }
    if (theme === "dark") {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    if (!codeJarRef || !textAreaRef) {
      return;
    }
    initCodeJar(textAreaRef, codeJarRef, value);
  }, [textAreaRef, codeJarRef]);

  useEffect(() => {
    if (
      !(textAreaRef && textAreaRef.current) ||
      !(previewAreaRef && previewAreaRef.current)
    ) {
      return;
    }

    textAreaRef.current.addEventListener("scroll", function () {
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

  const toggleDarkMode = () => {
    const nextTheme = dark ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    setDark(!dark);
  };

  const clearContent = () => {
    const shouldClear = window.confirm(
      "Are you sure you want to clear all content"
    );
    if (shouldClear) {
      codeJarRef.current.updateCode("");
      setValue("");
    }
  };

  codeJarRef &&
    codeJarRef.current &&
    codeJarRef.current.onUpdate((code) => {
      setValue(code);
    });

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
            <div id="codejar-editor" />
            {showPreview ? (
              <>
                <Spacer x={2} />
                <article
                  ref={previewAreaRef}
                  className="preview"
                  dangerouslySetInnerHTML={{ __html: marked(value) }}
                />
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
            border: 2px solid var(--bg-lighter);
            border-radius: 8px;
            padding: 8px;
          }

          #codejar-editor,
          .preview {
            outline: #fff;
            line-height: 28.8px;
            font-size: 16px;
            flex: 1;
            font-family: "Hack", monospace;
            height: calc(100vh / 1.25);
            border: 2px solid var(--fg);
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
}
