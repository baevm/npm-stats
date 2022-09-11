import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { FaRegClock } from 'react-icons/fa'
import { HistoryItem } from './SearchForm'

const HistoryItem = ({
  item,
  setHistory,
}: {
  item: HistoryItem
  setHistory: Dispatch<SetStateAction<HistoryItem[]>>
}) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState(false)

  const handleClear = () => {
    const localStorageHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]')
    let newHistory = localStorageHistory.filter((historyItem: any) => historyItem.id !== item.id)
    setHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
  }

  return (
    <div
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => router.push(`/package/${item.name}`)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className='p-2 flex justify-between items-center hover:bg-slate-200 dark:hover:bg-slate-400 cursor-pointer'>
      <div className='flex items-center'>
        <FaRegClock size='14' className='mt-[4px] text-zinc-600 dark:text-zinc-300' />
        <span className='ml-2 text-lg text-zinc-600 dark:text-zinc-300'>{item.name}</span>
      </div>
      {isHover && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClear()
          }}
          className='text-zinc-400 hover:underline'>
          clear
        </button>
      )}
    </div>
  )
}

export default HistoryItem
