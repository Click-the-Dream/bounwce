import OrderCard from "../components/ui/orders/OrderCard";
import OrderHistory from "../components/ui/orders/OrderHistory";
import { orders } from "../../../utils/dummies";
import { useState, useMemo } from "react";

const VendorOrders = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState("incoming"); // "incoming" | "ongoing"

  // Helper: decide which tab an order belongs to
  const getOrderTab = (order) => {
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

    orders.forEach((order) => {
      const tab = getOrderTab(order);
      if (tab === "incoming") incoming++;
      if (tab === "ongoing") ongoing++;
    });

    return { incomingCount: incoming, ongoingCount: ongoing };
  }, [orders]);

  const filteredOrders = orders.filter(
    (order) => getOrderTab(order) === activeTab
  );

  return (
    <div className="mx-auto p-6 bg-white rounded-2xl shadow-sm border border-[#0000001A]">
      {/* Top bar: title + Order History button */}
      <div className="flex justify-between items-center mb-6 border-b border-[#0000001A] pb-4">
        <h1 className="text-sm font-semibold">Order Management</h1>
        <button
          onClick={() => setShowHistory(true)}
          className="text-[13px] font-medium px-3 py-1 border rounded-lg hover:bg-gray-100"
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
            <span className="flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-medium text-white bg-red-500 rounded-full">
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
            <span className="flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-medium text-white bg-red-500 rounded-full">
              {ongoingCount}
            </span>
          )}
        </button>
      </div>

      {/* Orders list for active tab */}
      {filteredOrders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}

      {showHistory && <OrderHistory closeModal={() => setShowHistory(false)} />}
    </div>
  );
};

export default VendorOrders;
