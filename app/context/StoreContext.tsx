"use client";
import { createContext, useContext, useState } from "react";
import useCart from "../hooks/use-cart";

export const StoreContext = createContext<any>({});
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const { getCarts } = useCart();
  const {
    data: carts = [],
    isLoading: cartLoading,
    isError: isCartError,
    error: cartError,
  } = getCarts();

  // Persist cart to localStorage
  // useEffect(() => {
  //   localStorage.setItem("marketplace_cart", JSON.stringify(cart));
  // }, [cart]);

  return (
    <StoreContext.Provider
      value={{ carts, cartLoading, isCartError, cartError }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export const useMarketStore = () => useContext(StoreContext);
