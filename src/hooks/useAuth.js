import { useContext } from "react";
import { useMutation } from "@tanstack/react-query"; // Ensure this is from @tanstack/react-query
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { queryClient } from "../services/query-client";
import { extractErrorMessage } from "../utils/formatters";
const useAuth = () => {
  const navigate = useNavigate();
  const { authDetails, updateAuth, setOtpRequested } = useContext(AuthContext);

  const client = axiosClient(authDetails?.token?.token);

  const storedUserEmail = (email) => {
    if (email) {
      localStorage.setItem("register_email", email);
    } else {
      return localStorage.getItem("register_email");
    }
  };

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await client.post("/auth/login", credentials);
      if (!data?.data?.user) {
        throw new Error("Invalid response: User data not found");
      }
      return data.data;
    },
    onSuccess: (userData) => {
      updateAuth(userData); // Immediately update auth state
      onSuccess({
        message: "Login Successful!",
        success: "Continuing to dashboard",
      });
      navigate("/vendor/dashboard");
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
      return data;
    },
    onSuccess: (userData, variables) => {
      onSuccess({
        message: "Registration Successful!",
        success: userData?.message || "User created successfully",
      });
      storedUserEmail(variables.email);
      navigate("/email_verification", { state: variables });
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
            navigate("/email_verification", { state: variables });
          },
        });

        return;
      }

      // Default fallback for other errors
      onFailure({
        message: "Registration Failed",
        error: errorMessage,
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
        message: "Profile Update",
        success: "Profile updated successfully!",
      });
    },
    onError: (err) => {
      onFailure({
        message: "Failed to update profile",
        error: extractErrorMessage(err),
      });
    },
  });

  const requestOtpMutation = useMutation({
    mutationFn: async (address) => {
      if (address) {
        storedUserEmail(address);
      }
      const email = address ?? storedUserEmail(); // Call function to get email
      if (!email) {
        throw new Error("No email provided");
      }
      const { data } = await client.post("/resend-otp", { email: email });
      if (!data?.success) {
        throw new Error("An error occurred");
      }
      return data;
    },
    onSuccess: (data) => {
      //setOtpRequested(true);
      onSuccess({
        message: "OTP Requested!",
        success: data?.message ?? "please check your mail",
      });
    },
    onError: (err) => {
      // setOtpRequested(false);
      onFailure({
        message: "Can't Request OTP",
        error: extractErrorMessage(err),
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
      if (!data?.success) {
        throw new Error("Invalid response: User data not found");
      }
      return data.data;
    },
    onSuccess: (userData, variables) => {
      if (variables?.mode === "verify") {
        onSuccess({
          message: "OTP Verified!",
          success: "Your OTP has been verified",
        });
      } else {
        updateAuth(userData);
        navigate("/login");
        onSuccess({ message: "OTP Verified!", success: "Proceeding to login" });
      }
    },
    onError: (err) => {
      onFailure({
        message: "OTP Verification Failed",
        error: extractErrorMessage(err),
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
        message: "Logout successful",
        success: "You have been logged out.",
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
