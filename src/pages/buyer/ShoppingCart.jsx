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
  const { carts, cartLoading, isCartError, cartError } = useStore()
  const { updateCart, removeCart } = useCart();
  const [openItem, setOpenItem] = useState(null);
  const [pendingCartId, setPendingCartId] = useState(null);

  // Flatten cart items with convenient fields
  const cartItems = useMemo(() => {
    if (!carts) return [];

    const stableCarts = carts.sort((a, b) => a.id - b.id);
    const grouped = stableCarts.reduce((acc, cart) => {
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

  const isMutating = updateCart?.isPending || removeCart?.isPending;


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

        {cartLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        ) : isCartError ? (
          /* 2. Error State */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-red-100">
            <div className="p-4 bg-red-50 rounded-full text-red-500 mb-4">
              <FiShoppingBag size={32} />
            </div>
            <h3 className="text-lg font-semibold">Something went wrong</h3>
            <p className="text-gray-500 text-sm mt-1">{cartError || "Could not load your cart items."}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-black text-white rounded-lg text-sm"
            >
              Try Again
            </button>
          </div>
        ) : hasActiveItems ? (
          /* 3. Success State (Active Items) */
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-opacity ${isMutating ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
            <div className="lg:col-span-2 space-y-8">
              {cartItems?.map((cart) => (
                <CartItem
                  key={cart?.storeId}
                  vIdx={cart?.id}
                  cart={cart}
                  openItem={openItem}
                  removeItem={removeItem}
                  toggleItem={toggleItem}
                  saveForLater={saveForLater}
                  pendingCartId={pendingCartId}
                />
              ))}
            </div>
            <OrderSummary orderSummary={orderSummary} />
          </div>
        ) : (
          /* 4. Empty State */
          <EmptyCartState />
        )}

        {!cartLoading && !isCartError && savedItems.length > 0 && (
          <div className={`mt-12 transition-opacity ${isMutating ? 'opacity-60' : 'opacity-100'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 border-t border-gray-300" />
              <p className="text-xs font-semibold text-gray-500">
                Saved for Later ({savedItems.length})
              </p>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedItems.map((item) => (
                <div key={item.cartId} className="bg-white rounded-xl shadow-sm p-4 space-y-6 border border-gray-100">
                  <div className="flex gap-4">
                    <img src={item?.image} className="w-20 h-20 rounded-lg object-cover bg-gray-50" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item?.name}</p>
                      <p className="text-[11px] text-gray-400 uppercase tracking-tight">{item?.storeName}</p>
                      <p className="font-bold text-black mt-2">
                        {formatCurrency(item?.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => moveToCart(item.cartId)}
                      disabled={isMutating}
                      className="flex-1 bg-black text-white py-2.5 rounded-lg text-[11px] font-medium flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-400"
                    >
                      <FiShoppingBag /> Move to Cart
                    </button>
                    <button
                      onClick={() => removeItem(item.cartId)}
                      disabled={isMutating}
                      className="text-gray-400 hover:text-red-500 border border-gray-200 p-2.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <FiTrash2 size={16} />
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
