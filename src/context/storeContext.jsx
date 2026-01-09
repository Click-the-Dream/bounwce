/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const StoreContext = createContext();
export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("marketplace_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("marketplace_cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <StoreContext.Provider value={{ cart, setCart }}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
