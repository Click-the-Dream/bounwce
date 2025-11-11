import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../services/axios-client";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { extractErrorMessage } from "../utils/formatters";

const useUser = () => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.access_token);
  const queryClient = useQueryClient();

  /* ------------------------------ 🔹 GET QUERIES ------------------------------ */
  const useGetCurrentUser = () =>
    useQuery({
      queryKey: ["currentUser"],
      queryFn: async () => {
        const res = await client.get(`/users/me`);
        return res.data;
      },
    });

  const useGetUserById = (userId) =>
    useQuery({
      queryKey: ["user", userId],
      queryFn: async () => {
        const res = await client.get(`/users/${userId}`);
        return res.data;
      },
      enabled: !!userId,
    });

  const useGetUsers = (params = {}) =>
    useQuery({
      queryKey: ["users", params],
      queryFn: async () => {
        const res = await client.get(`/users`, { params });
        return res.data;
      },
    });

  const useGetVendorVerification = () =>
    useQuery({
      queryKey: ["vendorVerification"],
      queryFn: async () => {
        const res = await client.get(`/users/verification/`);
        return res.data?.data;
      },
    });

  /* ----------------------------- 🔹 MUTATIONS ----------------------------- */

  const updateCurrentUser = useMutation({
    mutationFn: async (data) => {
      const res = await client.put(`/users/me`, data);
      return res.data;
    },
    onSuccess: () => {
      onSuccess({
        title: "Profile Updated",
        message: "Your profile has been updated successfully.",
      });
      queryClient.invalidateQueries(["currentUser"]);
    },
    onError: (error) =>
      onFailure({
        title: "Update Failed",
        message: extractErrorMessage(error),
      }),
  });

  const deleteCurrentUser = useMutation({
    mutationFn: async () => {
      const res = await client.delete(`/users/me`);
      return res.data;
    },
    onSuccess: () =>
      onSuccess({
        title: "Account Deleted",
        message: "Your account has been permanently deleted.",
      }),
    onError: (error) =>
      onFailure({
        title: "Deletion Failed",
        message: extractErrorMessage(error),
      }),
  });

  const updateUserById = useMutation({
    mutationFn: async ({ userId, data }) => {
      const res = await client.put(`/users/${userId}`, data);
      return res.data;
    },
    onSuccess: (_, { userId }) => {
      onSuccess({
        title: "User Updated",
        message: "User information has been updated successfully.",
      });
      queryClient.invalidateQueries(["user", userId]);
    },
    onError: (error) =>
      onFailure({
        title: "Update Failed",
        message: extractErrorMessage(error),
      }),
  });

  const deleteUserById = useMutation({
    mutationFn: async (userId) => {
      const res = await client.delete(`/users/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      onSuccess({
        title: "User Deleted",
        message: "User has been deleted successfully.",
      });
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) =>
      onFailure({
        title: "Deletion Failed",
        message: extractErrorMessage(error),
      }),
  });

  const deactivateUser = useMutation({
    mutationFn: async () => {
      const res = await client.put(`/users/me/deactivate`);
      return res.data;
    },
    onSuccess: () => {
      onSuccess({
        title: "Account Deactivated",
        message: "Your account has been deactivated successfully.",
      });
      queryClient.invalidateQueries(["currentUser"]);
    },
    onError: (error) =>
      onFailure({
        title: "Deactivation Failed",
        message: extractErrorMessage(error),
      }),
  });

  const activateUser = useMutation({
    mutationFn: async () => {
      const res = await client.put(`/users/me/activate`);
      return res.data;
    },
    onSuccess: () => {
      onSuccess({
        title: "Account Activated",
        message: "Your account has been reactivated successfully.",
      });
      queryClient.invalidateQueries(["currentUser"]);
    },
    onError: (error) =>
      onFailure({
        title: "Activation Failed",
        message: extractErrorMessage(error),
      }),
  });

  const undeleteUser = useMutation({
    mutationFn: async (userId) => {
      const res = await client.post(`/users/undelete/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      onSuccess({
        title: "User Restored",
        message: "User has been restored successfully.",
      });
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) =>
      onFailure({
        title: "Restoration Failed",
        message: extractErrorMessage(error),
      }),
  });

  const updateVendorVerification = useMutation({
    mutationFn: async (data) => {
      const res = await client.put(`/users/verification/`, data);
      return res.data;
    },
    onSuccess: () => {
      onSuccess({
        title: "Verification Updated",
        message: "Vendor verification details have been updated.",
      });
      queryClient.invalidateQueries(["vendorVerification"]);
    },
    onError: (error) =>
      onFailure({
        title: "Update Failed",
        message: extractErrorMessage(error),
      }),
  });

  const createVendorVerification = useMutation({
    mutationFn: async (data) => {
      const res = await client.post(`/users/verification/`, data);
      return res.data;
    },
    onSuccess: () => {
      onSuccess({
        title: "Verification Submitted",
        message: "Your verification request has been submitted successfully.",
      });
      queryClient.invalidateQueries(["vendorVerification"]);
    },
    onError: (error) =>
      onFailure({
        title: "Submission Failed",
        message: extractErrorMessage(error),
      }),
  });

  /* ----------------------------- 🔹 EXPORT ----------------------------- */
  return {
    useGetCurrentUser,
    updateCurrentUser,
    deleteCurrentUser,
    useGetUserById,
    updateUserById,
    deleteUserById,
    useGetUsers,
    deactivateUser,
    activateUser,
    undeleteUser,
    useGetVendorVerification,
    updateVendorVerification,
    createVendorVerification,
  };
};

export default useUser;
