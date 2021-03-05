import Head from 'components/head'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
