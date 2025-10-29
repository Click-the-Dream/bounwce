import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { queryClient } from "../services/query-client";
import { extractErrorMessage } from "../utils/formatters";

const useStore = () => {
  const { authDetails } = useContext(AuthContext);

  const client = axiosClient(authDetails?.access_token);

  // GET Store Information
  const useGetStoreInfo = (userId) => {
    return useQuery({
      queryKey: ["store", userId],
      queryFn: async () => {
        const response = await client.get(`/store/store_info/${userId}`);
        return response.data.data;
      },
      enabled: !!userId && !!authDetails?.token?.token,
      onError: (error) => {
        onFailure(extractErrorMessage(error));
      },
    });
  };

  // CREATE Store Information
  const createStoreMutation = useMutation({
    mutationFn: async (storeData) => {
      const response = await client.post("/store/store_info/", storeData);
      return response.data.data;
    },
    onSuccess: () => {
      onSuccess({ message: "Store information created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
    onError: (error) => {
      onFailure({ message: extractErrorMessage(error) });
    },
  });

  // UPDATE Store Information
  const updateStoreMutation = useMutation({
    mutationFn: async (storeData) => {
      const response = await client.put("/store/store_info/", storeData);
      return response.data.data;
    },
    onSuccess: () => {
      onSuccess({ message: "Store information updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
    onError: (error) => {
      onFailure({ message: extractErrorMessage(error) });
    },
  });

  // DELETE Store Information
  const deleteStoreMutation = useMutation({
    mutationFn: async () => {
      await client.delete("/store/store_info/");
    },
    onSuccess: () => {
      onSuccess({ message: "Store information deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
    onError: (error) => {
      onFailure({ message: extractErrorMessage(error) });
    },
  });

  return {
    useGetStoreInfo,
    createStore: createStoreMutation,
    updateStore: updateStoreMutation,
    deleteStore: deleteStoreMutation,
  };
};

export default useStore;
