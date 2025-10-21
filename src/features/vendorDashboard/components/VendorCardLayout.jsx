import React from 'react'

const VendorCardLayout = ({title, handleClick, buttonText, children}) => {
  return (
    <section className='border-[2px] rounded-[12.75px] p-5 w-full'>
        {/* reusable header structure */}
       <div className='flex justify-between items-center gap-2 mb-5'>
            <p className='text-[11px]'>{title}</p>
            <button 
                className='border-[2px] p-1 rounded-[7px] font-bold text-[10px]'
                onClick={handleClick}
            >
                {buttonText}
            </button>  
        </div> 

        {/* unique content area */}
        <div>
            {children}
        </div>
    </section>
    
  )
}

export default VendorCardLayout