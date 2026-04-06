"use client";
import { RiNotification3Line } from "react-icons/ri";
import { LuStore } from "react-icons/lu";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useStore from "@/app/hooks/use-store";
import { usePathname, useRouter } from "next/navigation";
import VendorHeader from "./VendorHeader";
import ToggleTabs from "./ToggleTabs";

const VendorLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { useGetMyStore } = useStore();
  const { data, isLoading } = useGetMyStore();
  return (
    <main className="bg-[#ECECF080] w-full max-w-350 mx-auto">
      <section className="mb-7 ">
        <VendorHeader
          storeName={isLoading ? "-" : data?.name || "-"}
          header={"Dashboard"}
          headerDetails={"Here's what's happening with your store"}
          icon={RiNotification3Line}
          notifications={"9"}
          storeLabel={"View Store"}
          leftIcon={LuStore}
          rightIcon={FaArrowUpRightFromSquare}
          onFirstClick={() => router.push("/vendor/store")}
        />
      </section>

      <section className="w-full lg:w-[80%] 2xl:w-[60%] px-4 md:px-12 lg:px-25 2xl:px-43.75">
        <ToggleTabs
          tabs={[
            { label: "Overview", path: "/vendor" },
            { label: "Wallet", path: "/vendor/wallet" },
            { label: "Orders", path: "/vendor/orders" },
            { label: "Customers", path: "/vendor/customers" },
            { label: "Analytics", path: "/vendor/analytics" },
          ]}
          activePath={pathname}
        />
      </section>

      <motion.section
        key={pathname}
        className="px-4 md:px-12 lg:px-25 xl:px-35 2xl:px-43.75 pb-5"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {children}
      </motion.section>
    </main>
  );
};

export default VendorLayout;
