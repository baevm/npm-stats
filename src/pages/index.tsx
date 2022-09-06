import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const Home: NextPage = () => {
  const router = useRouter()
  const [packageName, setPackageName] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(packageName)
    router.push(`/package/${packageName}`)
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-slate-200'>
      <div className='w-2/5 h-4/5 flex items-center justify-between flex-col'>
        <div className='self-start font-Telegraf'>
          <h1 className='text-5xl text-zinc-800 font-extrabold'>npm stats</h1>
          <p className='text-zinc-600'>Get an npm package stats</p>
        </div>
        <form className='w-full' onSubmit={handleSubmit}>
          <input
            onChange={(e) => setPackageName(e.target.value)}
            placeholder='Enter package name...'
            className='w-full p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-gray-400'
          />
        </form>
        <div />
      </div>
    </div>
  )
}

export default Home
