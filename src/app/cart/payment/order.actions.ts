"use server";
import { checkCookie } from "_/utils/utils";
import { revalidatePath } from "next/cache";


export type ShippingAddressType = {
  details: string;
  phone: string;
  city: string;
};

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddressType
) {
  const token = await checkCookie();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      body: JSON.stringify({
        shippingAddress,
      }),
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      cache: "no-store",
    }
  );

  const finalres = await res.json();

  console.log("final create cash order", finalres);

  if (finalres.status === "success") {
    revalidatePath("/cart");

    return finalres;
  } else {
    return false;
  }
}







export async function createCheckoutSession(
  cartId: string,
  shippingAddress: ShippingAddressType
) {
  try {
    const token = await checkCookie();

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Checkout session failed", res.status, res.statusText);
      return false;
    }

    const finalres = await res.json();
    console.log("final Online order", finalres);

    if (finalres.status === "success") {
      return finalres.session.url;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating checkout session", error);
    return false;
  }
}
