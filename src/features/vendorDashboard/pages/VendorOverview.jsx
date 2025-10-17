import React from 'react'
import VendorLayout from '../components/VendorLayout'
import VendorOverviewCard from '../components/ui/VendorOverviewCard'
import VendorQuickActions from '../components/ui/VendorQuickActions'
import VendorTopProducts from '../components/ui/VendorTopProducts'
import QuickActionSection from '../components/QuickActionSection'

const VendorOverview = () => {
  return (
    <main className='space-y-[1rem]'>
        <VendorOverviewCard />
        <section className='flex flex-col md:flex-row gap-2 w-[100%]'>
          <VendorQuickActions />
          <VendorTopProducts />
        </section>
        
        <section>
          <QuickActionSection />
        </section>
    </main>
  )
}

export default VendorOverview