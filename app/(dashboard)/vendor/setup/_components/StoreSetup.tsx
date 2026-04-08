"use client";
import storeIcon from "../../../../assets/setup.png";
import { FiUser } from "react-icons/fi";
import { MdOutlinePayment, MdOutlineVerifiedUser } from "react-icons/md";
import Image from "next/image";
import ToggleTabs from "../../_components/ToggleTabs";

const tabs = [
  { label: "Store", path: "store", icon: storeIcon?.src },
  { label: "Contact", path: "contact", icon: <FiUser className="w-4 h-4" /> },
  {
    label: "Verification",
    path: "verification",
    icon: <MdOutlineVerifiedUser className="w-4 h-4" />,
  },
  {
    label: "Payout",
    path: "payout",
    icon: <MdOutlinePayment className="w-4 h-4" />,
  },
];

const StoreSetup = ({ currentTab, setCurrentTab, completedTabs }: any) => {
  const handleTabChange = (newTab: { path: string }) => {
    // Only allow switching to completed tabs or the current tab
    if (completedTabs.includes(newTab.path) || newTab.path === currentTab) {
      setCurrentTab(newTab.path);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Image src={storeIcon} alt="" className="w-5" width={20} height={20} />{" "}
        Store Setup
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Please provide your business information to complete your vendor profile
      </p>

      <div className="w-full h-8">
        <ToggleTabs
          tabs={tabs.map((tab) => ({
            ...tab,
            disabled:
              !completedTabs.includes(tab.path) && tab.path !== currentTab,
          }))}
          activePath={currentTab}
          onChange={handleTabChange}
        />
      </div>
    </div>
  );
};

export default StoreSetup;
