import React from "react";
import { Routes, Route } from "react-router-dom";
import VendorLayout from "../features/vendorDashboard/components/VendorLayout";

const BuyerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<VendorLayout />}></Route>
    </Routes>
  );
};

export default BuyerRouter;
