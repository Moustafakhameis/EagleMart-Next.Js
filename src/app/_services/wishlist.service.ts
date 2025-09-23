"use server";

import { getServerSession } from "next-auth";
import { nextAuthConfig } from "_/nextAuth/nextAuth.config";
import { CustomSession } from "_/app/_InterFaces/next-auth";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

async function getAuthHeaders() {
  const session = (await getServerSession(nextAuthConfig)) as CustomSession;

  if (!session?.accessToken) throw new Error("User not authenticated");

  return {
    "Content-Type": "application/json",
    token: session.accessToken,
  };
}

export async function getWishlist() {
  const headers = await getAuthHeaders();
  const res = await fetch(BASE_URL, { method: "GET", headers, cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json();
}

export async function addToWishlist(productId: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error("Failed to add product to wishlist");
  return res.json();
}

export async function removeFromWishlist(productId: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/${productId}`, { method: "DELETE", headers });
  if (!res.ok) throw new Error("Failed to remove product from wishlist");
  return res.json();
}
