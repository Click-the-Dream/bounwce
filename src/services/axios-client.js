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

export const setupInterceptors = (user, parseToken) => {
  // REQUEST INTERCEPTOR
  api.interceptors.request.use((config) => {
    const auth = user();
    if (auth?.access_token) {
      config.headers.Authorization = `Bearer ${auth.access_token}`;
    }

    // Handle multipart automatically
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  });

  // RESPONSE INTERCEPTOR (REFRESH LOGIC)
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

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
            {
              withCredentials: true,
            },
          );

          parseToken(data?.data?.access_token);

          processQueue(null, data?.data?.access_token);

          originalRequest.headers.Authorization = `Bearer ${data?.data?.access_token}`;

          return api(originalRequest);
        } catch (err) {
          parseToken(null);
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};
