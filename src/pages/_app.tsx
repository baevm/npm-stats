import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color='linear-gradient(90deg, rgba(121,9,88,1) 0%, rgba(228,191,23,1) 50%, rgba(121,9,88,1) 100%)'
        options={{ showSpinner: false, easing: 'ease', speed: 400 }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
