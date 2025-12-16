import { FiShoppingCart } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { AiOutlineBarChart } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";


export const overviewCardConfig = [
  {
    label: "Total Revenue",
    icon: TbCurrencyNaira,
    dataKey: "total_revenue",
    trendKey: "salesTrend",
    analysisKey: "revenue_change_percent",
    isCurrency: true,
    iconColor: "text-[#38C066] bg-[#DBFCE7]",
    size: 35
  },
  {
    label: "Total Orders",
    icon: FiShoppingCart,
    dataKey: "total_orders",
    trendKey: "ordersTrend",
    analysisKey: "orders_change_percent",
    isCurrency: false,
    iconColor: "text-[#2563EB] bg-[#DBEAFE]",
    size: 32
  },
  {
    label: "Total Customers",
    icon: GoPeople,
    dataKey: "total_customers",
    trendKey: "customersTrend",
    analysisKey: "customers_change_percent",
    isCurrency: false,
    iconColor: "text-[#6B21A8] bg-[#F3E8FF]",
    size: 32
  },
  {
    label: "Avg. Order Value",
    icon: AiOutlineBarChart,
    dataKey: "avg_order_value",
    trendKey: "averageOrdersTrend",
    analysisKey: "avg_order_value_change_percent",
    isCurrency: false,
    iconColor: "text-[#8C3306] bg-[#FFEDD4]",
    size: 32
  },
];