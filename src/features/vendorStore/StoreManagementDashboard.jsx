import VendorHeader from "../vendorDashboard/components/ui/VendorHeader";
import { MdOutlineDashboard } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import VendorOverviewCard from "../vendorDashboard/components/ui/VendorOverviewCard";
import { useState } from "react";
import ProductSection from "./ProductSection";
import DraftSection from "./DraftSection";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import StoreQuickActionsSection from "./StoreQuickActionsSection";
import SearchActionsBar from "./SearchActionsBar";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/common/PageTransition";
import useProduct from "../../hooks/useProduct";
import useStore from "../../hooks/useStore";

const StoreManagementDashboard = () => {
  const { useGetMyProducts } = useProduct();
  const { useGetMyStore } = useStore();
  const { data: store } = useGetMyStore();

  const { data, isLoading, error } = useGetMyProducts();
  const products = data?.products ?? [];

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("product");
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const totalProducts = data?.total ?? products.length;
  const activeProducts = products.filter(p => p.state !== "draft").length;
  const draftProducts = products.filter(p => p.state === "draft").length;

  const stats = [
    { label: "Total Products", amount: totalProducts, icon: MdOutlineDashboard },
    { label: "Active Products", amount: activeProducts, icon: MdOutlineDashboard },
    { label: "Draft Products", amount: draftProducts, icon: MdOutlineDashboard },
    { label: "Low Stock Items", amount: products.filter(p => p.stock < 5).length, icon: MdOutlineDashboard },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#ECECF080]">
        <header className="mb-6">
          <VendorHeader
            header={store?.name || "My store"}
            headerDetails={"Manage your products and inventory"}
            icon={MdOutlineDashboard}
            label={"Go to Dashboard"}
            bgColor={"bg-orange text-white"}
            storeLabel={"Preview Store"}
            leftIcon={IoEyeOutline}
            onSecondClick={() => navigate("/vendor")}
          />
        </header>

        <section className="px-[1rem] md:px-[3rem] lg:px-[100px] xl:px-[140px] 2xl:px-[175px] py-5 space-y-6">
          {error && (
            <div className="text-red-500">
              Error loading products: {error.message}
            </div>
          )}
          {isLoading && <div>Loading products...</div>}
          {/* stats card */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[21px]">
            {stats.map((data, index) => (
              <VendorOverviewCard
                key={index}
                label={data.label}
                amount={data.amount}
                icon={data.icon}
              />
            ))}
          </section>

          {/* Search & Actions */}
          <SearchActionsBar />

          {/* Tabs */}
          <div className="bg-[#ECECF0] rounded-[20px] border-[1px] border-[#0000001A] p-1 inline-flex gap-3 text-[13px]">
            <button
              className={`py-2 px-2 rounded-[16px] transition-colors duration-500  ${activeTab === "product" ? "bg-orange text-white" : ""
                }`}
              onClick={() => setActiveTab("product")}
            >
              <span>Active Products</span>
              <span>({products?.length})</span>
            </button>

            <button
              className={`py-2 px-2 rounded-[16px] transition-colors duration-500 ${activeTab === "drafts" ? "bg-orange text-white" : ""
                }`}
              onClick={() => setActiveTab("drafts")}
            >
              <span>Drafts</span>
              <span>(0)</span>
            </button>
          </div>

          {/* Active products and drafs section */}
          <AnimatePresence mode="wait">
            {activeTab === "product" && (
              <motion.div
                key="product"
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ProductSection products={products} />
              </motion.div>
            )}

            {activeTab === "drafts" && (
              <motion.div
                key="drafts"
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <DraftSection />
              </motion.div>
            )}
          </AnimatePresence>

          {/* quick actions section */}
          <div>
            <StoreQuickActionsSection />
          </div>
        </section>
      </main>
    </PageTransition>
  );
};
export default StoreManagementDashboard;
