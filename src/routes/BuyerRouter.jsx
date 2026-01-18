import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MarketPlace from "../pages/buyer/MarketPlace";
import ShoppingCart from "../pages/buyer/ShoppingCart";
import ProductDetails from "../pages/buyer/ProductDetails";

const BuyerRouter = () => {
  return (
    <Routes>
      {/* Redirect /buyer to /buyer/marketplace */}
      <Route path="" element={<Navigate to="marketplace" replace />} />

      {/* Relative paths */}
      <Route path="marketplace" element={<MarketPlace />} />
      <Route path="cart" element={<ShoppingCart />} />
      <Route path="product-details" element={<ProductDetails />} />
    </Routes>
  );
};

export default BuyerRouter;
