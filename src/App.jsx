import { Suspense, lazy, useContext, useEffect } from "react";
import {
  Navigate,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom"; // Added useLocation
import { AnimatePresence } from "framer-motion"; // Added for exit animations
import AuthLayout from "./features/auth/AuthLayout";
import Fallback from "./components/Fallback";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ToastContainer, Slide } from "react-toastify";
import SecureRoute from "./routes/SecureRoute";
import { StoreProvider } from "./context/storeContext";

//  Lazy Load these pages
const VendorRouter = lazy(() => import("./routes/VendorRouter"));
const StoreManagementDashboard = lazy(() =>
  import("./features/vendorStore/StoreManagementDashboard")
);
const AddProductPage = lazy(() =>
  import("./features/vendorStore/pages/AddProductPage")
);

const VerifyAccount = lazy(() => import("./features/auth/VerifyAccount"));
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const CreateAccount = lazy(() => import("./features/auth/CreateAccount"));
const VendorOnboarding = lazy(() => import("./pages/vendor/VendorOnboarding"));
const Waitlist = lazy(() => import("./pages/Waitlist"));
const ShoopingCart = lazy(() => import("./pages/buyer/ShoppingCart"));
const MarketPlace = lazy(() => import("./pages/buyer/MarketPlace"));

// Prevent authenticated users from accessing auth pages
const PublicRoute = ({ children }) => {
  const { authDetails, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authDetails?.user && authDetails?.user?.role === "vendor") {
      // Redirect logged-in users to vendor dashboard
      navigate("/vendor", { replace: true });
    } else if (authDetails?.user && authDetails?.user?.role === "buyer") {
      // Redirect logged-in users to marketplace
      navigate("/marketplace", { replace: true });
    } else {
      return;
    }
  }, [authDetails, navigate]);

  if (isLoading)
    return <div className="text-white text-center mt-10">Loading...</div>;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
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
      </StoreProvider>
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

        {/* Dashboard Router */}
        <Route path="/vendor/*" element={<VendorRouter />} />

        <Route path="/cart" element={<ShoopingCart />} />
        <Route path="/marketplace" element={<MarketPlace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
