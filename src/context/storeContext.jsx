import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import useCart from "../hooks/useCart";

export const StoreContext = createContext();
export const StoreProvider = ({ children }) => {
  const { getCarts } = useCart();
  const { data: carts = [], isLoading: cartLoading, isError: isCartError, error: cartError } = getCarts()

  // Persist cart to localStorage
  // useEffect(() => {
  //   localStorage.setItem("marketplace_cart", JSON.stringify(cart));
  // }, [cart]);

  return (
    <StoreContext.Provider value={{ carts, cartLoading, isCartError, cartError }}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
