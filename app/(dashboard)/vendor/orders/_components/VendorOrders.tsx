"use client";
import { useState, useMemo } from "react";
import OrderCard from "./OrderCard";
import OrderHistory from "./OrderHistory";
import { orders } from "@/app/_utils/dummy";

const VendorOrders = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState("incoming"); // "incoming" | "ongoing"

  // Helper: decide which tab an order belongs to
  const getOrderTab = (order: { tab: any; status: any }) => {
    // If your dummies already have something like order.tab = "incoming"/"ongoing",
    // use that first:
    if (order.tab) return order.tab;

    // Fallback grouping based on status (adjust if needed)
    const status = (order.status || "").toLowerCase();

    const incomingStatuses = ["processing", "pending", "new", "needs review"];
    const ongoingStatuses = ["shipped", "completed", "ready for shipment"];

    if (incomingStatuses.some((s) => status.includes(s))) return "incoming";
    if (ongoingStatuses.some((s) => status.includes(s))) return "ongoing";

    // Default everything else to incoming
    return "incoming";
  };

  // Calculate counts for each tab
  const { incomingCount, ongoingCount } = useMemo(() => {
    let incoming = 0;
    let ongoing = 0;

    orders.forEach((order: any) => {
      const tab = getOrderTab(order);
      if (tab === "incoming") incoming++;
      if (tab === "ongoing") ongoing++;
    });

    return { incomingCount: incoming, ongoingCount: ongoing };
  }, [orders]);

  const filteredOrders = orders.filter(
    (order: any) => getOrderTab(order) === activeTab,
  );

  return (
    <div className="mx-auto p-6 bg-white rounded-2xl shadow-sm border border-[#0000001A]">
      {/* Top bar: title + Order History button */}
      <div className="flex justify-between items-center mb-6 border-b border-[#0000001A] pb-4">
        <h1 className="text-sm font-semibold">Order Management</h1>
        <button
          onClick={() => setShowHistory(true)}
          className="text-[13px] font-medium px-3 py-1 border-[0.53px] border-[#0000001A] rounded-lg hover:bg-gray-100"
        >
          Order History
        </button>
      </div>

      {/* Tabs: Incoming / Ongoing */}
      <div className="flex items-center gap-6 mb-4">
        {/* Incoming tab */}
        <button
          type="button"
          onClick={() => setActiveTab("incoming")}
          className={`flex items-center gap-1 pb-2 border-b-2 text-[13px] ${
            activeTab === "incoming"
              ? "border-black text-black"
              : "border-transparent text-gray-400"
          }`}
        >
          <span>Incoming</span>
          {incomingCount > 0 && (
            <span className="flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-medium text-white bg-[#C91616] rounded-full">
              {incomingCount}
            </span>
          )}
        </button>

        {/* Ongoing tab */}
        <button
          type="button"
          onClick={() => setActiveTab("ongoing")}
          className={`flex items-center gap-1 pb-2 border-b-2 text-[13px] ${
            activeTab === "ongoing"
              ? "border-black text-black"
              : "border-transparent text-gray-400"
          }`}
        >
          <span>Ongoing</span>
          {ongoingCount > 0 && (
            <span className="flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-medium text-white bg-[#C91616] rounded-full">
              {ongoingCount}
            </span>
          )}
        </button>
      </div>

      {/* Orders list for active tab */}
      {filteredOrders.map((order: any, index: any) => (
        <OrderCard key={index} order={order} />
      ))}

      {showHistory && <OrderHistory closeModal={() => setShowHistory(false)} />}
    </div>
  );
};

export default VendorOrders;
