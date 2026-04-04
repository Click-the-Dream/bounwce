import VendorHeader from "../vendorDashboard/components/ui/VendorHeader";
import { MdOutlineDashboard } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import VendorOverviewCard from "../vendorDashboard/components/ui/VendorOverviewCard";
import { useState } from "react";
import ProductSection from "./ProductSection";
import { motion, AnimatePresence } from "framer-motion";
import StoreQuickActionsSection from "./StoreQuickActionsSection";
import SearchActionsBar from "./SearchActionsBar";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/common/PageTransition";
import useProduct from "../../hooks/useProduct";
import useStore from "../../hooks/useStore";
import { useMemo } from "react";

const StatSkeleton = () => (
  <div className="animate-pulse bg-white rounded-xl p-4 h-[80px] border border-gray-200" />
);

const SectionSkeleton = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-10 bg-gray-200 rounded-md" />
    <div className="h-40 bg-gray-200 rounded-md" />
  </div>
);

const StoreManagementDashboard = () => {
  const { useGetMyProducts } = useProduct();
  const { useGetMyStore } = useStore();
  const { data: store, isLoading: storeLoading } = useGetMyStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("product");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading: productsLoading, error } = useGetMyProducts();
  const products = data?.products ?? [];
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    const lowerSearch = searchTerm.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(lowerSearch)
    );
  }, [products, searchTerm]);


  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const totalProducts = data?.total ?? products.length;
  const activeProducts = useMemo(() =>
    filteredProducts.filter(p => p.state !== "draft"),
    [filteredProducts]);

  const draftProducts = useMemo(() =>
    filteredProducts.filter(p => p.state === "draft"),
    [filteredProducts]);

  const stats = [
    { label: "Total Products", amount: totalProducts, icon: MdOutlineDashboard },
    { label: "Active Products", amount: activeProducts?.length, icon: MdOutlineDashboard },
    { label: "Draft Products", amount: draftProducts?.length, icon: MdOutlineDashboard },
    { label: "Low Stock Items", amount: filteredProducts.filter(p => p.stock < 5).length, icon: MdOutlineDashboard },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#ECECF080]">
        <header className="mb-6">
          <VendorHeader
            header={storeLoading ? "Loading store..." : store?.name || "My store"}
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
          {/* stats card */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[21px]">
            {productsLoading
              ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
              : stats.map((data, index) => (
                <VendorOverviewCard
                  key={index}
                  label={data.label}
                  amount={data.amount}
                  icon={data.icon}
                />
              ))}
          </section>

          {/* Search & Actions */}
          <SearchActionsBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Tabs */}
          <div className="bg-[#ECECF0] rounded-[20px] border-[1px] border-[#0000001A] p-1 inline-flex gap-3 text-[13px]">
            <button
              className={`py-2 px-2 rounded-[16px] transition-colors duration-500  ${activeTab === "product" ? "bg-orange text-white" : ""
                }`}
              onClick={() => setActiveTab("product")}
            >
              <span>Active Products</span>{" "}
              <span>({activeProducts?.length})</span>
            </button>

            <button
              className={`py-2 px-2 rounded-[16px] transition-colors duration-500 ${activeTab === "drafts" ? "bg-orange text-white" : ""
                }`}
              onClick={() => setActiveTab("drafts")}
            >
              <span>Drafts</span> {" "}
              <span>({draftProducts?.length})</span>
            </button>
          </div>

          {/* Active products and drafs section */}
          <AnimatePresence mode="wait">
            {productsLoading ? (
              <motion.div
                key="loading"
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <SectionSkeleton />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                className="text-red-500 bg-red-50 p-4 rounded-lg"
              >
                Failed to load products. Please try again.
              </motion.div>
            ) : (
              <motion.div
                key="product"
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {activeTab === "product" ? (
                  activeProducts.length > 0 ? (
                    <ProductSection products={activeProducts} status="active" />
                  ) : (
                    <div className="text-center py-10 text-gray-400">No matching active products.</div>
                  )
                ) : (
                  draftProducts.length > 0 ? (
                    <ProductSection products={draftProducts} status="draft" />
                  ) : (
                    <div className="text-center py-10 text-gray-400">No matching drafts.</div>
                  )
                )}
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
