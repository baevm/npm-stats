import Link from 'next/link'
import React from 'react'

const Related = ({ similarPackages }: any) => {
  return (
    <div className='font-Telegraf text-lg dark:text-zinc-100'>
      <div className='text-xl font-extrabold'>Related</div>
      <div className='flex flex-wrap justify-between'>
        {similarPackages.map((p: any) => (
          <Link key={p.package.name} href={`/package/${p.package.name}`}>
            <a className='hover:underline '>{p.package.name}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Related
