import { FaGithub, FaNpm } from 'react-icons/fa'
import { FiLink2 } from 'react-icons/fi'
import { getTimeAgo } from '../../utils/getTimeAgo'

const PackageHeader = ({ packageData, packageSize }: any) => {
  return (
    <div className='h-1/3 flex justify-start flex-col font-Telegraf pb-8'>
      <div className='flex items-center flex-col md:flex-row'>
        <h1 className='text-6xl'>{packageData.name}</h1>
        <div className='flex w-full justify-between py-4 md:p-0 md:justify-start'>
          <a className='ml-4 cursor-pointer' href={packageData.gitRepository.url}>
            <FaGithub size={24} />
          </a>
          <a className='ml-4 cursor-pointer' href={`https://www.npmjs.com/package/${packageData.name}`}>
            <FaNpm size={24} />
          </a>
          {packageData.homepage && (
            <a className='ml-4 cursor-pointer' href={packageData.homepage}>
              <FiLink2 size={24} />
            </a>
          )}
        </div>
      </div>
      <div className='text-zinc-600'>
        <span>{packageData.distTags.latest}</span>
        <span className='ml-4'>{getTimeAgo(packageData.versionsToTimestamps[packageData.distTags.latest])}</span>
      </div>
      <h3 className='text-lg'>{packageData.description}</h3>
      <div className='pt-8 w-full md:w-5/12 flex justify-between'>
        <div className='flex flex-col'>
          <h2 className='text-3xl font-extrabold text-zinc-600'>{(packageSize.size / 1000).toFixed(2)} kB</h2>
          <h3>minified</h3>
        </div>
        <div className='flex flex-col'>
          <h2 className='text-3xl font-extrabold text-zinc-600'>{(packageSize.gzip / 1000).toFixed(2)} kB</h2>
          <h3>minified + gzip</h3>
        </div>
      </div>
    </div>
  )
}

export default PackageHeader
