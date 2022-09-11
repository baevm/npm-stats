import type { NextPage } from 'next'
import Head from 'next/head'
import Logo from '../components/Logo'
import SearchForm from '../components/SearchForm/SearchForm'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>npm stats</title>
      </Head>
      <div className='w-screen h-screen flex items-center justify-center bg-slate-200 dark:bg-slate-800 transition-colors duration-300'>
        <div className='w-11/12 md:w-2/5 h-4/5 flex items-center justify-between flex-col'>
          <div className='w-full self-start font-Telegraf'>
            <Logo />
            <p className='text-zinc-600 dark:text-zinc-400'>Get an npm package stats</p>
          </div>
          <SearchForm />
          <div />
        </div>
      </div>
    </>
  )
}

export default Home
