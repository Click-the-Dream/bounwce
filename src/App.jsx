import React, { Suspense, lazy, useContext, useEffect } from "react";
import { Navigate, Routes, Route, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { AnimatePresence } from "framer-motion"; // Added for exit animations
import AuthLayout from "./features/auth/AuthLayout";
import Fallback from "./components/Fallback";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ToastContainer, Slide } from "react-toastify";
import SecureRoute from "./routes/SecureRoute";

//  Lazy Load these pages 
const VendorRouter = lazy(() => import("./routes/VendorRouter"));
const StoreManagementDashboard = lazy(() => import("./features/vendorStore/StoreManagementDashboard"));
const AddProductPage = lazy(() => import("./features/vendorStore/pages/AddProductPage"));


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

  if (isLoading) return <div className="text-white text-center mt-10">Loading...</div>;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <div className="font-inter">
        <Suspense fallback={<Fallback />}>
          <AnimatedRoutes />
        </Suspense>
      </div>
      
      <ToastContainer
        autoClose={2000}
        draggable
        position="bottom-right"
        transition={Slide}
        theme="light"
      />
    </AuthProvider>
  );
}

// --- separate component to handle Animations ---
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    // AnimatePresence detects when routes change to play exit animations
    <AnimatePresence mode="wait">
      <Routes location={location}>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><CreateAccount /></PublicRoute>} />
          <Route path="/email_verification" element={<PublicRoute><VerifyAccount /></PublicRoute>} />
        </Route>

        <Route path="/" element={<Waitlist />} />

        {/* Protected Vendor Routes */}
        <Route element={<SecureRoute />}>
          <Route path="/vendor/setup" element={<VendorOnboarding />} />
          
          
        </Route>
        
          <Route path="/vendor/store" element={<StoreManagementDashboard />} />
          <Route path="/vendor/addproduct" element={<AddProductPage />} />
          
          {/* Dashboard Router */}
          <Route path="/vendor/*" element={<VendorRouter />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;