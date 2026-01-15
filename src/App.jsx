import { Suspense, lazy, useContext } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

import AuthLayout from "./features/auth/AuthLayout";
import Fallback from "./components/Fallback";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ToastContainer, Slide } from "react-toastify";
import SecureRoute from "./routes/SecureRoute";
import { StoreProvider } from "./context/storeContext";

// Lazy-loaded routers & pages
const VendorRouter = lazy(() => import("./routes/VendorRouter"));
const BuyerRouter = lazy(() => import("./routes/BuyerRouter"));
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const CreateAccount = lazy(() => import("./features/auth/CreateAccount"));
const VerifyAccount = lazy(() => import("./features/auth/VerifyAccount"));
const Waitlist = lazy(() => import("./pages/Waitlist"));

const VendorOnboarding = lazy(() => import("./pages/vendor/VendorOnboarding"));

// Prevent authenticated users from accessing auth pages
const PublicRoute = ({ children }) => {
  const { isLoading } = useContext(AuthContext);
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

// ----- Animated Routes -----
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <PageWrapper>
                  <LoginPage />
                </PageWrapper>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <PageWrapper>
                  <CreateAccount />
                </PageWrapper>
              </PublicRoute>
            }
          />
          <Route
            path="/email_verification"
            element={
              <PublicRoute>
                <PageWrapper>
                  <VerifyAccount />
                </PageWrapper>
              </PublicRoute>
            }
          />
        </Route>

        {/* Waitlist */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <Waitlist />
            </PageWrapper>
          }
        />

        {/* Protected Routes */}
        <Route path="/" element={<SecureRoute />}>
          <Route
            path="/vendor/*"
            element={
              <PageWrapper>
                <VendorRouter />
              </PageWrapper>
            }
          />

          <Route path="/vendor/setup" element={<VendorOnboarding />} />
          <Route
            path="/buyer/*"
            element={
              <PageWrapper>
                <BuyerRouter />
              </PageWrapper>
            }
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

// ----- Page Wrapper for animations -----
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      key={Math.random()} // Ensures AnimatePresence triggers on route change
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default App;
