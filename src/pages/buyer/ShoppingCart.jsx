import { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

import Navbar from "../../components/buyer/Navbar";
import Header from "../../components/buyer/Header";
import { formatCurrency } from "../../utils/formatters";
import { useStore } from "../../context/storeContext";

const ShoppingCart = () => {
  const { cart, setCart } = useStore(); // use global cart

  /** Update item quantity */
  const updateQuantity = (vendorIndex, itemIndex, delta) => {
    setCart((prev) =>
      prev.map((vendor, vIdx) =>
        vIdx !== vendorIndex
          ? vendor
          : {
              ...vendor,
              items: vendor.items.map((item, iIdx) =>
                iIdx !== itemIndex
                  ? item
                  : { ...item, quantity: Math.max(1, item.quantity + delta) }
              ),
            }
      )
    );
  };

  /** Remove an item from cart */
  const removeItem = (vendorIndex, itemIndex) => {
    setCart((prev) =>
      prev
        .map((vendor, vIdx) =>
          vIdx !== vendorIndex
            ? vendor
            : {
                ...vendor,
                items: vendor.items.filter((_, iIdx) => iIdx !== itemIndex),
              }
        )
        .filter((vendor) => vendor.items.length > 0)
    );
  };

  /** Compute order summary */
  const orderSummary = useMemo(() => {
    const vendorTotals = cart.map((vendor) => ({
      name: vendor.name,
      total: vendor.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    }));

    const subtotal = vendorTotals.reduce((sum, v) => sum + v.total, 0);
    const totalItems = cart.reduce(
      (sum, v) => sum + v.items.reduce((iSum, i) => iSum + i.quantity, 0),
      0
    );

    return { vendorTotals, subtotal, totalItems };
  }, [cart]);

  return (
    <div className="bg-[#ECECF080] min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pb-8">
        <Header title="Shopping Cart" orderSummary={orderSummary} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((vendor, vIdx) => (
              <div key={vendor.name}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 border-t border-gray-300" />
                  <p className="text-[11px] text-gray-500">
                    {vendor.name} ({vendor.items.length} Item)
                  </p>
                  <div className="flex-1 border-t border-gray-300" />
                </div>

                {vendor.items.map((item, iIdx) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-5 flex justify-between shadow-sm"
                  >
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
                        <p className="text-xs text-gray-500">{vendor.name}</p>
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

                        <span className="px-3 text-sm">{item.quantity}</span>

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
                ))}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:sticky md:top-0 bg-white rounded-xl p-6 h-fit shadow-sm">
            <h2 className="text-sm font-medium mb-4">Order Summary</h2>

            <p className="text-xs font-semibold text-gray-500 mb-4">
              {orderSummary.vendorTotals.length} VENDORS
            </p>

            <div className="space-y-3 text-xs mb-6">
              {orderSummary.vendorTotals.map((v) => (
                <div key={v.name} className="flex justify-between">
                  <span>{v.name}</span>
                  <span className="font-bold">{formatCurrency(v.total)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-black">
                  {formatCurrency(orderSummary.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Fee</span>
                <span className="text-black">Free</span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between text-sm">
              <span className="font-semibold">Total</span>
              <span className="font-bold">
                {formatCurrency(orderSummary.subtotal)}
              </span>
            </div>

            <button className="mt-6 w-full bg-black text-white py-3 rounded-lg text-[10px]">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
