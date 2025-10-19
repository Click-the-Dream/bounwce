import React, { Suspense, lazy } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import AuthLayout from "./features/auth/AuthLayout";
import Fallback from "./components/Fallback";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import VendorRouter from "./features/vendorDashboard/VendorRouter";
// Lazy load the pages
const VerifyAccount = lazy(() => import("./features/auth/VerifyAccount"));
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const CreateAccount = lazy(() => import("./features/auth/CreateAccount"));
const VerifyLogin = lazy(() => import("./features/auth/VerifyLogin"));
const VendorLayout = lazy(() =>
  import("./features/vendorDashboard/components/VendorLayout")
);

const VendorOnboarding = lazy(() => import("./pages/vendor/VendorOnboarding"));

function App() {
  return (
    <AuthProvider>
      {/* Suspense fallback shows while lazy components load */}
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<CreateAccount />} />
          </Route>

          <Route path="/email_verification" element={<VerifyAccount />} />
          <Route path="/vendor_setup" element={<VendorOnboarding />} />
          <Route path="/verifyLogin" element={<VerifyLogin />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
      <ToastContainer autoClose={2000} draggable />
    </AuthProvider>
  );
}

export default App;
