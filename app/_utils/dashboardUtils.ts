import { FiShoppingCart } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { AiOutlineBarChart } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import availableBalance from "../assets/available-balance.svg";
import withdrawableBalance from "../assets/withdrawable-balance.svg";
export const overviewCardConfig = [
  {
    label: "Total Revenue",
    icon: TbCurrencyNaira,
    key: "total_revenue",
    trendKey: "salesTrend",
    analysisKey: "revenue_change_percent",
    isCurrency: true,
    iconColor: "text-[#38C066] bg-[#DBFCE7]",
    size: 35,
  },
  {
    label: "Total Orders",
    icon: FiShoppingCart,
    key: "total_orders",
    trendKey: "ordersTrend",
    analysisKey: "orders_change_percent",
    isCurrency: false,
    iconColor: "text-[#2563EB] bg-[#DBEAFE]",
    size: 32,
  },
  {
    label: "Total Customers",
    icon: GoPeople,
    key: "total_customers",
    trendKey: "customersTrend",
    analysisKey: "customers_change_percent",
    isCurrency: false,
    iconColor: "text-[#6B21A8] bg-[#F3E8FF]",
    size: 32,
  },
  {
    label: "Avg. Order Value",
    icon: AiOutlineBarChart,
    key: "avg_order_value",
    trendKey: "averageOrdersTrend",
    analysisKey: "avg_order_value_change_percent",
    isCurrency: false,
    iconColor: "text-[#8C3306] bg-[#FFEDD4]",
    size: 32,
  },
];

export const vendorWalletConfig = [
  {
    label: "Available Balance",
    dataKey: "available_balance",
    subtext: "Total earnings from all sales",
    icon: availableBalance,
  },
  {
    label: "Pending Balance",
    dataKey: "pending_balance",
    subtext: "Money in escrow for active orders",
    icon: availableBalance,
    amountColor: "text-[#2563EB]",
  },
  {
    label: "Withdrawable Balance",
    dataKey: "withdrawable_balance",
    subtext: "Available for withdrawal",
    icon: withdrawableBalance,
    amountColor: "text-[#00A644]",
  },
];
