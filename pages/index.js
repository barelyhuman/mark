import { useState } from 'react';
import marked from 'marked';
import Spacer from 'components/spacer';
import Button from 'components/button';

const KEYS = {
  TAB: 9,
};

export default function Home() {
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    const selStart = e.target.selectionStart;

    if (e.keyCode === KEYS.TAB) {
      e.preventDefault();
      let _value = e.target.value;
      const tabChars = ' '.repeat(2);
      _value =
        e.target.value.substring(0, e.target.selectionStart) +
        tabChars +
        e.target.value.substring(e.target.selectionEnd);

      e.target.selectionStart = selStart + tabChars.length;
      e.target.selectionEnd = selStart + tabChars.length;
      setValue(_value);
    }
  };

  const handleKeyUp = (e) => {
    setValue(e.target.value);
  };

  const exportFile = () => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    const file = new Blob([value], { type: 'text/plain' });
    a.href = window.URL.createObjectURL(file);
    a.download = 'mark.md';
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <h1 align="center">Mark</h1>
      <p align="center">Web Markdown Editor</p>
      <Spacer y={1} />
      <div className="toolbar">
        <p align="center">
          <Button onClick={exportFile}>Save File</Button>
        </p>
      </div>
      <main>
        <div className="container">
          <textarea
            className="editor"
            value={value}
            placeholder="You can type in Markdown here"
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onChange={handleKeyUp}
          ></textarea>
          <article
            className="preview"
            dangerouslySetInnerHTML={{ __html: marked(value) }}
          ></article>
        </div>
      </main>
      <style jsx>
        {`
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
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #efefef;
          }

          .editor,
          .preview {
            outline: #fff;
            line-height: 30px;
            font-size: 18px;
            flex: 1;
            font-family: 'Nanum Gothic', sans-serif;
            height: calc(100vh / 1.25);
            border: 0;
            resize: none;
            padding: 20px;
            overflow: auto;
          }

          .editor {
            border-right: 1px solid #efefef;
          }
        `}
      </style>
    </>
  );
}
