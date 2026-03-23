import axios from "axios";
import api from "./api";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Helper to check expiry locally before sending request
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    // Returns true if expired or expiring in the next 5 seconds
    return Date.now() >= exp * 1000 - 5000;
  } catch {
    return true;
  }
};

export const setupInterceptors = (getAuth, parseToken) => {
  api.interceptors.request.use((config) => {
    if (config.headers?.Authorization) {
      return config;
    }

    let auth = getAuth();

    if (!auth?.access_token) {
      const stored = sessionStorage.getItem("authUser");
      if (stored) auth = JSON.parse(stored);
    }

    if (auth?.access_token) {
      config.headers.Authorization = `Bearer ${auth.access_token}`;
    }

    return config;
  });

  // RESPONSE: The "Emergency" Refresh
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      // Only attempt refresh on 401 and if it's not a retry
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/auth/refresh-token`,
            {},
            { withCredentials: true },
          );
          const newToken = data?.data?.access_token;
          const stored = sessionStorage.getItem("authUser");
          let newUser;

          if (stored) {
            const parsed = JSON.parse(stored);
            newUser = { ...parsed, access_token: newToken };
          } else {
            // If no user data is in storage, fetch the user from backend
            const { data: userData } = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/v1/auth/me`,
              { headers: { Authorization: `Bearer ${newToken}` } },
            );
            newUser = { ...userData, access_token: newToken };
          }

          sessionStorage.setItem("authUser", JSON.stringify(newUser));
          parseToken(newToken);
          processQueue(null, newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          processQueue(err, null);
          // Optional: trigger logout here if refresh token is also dead
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    },
  );
};
