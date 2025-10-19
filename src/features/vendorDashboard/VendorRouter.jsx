// features/vendorDashboard/VendorRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import VendorLayout from "./components/VendorLayout";
import VendorOverview from "./pages/VendorOverview";
import VendorCustomers from "./pages/VendorCustomers";
import VendorOrders from "./pages/VendorOrders";
import VendorWallet from "./pages/VendorWallet";
import VendorAnalytics from "./pages/VendorAnalytics";

const VendorRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<VendorLayout />}>
        <Route index element={<VendorOverview />} />
        <Route path="customers" element={<VendorCustomers />} />
        <Route path="orders" element={<VendorOrders />} />
        <Route path="wallet" element={<VendorWallet />} />
        <Route path="analytics" element={<VendorAnalytics />} />
      </Route>
    </Routes>
  );
};

export default VendorRouter;
