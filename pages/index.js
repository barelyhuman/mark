import { useState } from 'react';
import marked from 'marked';
import Spacer from 'components/spacer';

const KEYS = {
  TAB: 9,
};

export default function Home() {
  const [value, setValue] = useState('');
  const [showPreview, setPreview] = useState(false);

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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <main>
        <div>
          {showPreview ? (
            <>
              <article
                className="preview"
                dangerouslySetInnerHTML={{ __html: marked(value) }}
              ></article>
            </>
          ) : (
            <textarea
              className="editor"
              value={value}
              autoFocus
              placeholder="Type Markdown here"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              contentEditable
            ></textarea>
          )}
        </div>
        <Spacer y={1}></Spacer>
        <div>
          <input
            type="checkbox"
            value={showPreview}
            onChange={(e) => setPreview(e.target.checked)}
          />
          Preview
        </div>
      </main>
      <style jsx>
        {`
          main {
            padding: 20px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }

          .editor,
          .preview {
            outline: #fff;
            border: 0;
            line-height: 30px;
            font-size: 18px;
            font-family: 'Nanum Gothic', sans-serif;
            width: 500px;
            height: 600px;
            box-shadow: 0px 2px 8px rgba(12, 12, 13, 0.1);
            resize: none;
            padding: 20px;
            border-radius: 6px;
            overflow: auto;
          }
        `}
      </style>
    </>
  );
}
