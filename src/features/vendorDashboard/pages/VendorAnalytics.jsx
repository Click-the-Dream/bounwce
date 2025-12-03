import SalesPerformanceSection from "../components/SalesPerformanceSection";
import SharedMetricsCard from "../components/SharedMetricsCard"
import { IoBarChartOutline } from "react-icons/io5";
import StoreHealthSection from "../components/StoreHealthSection";

const VendorAnalytics = () => {
  return (
    <main>
      <section className="w-full grid gap-5 xl:grid-cols-2  mb-5">
        <section className="">
          <SalesPerformanceSection />
        </section>

        <section className="">
          <StoreHealthSection />
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