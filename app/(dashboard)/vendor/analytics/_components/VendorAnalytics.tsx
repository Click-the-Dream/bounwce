"use client";
import { IoBarChartOutline } from "react-icons/io5";
import SharedMetricCard from "../../customers/_components/SharedMetricCard";
import SalesPerformanceSection from "./SalesPerformanceSection";
import StoreHealthSection from "./StoreHealthSection";

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

      <SharedMetricCard
        header={"Advanced Analytics"}
        paragraphText={
          "Detailed chartss and analytics will appear here as your store generates more data"
        }
        icon={IoBarChartOutline}
        buttonLabel={"Set Up Analytics Tracking"}
      />
    </main>
  );
};

export default VendorAnalytics;
