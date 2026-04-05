import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Fallback from "../components/Fallback";
// Layout
const VendorLayout = lazy(() => import("../features/vendorDashboard/components/VendorLayout"));

// Pages
const VendorOverview = lazy(() => import("../features/vendorDashboard/pages/VendorOverview"));
const VendorCustomers = lazy(() => import("../features/vendorDashboard/pages/VendorCustomers"));
const VendorOrders = lazy(() => import("../features/vendorDashboard/pages/VendorOrders"));
const VendorWallet = lazy(() => import("../features/vendorDashboard/pages/VendorWallet"));
const VendorAnalytics = lazy(() => import("../features/vendorDashboard/pages/VendorAnalytics"));
const StoreManagementDashboard = lazy(() => import("../features/vendorStore/StoreManagementDashboard"));
const AddProductPage = lazy(() => import("../features/vendorStore/pages/AddProductPage"));

const VendorRouter = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        {/* Layout Route */}
        <Route path="" element={<VendorLayout />}>
          <Route index element={<VendorOverview />} />
          <Route path="addproduct" element={<AddProductPage />} />
          <Route path="customers" element={<VendorCustomers />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="wallet" element={<VendorWallet />} />
          <Route path="analytics" element={<VendorAnalytics />} />
        </Route>

        {/* Standalone Route */}
        <Route path="store" element={<StoreManagementDashboard />} />
      </Routes>
    </Suspense>
  );
};

export default VendorRouter;