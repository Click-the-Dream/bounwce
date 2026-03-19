import { useMemo } from "react"
import { FiShoppingBag, FiTrash2 } from "react-icons/fi";
import Navbar from "../../components/buyer/Navbar";
import Header from "../../components/buyer/Header";
import { formatCurrency } from "../../utils/formatters";
import { useStore } from "../../context/storeContext";
import { useState } from "react";
import CartItem from "../../components/buyer/CartItem";
import OrderSummary from "../../components/buyer/OrderSummary";

const ShoppingCart = () => {
  const { cart, setCart } = useStore(); // use global cart
  const [openItem, setOpenItem] = useState(null);

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

  const saveForLater = (vIdx, iIdx) => {
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
        products: cartOnly.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
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
              <CartItem key={vIdx} vIdx={vIdx} vendor={vendor} openItem={openItem} removeItem={removeItem} updateQuantity={updateQuantity} toggleItem={toggleItem} saveForLater={saveForLater} />
            ))}
          </div>

          {/* Order Summary */}
          <OrderSummary orderSummary={orderSummary} />
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
