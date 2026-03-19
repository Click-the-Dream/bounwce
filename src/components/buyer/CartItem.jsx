import { FiTrash2 } from "react-icons/fi";
import { formatCurrency } from "../../utils/formatters";
import { motion } from "framer-motion";

const CartItem = ({ vIdx, vendor, openItem, removeItem, updateQuantity, toggleItem, saveForLater }) => {
    return (
        <div key={vendor.name} className="space-y-4">
            {vendor.items.filter((i) => i.status !== "saved").length >
                0 && (
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 border-t border-gray-300" />
                        <p className="text-[11px] text-gray-500">
                            {vendor.name} (
                            {vendor.items.filter((i) => i.status !== "saved").length}{" "}
                            Item)
                        </p>
                        <div className="flex-1 border-t border-gray-300" />
                    </div>
                )}

            {vendor.items
                .filter((i) => i.status !== "saved")
                .map((item, iIdx) => (
                    <section
                        key={item.id}
                        className="bg-white rounded-xl shadow-sm flex flex-col"
                    >
                        <div className=" flex justify-between p-5">
                            <div className="flex gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-14 md:w-[86px] md:h-[77px] rounded-lg aspect-video shrink-0"
                                />
                                <div>
                                    <h3 className="font-medium line-clamp-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {vendor.name}
                                    </p>
                                    <p className="mt-2 font-semibold">
                                        {formatCurrency(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between gap-4">
                                <button
                                    onClick={() => removeItem(vIdx, iIdx)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <FiTrash2 size={18} />
                                </button>

                                <div className="flex items-center rounded-lg">
                                    <motion.button
                                        whileTap={{ scale: 0.85 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 20,
                                        }}
                                        disabled={item.quantity <= 1}
                                        onClick={() => updateQuantity(vIdx, iIdx, -1)}
                                        className="border border-[#0000001A] rounded-lg px-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        −
                                    </motion.button>

                                    <span className="px-3 text-sm">
                                        {item.quantity}
                                    </span>

                                    <motion.button
                                        whileTap={{ scale: 0.85 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 20,
                                        }}
                                        disabled={item.quantity >= 99}
                                        onClick={() => updateQuantity(vIdx, iIdx, 1)}
                                        className="border border-[#0000001A] rounded-lg px-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        +
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                        <motion.div
                            initial={false}
                            animate={{
                                height: openItem === `${vIdx}-${iIdx}` ? "auto" : 0,
                                opacity: openItem === `${vIdx}-${iIdx}` ? 1 : 0,
                            }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden border-t ml-16 md:ml-28 mr-5"
                        >
                            <div className="p-4 space-y-2">
                                <div className="flex gap-6 md:space-x-28 border-b pb-4">
                                    <div className="flex flex-col gap-2 text-[13px]">
                                        <span className="text-gray-500">Unit Price</span>
                                        <span className="font-semibold">
                                            {formatCurrency(item.price)}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-2 text-[13px]">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span className="font-semibold">
                                            {formatCurrency(item.price * item.quantity)}
                                        </span>
                                    </div>
                                </div>
                                {/* Seller */}
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                    <span>Sold by:</span>
                                    <span className="font-semibold text-black">
                                        {vendor.name}
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2 text-xs mb-2">
                                    <span className="text-yellow-500">★</span>
                                    <span className="font-semibold">4.8</span>
                                    <span className="text-gray-400">(124 reviews)</span>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        className="flex-1 border rounded-lg py-2 text-[11px] font-semibold hover:bg-gray-50"
                                        onClick={() => {
                                            navigate("/buyer/product-details", {
                                                state: {
                                                    product: item,
                                                    vendorInfo: {
                                                        name: vendor.name,
                                                    },
                                                },
                                            });
                                        }}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => saveForLater(vIdx, iIdx)}
                                        className="flex-1 border rounded-lg py-2 text-[11px] font-semibold hover:bg-gray-50"
                                    >
                                        Save for Later
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        <button
                            onClick={() => toggleItem(vIdx, iIdx)}
                            className="mb-2 mx-auto text-xl text-gray-400 hover:text-black"
                        >
                            {openItem === `${vIdx}-${iIdx}` ? "—" : "...."}
                        </button>
                    </section>
                ))}
        </div>
    )
}


export default CartItem