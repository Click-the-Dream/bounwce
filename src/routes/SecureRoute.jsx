import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SecureRoute = () => {
  const { authDetails, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const user = authDetails?.user;

  // ⛔ No user? Go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🧩 User must be active
  if (!user.is_active) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🧑‍💼 Vendor but not yet a store owner → redirect to setup,
  // but skip redirect if already on the setup page.
  if (
    user.role === "vendor" &&
    user.is_store_owner === false &&
    location.pathname !== "/vendor/setup"
  ) {
    return <Navigate to="/vendor/setup" replace />;
  }

  // ✅ Authorized access
  return <Outlet />;
};

export default SecureRoute;
