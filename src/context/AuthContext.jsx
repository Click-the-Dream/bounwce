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
      (token) => {
        console.log(token);
        if (!token) updateAuth(null)
        else updateAuth(() => ({ ...authDetails, access_token: token }));
      }

    );
  }, []);

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
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/refresh-token`, {}, {
        withCredentials: true
      });

      updateAuth({
        ...authDetails,
        access_token: data?.data?.access_token
      })

    } catch (err) {
      console.error("Refresh failed:", err);
      updateAuth(null)
    }
  };

  const updateAuth = (newUser) => {
    setAuthDetails(prev => {
      const resolved = typeof newUser === "function" ? newUser(prev) : newUser;

      if (resolved) {
        sessionStorage.setItem("authUser", JSON.stringify(resolved));
        if (resolved.access_token) scheduleRefresh(resolved.access_token);
      } else {
        sessionStorage.removeItem("authUser");
        queryClient.removeQueries(["authUser"]);
        if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
      }

      return resolved;
    });
  };
  // useEffect(() => {
  //   if (authDetails?.access_token) {
  //     scheduleRefresh(authDetails.access_token);
  //   }

  //   return () => {
  //     if (refreshTimeoutRef.current) {
  //       clearTimeout(refreshTimeoutRef.current);
  //     }
  //   };
  // }, [authDetails?.access_token]);

  return (
    <AuthContext.Provider
      value={{ authDetails, updateAuth, logoutSignal, setLogoutSignal }}
    >
      {children}
    </AuthContext.Provider>
  );
};