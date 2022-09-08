import React from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { state } = React.useContext(ThemeContext)

  return <div className={`${state.theme} `}>{children}</div>
}

export default Layout
