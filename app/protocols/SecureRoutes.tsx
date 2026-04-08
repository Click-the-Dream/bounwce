"use client";

import { useAuth } from "../context/AuthContext";
import useStore from "../hooks/use-store";
import { usePathname } from "next/navigation";
import Fallback from "../_components/Fallback";
import Redirect from "./Redirect";

const SecureRoute = ({ children }: { children: React.ReactNode }) => {
  const { authDetails, isLoading: authLoading } = useAuth();
  const pathname = usePathname();
  const { useGetStoreOnboardingStatus } = useStore();

  const userId = authDetails?.user?.id;
  const { data: onboardingStatus, isLoading: statusLoading } =
    useGetStoreOnboardingStatus(userId);

  // 🔹 Show fallback until everything is loaded
  if (authLoading || statusLoading) {
    return <Fallback />;
  }

  const user = authDetails?.user;

  // 🔹 Only redirect if user is definitively null or inactive
  if (!user) {
    return <Redirect to="/login" />;
  }

  if (!user.is_active) {
    return <Redirect to="/login" />;
  }

  switch (user.role) {
    case "vendor":
      // 🔹 Only redirect if we have onboarding info
      if (onboardingStatus && !onboardingStatus.is_onboarded) {
        if (pathname === "/vendor/setup") {
          return <>{children}</>;
        }
        return <Redirect to="/vendor/setup" replace />;
      }
      return <>{children}</>;

    case "user":
      return <>{children}</>;

    default:
      return <Redirect to="/login" />;
  }
};

export default SecureRoute;
