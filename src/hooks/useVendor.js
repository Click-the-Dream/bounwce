import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { axiosClient } from "../services/axios-client";

const useAxios = () => {
  const { authDetails } = useContext(AuthContext);
  return axiosClient(authDetails?.access_token);
};

// dashboard overview
export const useGetDashboardOverview = () => {
  const client = useAxios();
  const { authDetails } = useContext(AuthContext);

  return useQuery({
    queryKey: ["vendor", "dashboard", "overview"],
    queryFn: async () => {
      const response = await client.get("/store/dashboard/overview");
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
