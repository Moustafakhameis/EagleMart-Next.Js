// import { checkCookie } from "_/utils/utils";

// import { FaStar } from "react-icons/fa";
// import { CartResponse } from "../_InterFaces/cart";

// export default async function Cart() {
//   async function getUserCart(): Promise<CartResponse | null> {
//     const token = await checkCookie();

//     if (!token) return null;

//     const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         token: token as string,
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     const finalRes: CartResponse = await res.json();
//     return finalRes;
//   }

//   const cart = await getUserCart();

//   if (!cart) {
//     return (
//       <div className="p-6 text-center text-gray-500 text-lg">
//         Your cart is empty 🛒
//       </div>
//     );
//   }

//   return (
//     <main className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-8 text-pink-600">
//         🛍️ Shopping Cart ({cart.numOfCartItems} items)
//       </h1>

//       <div className="space-y-6">
//         {cart.data.products.map(({ product, count, price }) => (
//           <div
//             key={product._id}
//             className="flex items-center gap-6 bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all"
//           >
//             {/* Product Image */}
//             <img
//               src={product.imageCover || "/placeholder.png"}
//               alt={product.title}
//               className="w-28 h-28 object-cover rounded-lg border"
//             />

//             {/* Product Info */}
//             <div className="flex-1">
//               <h2 className="text-xl font-semibold">{product.title}</h2>
//               <p className="text-sm text-gray-500">
//                 {product.category?.name || "Uncategorized"} ·{" "}
//                 {product.brand?.name || "No Brand"}
//               </p>

//               {/* Rating */}
//               <div className="flex items-center gap-1 mt-2">
//                 {Array.from(
//                   { length: Math.round(product.ratingsAverage || 0) },
//                   (_, i) => (
//                     <FaStar key={i} className="text-yellow-500" />
//                   )
//                 )}
//                 <span className="text-sm text-gray-500 ml-2">
//                   {product.ratingsAverage || 0} / 5
//                 </span>
//               </div>

//               {/* Quantity + Stock */}
//               <p className="text-sm mt-2">
//                 Quantity:{" "}
//                 <span className="font-medium text-gray-800">{count}</span>
//               </p>
//               <p
//                 className={`text-sm mt-1 ${
//                   (product.quantity || 0) > 0
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {(product.quantity || 0) > 0 ? "In Stock" : "Out of Stock"}
//               </p>
//             </div>

//             {/* Price */}
//             <div className="text-right">
//               <p className="text-lg font-bold text-pink-600">{price} EGP</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Total */}
//       <div className="mt-10 flex justify-between items-center border-t pt-6">
//         <span className="text-2xl font-bold">Total:</span>
//         <span className="text-3xl font-bold text-green-600">
//           {cart.data.totalCartPrice} EGP
//         </span>
//       </div>
//     </main>
//   );
// }

import { CartResponse } from "../_InterFaces/cart";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "_/components/ui/table";
import { Button } from "_/components/ui/button";
import { Input } from "_/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "_/components/ui/tooltip";
import Link from "next/link";
import { getUserCart } from "../_services/cart.service";
import CartRemoveButton from "./CartRemoveAllButton";
import CartRemoveItemButton from "./CartRemoveItemButton";
import ChangeCountButton from "./ChangeCountButton";

export default async function Cart() {
  async function handleUserCart(): Promise<CartResponse | null> {
    const res = await getUserCart();

    return res;
  }

  const cart = await handleUserCart();

  if (!cart) {
    return (
      <div className="p-6 text-center text-gray-500 text-lg">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-pink-600">
        🛍️ Shopping Cart ({cart.numOfCartItems} items)
      </h1>

      {/*Actions */}
      <div className="mt-10 mb-6 flex flex-col sm:flex-row justify-center items-center gap-6 border-t pt-6">
        <div className="flex flex-wrap gap-4">
          {/* Continue Shopping */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/products"}
                  className="w-40 h-12 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg flex items-center justify-center 
      transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                >
                  🛍 Continue
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Continue Shopping</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Remove All with Tooltip */}
          <CartRemoveButton />
          {/* Payment Button with Tooltip */}
          <Link href="/cart/payment">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="w-40 h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
            text-white font-medium rounded-lg flex items-center justify-center gap-2 
            transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                  >
                    💳 Pay Now
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Proceed to checkout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </div>
      </div>

      <Table>
        <TableCaption>
          {cart.numOfCartItems > 0
            ? `You have ${cart.numOfCartItems} items in your cart`
            : "Your cart is empty"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Brand</TableHead>
            <TableHead className="text-center">Rating</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.data.products.map(({ product, count, price }) => (
            <TableRow key={product._id}>
              {/* Product */}
              <TableCell className="flex items-center gap-3 font-medium">
                <Image
                  src={product.imageCover || "/placeholder.png"}
                  alt={product.title}
                  width={60}
                  height={60}
                  className="rounded-md border object-cover"
                />
                <span>{product.title.split(" ", 3).join(" ")}</span>
              </TableCell>

              <TableCell className="text-center">
                {product.category?.name || "-"}
              </TableCell>
              <TableCell className="text-center">
                {product.brand?.name || "-"}
              </TableCell>

              {/* Rating */}
              <TableCell>
                <div className="flex justify-center items-center gap-1">
                  {Array.from(
                    { length: Math.round(product.ratingsAverage || 0) },
                    (_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    )
                  )}
                  <span className="text-sm ml-1 text-gray-500">
                    {product.ratingsAverage || 0}/5
                  </span>
                </div>
              </TableCell>

              {/* Quantity Counter */}

              {/* Quantity Counter */}
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 bg-gray-200 flex items-center justify-center hover:bg-white"
                  >
                    <FaMinus />
                  </Button> */}
                  <ChangeCountButton
                    isIcrement={false}
                    productId={product.id}
                    newCount={count - 1}
                  />
                  <Input
                    type="text"
                    value={count}
                    readOnly
                    className="w-12 h-8 text-center text-sm font-medium"
                  />
                  <ChangeCountButton
                    isIcrement={true}
                    productId={product.id}
                    newCount={count + 1}
                  />
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 bg-gray-200 flex items-center justify-center hover:bg-white"
                  >
                    <FaPlus />
                  </Button> */}
                </div>
              </TableCell>

              <TableCell
                className={
                  (product.quantity || 0) > 0
                    ? "text-green-600 text-center"
                    : "text-red-600 text-center"
                }
              >
                {(product.quantity || 0) > 0 ? "In Stock" : "Out of Stock"}
              </TableCell>

              <TableCell className="text-center font-semibold text-pink-600">
                {price} EGP
              </TableCell>

              {/* Remove */}
              <TableCell className="text-center">
                <CartRemoveItemButton productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Total */}
      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <span className="text-2xl font-bold">Total:</span>
        <span className="text-3xl font-bold text-green-600">
          {cart.data.totalCartPrice} EGP
        </span>
      </div>
    </main>
  );
}

{
  /* <TableCell>
          <div className="flex items-center justify-center gap-2">
          <Button className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
              <FaMinus />
              </Button>
              <span className="w-8 text-center font-medium">{count}</span>
              <Button className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
              <FaPlus />
              </Button>
          </div>
        </TableCell> */
}
