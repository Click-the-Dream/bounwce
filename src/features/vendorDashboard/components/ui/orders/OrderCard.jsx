import { useState } from "react";
import { FiCheckCircle, FiUser } from "react-icons/fi";
import { statusStyles } from "../../../../../utils/formatters";
import OrderDetails from "./OrderDetails";

const OrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  const openDetails = () => setShowDetails(true);
  const closeDetails = () => setShowDetails(false);

  return (
    <>
      <div className="border border-[#0000001A] rounded-xl shadow-sm bg-white mb-4">
        <div className="flex items-center justify-between gap-2 border-b border-[#0000001A] p-3 px-5">
          <div className="flex items-center gap-2 md:gap-3">
            <h3 className="font-semibold text-sm">{order.id}</h3>
            <span
              className={`px-[6px] py-[2px] text-[9px] md:text-[10px] rounded-full text-center ${
                statusStyles[order.status]
              }`}
            >
              {order.status}
            </span>
          </div>

          <button
            onClick={openDetails}
            className="px-3 py-1 border rounded-full text-[13px] hover:bg-gray-100"
          >
            Details
          </button>
        </div>

        <section className="flex flex-wrap items-center justify-between p-3 px-5">
          <div className="ml-1 space-y-2">
            <p className="text-[13px] text-gray-500 flex items-center gap-1">
              <FiUser />
              <span>{order.customer}</span>
            </p>
            <p className="my-1 text-[13px]">{order.item}</p>
            <p className="text-gray-500 text-[13px]">{order.date}</p>
          </div>

          {order.action && (
            <div className="flex items-center gap-3 mt-4">
              {order.action.decline && (
                <button className="px-3 py-1.5 border border-[#FF4B2B] text-[#FF4B2B] rounded-full text-[13px] hover:bg-red-50">
                  Decline
                </button>
              )}

              {order.action.primary && (
                <button className="px-3 py-1.5 bg-black text-white rounded-full text-[13px] hover:bg-gray-800">
                  {order.action.primary}
                </button>
              )}
            </div>
          )}

          {order.waiting && (
            <p className="text-[#6B21A8] text-[13px] text-right mt-2">
              {order.waiting}
            </p>
          )}

          {order.confirmed && (
            <p className="text-[#38C066] text-[13px] text-right mt-2 flex items-center justify-end gap-1">
              <FiCheckCircle size={15} /> Delivery Confirmed
            </p>
          )}
        </section>
      </div>

      {showDetails && <OrderDetails order={order} closeModal={closeDetails} />}
    </>
  );
};

export default OrderCard;
