import React, { useState } from 'react'
import { ResponsiveLine } from '@nivo/line'

type Range = 'month' | 'year'

const DownloadsChart = ({ packageDownloadsMonth, packageDownloadsYear }: any) => {
  const [range, setRange] = useState<Range | string>('month') // ts error here

  const mapDataMonth = packageDownloadsMonth.downloads.map((download: any) => ({
    x: download.day,
    y: download.downloads,
  }))
  const mapDataYear = packageDownloadsYear.downloads.map((download: any) => ({
    x: download.day,
    y: download.downloads,
  }))
  const mivValueMonth = Math.min(...mapDataMonth.map((data: any) => data.y))
  const mivValueYear = Math.min(...mapDataYear.map((data: any) => data.y))

  const data = [
    {
      id: 'downloads',
      color: 'hsl(127, 70%, 50%)',
      data: range === 'month' ? mapDataMonth : mapDataYear,
    },
  ]

  console.log(packageDownloadsYear)
  return (
    <div className='h-96 w-full font-Telegraf text-lg'>
      <div>
        Package downloads in past{' '}
        <select
          name='range'
          id='range'
          onChange={(e) => setRange(e.target.value)}
          className='bg-slate-200 border-b-[1px] border-blue-500 outline-none'>
          <option value='month'>1 Month</option>
          <option value='year'>1 Year</option>
        </select>
      </div>
      <ResponsiveLine
        data={data}
        curve='monotoneX'
        margin={{ top: 20, right: 20, bottom: 90, left: 60 }}
        xFormat='time:%Y-%m-%d'
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisBottom={{ tickRotation: -90, format: '%Y-%m-%d' }}
        colors={{ scheme: 'category10' }}
        yFormat=' >-.2f'
        axisTop={null}
        axisRight={null}
        areaBaselineValue={range === 'month' ? mivValueMonth : mivValueYear}
        pointSize={0}
        enableArea={true}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        theme={{ fontFamily: 'sans-serif' }}
      />
    </div>
  )
}

export default DownloadsChart
