import React, { useEffect, useState } from 'react'

const WithdrawalHistoryCard = ({statusImg, statusIcon: StatusIcon, label, date, amount, status}) => {
    
  return (
    <div className='flex justify-between items-center gap-2 w-full p-2 rounded-[8px] border-[1px]'>
       <div className='flex gap-2 items-center'>
            <div>
                <img
                  src={statusImg}
                  alt={label}
                />
            </div>

            <div>
                <h1 className='text-[9px] font-medium'>{label}</h1>
                <h1 className='text-[7px] text-ash'>{date}</h1>
            </div>
       </div>

       <div className='flex flex-col items-end gap-[2px]'>
            <h1 className='text-[8px] font-semibold'>{amount}</h1>
            <div className='flex items-center gap-[1px] bg-[#DBFCE7] text-[#00844D] rounded-[8px] p-[3px]'>
              <StatusIcon size={10} />
              <p className='text-[8px]'>{status}</p>
            </div>
            
       </div>
    </div>
  )
}

export default WithdrawalHistoryCard