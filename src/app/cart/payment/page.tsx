"use client";

import { Card, CardContent, CardHeader, CardTitle } from "_/components/ui/card";
import { Button } from "_/components/ui/button";
import { Input } from "_/components/ui/input";
import { Label } from "_/components/ui/label";
import { Separator } from "_/components/ui/separator";
import { createCashOrder, createCheckoutSession } from "./order.actions";
import { useContext, useEffect, useRef, useState } from "react";
import { getUserCart } from "_/app/_services/cart.service";
import { FaMapMarkerAlt, FaPhoneAlt, FaHome, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import { CartContext } from "_/context/CartContext";

export default function Payment() {
  const cityInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const detailsInput = useRef<HTMLInputElement>(null);

  const [cartId, setCartId] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);

  const { updateCartCount } = useContext(CartContext);

  async function handleGettingUserCart() {
    const cart = await getUserCart();
    if (cart && cart.cartId) {
      setCartId(cart.cartId);
    }
  }

  useEffect(() => {
    handleGettingUserCart();
  }, []);

  // async function makeCashOrder() {
  //   const city = cityInput.current?.value.trim() || "";
  //   const phone = phoneInput.current?.value.trim() || "";
  //   const details = detailsInput.current?.value.trim() || "";

  //   if (!city || !phone || !details) {
  //     setMessage("⚠️ Please fill all fields.");
  //     return;
  //   }

  //   setLoading(true);
  //   setMessage(null);

  //   try {
  //   const isSuccessed =  await createCashOrder(cartId as string, { city, phone, details });
  //     setMessage("Order placed successfully!");
  //   } catch (error) {
  //     setMessage("Failed to place order, please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  async function makeCashOrder() {
    const city = cityInput.current?.value.trim() || "";
    const phone = phoneInput.current?.value.trim() || "";
    const details = detailsInput.current?.value.trim() || "";

    if (!city || !phone || !details) {
      setMessage("⚠️ Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await createCashOrder(cartId as string, { city, phone, details });

      toast.success("Order placed successfully!", {
        duration: 3000,
        position: "top-right",
        id: "order-toast",
      });
      updateCartCount(0);
    } catch (error: unknown) {
      let errorMessage = "Failed to place order, please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage, {
        duration: 3000,
        position: "top-right",
        id: "order-toast",
      });
    } finally {
      setLoading(false);
    }
  }

  async function makeOnlineOrder() {
    const city = cityInput.current?.value.trim() || "";
    const phone = phoneInput.current?.value.trim() || "";
    const details = detailsInput.current?.value.trim() || "";

    if (!city || !phone || !details) {
      setMessage("⚠️ Please fill all fields.");
      return;
    }

    try {
      const url = await createCheckoutSession(cartId as string, {
        city,
        phone,
        details,
      });

      if (url === false) {
        toast.error("❌ Failed to start checkout session", {
          duration: 3000,
          position: "top-right",
        });
      } else {
        window.open(url, "_self");
      }
    } catch (error: unknown) {
      let errorMessage = "Failed to place order, please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage, {
        duration: 3000,
        position: "top-right",
        id: "order-toast",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">
            Payment Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-gray-700 font-semibold">
              City
            </Label>
            <div className="relative">
              <Input
                ref={cityInput}
                id="city"
                placeholder="Enter your city"
                className="rounded-lg pl-10"
              />
              <FaMapMarkerAlt
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <Separator />

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700 font-semibold">
              Phone Number
            </Label>
            <div className="relative">
              <Input
                ref={phoneInput}
                id="phone"
                type="tel"
                placeholder="Enter your phone"
                className="rounded-lg pl-10"
              />
              <FaPhoneAlt
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <Separator />

          {/* Details */}
          <div className="space-y-2">
            <Label htmlFor="details" className="text-gray-700 font-semibold">
              Address Details
            </Label>
            <div className="relative">
              <Input
                ref={detailsInput}
                id="details"
                placeholder="Enter your full address"
                className="rounded-lg pl-10"
              />
              <FaHome
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-center font-medium ${
                message.startsWith("✅")
                  ? "text-green-600"
                  : message.startsWith("⚠️")
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              onClick={makeCashOrder}
              disabled={loading}
              className="flex-1 py-6 rounded-xl text-lg font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
              size="lg"
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2 h-5 w-5" />
              ) : (
                "Cash Payment"
              )}
            </Button>

            <Button
              onClick={makeOnlineOrder}
              disabled={loading}
              className="flex-1 py-6 rounded-xl text-lg font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
              size="lg"
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2 h-5 w-5" />
              ) : (
                "Online Checkout"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
