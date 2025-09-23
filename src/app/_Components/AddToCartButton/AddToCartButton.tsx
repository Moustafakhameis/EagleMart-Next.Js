"use client";

import { addProductToCart } from "_/app/cart/cart.action";
import { Button } from "_/components/ui/button";
import { CartContext } from "_/context/CartContext";
import { useContext } from "react";
import { toast } from "sonner";

export default  function AddToCartButton({
  productId,
}: {
  productId: string;
}) {


  const {updateCartCount} = useContext(CartContext);
 async function handleAddToCart() {
    const isAddedSuccessfully = await addProductToCart(productId);

    if (isAddedSuccessfully) {
      toast.success("Product added to cart successfully", {
        duration: 3000,
        position: "top-right",
        id: "cart-toast",
      });

      updateCartCount(isAddedSuccessfully.numOfCartItems);
    } else {
      toast.error("Failed to add product to cart", {
        duration: 3000,
        position: "top-right",
        id: "cart-toast",
      });
    }
  }

  return (
    <>
      <Button
        onClick={handleAddToCart}
        className="px-6 py-3 rounded-xl bg-pink-500 text-white font-medium shadow-md hover:bg-purple-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add to Cart
      </Button>
    </>
  );
}
