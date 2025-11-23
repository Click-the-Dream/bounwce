import React from 'react'
import { IoTrendingUpOutline } from "react-icons/io5";

const VendorOverviewCard = ({
  label, 
  amount, 
  analysis, 
  icon: OverviewIcon,
  trendIcon: TrendIcon,
  trendColor
  }) => {

  return (
    <div className='bg-white flex items-center gap-2 justify-between p-5 rounded-lg border-[2px] w-full'>
        <div>
            <p className='text-[11px] text-ash'>{label}</p>
            <h1 className='text-[18px]'>{amount}</h1>
            {
              TrendIcon &&
              <div className={`flex gap-2 ${trendColor}`}>
                <TrendIcon />
                <p className='text-[10px] '>{analysis}</p>
              </div>
            }            
        </div>

        <div>
            <OverviewIcon size={25} className='text-ash font-bold' />
        </div>
    </div>
  )
}

export default VendorOverviewCard