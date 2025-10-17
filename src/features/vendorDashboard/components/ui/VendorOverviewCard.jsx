import React from 'react'
import { IoTrendingUpOutline } from "react-icons/io5";

const VendorOverviewCard = () => {
  return (
    <div className='flex items-center gap-2 justify-between p-5 rounded-lg border-[2px] w-full md:w-[50%] lg:w-[33%] xl:w-[25%]'>
        <div>
            <p className='text-[12px] text-ash'>Total Revenue</p>
            <h1 className='text-[20px]'>₦20,000</h1>
            <div className='text-[#38C066] flex'>
                <IoTrendingUpOutline />
                <p className='text-[11px] '>12.5% from last month</p>
            </div>
        </div>

        <div>
            <p className='text-[30px] text-ash font-bold'>₦</p>
        </div>
    </div>
  )
}

export default VendorOverviewCard