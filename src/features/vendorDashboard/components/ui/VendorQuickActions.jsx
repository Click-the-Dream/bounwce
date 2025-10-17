import React from 'react'

const VendorQuickActions = () => {
    const dummy = [
        {orderNumber: "#ORD-001", name: "Lisa Wang", amount: "#20,000", status: "completed"},
        {orderNumber: "#ORD-002", name: "Lisa Wang", amount: "#20,000", status: "completed"},
        {orderNumber: "#ORD-003", name: "Lisa Wang", amount: "#20,000", status: "processing"},
        {orderNumber: "#ORD-004", name: "Lisa Wang", amount: "#20,000", status: "completed"},
        {orderNumber: "#ORD-005", name: "Lisa Wang", amount: "#20,000", status: "shipped"},
    ]

  return (
    <section className='border-[2px] rounded-[12.75px] p-5'>
        <div className='flex justify-between items-center gap-2 mb-5'>
            <p className='text-[11px]'>Quick Actions</p>
            <button className='border-[2px] p-1 rounded-[7px] font-bold text-[10px]'>
                View All
            </button>  
        </div>
        
        <div>
            <img 
                src=''         
            />

            <div>
                {
                    dummy.map((data) => (
                        <div key={data.orderNumber} className='flex justify-between gap-2 mb-4'>
                            <div>
                                <h1 className='font-bold text-[12px]'>{data.orderNumber}</h1>
                                <p className='text-[12px] text-ash'>{data.name}</p>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <h1 className='font-bold text-[12px]'>{data.amount}</h1>
                                <p 
                                className={`p-[4px] w-fit text-[6px] rounded-[6.75px] ${
                                    data.status === 'completed' ? 
                                    'text-[#246653] bg-[#DBFCE7]' :
                                    data.status === 'processing' ?
                                    'text-[#2563EB] bg-[#DBEAFE]' : 
                                    'text-[#9810FA] bg-[#F3E8FF]'
                                }`}
                                >
                                    {data.status}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        
    </section>
  )
}

export default VendorQuickActions