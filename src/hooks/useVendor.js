import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { axiosClient } from "../services/axios-client";

const useAxios = () => {
  const { authDetails } = useContext(AuthContext);
  return axiosClient(authDetails?.access_token);
};

// dashboard overview
export const useGetDashboardOverview = (apiParams) => {
  const client = useAxios();
  const { authDetails } = useContext(AuthContext);
  const params = apiParams || {}
  
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  const endpoint = `/store/dashboard/overview${queryString ? '?' + queryString : ''}`;  
  console.log("Fetching dashboard data with endpoint:", endpoint);

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
