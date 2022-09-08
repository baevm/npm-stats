import Link from 'next/link'
import React from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { actions, ThemeContext } from '../context/ThemeContext'

const Logo = () => {
  const { state, dispatch } = React.useContext(ThemeContext)

  const handleDarkmode = () => {
    dispatch({ type: actions.TOGGLE_THEME })
  }

  return (
    <div className='w-full flex justify-between items-center'>
      <Link href='/'>
        <a className='text-5xl text-zinc-800 dark:text-zinc-200 font-extrabold self-start'>npm stats</a>
      </Link>
      {state.theme === 'light' ? (
        <button onClick={handleDarkmode}>
          <MdOutlineLightMode size='24' className='fill-zinc-800' />
        </button>
      ) : (
        <button onClick={handleDarkmode}>
          <MdOutlineDarkMode size='24' className='fill-slate-200' />
        </button>
      )}
    </div>
  )
}

export default Logo
