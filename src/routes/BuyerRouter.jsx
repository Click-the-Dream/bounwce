import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "../context/storeContext";

const BuyerDashboard = lazy(() => import("../pages/buyer/BuyerDashboard"));
const ShoppingCart = lazy(() => import("../pages/buyer/ShoppingCart"));
const ProductDetails = lazy(() => import("../pages/buyer/ProductDetails"));
const Checkout = lazy(() => import("../pages/buyer/Checkout"));
import Fallback from "../components/Fallback";

const BuyerRouter = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="" element={<Navigate to="home" replace />} />

        {/* Lazy-loaded routes */}
        <Route path="home" element={<BuyerDashboard />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="products/:productId" element={<ProductDetails />} />
      </Routes>
    </Suspense>
  );
};

export default BuyerRouter;