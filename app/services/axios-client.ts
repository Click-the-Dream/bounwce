import axios, { InternalAxiosRequestConfig } from "axios";
import api from "./api";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: null, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Helper to check expiry locally before sending request
const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    // Returns true if expired or expiring in the next 5 seconds
    return Date.now() >= exp * 1000 - 5000;
  } catch {
    return true;
  }
};

export const setupInterceptors = (
  getAuth: () => any,
  updateAuth: (arg0: null) => void,
) => {
  api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
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
    (res: any) => res,
    async (error: { config: any; response: { status: number } }) => {
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
            `${process.env.NEXT_API_URL}/api/v1/auth/refresh-token`,
            {},
            { withCredentials: true },
          );
          const newToken = data?.data?.access_token;
          const stored = sessionStorage.getItem("authUser");
          let newUser;

          if (stored) {
            const parsed = JSON.parse(stored);
            const updatedUser = { ...parsed, access_token: newToken };

            updateAuth(updatedUser);

            processQueue(null, newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        } catch (err) {
          updateAuth(null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    },
  );
};
