import { NextPageContext } from 'next'
import Head from 'next/head'
import { getDailyPackageDownloads, getPackument } from 'query-registry'
import Logo from '../../components/Logo'
import DownloadsChart from '../../components/PackagePage/DownloadsChart'
import PackageHeader from '../../components/PackagePage/PackageHeader'
import Related from '../../components/Related'
import SearchForm from '../../components/SearchForm/SearchForm'

// const DownloadsChart = dynamic(() => import('../../components/PackagePage/DownloadsChart'), { ssr: false })

const PackagePage = ({
  packageData,
  packageDownloadsMonth,
  packageSize,
  packageDownloadsYear,
  similarPackages,
}: any) => {
  return (
    <>
      <Head>
        <title>{packageData.name} | npm stats</title>
      </Head>
      <div className='min-w-screen min-h-screen flex flex-col items-center bg-slate-200 dark:bg-slate-800 transition-colors duration-300'>
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
            <div className='pt-8'>{similarPackages.length > 0 && <Related similarPackages={similarPackages} />}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  const packageName: any = (context.query.name as string[]).join('/')
  let packageDoc

  const today = new Date();

  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  const startDateString = monthAgo.toISOString().split('T')[0];
  const endDateString = today.toISOString().split('T')[0];

  const dateRange = {
    start: new Date(startDateString),
    end: new Date(endDateString),
  }

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
  const { name, description, homepage, gitRepository, distTags, versionsToTimestamps, keywords } = packageDoc

  const packageDownloadsMonth = await getDailyPackageDownloads({ name: packageName, period: dateRange })
  const packageDownloadsYear = await getDailyPackageDownloads({
    name: packageName,
    period: 'last-year',
  })
  const packageSize = await fetch(`https://bundlephobia.com/api/size?package=${packageName}`).then((res) => res.json())
  const similarPackages =
    keywords &&
    (
      await fetch(`https://registry.npmjs.org/-/v1/search?text=keywords:${keywords.slice(0, 2).join(',')}&size=5`).then(
        (res) => res.json()
      )
    ).objects

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
      similarPackages,
    },
  }
}

export default PackagePage
