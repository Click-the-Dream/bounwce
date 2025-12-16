import { RiNotification3Line } from "react-icons/ri";
import VendorHeader from "./ui/VendorHeader";
import ToggleTabs from "../../../components/common/ToggleTabs";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { LuStore } from "react-icons/lu";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PageTransition from "../../../components/common/PageTransition";
import useStore from "../../../hooks/useStore";

const VendorLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { useGetMyStore } = useStore();
  const { data, isLoading } = useGetMyStore();
  return (
    <PageTransition>
      <main className="bg-[#ECECF080]">
        <section className="mb-7 ">
          <VendorHeader
            storeName={isLoading ? "-" : data.name || "origami store"}
            header={"Dashboard"}
            headerDetails={"Here's what's happening with your store"}
            icon={RiNotification3Line}
            notifications={"9"}
            storeLabel={"View Store"}
            leftIcon={LuStore}
            rightIcon={FaArrowUpRightFromSquare}
            onFirstClick={() => navigate("/vendor/store")}
          />
        </section>

        <section className="w-full lg:w-[80%] 2xl:w-[60%] px-[1rem] md:px-[3rem] lg:px-[140px] 2xl:px-[175px]">
          <ToggleTabs
            tabs={[
              { label: "Overview", path: "/vendor" },
              { label: "Wallet", path: "/vendor/wallet" },
              { label: "Orders", path: "/vendor/orders" },
              { label: "Customers", path: "/vendor/customers" },
              { label: "Analytics", path: "/vendor/analytics" },
            ]}
            activePath={location.pathname}
          />
        </section>

        <motion.section
          key={location.pathname}
          className="px-[1rem] md:px-[3rem] lg:px-[100px] xl:px-[140px] 2xl:px-[175px] pb-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.section>
      </main>
    </PageTransition>
  );
};

export default VendorLayout;
