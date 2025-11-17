import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { extractErrorMessage } from "../utils/formatters";

const useProduct = () => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.access_token);
  const queryClient = useQueryClient();

  const handleFailure = (action, error) => {
    const message = extractErrorMessage(error);
    onFailure({ title: `${action} Failed`, message });
  };

  const handleSuccess = (action, message) => {
    onSuccess({ title: `${action} Successful`, message });
  };

  // PRODUCT CATEGORIES

  const useGetProductCategories = () =>
    useQuery({
      queryKey: ["product-categories"],
      queryFn: async () => {
        const response = await client.get("/products/categories");
        return response.data.data;
      },
      enabled: !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch Categories", error),
    });

  const createCategory = useMutation({
    mutationFn: async (categoryData) => {
      const response = await client.post("/products/categories", categoryData);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess(
        "Category Creation",
        "Product category created successfully!"
      );
      queryClient.invalidateQueries(["product-categories"]);
    },
    onError: (error) => handleFailure("Category Creation", error),
  });

  const deleteCategory = useMutation({
    mutationFn: async (id) => {
      const response = await client.delete(`/products/categories/${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess(
        "Category Deletion",
        "Product category deleted successfully!"
      );
      queryClient.invalidateQueries(["product-categories"]);
    },
    onError: (error) => handleFailure("Category Deletion", error),
  });

  // PRODUCT QUERIES

  const useGetAllProducts = (filters = {}) =>
    useQuery({
      queryKey: ["products", filters],
      queryFn: async () => {
        const response = await client.get("/products/", { params: filters });
        return response.data.data;
      },
      enabled: !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch Products", error),
    });

  const useGetMyProducts = () =>
    useQuery({
      queryKey: ["products", "my-products"],
      queryFn: async () => {
        const response = await client.get("/store/products/me");
        return response.data.data;
      },
      enabled: !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch My Products", error),
    });

  const useGetStoreProducts = (storeId) =>
    useQuery({
      queryKey: ["products", "store", storeId],
      queryFn: async () => {
        const response = await client.get(`/store/products/store/${storeId}`);
        return response.data.data;
      },
      enabled: !!storeId && !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch Store Products", error),
    });

  const useGetStoreCategories = () =>
    useQuery({
      queryKey: ["productCategories"],
      queryFn: async () => {
        const response = await client.get(`/store/products/categories`);
        return response.data.data;
      },
      enabled: !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch Store Products", error),
    });

  const useGetProductById = (id) =>
    useQuery({
      queryKey: ["product", id],
      queryFn: async () => {
        const response = await client.get(`/store/products/${id}`);
        return response.data.data;
      },
      enabled: !!id && !!authDetails?.access_token,
      onError: (error) => handleFailure("Fetch Product", error),
    });

  // PRODUCT MUTATIONS

  const createProduct = useMutation({
    mutationFn: async (productData) => {
      const response = await client.post("/store/products/", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Product Creation", "Product created successfully!");
      queryClient.invalidateQueries(["products", "my-products"]);
    },
    onError: (error) => handleFailure("Product Creation", error),
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, productData }) => {
      const response = await client.put(`/store/products/${id}`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    },
    onSuccess: (_, { id }) => {
      handleSuccess("Product Update", "Product updated successfully!");
      queryClient.invalidateQueries(["product", id]);
      queryClient.invalidateQueries(["products", "my-products"]);
    },
    onError: (error) => handleFailure("Product Update", error),
  });

  const toggleProductState = useMutation({
    mutationFn: async (id) => {
      const response = await client.patch(`/products/${id}/toggle-state`);
      return response.data.data;
    },
    onSuccess: (_, id) => {
      handleSuccess(
        "Toggle Product State",
        "Product state updated successfully!"
      );
      queryClient.invalidateQueries(["product", id]);
      queryClient.invalidateQueries(["products", "my-products"]);
    },
    onError: (error) => handleFailure("Toggle Product State", error),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const response = await client.delete(`/store/products/${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Product Deletion", "Product deleted successfully!");
      queryClient.invalidateQueries(["products", "my-products"]);
    },
    onError: (error) => handleFailure("Product Deletion", error),
  });

  const deleteAllMyProducts = useMutation({
    mutationFn: async () => {
      const response = await client.delete("/products/me");
      return response.data.data;
    },
    onSuccess: () => {
      handleSuccess("Bulk Deletion", "All your products have been deleted.");
      queryClient.invalidateQueries(["products", "my-products"]);
    },
    onError: (error) => handleFailure("Bulk Deletion", error),
  });

  const deleteProductImage = useMutation({
    mutationFn: async (productId) => {
      const response = await client.delete(`/products/${productId}/image`);
      return response.data.data;
    },
    onSuccess: (_, productId) => {
      handleSuccess("Image Deletion", "Product image deleted successfully!");
      queryClient.invalidateQueries(["product", productId]);
    },
    onError: (error) => handleFailure("Image Deletion", error),
  });

  return {
    // Category
    useGetProductCategories,
    createCategory,
    deleteCategory,

    // Product fetch
    useGetAllProducts,
    useGetMyProducts,
    useGetStoreProducts,
    useGetProductById,

    // Product actions
    createProduct,
    updateProduct,
    toggleProductState,
    deleteProduct,
    deleteAllMyProducts,
    deleteProductImage,
    useGetStoreCategories,
  };
};

export default useProduct;
