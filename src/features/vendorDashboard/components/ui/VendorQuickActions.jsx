import { useEffect, useState } from 'react'
import VendorCardLayout from '../VendorCardLayout'
import { noQuickActions } from '../../../../assets';
import { useGetDashboardOverview } from '../../../../hooks/useVendor';

const VendorQuickActions = () => {
    const [orders, setOrders] = useState([]);
    const { data, isLoading } = useGetDashboardOverview();
    
    useEffect(() => {
        const recentOrders = data?.recent_orders || [];
        setOrders(recentOrders)
    }, [data])

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