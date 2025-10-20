import VendorOverviewCard from '../components/ui/VendorOverviewCard'
import VendorQuickActions from '../components/ui/VendorQuickActions'
import VendorTopProducts from '../components/ui/VendorTopProducts'
import QuickActionSection from '../components/QuickActionSection'
import { TbCurrencyNaira } from "react-icons/tb";
import { IoTrendingUpOutline, IoTrendingDownOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { AiOutlineBarChart } from "react-icons/ai";

const VendorOverview = () => {

  // dummy data to display the vendor data cards
  const vendorData = [
    {label: "Total Revenue", amount: `₦ ${"20,000"}`, icon: TbCurrencyNaira, analysis: "12.5% from last month", trendStatus: "up"},
    {label: "Total Orders", amount: "89", icon: FiShoppingCart, analysis: "8.2% from last month", trendStatus: "up"},
    {label: "Total Customers", amount: "76", icon: GoPeople, analysis: "15.3% from last month", trendStatus: "up"},
    {label: "Total Revenue", amount: "5,000", icon: AiOutlineBarChart, analysis: "2.5 % from last month", trendStatus: "down"},
  ]
  return (
    <main className='space-y-[21px]'>
        <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[21px]'>
          {
            vendorData.map((data, index) => {              
              // determine icon and color based on status
              const isTrendUp = data.trendStatus === "up";
              const TrendIcon = isTrendUp ? IoTrendingUpOutline : IoTrendingDownOutline;
              const TrendColor = isTrendUp ? 'text-[#38C066]' : 'text-[#FF4B2B]';
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
              )              
            })
          }          
        </section>
        
        <section className='flex flex-col md:flex-row gap-[21px] w-[100%]'>
          <VendorQuickActions />
          <VendorTopProducts />
        </section>
        
        <section>
          <QuickActionSection />
        </section>
    </main>
  )
}

export default VendorOverview