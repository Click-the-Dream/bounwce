// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { orders } from "../../../../../utils/dummies";
import { IoSearch } from "react-icons/io5";
import OrderCard from "./OrderCard";
import { CiFilter } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowDown, IoMdCloseCircleOutline } from "react-icons/io";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideIn = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

const listVariants = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const OrderHistory = ({ closeModal }) => {
  return (
    <AnimatePresence>
      {/* Optional backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[49999]"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={closeModal}
      />

      {/* SIDE PANEL */}
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed z-[50000] right-0 top-0 overflow-y-auto h-screen max-w-2xl w-full bg-white p-6 shadow-lg"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold">Order History</h2>
            <p className="text-gray-500 text-xs mt-1">
              View and search through all your previous orders
            </p>
          </div>

          <button
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <IoMdCloseCircleOutline size={20} />
          </button>
        </div>

        {/* Search / Filters */}
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 border rounded-lg px-4 py-2 bg-gray-50">
              <span className="text-gray-400 text-lg">
                <IoSearch />
              </span>
              <input
                type="text"
                placeholder="Search by order ID, customer name, or product..."
                className="bg-transparent outline-none text-xs w-full"
              />
            </div>

            <button className="flex items-center gap-2 border rounded-lg px-3 text-xs hover:bg-gray-50">
              <CiFilter />
              <span>Filter by date</span>
            </button>

            <button className="flex items-center gap-2 border rounded-lg px-3 text-xs hover:bg-gray-50">
              <MdOutlineFileDownload />
              <span>Export</span>
            </button>
          </div>

          <div className="flex justify-end">
            <button className="border rounded-md px-3 py-1 text-xs flex items-center gap-2 bg-[#F3F3F5] hover:bg-gray-50">
              <span>Show {orders?.length || 0}</span>
              <IoIosArrowDown size={12} />
            </button>
          </div>
        </div>

        {/* Orders list */}
        <motion.div
          className="mt-4"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {orders.map((order, index) => (
            <motion.div key={index} variants={itemVariants}>
              <OrderCard order={order} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderHistory;
