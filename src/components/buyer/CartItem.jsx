import { FiTrash2 } from "react-icons/fi";
import { formatCurrency } from "../../utils/formatters";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const CartItem = ({
    cart,
    openItem,
    toggleItem,
    saveForLater,

}) => {

    const { updateCart, removeFromCart } = useCart();
    const navigate = useNavigate();
    const [pendingAction, setPendingAction] = useState(null);

    const handleRemove = async (cartId) => {
        setPendingAction({ id: cartId, type: "remove" });
        removeFromCart.mutate(cartId, {
            onSettled: () => setPendingAction(null)
        });
    };
    const handleQuantity = (cartId, delta, type) => {
        setPendingAction({ id: cartId, type });

        updateCart.mutate(
            { cartId, data: { quantity: Math.max(1, delta) } },
            {
                onSettled: () => setPendingAction(null),
            }
        );
    };

    const activeItems = cart?.items?.filter(i => i.status !== "saved");

    return (
        <div className="space-y-4">
            {activeItems.length > 0 && (
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 border-t border-gray-300" />
                    <p className="text-[11px] text-gray-500 capitalize">
                        {cart?.storeName} ({activeItems.length} Item)
                    </p>
                    <div className="flex-1 border-t border-gray-300" />
                </div>
            )}

            {activeItems.map((item) => {
                const isCurrentlyUpdating = pendingAction?.id === item.cartId;
                const isIncLoading = isCurrentlyUpdating && pendingAction.type === 'inc';
                const isDecLoading = isCurrentlyUpdating && pendingAction.type === 'dec';
                return (
                    <section
                        key={item.cartId}
                        className="bg-white rounded-xl shadow-sm flex flex-col"
                    >
                        <div className="flex justify-between p-5">
                            <div className="flex gap-4">
                                <img
                                    src={item.images?.[0]?.url}
                                    alt={item.name}
                                    className="w-16 h-14 md:w-[86px] md:h-[77px] rounded-lg"
                                />

                                <div>
                                    <h3 className="font-medium line-clamp-2">
                                        {item.name}
                                    </h3>

                                    <p className="text-xs text-gray-500 capitalize">
                                        {cart?.storeName}
                                    </p>

                                    <p className="mt-2 font-semibold">
                                        {formatCurrency(item.amount * item.quantity)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between gap-4">
                                <button
                                    onClick={() => handleRemove(item.cartId)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    {isCurrentlyUpdating && pendingAction?.type === "remove" ? (
                                        <AiOutlineLoading3Quarters size={18} className="animate-spin" />
                                    ) : (

                                        <FiTrash2 size={18} />
                                    )}
                                </button>

                                <div className="flex items-center rounded-lg">
                                    <motion.button
                                        disabled={item.quantity <= 1 || isDecLoading}
                                        onClick={() => handleQuantity(item.cartId, item.quantity - 1, "dec")}
                                        className="border rounded-lg p-2 disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {isDecLoading ? (
                                            <AiOutlineLoading3Quarters className="animate-spin text-sm" />
                                        ) : (
                                            <BiMinus className="text-sm" />
                                        )}
                                    </motion.button>

                                    <span className="px-3 text-sm">{item.quantity}</span>

                                    <motion.button
                                        disabled={item.quantity >= 99 || isIncLoading}
                                        onClick={() => handleQuantity(item.cartId, item.quantity + 1, "inc")}
                                        className="border rounded-lg p-2 disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {isIncLoading ? (
                                            <AiOutlineLoading3Quarters className="animate-spin text-sm" />
                                        ) : (
                                            <BiPlus className="text-sm" />
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={false}
                            animate={{
                                height: openItem === item.cartId ? "auto" : 0,
                                opacity: openItem === item.cartId ? 1 : 0,
                            }}
                            className="overflow-hidden border-t ml-16 md:ml-28 mr-5"
                        >
                            <div className="p-4 space-y-2">
                                <div className="flex gap-6 md:space-x-28 border-b pb-4">
                                    <div className="text-[13px]">
                                        <span className="text-gray-500">Unit Price</span>
                                        <p className="font-semibold">
                                            {formatCurrency(item.amount)}
                                        </p>
                                    </div>

                                    <div className="text-[13px]">
                                        <span className="text-gray-500">Subtotal</span>
                                        <p className="font-semibold">
                                            {formatCurrency(item.amount * item.quantity)}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500">
                                    Sold by{" "}
                                    <span className="font-semibold text-black capitalize">
                                        {cart?.storeName}
                                    </span>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() =>
                                            navigate(`/buyer/products/${item?.id}`, {
                                                state: {
                                                    product: item,
                                                    vendorInfo: { name: cart?.storeName },
                                                },
                                            })
                                        }
                                        className="flex-1 border rounded-lg py-2 text-[11px]"
                                    >
                                        View Details
                                    </button>

                                    <button
                                        onClick={() => saveForLater(item.cartId)}
                                        className="flex-1 border rounded-lg py-2 text-[11px]"
                                    >
                                        Save for Later
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        <button
                            onClick={() => toggleItem(item.cartId)}
                            className="mb-2 mx-auto text-xl text-gray-400"
                        >
                            {openItem === item.cartId ? "—" : "..."}
                        </button>
                    </section>
                );
            })}
        </div>
    );
};

export default CartItem