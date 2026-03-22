import { createContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { setupInterceptors } from "../services/axios-client";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [logoutSignal, setLogoutSignal] = useState(false);

  const [authDetails, setAuthDetails] = useState(() => {
    const storedUser = sessionStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Initialize interceptors ONCE
  useEffect(() => {
    setupInterceptors(
      () => {
        const stored = sessionStorage.getItem("authUser");
        return stored ? JSON.parse(stored) : null;
      },
      (token) => {
        updateAuth(() => ({ ...authDetails, access_token: token }));
      }
    );
  }, []);

  const updateAuth = (newUser) => {
    if (newUser) {
      const resolved = typeof newUser === "function" ? newUser(authDetails) : newUser;
      sessionStorage.setItem("authUser", JSON.stringify(resolved));
      setAuthDetails(resolved);
    } else {
      sessionStorage.removeItem("authUser");
      setAuthDetails(null);
      queryClient.removeQueries(["authUser"]);
    }
  };

  return (
    <AuthContext.Provider value={{ authDetails, updateAuth, logoutSignal, setLogoutSignal }}>
      {children}
    </AuthContext.Provider>
  );
};