import { useEffect, useState } from 'react';
import marked from 'marked';
import Spacer from 'components/spacer';
import Padding from 'components/padding';
import Button from 'components/button';

const KEYS = {
  TAB: 9,
};

export default function Home() {
  const [value, setValue] = useState('');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (!theme) {
      localStorage.setItem('theme', 'light');
    }
    if (theme === 'dark') {
      setDark(true);
    }
  }, []);

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

  const toggleDarkMode = () => {
    const nextTheme = dark ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    setDark(!dark);
  };

  return (
    <>
      <Padding all={2}>
        <h1>Mark</h1>
        <Spacer y={1}></Spacer>
        <p>Web Markdown Editor</p>
        <Spacer y={2}></Spacer>
        <div className="toolbar">
          <p>
            <Button dark={dark} onClick={exportFile}>
              Save File
            </Button>
            <Spacer x={1} inline></Spacer>
            <Button dark={dark} onClick={toggleDarkMode}>
              Toggle Dark Mode
            </Button>
          </p>
        </div>
        <Spacer y={2}></Spacer>
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
            <Spacer x={2}></Spacer>
            <article
              className="preview"
              dangerouslySetInnerHTML={{ __html: marked(value) }}
            ></article>
          </div>
        </main>
      </Padding>
      <style jsx global>
        {`
          body {
            --bg: ${dark ? '#222' : '#fff'};
            --fg: ${dark ? '#fff' : '#000'};
            --shadow-color: ${dark
              ? 'rgba(255,255,255,0.5)'
              : 'rgba(0,0,0,0.12)'};
          }
        `}
      </style>
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

          .editor,
          .preview {
            outline: #fff;
            line-height: 30px;
            font-size: 18px;
            flex: 1;
            font-family: 'Nanum Gothic', sans-serif;
            height: calc(100vh / 1.25);
            border: 2px solid var(--fg);
            border-radius: 8px;
            resize: none;
            padding: 20px;
            overflow: auto;
            box-shadow: 0px 1px 4px var(--shadow-color);
          }

          .editor {
            border: 0;
            border-radius: 8px;
            // border-right: 1px solid var(--fg);
          }
        `}
      </style>
    </>
  );
}
