import hljs from "highlight.js";
import React, { useEffect, useRef } from "react";

let CodeJar;

if (typeof window !== "undefined") {
  const mod = require("codejar");
  CodeJar = mod.CodeJar;
}

const highligher = (editor) => {
  const code = editor.textContent;
  editor.innerHTML = hljs.highlightAuto(code, ["markdown"]).value;
};

const codeOptions = {
  tab: "  ",
  addClosing: false,
};

const initCodeJar = (tarea, codeRef, initialValue, valueSetter) => {
  if (CodeJar && !codeRef.current) {
    tarea.current = document.querySelector("#codejar-editor");
    codeRef.current = new CodeJar(tarea.current, highligher, codeOptions);
    codeRef.current.updateCode(initialValue);
    codeRef.current.onUpdate((code) => {
      console.log("value update");
      valueSetter(code);
    });
  }
};

const Editor = React.forwardRef(({ value, onChangeText, ...props }, ref) => {
  const textAreaRef = useRef();
  const codeJarRef = useRef();

  useEffect(() => {
    if (!codeJarRef || !textAreaRef) {
      return;
    }
    initCodeJar(textAreaRef, codeJarRef, value, onChangeText);
  }, [textAreaRef, codeJarRef]);

  return (
    <>
      <div id="codejar-editor" ref={ref} />
      <style jsx>
        {`
          #codejar-editor {
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
      <style jsx global>
        {`
          span.hljs-section {
            font-size: 24px;
            line-height: 43.2px;
            color: var(--fg);
          }

          span.hljs-bullet {
            padding-left: 10px;
          }
        `}
      </style>
    </>
  );
});

export default Editor;
