import React from 'react'
import VendorHeader from './ui/VendorHeader'
import ToggleTabs from '../../../components/common/ToggleTabs'
import { useLocation, Outlet } from 'react-router-dom'

const VendorLayout = () => {
  const location = useLocation();
  return (
    <main>
      <section className='mb-7'>
        <VendorHeader />
      </section>
      
      <section className='w-full xl:w-[50%] px-[1rem] md:px-[3rem] lg:px-[7rem]'>
        <ToggleTabs
              tabs={[
                { label: "Overview", path: "/vendor" },
                { label: "Wallet", path: "/vendor/wallet" },
                { label: "Orders", path: "/vendor/orders" },
                { label: "Customers", path: "/vendor/customers" },
                { label: "Analytics", path: "/vendor/analytics" },
              ]}
              activePath={location.pathname}
          />
      </section>
        
        <section className='px-[1rem] md:px-[3rem] lg:px-[7rem] py-5'>
           <Outlet /> 
        </section>
        
    </main>
  )
}

export default VendorLayout