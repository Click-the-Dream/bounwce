import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { extractErrorMessage } from "../utils/formatters";

const useStore = () => {
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

  // STORE INFORMATION

  const useGetStoreInfo = (vendorId) =>
    useQuery({
      queryKey: ["store", vendorId],
      queryFn: async () => {
        const response = await client.get(`/store/${vendorId}`);
        return response.data.data;
      },
      enabled: !!vendorId && !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch Store", error),
    });

  const useGetMyStore = () =>
    useQuery({
      queryKey: ["store", "my-store"],
      queryFn: async () => {
        const response = await client.get("/store/my-store");
        return response.data.data;
      },
      enabled: !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch My Store", error),
    });

  // STORE MUTATIONS

  const createStore = useMutation({
    mutationFn: async (storeData) => {
      const response = await client.post("/store/", storeData);
      return response.data.data;
    },
    onSuccess: (data) => {
      handleSuccess(
        "Store Creation",
        "Your store has been created successfully!"
      );
      queryClient.setQueryData(["store", data.id], data);
      queryClient.setQueryData(["store", "my-store"], data);
    },
    onError: (error) => handleFailure("Store Creation", error),
  });

  const updateStore = useMutation({
    mutationFn: async (storeData) => {
      const response = await client.put("/store/", storeData);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Store Update", "Store updated successfully!");
      queryClient.invalidateQueries(["myStore"]);
    },
    onError: (error) => handleFailure("Store Update", error),
  });

  const deleteStore = useMutation({
    mutationFn: async () => {
      await client.delete("/store/");
    },
    onSuccess: () => {
      handleSuccess("Store Deletion", "Store deleted successfully!");
      queryClient.removeQueries({ queryKey: ["store"] });
    },
    onError: (error) => handleFailure("Store Deletion", error),
  });

  // STORE BRANDING
  const updateBranding = useMutation({
    mutationFn: async (brandingData) => {
      const response = await client.put("/store/branding", brandingData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Branding Update", "Store branding updated successfully!");
      queryClient.invalidateQueries(["my-store"]);
    },
    onError: (error) => handleFailure("Branding Update", error),
  });

  const deleteBrandImage = useMutation({
    mutationFn: async () => {
      const response = await client.delete("/store/brand-image");
      return response.data.data;
    },
    onSuccess: (data) => {
      handleSuccess(
        "Brand Image Deletion",
        "Brand image deleted successfully!"
      );
      queryClient.setQueryData(["store", data.id], data);
      queryClient.setQueryData(["store", "my-store"], data);
    },
    onError: (error) => handleFailure("Brand Image Deletion", error),
  });

  // STORE ACTIVATION

  const activateStore = useMutation({
    mutationFn: async () => {
      const response = await client.put("/store/activate");
      return response.data.data;
    },
    onSuccess: (data) => {
      handleSuccess("Store Activation", "Store activated successfully!");
      queryClient.setQueryData(["store", data.id], data);
      queryClient.setQueryData(["store", "my-store"], data);
    },
    onError: (error) => handleFailure("Store Activation", error),
  });

  const deactivateStore = useMutation({
    mutationFn: async () => {
      const response = await client.put("/store/deactivate");
      return response.data.data;
    },
    onSuccess: (data) => {
      handleSuccess("Store Deactivation", "Store deactivated successfully!");
      queryClient.setQueryData(["store", data.id], data);
      queryClient.setQueryData(["store", "my-store"], data);
    },
    onError: (error) => handleFailure("Store Deactivation", error),
  });

  // STORE CONTACT INFORMATION

  const useGetStoreContact = (userId) =>
    useQuery({
      queryKey: ["store", "contact", userId],
      queryFn: async () => {
        const response = await client.get(`/store/contact/${userId}`);
        return response.data.data;
      },
      enabled: !!userId && !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch Contact Info", error),
    });

  const createContact = useMutation({
    mutationFn: async (contactData) => {
      const response = await client.post("/store/contact/", contactData);
      return response.data.data;
    },
    onSuccess: (data) => {
      handleSuccess("Contact Creation", "Contact created successfully!");
      queryClient.setQueryData(["store", "contact", data.user_id], data);
    },
    onError: (error) => handleFailure("Contact Creation", error),
  });

  const updateContact = useMutation({
    mutationFn: async (contactData) => {
      const response = await client.put("/store/contact/", contactData);
      return response.data.data;
    },
    onSuccess: (data) => {
      handleSuccess("Contact Update", "Contact updated successfully!");
      queryClient.setQueryData(["store", "contact_info", data.user_id], data);
    },
    onError: (error) => handleFailure("Contact Update", error),
  });

  const deleteContact = useMutation({
    mutationFn: async (userId) => {
      await client.delete("/store/contact/", { data: { user_id: userId } });
    },
    onSuccess: (_, userId) => {
      handleSuccess("Contact Deletion", "Contact deleted successfully!");
      queryClient.removeQueries(["store", "contact", userId]);
    },
    onError: (error) => handleFailure("Contact Deletion", error),
  });

  // ===========================
  // STORE PAYOUT INFORMATION
  // ===========================

  const useGetPayoutInfo = (userId) =>
    useQuery({
      queryKey: ["store", "payout", userId],
      queryFn: async () => {
        const response = await client.get(`/store/payout/${userId}`);
        return response.data.data;
      },
      enabled: !!userId && !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch Payout Info", error),
    });

  const createPayout = useMutation({
    mutationFn: async (payoutData) => {
      const response = await client.post("/store/payout/", payoutData);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess(
        "Payout Creation",
        "Payout information added successfully!"
      );
      queryClient.invalidateQueries(["my-store"]);
    },
    onError: (error) => handleFailure("Payout Creation", error),
  });

  const updatePayout = useMutation({
    mutationFn: async (payoutData) => {
      const response = await client.put("/store/payout/", payoutData);
      return response.data.data;
    },
    onSuccess: (data) => {
      handleSuccess(
        "Payout Update",
        "Payout information updated successfully!"
      );
      queryClient.setQueryData(["store", "payout", data.user_id], data);
    },
    onError: (error) => handleFailure("Payout Update", error),
  });

  const deletePayout = useMutation({
    mutationFn: async (userId) => {
      await client.delete("/store/payout/", { data: { user_id: userId } });
    },
    onSuccess: (_, userId) => {
      handleSuccess(
        "Payout Deletion",
        "Payout information deleted successfully!"
      );
      queryClient.removeQueries(["store", "payout", userId]);
    },
    onError: (error) => handleFailure("Payout Deletion", error),
  });

  return {
    useGetStoreInfo,
    useGetMyStore,
    createStore,
    updateStore,
    deleteStore,
    updateBranding,
    deleteBrandImage,
    activateStore,
    deactivateStore,
    useGetStoreContact,
    createContact,
    updateContact,
    deleteContact,
    useGetPayoutInfo,
    createPayout,
    updatePayout,
    deletePayout,
  };
};

export default useStore;
