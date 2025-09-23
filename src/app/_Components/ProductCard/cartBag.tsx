"use client";
import { addProductToCart } from "_/app/cart/cart.action";
import { CartContext } from "_/context/CartContext";
import { useContext } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { toast } from "sonner";

export default function CartBag({ productId }: { productId: string }) {


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
    <div
      onClick={handleAddToCart}
      className="bg-white rounded-tr-3xl rounded-tl-3xl pt-12 pe-2 ps-2 cursor-pointer -mt-6 flex justify-center items-center relative"
    >
      <div className="absolute top-1 text-white bg-black rounded-full border-8 border-white p-4 cursor-pointer hover:scale-105 transition-all duration-500 -mt-6 hover:shadow-lg hover:bg-pink-500 hover:border-black hover:text-black">
        <FaBagShopping size={26} className="text-inherit" />
      </div>
    </div>
  );
}
