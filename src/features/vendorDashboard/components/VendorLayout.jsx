import { RiNotification3Line } from "react-icons/ri";
import VendorHeader from "./ui/VendorHeader";
import ToggleTabs from "../../../components/common/ToggleTabs";
import { useLocation, Outlet } from "react-router-dom";
import { LuStore } from "react-icons/lu";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import DateFilter from "./DateFilter";

const VendorLayout = () => {
  const location = useLocation();
  return (
    <main>
      <section className="mb-7">
        <VendorHeader
          header={"Dashboard"}
          headerDetails={"Here's what's happening with your store"}
          icon={RiNotification3Line}
          notifications={"9"}
          storeLabel={"View Store"}
          leftIcon={LuStore}
          rightIcon={FaArrowUpRightFromSquare}
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
        <h1>testing</h1>
        <DateFilter
          onChange={(val) => {
            // Do something with the selection
            console.log("DateFilter changed:", val);
          }}
        />
      </section>

      <section className="px-[1rem] md:px-[3rem] lg:px-[100px] xl:px-[140px] 2xl:px-[175px] py-5">
        <Outlet />
      </section>
    </main>
  );
};

export default VendorLayout;
