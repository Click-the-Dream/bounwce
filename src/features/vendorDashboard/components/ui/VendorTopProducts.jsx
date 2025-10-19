import React from 'react'
import VendorCardLayout from '../VendorCardLayout'

const VendorTopProducts = () => {
    const dummy = [
        {productNumber: "1", productName: "DFDF", salesNumber: "44", totalRevenue: "100,000", productImg: ""}
    ]
  return (
    <VendorCardLayout
        title={"Top Products"}
        buttonText={"View All"}
    >
        <div>
            {/* image displayed on empty state  */}
            <img 
                src=''
                alt=''
            />

            {/* top products section */}
            <article>
                {
                    dummy.map((data) => (
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-2'>
                                <img
                                    src=''
                                    alt=''
                                />

                                <div >
                                    <h1>{data.productName}</h1>
                                    <p className='text-ash text-[11px]'><span>{data.salesNumber}sales</span><span>-</span><span>₦{data.totalRevenue}</span></p>
                                </div>
                            </div>

                            <div className='text-[7.54px] border-[1px] p-1 rounded-[6.75px]'>
                                #{data.productNumber}
                            </div>  
                        </div>
                    ))
                }
                
            </article>
            
        </div>
    </VendorCardLayout>
  )
}

export default VendorTopProducts