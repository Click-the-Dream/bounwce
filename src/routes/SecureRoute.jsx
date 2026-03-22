import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useStore from "../hooks/useStore";
import Fallback from "../components/Fallback";

const SecureRoute = () => {
  const { authDetails, isLoading } = useContext(AuthContext);
  const location = useLocation();
  const { useGetStoreOnboardingStatus } = useStore()
  // Only fetch store onboarding if the user is a vendor
  const { data: onboardingStatus, isLoading: statusLoading } = useGetStoreOnboardingStatus(
    authDetails?.user?.id,
  );

  if (isLoading || statusLoading) {
    return <Fallback />;
  }

  const user = authDetails?.user;

  if (!user || !user.is_active) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  switch (user.role) {
    case "vendor":
      // If the vendor is not onboarded, redirect to setup
      if (!onboardingStatus?.is_onboarded) {
        if (location.pathname === "/vendor/setup") {
          return <Outlet />;
        }
        return <Navigate to="/vendor/setup" replace state={{ from: location, onboarding: onboardingStatus?.missing_sections }} />
      }
      return <Outlet />; // fully onboarded vendors can access /vendor/*

    case "user":
      return <Outlet />; // buyers

    default:
      return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default SecureRoute;