"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "_/app/_services/wishlist.service";
import { ProductType } from "_/app/_InterFaces/products";

interface WishlistContextType {
  wishlist: ProductType[];
  loading: boolean;
  addItem: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchWishlist() {
    try {
      const res = await getWishlist();
      setWishlist(res?.data || []);
    } catch (err) {
      console.error("Error fetching global wishlist:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function addItem(id: string) {
    await addToWishlist(id);
    await fetchWishlist(); 
  }

  async function removeItem(id: string) {
    await removeFromWishlist(id);
    await fetchWishlist();
  }

  return (
    <WishlistContext.Provider value={{ wishlist, loading, addItem, removeItem }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlistContext must be used inside WishlistProvider");
  return ctx;
}
