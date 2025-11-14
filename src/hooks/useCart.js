// src/hooks/useCart.js
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, addCartItem, removeCartItem } from "../redux/slice/cartSlice";
import { BASE_URL } from "../utils/constants";

export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/quickService/cart`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to fetch cart");
      }
      const data = await res.json();
      // update redux once
      dispatch(setCartItems(data));
      return data;
    } catch (err) {
      console.error("fetchCart error:", err);
      return [];
    }
  }, [dispatch]);

  const addToCart = useCallback(
    async (formData) => {
      try {
        const res = await fetch(`${BASE_URL}/quickService/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          return { error: data?.error || "Failed to add to cart" };
        }
        // if backend signals enquiry, still refresh cart so UI is authoritative
        await fetchCart();
        return data;
      } catch (err) {
        console.error("addToCart error:", err);
        return { error: err.message || "Network error" };
      }
    },
    [fetchCart]
  );

  const deleteCartItemFromServer = useCallback(
    async (id) => {
      try {
        const res = await fetch(`${BASE_URL}/quickService/cart/${id}`, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const text = await res.text().catch(() => "");
        let body = {};
        try {
          body = text ? JSON.parse(text) : {};
        } catch {
          body = { raw: text };
        }

        if (!res.ok) {
          return { success: false, error: body?.error || body?.message || `HTTP ${res.status}` };
        }

        // update local redux immediately for snappy UI
        dispatch(removeCartItem(id));
        return { success: true, data: body };
      } catch (err) {
        console.error("deleteCartItem error:", err);
        return { success: false, error: err.message || "Network error" };
      }
    },
    [dispatch]
  );

  return { items, fetchCart, addToCart, deleteCartItemFromServer };
}
