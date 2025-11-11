import { Package, Plus, Filter, Download } from 'lucide-react';
import VendorHeader from '../../vendorDashboard/components/ui/VendorHeader';
import { MdOutlineDashboard } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import VendorOverviewCard from '../../vendorDashboard/components/ui/VendorOverviewCard';
import { useState } from 'react';
import ActionButton from './actionButton';
import { CiFilter, CiExport } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import ProductSection from './ProductSection';

const StoreManagementDashboard = () => {
  const [dummyStat, setDummyStat] = useState([
    {label: "Total Products", amount: "1", icon: MdOutlineDashboard},
    {label: "Active Products", amount: "0", icon: MdOutlineDashboard},
    {label: "Draft Products", amount: "1", icon: MdOutlineDashboard},
    {label: "Low Stock Items", amount: "0", icon: MdOutlineDashboard},
  ])
const [activeTab, setActiveTab] = useState("active");
  return (
    <main className="min-h-screen bg-[#ECECF080]">
      <header className='mb-6'>
        <VendorHeader 
          header={"Store Management"}
          headerDetails={"Manage your products and inventory"}
          icon={MdOutlineDashboard}
          label={"Go to Dashboard"}
          bgColor={"bg-orange text-white"}
          storeLabel={"Preview Store"}
          leftIcon={IoEyeOutline}
        />
      </header>      
      

      <section className='px-[1rem] md:px-[3rem] lg:px-[100px] xl:px-[140px] 2xl:px-[175px] py-5 space-y-6'>

      <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[21px]'>
        {
          dummyStat.map((data, index) => (
            <VendorOverviewCard 
              key={index}
              label={data.label}
              amount={data.amount}
              icon={data.icon}
            />
          ))
        }        
      </section>

      {/* Search & Actions */}
        <div className="w-full bg-white p-2 flex flex-col md:flex-row gap-3 items-center justify-between space-x-2 rounded-[12.75px]">
          <input
            type="text"
            placeholder="Search Product..."
            className="w-full px-4 py-2 rounded-[12.75px] text-[13px] bg-[#ECECF080]"
          />

          <div className="flex items-center space-x-2">
            <ActionButton 
              label={"filter"}
              icon={CiFilter}
            />

            <ActionButton 
              label={"Export"}
              icon={CiExport}
            />

            <ActionButton 
              label={"Add Product"}
              icon={IoMdAdd}
              className="bg-black text-white"
            />
          </div>
        </div>

      {/* Tabs */}
      <div className='bg-[#ECECF0] rounded-[20px] border-[1px] border-[#0000001A] p-1 inline-flex gap-3 text-[13px]'>
        <button 
          className={`py-2 px-2 rounded-[16px]  ${activeTab === "active" ? "bg-orange text-white" : ""}`}
          onClick={() => setActiveTab("active")}
        >
          <span>Active Products</span>
          <span>(0)</span>
        </button>

        <button 
          className={`py-2 px-2 rounded-[16px] ${activeTab === "drafts" ? "bg-orange text-white" : ""}`}
          onClick={() => setActiveTab("drafts")}
        >
          <span>Drafts</span>
          <span>(1)</span>
        </button>
      </div>

      <ProductSection />     
      </section>
    </main>
  );
};

export default StoreManagementDashboard;