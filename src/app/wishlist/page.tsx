"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWishlistContext } from "../../context/WishlistContext";
import { HashLoader } from "react-spinners";
import { FaTrash} from "react-icons/fa";
import { Button } from "_/components/ui/button";
// import AddToCart from "../_Components/AddToCartButton/AddToCartButton";
import AddToCartButton from "../_Components/AddToCartButton/AddToCartButton";
import { ProductType } from "../_InterFaces/products";

export default function WishlistPage() {
  const { wishlist, loading, removeItem } = useWishlistContext();
  const [removingId, setRemovingId] = useState<string | null>(null);
  // const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  async function onRemove(id: string) {
    try {
      setRemovingId(id);
      await removeItem(id);
    } catch (err) {
      console.error("Remove failed:", err);
    } finally {
      setRemovingId(null);
    }
  }

  // async function onAddToCart(id: string) {
  //   try {
  //     setAddingToCartId(id);

  //     await new Promise((res) => setTimeout(res, 400));
  //     // show toast / update cart state...
  //   } catch (err) {
  //     console.error("Add to cart failed:", err);
  //   } finally {
  //     setAddingToCartId(null);
  //   }
  // }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader size={50} color="#ec4899" />
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen">
      <h1 className="text-center text-4xl font-extrabold mb-10 text-gray-800 dark:text-gray-200">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Your wishlist is empty 💔</p>
          <Link
            href="/products"
            className="inline-block px-5 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((item: ProductType) => (
            <div
              key={item._id}
              className="group relative border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 p-5 flex flex-col items-center shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              {/* Product Image (relative container + next/image fill) */}
              <div className="relative w-full h-48 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-200">
                <Image
                  src={item.imageCover || "/placeholder.png"}
                  alt={item.title || "product"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product Title */}
              <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mt-4 line-clamp-2">
                {item.title.split(" ", 3).join(" ")}
              </h2>

              {/* Price */}
              <p className="text-pink-600 font-bold mt-2 text-lg">
                ${item.price}
              </p>

              {/* Buttons */}
              <div className="mt-4 w-full flex items-center justify-center gap-3">
                {/* <Button
                  onClick={() => onAddToCart(item._id)}
                  disabled={addingToCartId === item._id}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {addingToCartId === item._id ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaShoppingCart size={14} />
                  )}
                  <span className="text-sm">Add to Cart</span>
                </Button> */}

                <AddToCartButton productId={item?._id} />

                <Button
                  aria-label="Remove from wishlist"
                  onClick={() => onRemove(item._id)}
                  disabled={removingId === item._id}
                  className="absolute top-2 right-2  flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {removingId === item._id ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaTrash size={14} />
                  )}
                  {/* <span className="text-sm">Remove</span> */}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
