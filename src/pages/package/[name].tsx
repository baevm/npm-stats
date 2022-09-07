import { NextPageContext } from 'next'
import Head from 'next/head'
import { getDailyPackageDownloads, getPackument } from 'query-registry'
import Logo from '../../components/Logo'
import DownloadsChart from '../../components/PackagePage/DownloadsChart'
import PackageHeader from '../../components/PackagePage/PackageHeader'
import SearchForm from '../../components/SearchForm'

// const DownloadsChart = dynamic(() => import('../../components/PackagePage/DownloadsChart'), { ssr: false })

const PackagePage = ({ packageData, packageDownloadsMonth, packageSize, packageDownloadsYear }: any) => {
  return (
    <>
      <Head>
        <title>{packageData.name} | npm stats</title>
      </Head>
      <div className='w-screen h-screen flex flex-col items-center bg-slate-200'>
        <div className='w-11/12 md:w-3/4 pt-4'>
          <Logo />
          <div className='pt-8'>
            <SearchForm />
            <div className='pt-8'>
              <PackageHeader packageData={packageData} packageSize={packageSize} />
              <DownloadsChart
                packageDownloadsMonth={packageDownloadsMonth}
                packageDownloadsYear={packageDownloadsYear}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  const packageName: any = context.query.name
  const date = new Date()
  const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  const monthAgoDay = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()

  const dateRange = {
    start: new Date(monthAgoDay),
    end: new Date(today),
  }

  let packageDoc

  try {
    packageDoc = await getPackument({ name: packageName })
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  const packageDownloadsMonth = await getDailyPackageDownloads({ name: packageName, period: dateRange })
  const packageDownloadsYear = await getDailyPackageDownloads({
    name: packageName,
    period: 'last-year',
  })
  const packageSize = await fetch(`https://bundlephobia.com/api/size?package=${packageName}`).then((res) => res.json())

  const { name, description, homepage, gitRepository, distTags, versionsToTimestamps } = packageDoc

  return {
    props: {
      packageData: {
        name,
        description,
        homepage,
        gitRepository: JSON.parse(JSON.stringify(gitRepository)),
        distTags,
        versionsToTimestamps,
      },
      packageDownloadsMonth,
      packageSize,
      packageDownloadsYear,
    },
  }
}

export default PackagePage
