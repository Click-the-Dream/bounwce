import { useState } from "react"
import SharedAnalyticsCard from "./SharedAnalyticsCard";

const SalesPerformanceSection = () => {
    const [ salesDetails, setSalesDetails ] =  useState([
        {label: "This Month", percentage: 92},
        {label: "Last Month", percentage: 65},
        {label: "Quarter", percentage: 45}
    ])
  return (
    <SharedAnalyticsCard 
        header={"Sales Performance"}
        details={salesDetails}
    />    
  )
}

export default SalesPerformanceSection