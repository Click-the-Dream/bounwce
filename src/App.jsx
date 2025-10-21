
import React, { Suspense, lazy, useContext, useEffect } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import AuthLayout from "./features/auth/AuthLayout";
import Fallback from "./components/Fallback";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import VendorRouter from "./routes/VendorRouter";
import SecureRoute from "./routes/SecureRoute";

// Lazy load the pages
const VerifyAccount = lazy(() => import("./features/auth/VerifyAccount"));
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const CreateAccount = lazy(() => import("./features/auth/CreateAccount"));

const VendorOnboarding = lazy(() => import("./pages/vendor/VendorOnboarding"));
const DashboardHeader = lazy(() => import("./page/dashboard/DashboardHeader"))

// Prevent authenticated users from accessing auth pages
const PublicRoute = ({ children }) => {
  const { authDetails, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authDetails?.user) {
      // Redirect logged-in users to vendor dashboard
      navigate("/vendor", { replace: true });
    }
  }, [authDetails]);

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

              <Route 
              path="/vendor/dashboard" 
              element={
               <PublicRoute>
                  <DashboardHeader />
                </PublicRoute>
              } 
             />
            </Route>


            {/* Protected Vendor Routes */}
            <Route element={<SecureRoute />}>
              <Route path="/vendor/setup" element={<VendorOnboarding />} />
              <Route path="/vendor/dashboard" element={<DashboardHeader />} />
              <Route path="/vendor/*" element={<VendorRouter />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Suspense>
      <ToastContainer autoClose={2000} draggable />
    </AuthProvider>
  );
}

export default App;