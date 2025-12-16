import { useState } from "react";
import VendorOverviewCard from "../components/ui/VendorOverviewCard";
import VendorQuickActions from "../components/ui/VendorQuickActions";
import VendorTopProducts from "../components/ui/VendorTopProducts";
import QuickActionSection from "../components/QuickActionSection";
import { IoTrendingUpOutline, IoTrendingDownOutline } from "react-icons/io5";
import { useGetDashboardOverview } from "../../../hooks/useVendor";
import { overviewCardConfig } from "../../../utils/vendorOverviewMapper";
import DateFilter from "../components/DateFilter";
import { mapDateFilter, getComparisonLabel } from "../components/mapDateFilter";

const VendorOverview = () => {
 const [ selectedFilter, setSelectedFilter ] = useState(null);
 const apiParams = mapDateFilter(selectedFilter);
 const comparisonLabel = getComparisonLabel(selectedFilter);
 const { data: dashboardData, isLoading } = useGetDashboardOverview(apiParams);
 console.log(dashboardData);  
 console.log(apiParams);

 const overviewCards = overviewCardConfig.map(config => {
    const amount = dashboardData?.[config.dataKey] || 0;
    const changePercent = dashboardData?.[config.analysisKey] ?? "N/A"
    const trendStatus = config.trendStatus

    const analysis = changePercent !== undefined && changePercent !== null
      ? `${Math.abs(changePercent)}% ${comparisonLabel}`
      : "N/A"

    const isTrendUp = changePercent > 0;
      const TrendIcon = isTrendUp
        ? IoTrendingUpOutline
        : IoTrendingDownOutline;
    const TrendColor = isTrendUp ? "text-[#38C066]" : "text-[#FF4B2B]";

    const formattedAmount = config.isCurrency ? `₦${amount.toLocaleString()}` : amount.toLocaleString();

    return {
      key: config.label,
      icon: config.icon,
      trendIcon: TrendIcon,
      trendColor: TrendColor,
      label: config.label,
      amount: formattedAmount,
      analysis: analysis,
      iconColor: config.iconColor,
      iconSize: config.size
    }
 })

  return (
    <>
      <DateFilter
        onChange={(val) => {
          // Do something with the selection
          setSelectedFilter(val);
          console.log("DateFilter changed:", val);
        }}
        value={selectedFilter}
      />
      <main className="space-y-[21px] mt-5">
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[21px]">
          {overviewCards.map((data) => {            
            return (
              <VendorOverviewCard
                key={data.key}
                icon={data.icon}
                trendIcon={data.trendIcon}
                trendColor={data.trendColor}
                label={data.label}
                amount={data.amount}
                analysis={isLoading ? "--" : data.analysis}
                iconColor={data.iconColor}
                size={data.iconSize}
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
