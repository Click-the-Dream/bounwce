import OrderCard from "../components/ui/orders/OrderCard";
import OrderHistory from "../components/ui/orders/OrderHistory";
import { orders } from "../../../utils/dummies";
import { useState } from "react";

const VendorOrders = () => {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <div className="mx-auto p-6 bg-white rounded-2xl shadow-sm border border-[#0000001A]">
      <div className="flex justify-between items-center mb-6 border-b border-[#0000001A] pb-4">
        <h1 className="text-sm font-semibold">Order Management</h1>
        <button
          onClick={() => setShowHistory(true)}
          className="text-[13px] font-medium px-3 py-1 border rounded-lg hover:bg-gray-100"
        >
          Order History
        </button>
      </div>

      {orders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}

      {showHistory && <OrderHistory closeModal={() => setShowHistory(false)} />}
    </div>
  );
};

export default VendorOrders;
