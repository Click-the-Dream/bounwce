"use client";
import { HiOutlinePlus } from "react-icons/hi2";
import { RxUpdate } from "react-icons/rx";
import QuickActionsButton from "../../_components/QuickActionButton";

const StoreQuickActions = () => {
  const quickActions = [
    {
      label: "Add Product",
      icon: HiOutlinePlus,
    },
    {
      label: "Update Inventory",
      icon: RxUpdate,
    },
  ];
  return (
    <div className="border-[0.83px] border-[#0000001A] rounded-[12.75px] p-5 w-full">
      <h1 className="text-[13px]">Quick Actions</h1>
      <p className="text-ash text-[12px] mb-4">
        Common tasks to manage your inventory
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        {quickActions.map((action, index) => (
          <QuickActionsButton
            key={index}
            label={action.label}
            icon={action.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreQuickActions;
