import NextHead from 'next/head'

const Head = (props) => {
  return (
    <NextHead>
      <title>Mark | Web Markdown</title>
      <link rel='icon' href='https://reaper.im/logo.svg' />

      <link
        href='https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap'
        rel='stylesheet'
      />

      {props.children}
    </NextHead>
  )
}
export default Head
