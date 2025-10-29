import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { queryClient } from "../services/query-client";
import { extractErrorMessage } from "../utils/formatters";

const useBusiness = () => {
  const { authDetails } = useContext(AuthContext);

  const client = axiosClient(authDetails?.access_token);

  // GET Business Information
  const useGetBusinessInfo = (userId) => {
    return useQuery({
      queryKey: ["business", userId],
      queryFn: async () => {
        const response = await client.get(`/store/business/${userId}`);
        return response.data.data;
      },
      enabled: !!userId && !!authDetails?.token?.token,
      onError: (error) => {
        onFailure(extractErrorMessage(error));
      },
    });
  };

  // CREATE Business Information
  const createBusinessMutation = useMutation({
    mutationFn: async (businessData) => {
      const response = await client.post("/store/business/", businessData);
      return response.data.data;
    },
    onSuccess: () => {
      onSuccess({ message: "Business information created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["business"] });
    },
    onError: (error) => {
      onFailure({ message: extractErrorMessage(error) });
    },
  });

  // UPDATE Business Information
  const updateBusinessMutation = useMutation({
    mutationFn: async (businessData) => {
      const response = await client.put("/store/business/", businessData);
      return response.data.data;
    },
    onSuccess: () => {
      onSuccess({ message: "Business information updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["business"] });
    },
    onError: (error) => {
      onFailure({ message: extractErrorMessage(error) });
    },
  });

  // DELETE Business Information
  const deleteBusinessMutation = useMutation({
    mutationFn: async () => {
      await client.delete("/store/business/");
    },
    onSuccess: () => {
      onSuccess({ message: "Business information deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["business"] });
    },
    onError: (error) => {
      onFailure({ message: extractErrorMessage(error) });
    },
  });

  return {
    useGetBusinessInfo,
    createBusiness: createBusinessMutation,
    updateBusiness: updateBusinessMutation,
    deleteBusiness: deleteBusinessMutation,
  };
};

export default useBusiness;
