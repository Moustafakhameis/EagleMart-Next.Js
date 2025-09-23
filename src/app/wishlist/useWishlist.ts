"use client";

import { useState, useEffect } from "react";
import { addWishlistAction, fetchWishlistAction, removeWishlistAction } from "./wishlist.actions";
import { ProductType } from "../_InterFaces/products";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist once
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await fetchWishlistAction();
        setWishlist(res.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  // Add
  async function handleAdd(productId: string) {
    try {
      const res = await addWishlistAction(productId);
      setWishlist((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding:", err);
    }
  }

  // Remove
  async function handleRemove(productId: string) {
    try {
      await removeWishlistAction(productId);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Error removing:", err);
    }
  }

  return { wishlist, loading, handleAdd, handleRemove };
}
