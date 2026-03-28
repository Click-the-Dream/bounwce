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
import EmptyCartState from "../../components/buyer/EmptyCartState";

const ShoppingCart = () => {
  const { carts } = useStore()
  const { updateCart, removeCart } = useCart();
  const [openItem, setOpenItem] = useState(null);
  const [pendingCartId, setPendingCartId] = useState(null);

  // Flatten cart items with convenient fields
  const cartItems = useMemo(() => {
    if (!carts) return [];

    const grouped = carts.reduce((acc, cart) => {
      const storeId = cart?.store?.id;

      if (!acc[storeId]) {
        acc[storeId] = {
          storeId,
          storeName: cart?.store?.name || "Store Name",
          items: [],
        };
      }

      acc[storeId].items.push({
        ...cart.product,
        quantity: cart.quantity,
        status: cart.status || "cart",
        cartId: cart.id,
      });

      return acc;
    }, {});

    return Object.values(grouped);
  }, [carts]);

  const toggleItem = (cartId) => {
    setOpenItem((prev) => (prev === cartId ? null : cartId));
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

  const savedItems = cartItems.flatMap(store =>
    store.items.filter(item => item.status === "saved")
  );

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

  const activeItems = cartItems.flatMap(store =>
    store.items.filter(item => item.status === "cart")
  );

  const hasActiveItems = activeItems.length > 0;
  const hasSavedItems = savedItems.length > 0;

  return (
    <div className="bg-[#ECECF080] min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pb-8">
        <Header title="Shopping Cart" orderSummary={orderSummary} />

        {hasActiveItems ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cartItems?.map((cart) => (
                <CartItem key={cart?.id} vIdx={cart?.id} cart={cart} openItem={openItem} removeItem={removeItem} toggleItem={toggleItem} saveForLater={saveForLater} pendingCartId={pendingCartId} />
              ))}
            </div>

            {/* Order Summary */}
            <OrderSummary orderSummary={orderSummary} />
          </div>

        ) : (
          <EmptyCartState />
        )}

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
                  key={item.cartId}
                  className="bg-white rounded-xl shadow-sm p-4 space-y-6 border"
                >
                  <div className="flex gap-4">
                    <img
                      src={item?.image}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{item?.name}</p>
                      <p className="text-xs text-gray-500">{item?.store?.name}</p>
                      <p className="font-semibold mt-1">
                        {formatCurrency(item?.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveToCart(item.cartId)}
                      className="w-full bg-black text-white py-2 rounded-lg text-xs flex items-center justify-center gap-2"
                    >
                      <FiShoppingBag /> Move to Cart
                    </button>
                    <button
                      onClick={() => removeItem(item.cartId)}
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
