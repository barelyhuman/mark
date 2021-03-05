import { useEffect, useState } from 'react'
import marked from 'marked'
import Spacer from 'components/spacer'
import Padding from 'components/padding'
import Button from 'components/button'
import placeholderText from 'constants/placeholder'

const KEYS = {
  TAB: 9
}

export default function Home () {
  const [value, setValue] = useState(placeholderText)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (!theme) {
      localStorage.setItem('theme', 'light')
    }
    if (theme === 'dark') {
      setDark(true)
    }
  }, [])

  const handleKeyDown = (e) => {
    const selStart = e.target.selectionStart

    if (e.keyCode === KEYS.TAB) {
      e.preventDefault()
      let _value = e.target.value
      const tabChars = ' '.repeat(2)
      _value =
        e.target.value.substring(0, e.target.selectionStart) +
        tabChars +
        e.target.value.substring(e.target.selectionEnd)

      e.target.selectionStart = selStart + tabChars.length
      e.target.selectionEnd = selStart + tabChars.length
      setValue(_value)
    }
  }

  const handleKeyUp = (e) => {
    setValue(e.target.value)
  }

  const exportFile = () => {
    const a = document.createElement('a')
    document.body.appendChild(a)
    const file = new Blob([value], { type: 'text/plain' })
    a.href = window.URL.createObjectURL(file)
    a.download = 'mark.md'
    a.click()
    document.body.removeChild(a)
  }

  const toggleDarkMode = () => {
    const nextTheme = dark ? 'light' : 'dark'
    localStorage.setItem('theme', nextTheme)
    setDark(!dark)
  }

  return (
    <>
      <Padding all={2}>
        <h1>Mark</h1>
        <Spacer y={1} />
        <p>Web Markdown Editor</p>
        <Spacer y={2} />
        <div className='toolbar'>
          <p>
            <Button onClick={exportFile}>
              Save File
            </Button>
            <Spacer x={1} inline />
            <Button onClick={toggleDarkMode}>
              Toggle Dark Mode
            </Button>
          </p>
        </div>
        <Spacer y={2} />
        <main>
          <div className='container'>
            <textarea
              className='editor'
              value={value}
              placeholder='You can type in Markdown here'
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onChange={handleKeyUp}
            />
            <Spacer x={2} />
            <article
              className='preview'
              dangerouslySetInnerHTML={{ __html: marked(value) }}
            />
          </div>
        </main>
      </Padding>
      <style jsx global>
        {`
          body {
            --bg: ${!dark ? '#ECEFF4' : '#121212'};
            --fg: ${!dark ? '#2E3440' : '#D8DEE9'};
            --shadow-color: ${
              dark
                ? 'rgb(15 17 21 / 20%) 0px 3px 6px 0px;'
                : 'rgba(0, 0, 0, 0.12);'
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
            background:${dark ? '#191919' : 'transparent'};
            border: 0;
            border-radius: 8px;
            // border-right: 1px solid var(--fg);
          }
        `}
      </style>
    </>
  )
}
