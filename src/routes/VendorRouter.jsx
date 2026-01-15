import React from "react";
import { Routes, Route } from "react-router-dom";
import VendorLayout from "../features/vendorDashboard/components/VendorLayout";
import VendorOverview from "../features/vendorDashboard/pages/VendorOverview";
import VendorCustomers from "../features/vendorDashboard/pages/VendorCustomers";
import VendorOrders from "../features/vendorDashboard/pages/VendorOrders";
import VendorWallet from "../features/vendorDashboard/pages/VendorWallet";
import VendorAnalytics from "../features/vendorDashboard/pages/VendorAnalytics";
import StoreManagementDashboard from "../features/vendorStore/StoreManagementDashboard";
import AddProductPage from "../features/vendorStore/pages/AddProductPage";

const VendorRouter = () => {
  return (
    <Routes>
      <Route path="" element={<VendorLayout />}>
        <Route index element={<VendorOverview />} />

        <Route path="store" element={<StoreManagementDashboard />} />
        <Route path="addproduct" element={<AddProductPage />} />

        <Route path="customers" element={<VendorCustomers />} />
        <Route path="orders" element={<VendorOrders />} />
        <Route path="wallet" element={<VendorWallet />} />
        <Route path="analytics" element={<VendorAnalytics />} />
      </Route>
    </Routes>
  );
};

export default VendorRouter;
