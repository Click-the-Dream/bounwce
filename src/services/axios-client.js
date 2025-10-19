import axios from "axios";

export const axiosClient = (token, multiMedia = false) => {
  let headers;

  const contentType = multiMedia
    ? "multipart/form-data"
    : "application/json;charset=utf-8";

  if (token) {
    headers = {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    };
  } else {
    headers = {
      "Content-Type": contentType,
    };
  }

  const client = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  return client;
};
