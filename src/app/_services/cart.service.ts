'use server';

import { checkCookie } from "_/utils/utils";
import { CartResponse } from "../_InterFaces/cart";

export   async function getUserCart(): Promise<CartResponse | null> {
    const token = await checkCookie();

    if (!token) return null;

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      cache: "force-cache",
      next:{
        tags: ['getUserCart']
      }
    });

    if (!res.ok) return null;

    const finalRes: CartResponse = await res.json();
    return finalRes;
  }
