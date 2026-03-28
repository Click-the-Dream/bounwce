import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MarketPlace from "../pages/buyer/MarketPlace";
import ShoppingCart from "../pages/buyer/ShoppingCart";
import ProductDetails from "../pages/buyer/ProductDetails";
import { StoreProvider } from "../context/storeContext";

const BuyerRouter = () => {
  return (

    <StoreProvider>
      <Routes>
        {/* Redirect /buyer to /buyer/marketplace */}
        <Route path="" element={<Navigate to="marketplace" replace />} />

        {/* Relative paths */}
        <Route path="marketplace" element={<MarketPlace />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="products/:productId" element={<ProductDetails />} />
      </Routes>
    </StoreProvider>
  );
};

export default BuyerRouter;
