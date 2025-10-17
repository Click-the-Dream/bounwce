import React from 'react'
import VendorLayout from '../components/VendorLayout'
import VendorOverviewCard from '../components/ui/VendorOverviewCard'
import VendorQuickActions from '../components/ui/VendorQuickActions'

const VendorOverview = () => {
  return (
    <div>
        <VendorOverviewCard />
        <VendorQuickActions />
    </div>
  )
}

export default VendorOverview