import React, { Suspense, lazy } from "react";
import { Navigate, Routes, Route} from "react-router-dom";
import AuthLayout from "./features/auth/AuthLayout";
import Fallback from "./components/Fallback";
import VendorRouter from "./features/vendorDashboard/VendorRouter";
// Lazy load the pages
const VerifyAccount = lazy(() => import("./features/auth/VerifyAccount"));
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const CreateAccount = lazy(() => import("./features/auth/CreateAccount"));
const VerifyLogin = lazy(() => import("./features/auth/VerifyLogin"));
const VendorLayout = lazy(() => import("./features/vendorDashboard/components/VendorLayout"));

const VendorOnboarding = lazy(() => import("./pages/vendor/VendorOnboarding"));

function App() {
    return (
      <div className="App">
        {/* Suspense fallback shows while lazy components load */}
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<CreateAccount />} />
            </Route>

            <Route path="/verifyAccount" element={<VerifyAccount />} />
            <Route path="/verifyLogin" element={<VerifyLogin />} />
            {VendorRouter}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </div>
    );
}
  

export default App;
