import { Suspense, lazy, useContext } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import AuthLayout from "./features/auth/AuthLayout";
import Fallback from "./components/Fallback";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ToastContainer, Slide } from "react-toastify";
import SecureRoute from "./routes/SecureRoute";
import { StoreProvider } from "./context/storeContext";
import { ThemeProvider } from "../src/pages/Landing/context/ThemeContext";
import { ModalProvider } from "../src/pages/Landing/context/ModalContext";

// Lazy-loaded routers & pages
const VendorRouter = lazy(() => import("./routes/VendorRouter"));
const BuyerRouter = lazy(() => import("./routes/BuyerRouter"));
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const CreateAccount = lazy(() => import("./features/auth/CreateAccount"));
const VerifyAccount = lazy(() => import("./features/auth/VerifyAccount"));
const Waitlist = lazy(() => import("./pages/Waitlist"));
const LandingPage = lazy(() => import("./pages/Landing/LandingPage"));

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
        <ThemeProvider>
          <ModalProvider>
            <div className="font-inter">
              <Suspense fallback={<Fallback />}>
                <MainRoutes />
              </Suspense>
            </div>

            <ToastContainer
              autoClose={2000}
              draggable
              position="bottom-right"
              transition={Slide}
              theme="light"
            />
          </ModalProvider>
        </ThemeProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

// ----- Animated Routes -----
const MainRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
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

      {/* NEW LANDING PAGE */}
      <Route
        path="/"
        element={
          <LandingPage />
        }
      />

      {/* Waitlist */}
      <Route
        path="/waitlist"
        element={
          <Waitlist />
        }
      />

      {/* Protected Routes */}
      <Route path="/" element={<SecureRoute />}>
        <Route
          path="/vendor/*"
          element={
            <VendorRouter />
          }
        />

        <Route path="/vendor/setup" element={<VendorOnboarding />} />
        <Route
          path="/buyer/*"
          element={
            <BuyerRouter />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};


export default App;
