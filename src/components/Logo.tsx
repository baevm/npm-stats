import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href='/'>
      <a className='text-5xl text-zinc-800 font-extrabold self-start'>npm stats</a>
    </Link>
  )
}

export default Logo
