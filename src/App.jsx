import React, { Suspense, lazy, useContext, useEffect } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import AuthLayout from "./features/auth/AuthLayout";
import Fallback from "./components/Fallback";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import VendorRouter from "./routes/VendorRouter";
import SecureRoute from "./routes/SecureRoute";
import StoreManagementDashboard from "./features/vendorStore/StoreManagementDashboard";
import { Slide } from "react-toastify";
import AddProductPage from "./features/vendorStore/pages/AddProductPage";

// Lazy load the pages
const VerifyAccount = lazy(() => import("./features/auth/VerifyAccount"));
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const CreateAccount = lazy(() => import("./features/auth/CreateAccount"));
const VendorOnboarding = lazy(() => import("./pages/vendor/VendorOnboarding"));
const Waitlist = lazy(() => import("./pages/Waitlist"));

// Prevent authenticated users from accessing auth pages
const PublicRoute = ({ children }) => {
  const { authDetails, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authDetails?.user) {
      // Redirect logged-in users to vendor dashboard
      navigate("/vendor", { replace: true });
    }
  }, [authDetails, navigate]);

  if (isLoading)
    return <div className="text-white text-center mt-10">Loading...</div>;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Fallback />}>
        <div className="font-inter">
          <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <CreateAccount />
                  </PublicRoute>
                }
              />
              <Route
                path="/email_verification"
                element={
                  <PublicRoute>
                    <VerifyAccount />
                  </PublicRoute>
                }
              />
            </Route>

            <Route path="/" element={<Waitlist />} />

            {/* Protected Vendor Routes */}
            <Route element={<SecureRoute />}>
              <Route path="/vendor/setup" element={<VendorOnboarding />} />
              
            </Route>           
              <Route path="/vendor/store" element={<StoreManagementDashboard />} />  
              <Route path="/vendor/addproduct" element={<AddProductPage />} />
              <Route path="/vendor/*" element={<VendorRouter />} />
              
            {/* Catch-all redirect */}
            
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Suspense>
      <ToastContainer
        autoClose={2000}
        draggable        
        position="bottom-right"
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        transition={Slide}
        theme="light"
      />
    </AuthProvider>
  );
}
export default App;
