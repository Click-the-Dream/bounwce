import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useQuery } from "@tanstack/react-query";

const useVendor = () => {
  const { authDetails } = useAuth();

  const useGetDashboardOverview = (apiParams: any) => {
    const params = apiParams || {};

    const queryString = Object.keys(params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      )
      .join("&");

    const endpoint = `/store/dashboard/overview${queryString ? "?" + queryString : ""}`;

    return useQuery({
      queryKey: ["vendor", "dashboard", "overview", params],
      queryFn: async () => {
        const response = await api.get(endpoint);
        return response.data.data;
      },
      enabled: !!authDetails?.access_token,
    });
  };

  // wallet summary
  const useGetWalletSummary = () => {
    return useQuery({
      queryKey: ["store", "dashboard", "wallet"],
      queryFn: async () => {
        const response = await api.get("/store/dashboard/wallet");
        return response.data.data;
      },
      enabled: !!authDetails?.access_token,
    });
  };

  return {
    useGetDashboardOverview,
    useGetWalletSummary,
  };
};

export default useVendor;
