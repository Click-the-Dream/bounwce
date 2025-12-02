import SharedMetricsCard from "../components/SharedMetricsCard"
import { IoBarChartOutline } from "react-icons/io5";

const VendorAnalytics = () => {
  return (
    <main>
      <section>
        <section>

        </section>

        <section>
          
        </section>
      </section>

      <SharedMetricsCard 
        header={"Advanced Analytics"}
        paragraphText={"Detailed chartss and analytics will appear here as your store generates more data"}
        icon={IoBarChartOutline}
        buttonLabel={"Set Up Analytics Tracking"}
      />
    </main>
  )
}

export default VendorAnalytics