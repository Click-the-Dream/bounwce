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
import { useMemo } from "react";

const VendorOverview = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const apiParams = mapDateFilter(selectedFilter);
  const comparisonLabel = getComparisonLabel(selectedFilter);
  const { data: dashboardData, isLoading } = useGetDashboardOverview(apiParams);
  console.log(dashboardData);
  console.log(apiParams);

  const overviewCards = useMemo(() => {
    if (!dashboardData) return [];

    return overviewCardConfig.map((config) => {
      const amount = dashboardData?.[config.dataKey] || 0;
      const changePercent = dashboardData?.[config.analysisKey];

      const hasChange = changePercent !== undefined && changePercent !== null;

      const isTrendUp = hasChange && changePercent > 0;

      const TrendIcon = isTrendUp
        ? IoTrendingUpOutline
        : IoTrendingDownOutline;

      const TrendColor = isTrendUp
        ? "text-[#38C066]"
        : "text-[#FF4B2B]";

      return {
        key: config.label,
        icon: config.icon,
        trendIcon: TrendIcon,
        trendColor: TrendColor,
        label: config.label,
        amount: config.isCurrency
          ? `₦${amount.toLocaleString()}`
          : amount.toLocaleString(),
        analysis: hasChange
          ? `${Math.abs(changePercent).toFixed(1)}% ${comparisonLabel}`
          : "—",
        iconColor: config.iconColor,
        iconSize: config.size,
      };
    });
  }, [dashboardData, comparisonLabel]);

  return (
    <div className="">
      <div className="flex justify-end"> <DateFilter
        onChange={(val) => {
          // Do something with the selection
          setSelectedFilter(val);
          console.log("DateFilter changed:", val);
        }}
        value={selectedFilter}
      /></div>
      <main className="space-y-[21px] mt-5">
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[21px]">
          {isLoading
            ? overviewCardConfig.map((config) => (
              <VendorOverviewCard key={config.label} loading />
            ))
            : overviewCards.map((data) => (
              <VendorOverviewCard key={data.key} {...data} />
            ))}
        </section>

        <section className="flex flex-col md:flex-row gap-[21px] w-[100%]">
          <VendorQuickActions />
          <VendorTopProducts />
        </section>

        <section>
          <QuickActionSection />
        </section>
      </main>
    </div>
  );
};

export default VendorOverview;
