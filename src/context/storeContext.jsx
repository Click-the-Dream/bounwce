/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import useCart from "../hooks/useCart";

export const StoreContext = createContext();
export const StoreProvider = ({ children }) => {
  const { getCarts } = useCart();
  const { data: carts } = getCarts()

  // Persist cart to localStorage
  // useEffect(() => {
  //   localStorage.setItem("marketplace_cart", JSON.stringify(cart));
  // }, [cart]);

  return (
    <StoreContext.Provider value={{ carts }}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
