import { GoPeople } from "react-icons/go";
import SharedMetricsCard from "../components/SharedMetricsCard";

const VendorCustomers = () => {
  return (
    <main>
      <SharedMetricsCard 
        icon={GoPeople}
        header={"Customer Management"}
        subtext={"View and manage your customer relationships"}
        paragraphText={"Advanced customer management tools will be available here once you have more customer data"}
        buttonLabel={"View Customer Insights"}
      />
    </main>
    
  )
}

export default VendorCustomers