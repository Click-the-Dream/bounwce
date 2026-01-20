import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SecureRoute = () => {
  const { authDetails, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading)
    return <div className="text-white text-center mt-10">Loading...</div>;

  const user = authDetails?.user;

  if (!user || !user.is_active) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  switch (user.role) {
    case "vendor":
      if (!user.is_store_owner) {
        // Only allow access to /vendor/setup
        if (location.pathname === "/vendor/setup") {
          return <Outlet />;
        }
        return <Navigate to="/vendor/setup" replace />;
      }
      return <Outlet />; // store owners can access /vendor/*
    case "user":
      return <Outlet />; // buyers
    default:
      return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default SecureRoute;
