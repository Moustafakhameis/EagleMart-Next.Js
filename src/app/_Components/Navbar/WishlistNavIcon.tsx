// "use client";

// import Link from "next/link";
// import { FaHeart } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { getWishlist } from "_/app/_services/wishlist.service";

// export default function WishlistNavIcon() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     async function fetchWishlist() {
//       try {
//         const res = await getWishlist();
//         setCount(res.data.length);
//       } catch (err) {
//         console.error("Failed to fetch wishlist:", err);
//       }
//     }
//     fetchWishlist();
//   }, []);

//   return (
//     <Link
//       href="/wishlist"
//       className="relative cursor-pointer nav-link-RS flex items-center space-x-2 group"
//     >
//       <FaHeart
//         size={25}
//         className="group-hover:animate-bounce text-gray-700 dark:text-gray-300 hover:text-red-600"
//       />

//       {/* Badge */}
//       {count > 0 && (
//         <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
//           {count}
//         </span>
        
//       )}
//     </Link>
//   );
// }




"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useWishlistContext } from "_/context/WishlistContext";

export default function WishlistNavIcon() {
  const { wishlist } = useWishlistContext();

  return (
    <Link
      href="/wishlist"
      className="relative flex items-center group"
    >
      <FaHeart
        size={24}
        className="text-gray-700 dark:text-gray-300 group-hover:text-red-600 transition"
      />
      {wishlist.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {wishlist.length}
        </span>
      )}
    </Link>
  );
}
