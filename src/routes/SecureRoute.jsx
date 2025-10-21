import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SecureRoute = () => {
  const { authDetails, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const isActive = authDetails?.user?.is_active;

  // Allow only 'active' and 'pending' users
  if (!isActive) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default SecureRoute;
