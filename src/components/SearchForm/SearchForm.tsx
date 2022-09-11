import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import HistoryItem from './HistoryItem'

export type HistoryItem = {
  name: string
  id: number
}

const SearchForm = () => {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const router = useRouter()
  const [packageName, setPackageName] = useState('')
  const [isDropdown, setIsDropdown] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!packageName) return

    const oldHistory: HistoryItem[] = JSON.parse(localStorage.getItem('searchHistory') || '[]')
    oldHistory.unshift({ name: packageName, id: Date.now() })
    localStorage.setItem('searchHistory', JSON.stringify(oldHistory))

    router.push(`/package/${packageName}`)
  }

  useEffect(() => {
    const localStorageHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]')
    setHistory(localStorageHistory)
  }, [])

  return (
    <form className='w-full relative block ' onSubmit={handleSubmit}>
      <input
        onChange={(e) => setPackageName(e.target.value)}
        onClick={() => setIsDropdown(true)}
        onBlur={(e) => setIsDropdown(false)}
        defaultValue={router.query.name && (router.query.name as string[]).join('/')}
        type='text'
        placeholder='Enter package name...'
        className={`w-full p-4 shadow-lg
        focus:outline-none
        dark:text-zinc-200 dark:bg-slate-500 
        ${history ? 'focus:outline-2  focus:rounded-t-md' : 'border-2'}
        ${isDropdown && history.length > 0 ? 'rounded-t-md' : 'rounded-md'}`}
      />

      {packageName && (
        <button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'>
          <FaSearch className='text-gray-400 dark:text-gray-800' />
        </button>
      )}

      {isDropdown && history && (
        <div className='absolute w-full max-h-40 overflow-y-auto rounded-b-md bg-white dark:bg-slate-500 shadow-lg'>
          {history.map((item) => (
            <HistoryItem item={item} key={item.id} setHistory={setHistory}/>
          ))}
        </div>
      )}
    </form>
  )
}

export default SearchForm
