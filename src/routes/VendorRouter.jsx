import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const VendorLayout = lazy(() =>
  import("../features/vendorDashboard/components/VendorLayout")
);

// Lazy-loaded pages
const VendorOverview = lazy(() =>
  import("../features/vendorDashboard/pages/VendorOverview")
);
const VendorCustomers = lazy(() =>
  import("../features/vendorDashboard/pages/VendorCustomers")
);
const VendorOrders = lazy(() =>
  import("../features/vendorDashboard/pages/VendorOrders")
);
const VendorWallet = lazy(() =>
  import("../features/vendorDashboard/pages/VendorWallet")
);
const VendorAnalytics = lazy(() =>
  import("../features/vendorDashboard/pages/VendorAnalytics")
);
const StoreManagementDashboard = lazy(() =>
  import("../features/vendorStore/StoreManagementDashboard")
);
const AddProductPage = lazy(() =>
  import("../features/vendorStore/pages/AddProductPage")
);

// Loader
const PageLoader = () => (
  <div className="flex items-center justify-center h-[60vh]">
    <p className="text-gray-500 text-sm">Loading...</p>
  </div>
);

const VendorRouter = () => {
  return (
    <Routes>
      {/* Layout Route */}
      <Route
        path=""
        element={
          <Suspense fallback={<PageLoader />}>
            <VendorLayout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <VendorOverview />
            </Suspense>
          }
        />

        <Route
          path="addproduct"
          element={
            <Suspense fallback={<PageLoader />}>
              <AddProductPage />
            </Suspense>
          }
        />

        <Route
          path="customers"
          element={
            <Suspense fallback={<PageLoader />}>
              <VendorCustomers />
            </Suspense>
          }
        />

        <Route
          path="orders"
          element={
            <Suspense fallback={<PageLoader />}>
              <VendorOrders />
            </Suspense>
          }
        />

        <Route
          path="wallet"
          element={
            <Suspense fallback={<PageLoader />}>
              <VendorWallet />
            </Suspense>
          }
        />

        <Route
          path="analytics"
          element={
            <Suspense fallback={<PageLoader />}>
              <VendorAnalytics />
            </Suspense>
          }
        />
      </Route>

      {/* Standalone Route */}
      <Route
        path="store"
        element={
          <Suspense fallback={<PageLoader />}>
            <StoreManagementDashboard />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default VendorRouter;