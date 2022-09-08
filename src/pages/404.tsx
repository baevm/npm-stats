import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const FourOFourPage = () => {
  return (
    <>
      <Head>
        <title>Package not found | npm stats</title>
      </Head>
      <div
        className='w-screen h-screen flex flex-col items-center justify-center 
      bg-slate-200 font-Telegraf
      dark:bg-slate-800 dark:text-zinc-200'>
        <Image src='/open-box-svgrepo-com.svg' alt='openbox' width='150' height='150' />
        <h1 className='text-3xl'>Package not found </h1>

        <Link href='/'>
          <a className='underline'>Home</a>
        </Link>
      </div>
    </>
  )
}

export default FourOFourPage
