"use server";

import { addToWishlist, getWishlist, removeFromWishlist } from "../_services/wishlist.service";



export async function fetchWishlistAction() {
  return await getWishlist();
}

export async function addWishlistAction(productId: string) {
  return await addToWishlist(productId);
}

export async function removeWishlistAction(productId: string) {
  return await removeFromWishlist(productId);
}
