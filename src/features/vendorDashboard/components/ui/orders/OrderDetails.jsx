// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiShoppingBag } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuUser, LuPhone, LuMapPin } from "react-icons/lu";
import { statusStyles } from "../../../../../utils/formatters";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 18 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

const OrderDetails = ({ closeModal, order }) => {
  const data = order || {
    id: "#ORD-002",
    status: "Processing",
    placedDate: "October 27, 2025",
    customer: {
      name: "Jane Doe",
      phone: "08152161484",
      address: "Pepsi",
    },
    items: [
      {
        id: 1,
        name: "Leather Blue Jean",
        qty: 2,
        price: "₦3,000",
        total: "₦6,000",
        image: "https://via.placeholder.com/64x64.png?text=Jean", // replace with real src
      },
      {
        id: 2,
        name: "Red Polo Shirt",
        qty: 2,
        price: "₦2,000",
        total: "₦4,000",
        image: "https://via.placeholder.com/64x64.png?text=Shirt", // replace with real src
      },
    ],
    subtotal: "₦10,000",
    shipping: "(Free)",
    total: "₦10,000",
    timeline: [
      {
        id: 1,
        label: "Order Placed - Payment Verified",
        date: "Oct 27, 2025 • 11:55AM",
      },
    ],
  };

  return (
    <AnimatePresence>
      {/* Backdrop with blur */}
      <motion.div
        className="fixed top-0 h-screen w-screen inset-0 bg-black/20 backdrop-blur-sm z-[49999] flex items-center justify-center px-4"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={closeModal}
      >
        {/* Stop click from closing when interacting with card */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-h-[90%] max-w-xl bg-white rounded-xl shadow-xl border border-gray-100 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-5 pt-4 pb-2">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-[16px]">
                  Order <span className="font-medium">{data.id}</span>
                </h2>
                <span
                  className={`px-[6px] py-[2px] text-[10px] rounded-full ${
                    statusStyles[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Order placed on {data.placedDate}
              </p>
            </div>

            <button
              onClick={closeModal}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 mt-1"
            >
              <IoMdCloseCircleOutline size={18} />
            </button>
          </div>

          <div className="border-t border-gray-200" />

          {/* Content */}
          <div className="px-5 py-4 space-y-4 text-xs">
            {/* Customer Delivery Information */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[13px] font-medium flex items-center gap-2">
                  <LuUser /> Customer Delivery Information
                </span>
              </div>

              <div className="bg-gray-50 rounded-md px-4 py-3 space-y-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <LuUser className="text-gray-500" size={14} />
                  <span className="text-[13px]">{data.customerInfo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuPhone className="text-gray-500" size={14} />
                  <span className="text-[13px]">{data.customerInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuMapPin className="text-gray-500" size={14} />
                  <span className="text-[13px]">
                    {data.customerInfo.address}
                  </span>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200" />

            {/* Order Items */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[13px] flex gap-2 items-center">
                  <FiShoppingBag />
                  Order Items
                </span>
              </div>

              {/* wrap in overflow container so the table can scroll on small screens */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-xs">
                  <thead className="bg-[#F9FAFB] border border-gray-200 rounded-t-md">
                    <tr className="text-left text-[11px] font-medium text-gray-500">
                      <th className="px-4 py-2">Items</th>
                      <th className="px-4 py-2 text-center">Qty</th>
                      <th className="px-4 py-2 text-right">Price</th>
                      <th className="px-4 py-2 text-right">Total</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white border-x border-b border-gray-200 divide-y divide-gray-200">
                    {data.items.map((item) => (
                      <tr key={item.id} className="align-middle">
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-11 h-11 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs text-gray-800 truncate">
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-2 text-center">{item.qty}</td>
                        <td className="px-4 py-2 text-right">{item.price}</td>
                        <td className="px-4 py-2 text-right">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Summary */}
            <section className="mt-3">
              <div className="bg-[#F9FAFB] border border-gray-200 rounded-md text-[13px] p-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{data.subtotal}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-500">{data.shipping}</span>
                </div>
                <div className="border-t border-gray-200" />
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-800">Total</span>
                  <span className="font-semibold">{data.total}</span>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200" />

            {/* Order Timeline */}
            <section className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[13px] flex gap-2 items-center">
                  <IoCalendarClearOutline /> Order Timeline
                </span>
              </div>

              {data?.timeline?.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-2 text-xs my-2"
                >
                  <div className="mt-0.5">
                    <div className="w-7 h-7 rounded-full border bg-[#DBFCE7] text-[#38C066] flex items-center justify-center">
                      <FiCheckCircle size={16} />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-800">{event.label}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetails;
