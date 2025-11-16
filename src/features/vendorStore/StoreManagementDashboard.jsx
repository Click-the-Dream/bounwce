import VendorHeader from '../vendorDashboard/components/ui/VendorHeader';
import { MdOutlineDashboard } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import VendorOverviewCard from '../vendorDashboard/components/ui/VendorOverviewCard';
import { useState } from 'react';
import ProductSection from './ProductSection';
import DraftSection from './DraftSection';
import { motion, AnimatePresence } from 'framer-motion';
import StoreQuickActionsSection from './StoreQuickActionsSection';
import SearchActionsBar from './SearchActionsBar';

const StoreManagementDashboard = () => {
  const [dummyStat, setDummyStat] = useState([
    {label: "Total Products", amount: "1", icon: MdOutlineDashboard},
    {label: "Active Products", amount: "0", icon: MdOutlineDashboard},
    {label: "Draft Products", amount: "1", icon: MdOutlineDashboard},
    {label: "Low Stock Items", amount: "0", icon: MdOutlineDashboard},
  ])
const [activeTab, setActiveTab] = useState("product");
const sectionVariants = {
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0},
  exit: {opacity: 0, y: -20}
}
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

        {/* stats card */}
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
          <SearchActionsBar />

        {/* Tabs */}
        <div className='bg-[#ECECF0] rounded-[20px] border-[1px] border-[#0000001A] p-1 inline-flex gap-3 text-[13px]'>
          <button 
            className={`py-2 px-2 rounded-[16px] transition-colors duration-500  ${activeTab === "product" ? "bg-orange text-white" : ""}`}
            onClick={() => setActiveTab("product")}
          >
            <span>Active Products</span>
            <span>(0)</span>
          </button>

          <button 
            className={`py-2 px-2 rounded-[16px] transition-colors duration-500 ${activeTab === "drafts" ? "bg-orange text-white" : ""}`}
            onClick={() => setActiveTab("drafts")}
          >
            <span>Drafts</span>
            <span>(1)</span>
          </button>
        </div>
        
        {/* Active products and drafs section */}
        <AnimatePresence mode='wait'>
          {
            activeTab === "product" && (
              <motion.div
                key="product"
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ProductSection />
              </motion.div>
            )
          }

          {
            activeTab === "drafts" && (
              <motion.div
                key="drafts"
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut"}}
              >
                <DraftSection />
              </motion.div>
            )
          }          
        </AnimatePresence>

        {/* quick actions section */}
        <div>
         <StoreQuickActionsSection />
        </div>          
      </section>
    </main>
  );
};

export default StoreManagementDashboard;