import VendorOverviewCard from "../components/ui/VendorOverviewCard";
import VendorQuickActions from "../components/ui/VendorQuickActions";
import VendorTopProducts from "../components/ui/VendorTopProducts";
import QuickActionSection from "../components/QuickActionSection";
import { IoTrendingUpOutline, IoTrendingDownOutline } from "react-icons/io5";
import { useGetDashboardOverview } from "../../../hooks/useVendor";


import DateFilter from "../components/DateFilter";
import { vendorData } from "../../../utils/dummies";

const VendorOverview = () => {
 const { data: dashboardData, isLoading } = useGetDashboardOverview();
  console.log(dashboardData);  

  return (
    <>
      <DateFilter
        onChange={(val) => {
          // Do something with the selection
          console.log("DateFilter changed:", val);
        }}
      />
      <main className="space-y-[21px] mt-5">
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[21px]">
          {vendorData.map((data, index) => {
            // determine icon and color based on status
            const isTrendUp = data.trendStatus === "up";
            const TrendIcon = isTrendUp
              ? IoTrendingUpOutline
              : IoTrendingDownOutline;
            const TrendColor = isTrendUp ? "text-[#38C066]" : "text-[#FF4B2B]";
            return (
              <VendorOverviewCard
                key={index}
                icon={data.icon}
                trendIcon={TrendIcon}
                trendColor={TrendColor}
                label={data.label}
                amount={data.amount}
                analysis={data.analysis}
              />
            );
          })}
        </section>

        <section className="flex flex-col md:flex-row gap-[21px] w-[100%]">
          <VendorQuickActions />
          <VendorTopProducts />
        </section>

        <section>
          <QuickActionSection />
        </section>
      </main>
    </>
  );
};

export default VendorOverview;
