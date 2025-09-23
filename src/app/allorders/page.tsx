"use client";

import { CartContext } from "_/context/CartContext";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { revalidateCart } from "./revalidateCart";
import Link from "next/link";

export default function AllOrders() {
  const { updateCartCount } = useContext(CartContext);
  useEffect(() => {
    const shown = sessionStorage.getItem("payment_success");
    if (!shown) {
      toast.success("Payment successful! Your order has been placed.", {
        duration: 2000,
        position: "top-right",
      });
      sessionStorage.setItem("payment_success", "true");
    }

    revalidateCart();
    updateCartCount(0);
  }, [ updateCartCount ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-600 max-w-md">
        Thank you for your purchase. Your order has been placed successfully and
        will be processed shortly.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
