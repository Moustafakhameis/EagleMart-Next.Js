'use client';
import { Button } from "_/components/ui/button";
import { FaTrash } from "react-icons/fa6";
import { removeItemFromCart } from "./cart.action";
import { toast } from "sonner";
import { useContext } from "react";
import { CartContext } from "_/context/CartContext";


export default function CartRemoveItemButton( {productId} : {productId: string}) {



    const {updateCartCount} =   useContext(CartContext);
    async function handleRemoveItem() {
        

   const outPut =    await removeItemFromCart(productId);


   if(outPut == null){
    toast.error("could not remove item", { duration: 3000 , position: "top-right", id: "remove-toast" });
   }else{
    toast.success("item removed successfully", { duration: 3000 , position: "top-right", id: "remove-toast" });
    updateCartCount(outPut.numOfCartItems);
   }

      }



    
  return (
    <>
    
    
    
    
      <Button onClick={handleRemoveItem} className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200">
                      <FaTrash />
                    </Button>
    
    
    
    
    
    </>
  )
}
