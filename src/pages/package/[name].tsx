import { NextPageContext } from 'next'
import { getPackument } from 'query-registry'
import React from 'react'
import { FaNpm, FaGithub } from 'react-icons/fa'
import { FiLink2 } from 'react-icons/fi'
import { getTimeAgo } from '../../utils/getTimeAgo'

const PackagePage = ({ name, description, homepage, gitRepository, distTags, versionsToTimestamps }: any) => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-slate-200'>
      <div className='w-3/4 h-3/4 flex justify-start flex-col font-Telegraf '>
        <div className='flex items-center'>
          <h1 className='text-6xl'>{name && name}</h1>
          <a className='ml-4 cursor-pointer' href={gitRepository.url}>
            <FaGithub size={24} />
          </a>
          <a className='ml-4 cursor-pointer' href={`https://www.npmjs.com/package/${name}`}>
            <FaNpm size={24} />
          </a>
          {homepage && (
            <a className='ml-4 cursor-pointer' href={homepage}>
              <FiLink2 size={24} />
            </a>
          )}
        </div>
        <div className='text-zinc-600'>
          <span>{distTags.latest}</span>
          <span className='ml-4'>{getTimeAgo(versionsToTimestamps[distTags.latest])}</span>
        </div>
        <h3 className='text-lg'>{description && description}</h3>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  const packageName: any = context.query.name

  const data = await getPackument({ name: packageName })

  const { name, description, homepage, gitRepository, distTags, versionsToTimestamps } = data

  return {
    props: { name, description, homepage, gitRepository, distTags, versionsToTimestamps },
  }
}

export default PackagePage
