import { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiShoppingBag, FiTrash2 } from "react-icons/fi";

import Navbar from "../../components/buyer/Navbar";
import Header from "../../components/buyer/Header";
import { formatCurrency } from "../../utils/formatters";
import { useStore } from "../../context/storeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { cart, setCart } = useStore(); // use global cart
  const [openItem, setOpenItem] = useState(null);
  const navigate = useNavigate();
  console.log(cart);

  const toggleItem = (vIdx, iIdx) => {
    const key = `${vIdx}-${iIdx}`;
    setOpenItem((prev) => (prev === key ? null : key));
  };

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
                  : { ...item, quantity: Math.max(1, item.quantity + delta) },
              ),
            },
      ),
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
              },
        )
        .filter((vendor) => vendor.items.length > 0),
    );
  };

  const savedItems = cart.flatMap((v) =>
    v.items
      .filter((i) => i.status === "saved")
      .map((i) => ({ ...i, vendor: v.name })),
  );

  /** Compute order summary */
  const orderSummary = useMemo(() => {
    const vendorTotals = cart.map((vendor) => {
      const cartOnly = vendor.items.filter((i) => i.status !== "saved");

      return {
        name: vendor.name,
        total: cartOnly.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };
    });

    const subtotal = vendorTotals.reduce((sum, v) => sum + v.total, 0);

    const totalItems = cart.reduce(
      (sum, v) =>
        sum +
        v.items
          .filter((i) => i.status !== "saved")
          .reduce((iSum, i) => iSum + i.quantity, 0),
      0,
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
                              onClick={() =>
                                setCart((prev) =>
                                  prev.map((vendor, v) =>
                                    v !== vIdx
                                      ? vendor
                                      : {
                                          ...vendor,
                                          items: vendor.items.map((it, i) =>
                                            i !== iIdx
                                              ? it
                                              : { ...it, status: "saved" },
                                          ),
                                        },
                                  ),
                                )
                              }
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

        {savedItems.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 border-t border-gray-300" />
              <p className="text-xs font-semibold">
                Saved for Later ({savedItems.length})
              </p>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            <div className="grid grid-cols-responsive gap-6">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm p-4 space-y-6 border"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.vendor}</p>
                      <p className="font-semibold mt-1">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCart((prev) =>
                          prev.map((v) =>
                            v.name !== item.vendor
                              ? v
                              : {
                                  ...v,
                                  items: v.items.map((it) =>
                                    it.id === item.id
                                      ? { ...it, status: "cart" }
                                      : it,
                                  ),
                                },
                          ),
                        )
                      }
                      className="w-full bg-black text-white py-2 rounded-lg text-xs flex items-center justify-center gap-2"
                    >
                      <FiShoppingBag /> Move to Cart
                    </button>
                    <button
                      onClick={() =>
                        removeItem(
                          cart.findIndex((v) => v.name === item.vendor),
                          cart
                            .find((v) => v.name === item.vendor)
                            .items.findIndex((i) => i.id === item.id),
                        )
                      }
                      className="text-gray-400 hover:text-red-500 border p-2 rounded-lg"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
