import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { ContextProvider, ThemeContext } from '../context/ThemeContext'
import '../styles/globals.css'
import React from 'react'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ContextProvider>
        <NextNProgress
          color='linear-gradient(90deg, rgba(121,9,88,1) 0%, rgba(228,191,23,1) 50%, rgba(121,9,88,1) 100%)'
          options={{ showSpinner: false, easing: 'ease', speed: 400 }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </>
  )
}

export default MyApp

// TODO:
// compare packages
// package suggestions
