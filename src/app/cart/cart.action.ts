"use server";

import { checkCookie } from "_/utils/utils";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addProductToCart(productId: string) {
  const token = await checkCookie();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to add product to cart");
  }
  // revalidatePath("/cart");
  revalidateTag("getUserCart");
  const data = await res.json();
  console.log("Cart response:", data);

  return data;
}

export async function removeItemFromCart(productId: string) {
  const token = await checkCookie();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to remove item: ${res.status}`);
  }

  const data = await res.json();

  if (data.status === "success") {
    revalidatePath("/cart");
    // revalidateTag("getUserCart");
    return data;
  }else {
    return null;
  }

  console.log("Remove response:", data);

}






export async function changeCountFromCart(productId: string , count: number) {
  const token = await checkCookie();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ count }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to remove item: ${res.status}`);
  }

  const data = await res.json();
  console.log("Chang response:", data);

  if (data.status === "success") {
    revalidatePath("/cart");
    // revalidateTag("getUserCart");
    return data;
  }else {
    return null;
  }


}









export async function clearUserCart() {
  const token = await checkCookie();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to clear cart: ${res.status}`);
  }

  const data = await res.json();
  console.log("Clear cart response:", data);


  if (data.message === "success") {
    revalidatePath("/cart");
    // revalidateTag("getUserCart");
    return data;
  } else {
    return null;
  }
}
