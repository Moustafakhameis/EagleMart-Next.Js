// "use client";

// import { FaHeart } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import { addToWishlist, removeFromWishlist, getWishlist } from "_/app/_services/wishlist.service";

// interface Props {
//   productId: string;
// }

// export default function WishlistButton({ productId }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [added, setAdded] = useState(false);


//   useEffect(() => {
//     async function checkWishlist() {
//       try {
//         const res = await getWishlist();
//         const exists = res.data.some((item: any) => item._id === productId);
//         setAdded(exists);
//       } catch (err) {
//         console.error("Error checking wishlist:", err);
//       }
//     }
//     checkWishlist();
//   }, [productId]);

//   async function handleClick() {
//     try {
//       setLoading(true);
//       if (added) {
//         await removeFromWishlist(productId);
//         setAdded(false);
//       } else {
//         await addToWishlist(productId);
//         setAdded(true);
//       }
//     } catch (err) {
//       console.error("Wishlist toggle failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div
//       onClick={handleClick}
//       className={`${
//         added ? "bg-pink-300 text-red-600" : "bg-white text-black"
//       } rounded-full p-2 cursor-pointer shadow transition-transform duration-300 hover:scale-110 hover:shadow-lg ${
//         loading ? "opacity-50 pointer-events-none" : ""
//       }`}
//     >
//       <FaHeart size={20} className={added ? "text-red-600" : "text-inherit"} />
//     </div>
//   );
// }


// "use client";

// import { addToWishlist, removeFromWishlist } from "_/app/_services/wishlist.service";
// import { useState } from "react";

// import { FaHeart } from "react-icons/fa";

// export default function WishlistButton({ productId, initialAdded }: { productId: string; initialAdded: boolean }) {
//   const [added, setAdded] = useState(initialAdded);
//   const [loading, setLoading] = useState(false);

//   async function handleClick() {
//     setLoading(true);
//     try {
//       if (added) {
//         await removeFromWishlist(productId);
//         setAdded(false);
//       } else {
//         await addToWishlist(productId);
//         setAdded(true);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div
//       onClick={handleClick}
//       className={`${added ? "bg-pink-300" : "bg-white"} rounded-full p-2 cursor-pointer`}
//     >
//       <FaHeart size={20} className={added ? "text-red-600" : "text-black"} />
//     </div>
//   );
// }














// "use client";

// import { FaHeart } from "react-icons/fa";
// import { useWishlistContext } from "_/context/WishlistContext";
// import { useEffect, useState } from "react";

// interface Props {
//   productId: string;
// }

// export default function WishlistButton({ productId }: Props) {
//   const { wishlist, addItem, removeItem } = useWishlistContext();
//   const [added, setAdded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const exists = wishlist.some((item) => item._id === productId);
//     setAdded(exists);
//   }, [wishlist, productId]);

//   async function handleClick() {
//     try {
//       setLoading(true);
//       if (added) {
//         await removeItem(productId);
//       } else {
//         await addItem(productId);
//       }
//     } catch (err) {
//       console.error("Wishlist toggle failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div
//       onClick={handleClick}
//       className={`${
//         added ? "bg-pink-300 text-red-600" : "bg-white text-black"
//       } rounded-full p-2 cursor-pointer shadow transition-transform duration-300 hover:scale-110 hover:shadow-lg ${
//         loading ? "opacity-50 pointer-events-none" : ""
//       }`}
//     >
//       <FaHeart size={20} className={added ? "text-red-600" : "text-inherit"} />
//     </div>

//   );
// }














"use client";

import { FaHeart } from "react-icons/fa";
import { useWishlistContext } from "_/context/WishlistContext";
import { useState } from "react";
import { BounceLoader } from "react-spinners";
import { ProductType } from "_/app/_InterFaces/products";

export default function WishlistButton({ productId }: { productId: string }) {
  const { wishlist, addItem, removeItem } = useWishlistContext();
  const [loading, setLoading] = useState(false);

  const isInWishlist = wishlist.some((item: ProductType) => item._id === productId);

  async function toggleWishlist() {
    try {
      setLoading(true);
      if (isInWishlist) {
        await removeItem(productId);
      } else {
        await addItem(productId);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      disabled={loading}
      onClick={toggleWishlist}
      className={`p-2 rounded-full transition ${
        isInWishlist ? "bg-pink-300 text-red-600" : "bg-white text-black"
      }`}
    >
      {loading ? (
        <span className="   flex items-center justify-center">
          
          <BounceLoader size={22} color="black" /></span>
      ) : (
        <FaHeart size={22} />
      )}
    </button>
  );
}
