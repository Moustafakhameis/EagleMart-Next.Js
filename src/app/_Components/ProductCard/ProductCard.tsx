import { FaStar } from "react-icons/fa";
import { ProductCardType } from "./ProductCard.types";

import { TbLetterQ } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import WishlistButton from "./WishlistButton";
// import { getWishlist } from "_/app/_services/wishlist.service";
// import { Button } from "_/components/ui/button";

import CartBag from "./cartBag";

export default async function ProductCard({ product }: ProductCardType) {
  //  const wishlist = await getWishlist();
  // const added = wishlist.data.some((item: any ) => item._id === product._id);
  return (
    <>
      <div
        key={product.id}
        className="relative w-75 rounded-3xl overflow-hidden bg-white shadow-[10px_10px_20px_#eab3c0,-10px_-10px_20px_#ffffff] hover:shadow-[0px_0px_25px_#d77c87,0px_0px_25px_#ffffff] transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        {/* Product Image */}
        <div className="h-64 flex items-center justify-center bg-white border-t-4 border-b-4 border-white overflow-hidden">
          <Image
            src={product.imageCover}
            alt={product.title}
            className="max-h-full w-full object-contain "
            width={500}
            height={500}
            priority
          />

          {/* Heart Icon */}
          <div className="absolute top-1 right-1 border-5 border-black bg-white text-black rounded-full duration-500 cursor-pointer shadow hover:scale-110  transition-transform hover:shadow-lg hover:text-red-600 hover:border-5  hover:bg-pink-300 ">
            {/* <FaHeart size={20} className="text-inherit" /> */}
            {/* <WishlistButton productId={product.id} initialAdded={added} /> */}
            <WishlistButton productId={product.id} />
          </div>
        </div>

        {/* Shopping Bag & Details */}
        <div className="flex flex-col items-center">
          {/* Shopping Bag Icon */}

          <CartBag productId={product?._id} />

          {/* <div className="bg-white rounded-tr-3xl rounded-tl-3xl pt-12 pe-2 ps-2 -mt-6 flex justify-center items-center relative">
      <Button
        variant="ghost"
        className="absolute top-1 text-white bg-black rounded-full border-8 border-white w-20 p-8 cursor-pointer hover:scale-105 transition-all duration-500 -mt-6 hover:shadow-lg hover:bg-pink-500 hover:border-black hover:text-black"
      >
        <FaBagShopping size={24} className="text-inherit" />
      </Button>
    </div> */}

          {/* Product Details */}
          <div className="mt-1 text-center px-2 relative w-70 mb-2">
            <div className="flex justify-between items-center mb-2 mt-2">
              <div className="flex items-center">
                <i className="flex mb-0.5">
                  <TbLetterQ size={20} />
                </i>{" "}
                <span className="mr-1">:</span>
                <p className="text-sm text-gray-500"> {product.quantity}</p>
              </div>
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                {/* {product.title.split(" ").slice(0, 3).join(" ")} */}
                {product.brand.name}
              </h3>
              {/* Rating */}
              <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                <p className="  ">{product.ratingsAverage}</p>{" "}
                <FaStar size={16} className="text-yellow-400 mb-0.5" />
              </div>
            </div>
            <div className="flex justify-center items-center mb-2 mt-2">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                {/* {product.title.split(" ").slice(0, 3).join(" ")} */}
                {product.title.split(" ", 3).join(" ")}
              </h3>
              {/* Rating */}
            </div>
            {/* <p className="text-lg font-bold text-gray-900">${product.priceAfterDiscount ?? product.price}</p> */}
            <p className="text-lg font-bold text-gray-900">
              {product.priceAfterDiscount ? (
                <>
                  <span>${product.priceAfterDiscount}</span>{" "}
                  <span className="text-sm text-gray-500 line-through ml-4">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span>${product.price}</span>
              )}
            </p>
          </div>
        </div>

        {/* Learn More Button */}
        <div className="p-4 flex justify-center">
          <Link
            href={`/productDetails/${product.id}`}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-500 hover:from-pink-500 hover:via-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:shadow-lg hover:shadow-blue-500/50"
          >
            Learn More
          </Link>
        </div>
      </div>
    </>
  );
}
