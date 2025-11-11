import { useContext } from "react";
import { useMutation } from "@tanstack/react-query"; // Ensure this is from @tanstack/react-query
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { queryClient } from "../services/query-client";
import { extractErrorMessage, storedUserEmail } from "../utils/formatters";
const useAuth = () => {
  const navigate = useNavigate();
  const { authDetails, updateAuth } = useContext(AuthContext);

  const client = axiosClient(authDetails?.token?.token);

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await client.post("/auth/resend-otp", credentials);
      return data.data;
    },
    onSuccess: (data) => {
      console.log(data);
      //updateAuth(userData); // Immediately update auth state
      onSuccess({
        title: "Login Successful!",
        message: `Here is your otp ${data?.otp}`, //"Continuing to dashboard",
      });
      navigate("/vendor");
    },
    onError: async (error, variables) => {
      onFailure({ message: "Login Failed", error: extractErrorMessage(error) });
      if (error?.response?.data?.message === "Email not verified") {
        await requestOtpMutation.mutateAsync(variables?.email);
        navigate("/email-verification");
      }
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const { data } = await client.post("/auth/register", userData);
      return data?.data;
    },
    onSuccess: (userData, variables) => {
      onSuccess({
        title: "Registration Successful!",
        message: `User created successfully - ${userData?.otp}`,
      });
      storedUserEmail(variables.email);
      navigate("/email_verification", { state: variables, replace: true });
    },
    onError: async (err, variables) => {
      const apiMessage = err?.response?.data?.message;
      const errorMessage = extractErrorMessage(err);

      // Handle "user already exists" case more gracefully
      if (apiMessage === "User with the email already exist") {
        // Step 1: Gently inform user what’s happening
        onSuccess({
          message: "Email already registered",
          success: "Sending you a new verification code...",
        });
        // Step 2: Actually request the OTP
        await requestOtpMutation.mutateAsync(variables?.email, {
          onSuccess: () => {
            // Step 3: Save the email and redirect with a short UX delay
            storedUserEmail(variables?.email);
            navigate("/email_verification", {
              state: variables,
              replace: true,
            });
          },
        });

        return;
      }

      // Default fallback for other errors
      onFailure({
        title: "Registration Failed",
        message: errorMessage,
      });
    },
  });

  // Mutation for updating profile
  const updateProfile = useMutation({
    mutationFn: async (profileData) => {
      if (!authDetails?.user?.profile?.userId) {
        throw new Error("User ID not found");
      }

      const { data } = await client.put(
        `/profile/${authDetails.user.profile.userId}`,
        profileData, // Profile data must be in the second argument
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!data && data?.status) {
        throw new Error(data?.message || "Error updating profile");
      }

      return data.data;
    },
    onSuccess: (updatedUser) => {
      const { user, ...other } = authDetails;
      updateAuth({ ...other, user: { ...user, ...updatedUser } });
      onSuccess({
        title: "Profile Update",
        message: "Profile updated successfully!",
      });
    },
    onError: (err) => {
      onFailure({
        title: "Failed to update profile",
        message: extractErrorMessage(err),
      });
    },
  });

  const requestOtpMutation = useMutation({
    mutationFn: async (credentials) => {
      if (credentials?.email) {
        storedUserEmail(credentials?.email);
      }
      const email = credentials?.email ?? storedUserEmail(); // Call function to get email
      if (!email) {
        throw new Error("No email provided");
      }
      const { data } = await client.post("/auth/resend-otp", { email: email });

      return data;
    },
    onSuccess: ({ data }) => {
      //setOtpRequested(true);
      onSuccess({
        title: "OTP Requested!",
        message: `Here is your otp ${data?.otp}`,
      });
    },
    onError: (err) => {
      // setOtpRequested(false);
      onFailure({
        title: "Can't Request OTP",
        message: extractErrorMessage(err),
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (otpData) => {
      const email = otpData?.email ?? storedUserEmail(); // Call function to get email
      if (!email) {
        throw new Error("No email provided");
      }
      const { data } = await client.post("/auth/verify-code", {
        ...otpData,
        email: email,
      });

      return data.data;
    },
    onSuccess: (userData) => {
      updateAuth(userData);

      console.log(userData);

      const user = userData?.user;

      // Check if user is a vendor but not yet a store owner
      if (user?.role === "vendor" && user?.is_store_owner === false) {
        navigate("/vendor/setup", { replace: true });
      } else {
        navigate("/vendor", { replace: true });
      }

      onSuccess({
        title: "OTP Verified!",
        message: "Proceeding to dashboard",
      });
    },

    onError: (err) => {
      onFailure({
        title: "OTP Verification Failed",
        message: extractErrorMessage(err),
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      queryClient.clear(); // Clear all cached data
    },
    onSuccess: () => {
      updateAuth(null); // Reset auth state
      navigate("/login", { replace: true });
      onSuccess({
        title: "Logout successful",
        message: "You have been logged out.",
      });
      window.location.reload();
    },
    onError: (err) => {
      onFailure({ message: "Logout Failed", error: err.message });
    },
  });

  return {
    login: loginMutation,
    signUp: registerMutation,
    verifyOtp: verifyOtpMutation,
    requestOtp: requestOtpMutation,
    logout: logoutMutation,
    updateProfile: updateProfile,
    storedUserEmail,
  };
};

export default useAuth;
