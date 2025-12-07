import { useState } from "react";
import { FiCheckCircle, FiUser } from "react-icons/fi";
import { statusStyles } from "../../../../../utils/formatters";
import OrderDetails from "./OrderDetails";

const OrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  const openDetails = () => setShowDetails(true);
  const closeDetails = () => setShowDetails(false);

  const hasStatus = !!order?.status;

  const itemsCount =
    Array.isArray(order.items) && order.items.length > 0
      ? `${order.items.length} items`
      : null;

  return (
    <>
      {/* Single-row card, no internal header border */}
      <div className="border border-[#0000001A] rounded-xl shadow-sm bg-white mb-3 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: order info */}
          <div className="space-y-1.5 w-full">
            {/* ID + status + optional tag */}
            <section className="flex items-center justify-between gap-2  w-full border-b border-[#0000001A] pb-2 mb-2 px-5">
              {" "}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <h3 className="font-semibold text-sm">{order.id}</h3>

                {hasStatus && (
                  <span
                    className={`px-[6px] py-[2px] text-[9px] md:text-[10px] rounded-lg text-center ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                )}

                {order.tag && (
                  <span className="px-[8px] py-[2px] text-[9px] md:text-[10px] rounded-lg bg-[#FFE5E5] text-[#FF0000]">
                    {order.tag}
                  </span>
                )}
              </div>
              <button
                onClick={openDetails}
                className="px-3 py-1 border rounded-lg text-[13px] hover:bg-gray-100"
              >
                Details
              </button>
            </section>

            <section className="flex flex-col md:flex-row md:items-center gap-2 justify-between px-5">
              <div className="space-y-1">
                {/* customer + items */}
                <p className="text-[13px] text-gray-500 flex items-center gap-1">
                  <FiUser />
                  <span>
                    {order.customer}
                    {itemsCount && ` • ${itemsCount}`}
                  </span>
                </p>

                {/* item name */}
                {order.item && <p className="text-[13px]">{order.item}</p>}

                {/* date */}
                {order.date && (
                  <p className="text-gray-500 text-[13px]">{order.date}</p>
                )}
              </div>
              {/* RIGHT: buttons + status text */}
              <div className="flex flex-col items-end self-end gap-2">
                {/* buttons in one horizontal row */}
                <div className="flex items-center gap-2">
                  {order.action?.decline && (
                    <button className="px-3 py-1.5 border border-[#FF4B2B] text-[#FF4B2B] rounded-lg text-[13px] hover:bg-red-50">
                      {typeof order.action.decline === "string"
                        ? order.action.decline
                        : "Decline"}
                    </button>
                  )}

                  {order.action?.primary && (
                    <button className="px-3 py-1.5 bg-black text-white rounded-lg text-[13px] hover:bg-gray-800 whitespace-nowrap">
                      {order.action.primary}
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {showDetails && <OrderDetails order={order} closeModal={closeDetails} />}
    </>
  );
};

export default OrderCard;
