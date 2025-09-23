'use client';
import { Button } from "_/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "_/components/ui/tooltip";
import { CartContext } from "_/context/CartContext";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa6";
import { clearUserCart } from "./cart.action";
import { toast } from "sonner";

export default function CartRemoveButton() {
  const { updateCartCount } = useContext(CartContext);

  async function handleRemoveItem() {
    const outPut = await clearUserCart();

    if (outPut == null) {
      toast.error("Could not clear cart", {
        duration: 3000,
        position: "top-right",
        id: "remove-toast",
      });
    } else {
      toast.success("Cart cleared successfully", {
        duration: 3000,
        position: "top-right",
        id: "remove-toast",
      });
      updateCartCount(outPut.numOfCartItems);
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleRemoveItem}
            variant="outline"
            className="w-40 h-12 border-2 border-red-500 text-red-600 hover:bg-red-50 font-medium rounded-lg flex items-center justify-center gap-2 
            transition-all duration-300 hover:scale-105"
          >
            <FaTrash className="text-lg" />
            Remove All
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clear your cart</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
