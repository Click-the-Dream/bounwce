import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { extractErrorMessage } from "../_utils/formatters";
import { onFailure, onSuccess } from "../_utils/notification";

const useShipping = () => {
  const { authDetails } = useAuth();
  const queryClient = useQueryClient();

  const handleFailure = (action: string, error: any) => {
    const message = extractErrorMessage(error);
    onFailure({ title: `${action} Failed`, message });
  };

  const handleSuccess = (action: string, message: string) => {
    onSuccess({ title: `${action} Successful`, message });
  };

  // SHIPMENT INFORMATION

  // Get Shipment by User ID
  const useGetShipmentByUser = (userId: any) =>
    useQuery({
      queryKey: ["shipment", userId],
      queryFn: async () => {
        const response = await api.get(`/store/shipment`);
        return response.data.data;
      },
      enabled: !!authDetails?.access_token,
    });

  // Create Shipment Info
  const createShipment = useMutation({
    mutationFn: async (shipmentData) => {
      const response = await api.post("/store/shipment/", shipmentData);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Shipment Creation", "Shipment info created successfully!");
      queryClient.invalidateQueries({ queryKey: ["shipment"] });
    },
    onError: (error) => handleFailure("Shipment Creation", error),
  });

  // Update Shipment Info
  const updateShipment = useMutation({
    mutationFn: async ({ id, ...shipmentData }: any) => {
      if (!id) throw Error("ID is required");
      const response = await api.put(`/store/shipment/${id}`, shipmentData);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Shipment Update", "Shipment info updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["shipment"] });
    },
    onError: (error) => handleFailure("Shipment Update", error),
  });

  // Delete Shipment Info
  const deleteShipment = useMutation({
    mutationFn: async (id: string) => {
      if (!id) throw Error("ID is required");
      const response = await api.delete(`/store/shipment/?id=${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Shipment Deletion", "Shipment info deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["shipment"] });
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
