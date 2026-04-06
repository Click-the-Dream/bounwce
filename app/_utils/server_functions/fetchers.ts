import api from "@/app/services/api";

export const productFetcher = async ({ filters }: any) => {
  const { data } = await api.get("/store/products/", {
    params: {
      ...filters,
      page: 1,
      per_page: 12,
    },
  });
  // Ensure we return an array even if data is undefined
  return data?.data || [];
};
