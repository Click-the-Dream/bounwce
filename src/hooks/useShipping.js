import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { extractErrorMessage } from "../utils/formatters";

const useShipping = () => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.access_token);
  const queryClient = useQueryClient();

  const handleFailure = (action, error) => {
    const message = extractErrorMessage(error);
    onFailure({ title: `${action} Failed`, message });
  };

  const handleSuccess = (action, message) => {
    onSuccess({ title: `${action} Successful`, message });
  };

  // SHIPMENT INFORMATION

  // Get Shipment by User ID
  const useGetShipmentByUser = (userId) =>
    useQuery({
      queryKey: ["shipment", userId],
      queryFn: async () => {
        const response = await client.get(`/store/shipment/`);
        return response.data.data;
      },
      enabled: !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch Shipment Info", error),
    });

  // Create Shipment Info
  const createShipment = useMutation({
    mutationFn: async (shipmentData) => {
      const response = await client.post("/store/shipment/", shipmentData);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Shipment Creation", "Shipment info created successfully!");
      queryClient.invalidateQueries(["shipment"]);
    },
    onError: (error) => handleFailure("Shipment Creation", error),
  });

  // Update Shipment Info
  const updateShipment = useMutation({
    mutationFn: async ({ id, ...shipmentData }) => {
      if (!id) throw Error("ID is required");
      const response = await client.put(`/store/shipment/${id}`, shipmentData);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Shipment Update", "Shipment info updated successfully!");
      queryClient.invalidateQueries(["shipment"]);
    },
    onError: (error) => handleFailure("Shipment Update", error),
  });

  // Delete Shipment Info
  const deleteShipment = useMutation({
    mutationFn: async (id) => {
      if (!id) throw Error("ID is required");
      const response = await client.delete(`/store/shipment/?id=${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Shipment Deletion", "Shipment info deleted successfully!");
      queryClient.invalidateQueries(["shipment"]);
    },
    onError: (error) => handleFailure("Shipment Deletion", error),
  });

  return {
    // Shipment
    useGetShipmentByUser,
    createShipment,
    updateShipment,
    deleteShipment,
  };
};

export default useShipping;
