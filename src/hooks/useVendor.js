import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export const useGetDashboardOverview = (apiParams) => {
  const client = api;
  const { authDetails } = useContext(AuthContext);
  const params = apiParams || {};

  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join("&");

  const endpoint = `/store/dashboard/overview${queryString ? "?" + queryString : ""}`;

  return useQuery({
    queryKey: ["vendor", "dashboard", "overview", params],
    queryFn: async () => {
      const response = await client.get(endpoint);
      return response.data.data;
    },
    enabled: !!authDetails?.access_token,
  });
};

// wallet summary
export const useGetWalletSummary = () => {
  const client = useAxios();
  const { authDetails } = useContext(AuthContext);

  return useQuery({
    queryKey: ["store", "dashboard", "wallet"],
    queryFn: async () => {
      const response = await client.get("/store/dashboard/wallet");
      return response.data.data;
    },
    enabled: !!authDetails?.access_token,
  });
};
