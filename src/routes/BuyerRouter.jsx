import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MarketPlace from "../pages/buyer/MarketPlace";
import ShoppingCart from "../pages/buyer/ShoppingCart";

const BuyerRouter = () => {
  return (
    <Routes>
      {/* Redirect /buyer to /buyer/marketplace */}
      <Route path="" element={<Navigate to="marketplace" replace />} />

      {/* Relative paths */}
      <Route path="marketplace" element={<MarketPlace />} />
      <Route path="cart" element={<ShoppingCart />} />
    </Routes>
  );
};

export default BuyerRouter;
