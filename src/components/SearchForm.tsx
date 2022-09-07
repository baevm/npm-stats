import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchForm = () => {
  const router = useRouter()
  const [packageName, setPackageName] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!packageName) return
    router.push(`/package/${packageName}`)
  }

  
  return (
    <form className='w-full relative block' onSubmit={handleSubmit}>
      <input
        onChange={(e) => setPackageName(e.target.value)}
        defaultValue={router.query && router.query.name}
        placeholder='Enter package name...'
        className='w-full p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-gray-400'
      />
      {packageName && (
        <button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'>
          <FaSearch className='text-gray-400 ' />
        </button>
      )}
    </form>
  )
}

export default SearchForm
