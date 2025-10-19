import { useEffect, useState } from 'react'
import VendorCardLayout from '../VendorCardLayout'
import { noQuickActions } from '../../../../assets';

const VendorQuickActions = () => {
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        const dummyData = [
            {orderNumber: "#ORD-001", name: "Lisa Wang", amount: "#20,000", status: "completed"},
            {orderNumber: "#ORD-002", name: "Lisa Wang", amount: "#20,000", status: "completed"},
            {orderNumber: "#ORD-003", name: "Lisa Wang", amount: "#20,000", status: "processing"},
            {orderNumber: "#ORD-004", name: "Lisa Wang", amount: "#20,000", status: "completed"},
            {orderNumber: "#ORD-005", name: "Lisa Wang", amount: "#20,000", status: "shipped"},
        ]
        setOrders(dummyData)
    }, [])

  return (
        <VendorCardLayout
            title={"Quick Actions"}
            buttonText={"View All"}
        >      
            <div className=''>
                {
                    orders.length === 0 ? (
                        <img 
                            src={noQuickActions}  
                            alt='No orders'  
                            className='w-[132.78px] h-[99.1px] my-5 mx-auto'     
                        />  
                    ) : (
                        <div>
                            {
                                orders.map((data) => (
                                    <div key={data.orderNumber} className='flex justify-between gap-2 mb-4'>
                                        <div>
                                            <h1 className='font-bold text-[12px]'>{data.orderNumber}</h1>
                                            <p className='text-[12px] text-ash'>{data.name}</p>
                                        </div>

                                        <div className='flex flex-col gap-'>
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
                    )
                }                
            </div> 
        </VendorCardLayout>  
  )
}

export default VendorQuickActions