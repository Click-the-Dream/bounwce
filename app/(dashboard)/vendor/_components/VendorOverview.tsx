"use client";
import { SetStateAction, useState } from "react";
import { IoTrendingUpOutline, IoTrendingDownOutline } from "react-icons/io5";
import { useMemo } from "react";
import useVendor from "@/app/hooks/use-vendor";
import { getComparisonLabel, mapDateFilter } from "@/app/_utils/date";
import { overviewCardConfig } from "@/app/_utils/dashboardUtils";
import DateFilter from "./DateFilter";
import VendorOverviewCard from "./VendorOverviewCard";
import QuickActionSection from "./QuickActionSection";
import VendorTopProducts from "./VendorTopProduct";
import VendorQuickActions from "./VendorQuickActions";

const VendorOverview = () => {
  const { useGetDashboardOverview } = useVendor();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const apiParams = mapDateFilter(selectedFilter);
  const comparisonLabel = getComparisonLabel(selectedFilter);
  const { data: dashboardData, isLoading } = useGetDashboardOverview(apiParams);
  console.log(dashboardData);
  console.log(apiParams);

  const overviewCards = useMemo(() => {
    if (!dashboardData) return [];

    return overviewCardConfig.map((config) => {
      const amount = dashboardData?.[config.key] || 0;
      const changePercent = dashboardData?.[config.analysisKey];

      const hasChange = changePercent !== undefined && changePercent !== null;

      const isTrendUp = hasChange && changePercent > 0;

      const TrendIcon = isTrendUp ? IoTrendingUpOutline : IoTrendingDownOutline;

      const TrendColor = isTrendUp ? "text-[#38C066]" : "text-[#FF4B2B]";

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
      <div className="flex justify-end">
        {" "}
        <DateFilter
          onChange={(val: SetStateAction<null>) => {
            // Do something with the selection
            setSelectedFilter(val);
            console.log("DateFilter changed:", val);
          }}
          value={selectedFilter}
        />
      </div>
      <main className="space-y-5.25 mt-5">
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5.25">
          {isLoading
            ? overviewCardConfig.map(({ key }) => (
                <VendorOverviewCard key={key} loading />
              ))
            : overviewCards.map(({ key, ...rest }) => (
                <VendorOverviewCard key={key} {...rest} />
              ))}
        </section>

        <section className="flex flex-col md:flex-row gap-5.25 w-full">
          <VendorQuickActions dashboardData={dashboardData} />
          <VendorTopProducts dashboardData={dashboardData} />
        </section>

        <section>
          <QuickActionSection />
        </section>
      </main>
    </div>
  );
};

export default VendorOverview;
