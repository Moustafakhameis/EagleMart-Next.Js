"use client";

import { Button } from "_/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { changeCountFromCart } from "./cart.action";
import { toast } from "sonner";
import { useContext } from "react";
import { CartContext } from "_/context/CartContext";

export default function ChangeCountButton({
  isIcrement = false,
  productId,
  newCount,
}: {
  isIcrement?: boolean;
  productId: string;
  newCount: number;
}) {



const { updateCartCount } = useContext(CartContext)


    async function handleChangeCount() {
    const outPut = await changeCountFromCart(productId, newCount);

    if (outPut == null) {
      toast.error("Error occurred , please try again ", {
        duration: 3000,
        position: "top-right",
        id: "remove-toast",
      });
    } else {
      toast.success(`product count updated to ${newCount}`, {
        duration: 3000,
        position: "top-right",
        id: "remove-toast",
      });

      updateCartCount(outPut.numOfCartItems);
    }
  }

  return (
    <>
      <Button
        onClick={handleChangeCount}
        disabled={newCount <= 0}
        variant="ghost"
        size="sm"
        className="h-8 w-8 bg-gray-200 flex items-center justify-center hover:bg-white"
      >
        {isIcrement ? <FaPlus /> : <FaMinus />}
      </Button>
    </>
  );
}
