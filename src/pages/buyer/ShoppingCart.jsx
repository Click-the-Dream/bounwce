import { useMemo } from "react"
import { FiShoppingBag, FiTrash2 } from "react-icons/fi";
import Navbar from "../../components/buyer/Navbar";
import Header from "../../components/buyer/Header";
import { formatCurrency } from "../../utils/formatters";
import { useStore } from "../../context/storeContext";
import { useState } from "react";
import CartItem from "../../components/buyer/CartItem";
import OrderSummary from "../../components/buyer/OrderSummary";
import useCart from "../../hooks/useCart";

const ShoppingCart = () => {
  const { carts } = useStore()
  const { addToCart, updateCart, removeCart, checkoutCarts } = useCart();
  const [openItem, setOpenItem] = useState(null);

  // Flatten cart items with convenient fields
  const cartItems = useMemo(() => {
    return carts?.map((storeCart) => ({
      storeId: storeCart.id,
      storeName: storeCart?.product?.vendor || "Store Name", // optional if you store vendor separately
      items: [
        {
          ...storeCart.product,
          quantity: storeCart.quantity,
          status: storeCart.status || "cart",
          cartId: storeCart.id, // unique cart item id
        },
      ],
    })) || [];
  }, [carts]);

  const toggleItem = (cartId) => {
    setOpenItem((prev) => (prev === cartId ? null : cartId));
  };

  const updateQuantity = (cartId, delta) => {
    console.log(cartId, delta);

    updateCart.mutate({ cartId, data: { quantity: Math.max(1, delta) } });
  };

  const removeItem = (cartId) => {
    removeCart.mutate(cartId);
  };

  const saveForLater = (cartId) => {
    updateCart.mutate({ cartId, data: { status: "saved" } });
  };

  const moveToCart = (cartId) => {
    updateCart.mutate({ cartId, data: { status: "cart" } });
  };

  const savedItems = cartItems.filter((i) => i.status === "saved");

  // Compute order summary
  const orderSummary = useMemo(() => {
    if (!cartItems) return { subtotal: 0, totalItems: 0, items: [], vendorTotals: [] };

    const vendorTotals = cartItems.map((storeCart) => {
      const products = storeCart.items
        .filter((i) => i.status !== "saved")
        .map((i) => ({
          ...i,
          total: i.amount * i.quantity,
        }));

      const total = products.reduce((sum, p) => sum + p.total, 0);

      return {
        storeId: storeCart.storeId,
        name: storeCart.storeName,
        total,
        products,
      };
    });

    const subtotal = vendorTotals.reduce((sum, v) => sum + v.total, 0);
    const totalItems = vendorTotals.reduce(
      (sum, v) => sum + v.products.reduce((s, p) => s + p.quantity, 0),
      0
    );

    return { subtotal, totalItems, items: cartItems, vendorTotals };
  }, [cartItems]);

  return (
    <div className="bg-[#ECECF080] min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pb-8">
        <Header title="Shopping Cart" orderSummary={orderSummary} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cartItems?.map((cart) => (
              <CartItem key={cart?.id} vIdx={cart?.id} cart={cart} openItem={openItem} removeItem={removeItem} updateQuantity={updateQuantity} toggleItem={toggleItem} saveForLater={saveForLater} />
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
              {savedItems.map((cart) => (
                <div
                  key={cart?.id}
                  className="bg-white rounded-xl shadow-sm p-4 space-y-6 border"
                >
                  <div className="flex gap-4">
                    <img
                      src={cart?.image}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{cart?.name}</p>
                      <p className="text-xs text-gray-500">{cart?.vendor}</p>
                      <p className="font-semibold mt-1">
                        {formatCurrency(cart?.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={moveToCart}
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
