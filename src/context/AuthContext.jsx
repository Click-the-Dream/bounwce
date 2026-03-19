import { createContext, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { setupInterceptors } from "../services/axios-client";


const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

const getTokenExpiry = (token) => {
  const payload = parseJwt(token);
  return payload?.exp ? payload.exp * 1000 : null;
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const refreshTimeoutRef = useRef(null);

  const [logoutSignal, setLogoutSignal] = useState(false);

  const [authDetails, setAuthDetails] = useState(() => {
    const storedUser = sessionStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    setupInterceptors(
      () => authDetails,
      (user) => console.log(user)

    );
  }, [authDetails]);

  const scheduleRefresh = (token) => {
    const expiry = getTokenExpiry(token);
    console.log("expiry token", expiry);

    if (!expiry) return;

    const delay = expiry - Date.now() - 60_000; // 1 min before expiry

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    if (delay > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refreshToken();
      }, delay);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/refresh-token`);

    } catch (err) {
      console.error("Refresh failed:", err);
    }
  };

  const updateAuth = (newUser) => {
    setAuthDetails(newUser);

    if (newUser) {
      console.log("new user", newUser);

      sessionStorage.setItem("authUser", JSON.stringify(newUser));

      if (newUser.access_token) {
        scheduleRefresh(newUser.access_token);
      }
    } else {
      sessionStorage.removeItem("authUser");
      queryClient.removeQueries(["authUser"]);

      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    }
  };

  useEffect(() => {
    if (authDetails?.access_token) {
      scheduleRefresh(authDetails.access_token);
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [authDetails?.access_token]);

  return (
    <AuthContext.Provider
      value={{ authDetails, updateAuth, logoutSignal, setLogoutSignal }}
    >
      {children}
    </AuthContext.Provider>
  );
};