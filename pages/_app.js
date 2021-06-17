import Head from 'components/head'
import '../styles/globals.css'
import "highlight.js/styles/base16/zenburn.css"

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
