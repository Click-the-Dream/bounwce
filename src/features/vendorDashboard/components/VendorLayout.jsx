import React from 'react'
import VendorHeader from './ui/VendorHeader'
import VendorOverview from '../pages/VendorOverview'

const VendorLayout = () => {
  return (
    <div>
        <VendorHeader />
        <main className='px-[7rem] py-5'>
           <VendorOverview /> 
        </main>
        
    </div>
  )
}

export default VendorLayout