"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export const useCart = () => {
  const { authDetails } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const getCarts = () =>
    useQuery({
      queryKey: ["carts"],
      queryFn: async () => {
        const { data } = await api.get("/users/carts/?page=1&page_size=10");
        return data?.data?.carts;
      },
      enabled: !!authDetails?.access_token,
    });

  const getCartById = (cartId) =>
    useQuery({
      queryKey: ["cart", cartId],
      queryFn: async () => {
        const res = await api.get(`/users/carts/${cartId}`);
        return res.data;
      },
      enabled: !!cartId && !!authDetails?.access_token,
    });

  const getShippingInfo = () =>
    useQuery({
      queryKey: ["cartShippingInfo"],
      queryFn: async () => {
        const res = await api.get("/users/carts/cart-shipping-info");
        return res.data?.data;
      },
      enabled: !!authDetails?.access_token,
    });

  /** ---------------- MUTATIONS ---------------- */

  const addToCart = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/users/carts/", data);
      return res.data;
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries(["carts"]);
      queryClient.invalidateQueries(["product", data?.product_id]);
    },
  });

  const updateCart = useMutation({
    mutationFn: async ({ cartId, data }) => {
      const res = await api.put(`/users/carts/${cartId}`, data);
      return res.data;
    },
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries(["cart", variables.cartId]),
  });

  const removeFromCart = useMutation({
    mutationFn: async (cartId) => {
      await api.delete(`/users/carts/${cartId}`);
    },
    onSuccess: () => queryClient.invalidateQueries(["carts"]),
  });

  const deleteAllCarts = useMutation({
    mutationFn: async () => {
      await api.delete("/users/carts");
    },
    onSuccess: () => queryClient.invalidateQueries(["carts"]),
  });

  const checkoutCarts = useMutation({
    mutationFn: async ({ payload, idempotencyKey }) => {
      if (!payload || payload.length === 0) {
        throw new Error("No items to checkout");
      }
      const res = await api.post("/users/carts/checkout", payload, {
        headers: {
          "Idempotent-Key": idempotencyKey,
        },
      });

      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["carts"]),
  });

  /** ---------------- RETURN OBJECT ---------------- */

  return {
    // Queries
    getCarts,
    getCartById,
    getShippingInfo,

    // Mutations
    addToCart,
    updateCart,
    removeFromCart,
    deleteAllCarts,
    checkoutCarts,
  };
};

export default useCart;
