import { useState } from "react"
import SharedAnalyticsCard from "./SharedAnalyticsCard"
import { productListIcon, responseRateIcon, starIcon } from "../../../assets"

const StoreHealthSection = () => {
    const [ storeHealthDetails, setStoreHealthDetails ] = useState([
        {icon: productListIcon, label: "Average Rating", value: `${4.8}/5`},
        {icon: responseRateIcon, label: "Products Listed", value: 1},
        {icon: starIcon, label: "Response Rate", value: `${96}%`},
    ])
  return (
    <SharedAnalyticsCard 
        details={storeHealthDetails}
        header={"Store Health"}
    />
  )
}

export default StoreHealthSection