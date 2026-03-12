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
import CartItem from "../../components/buyer/CartItem";

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
            {cart.map((vendor, idx) => (
              <CartItem key={idx} vendor={vendor} />
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
