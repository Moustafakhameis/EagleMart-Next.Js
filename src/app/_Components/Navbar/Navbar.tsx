"use client";

import { useContext, useEffect, useState } from "react";
import LogoTypewriter from "./LogoTypewriter";
import Logo from "_/assets/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { GrLogin, GrLogout } from "react-icons/gr";
import { LuCircleUserRound } from "react-icons/lu";
import { MdShoppingCartCheckout } from "react-icons/md";

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import WishlistNavIcon from "./WishlistNavIcon";
import { getUserCart } from "_/app/_services/cart.service";

import { CartContext } from "_/context/CartContext";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
  ];

const { data: session } = useSession();
const isAuthenticated = !!session;

const [initialCartCount, setCartCount] = useState(0);
const { cartCount } = useContext(CartContext);

useEffect(() => {
    getUserCart().then((res) => {
        setCartCount(res?.numOfCartItems ?? 0);
    });
}, []);








  function handleLogout() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }

  return (
    <nav className="bg-white sticky top-0 z-100 w-full border-gray-200 dark:bg-gray-900 shadow-md p-2">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          title="Home"
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="relative w-8 h-8 mt-2 me-4">
            <Image
              src={Logo}
              alt="Logo"
              // fill
              className="object-contain transform scale-300"
              priority
            />
          </div>
          <LogoTypewriter />
        </Link>

        {/* Mobile button */}
        <button
          title="Mobile Menu"
          onClick={() => setOpen(!open)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navbar links (desktop center) */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex space-x-8 font-medium">
            {/* <li>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link href="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="nav-link">
                Catrgories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="nav-link">
                Brands
              </Link>
            </li> */}

            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link p-1.5 ${
                    pathname === link.href
                      ? `text-pink-600 dark:text-pink-500
bg-pink-200/80 hover:bg-pink-300
font-semibold px-3 py-1.5
border-2 border-pink-500
rounded-2xl
shadow-[0_2px_2px_rgba(0,0,0,0.05),
0_6px_12px_rgba(0,0,0,0.08),
0_12px_24px_rgba(0,0,0,0.10),
0_20px_40px_rgba(0,0,0,0.08),
0_0_20px_rgba(236,72,153,0.25)]
`
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {!isAuthenticated && (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="nav-link-RS flex items-center space-x-2 group"
              >
                <span>Login</span>
                <GrLogin className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:animate-bounce" />
              </Link>
              {/* register */}
              <Link
                href="/register"
                className=" nav-link-RS flex items-center space-x-2 group"
              >
                <span>Register</span>
                <LuCircleUserRound className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:animate-bounce" />
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              {/* wishlist */}
              {/* <Link href="/wishlist" className=" cursor-pointer nav-link-RS flex items-center space-x-2 group">
                <FaHeart
                  size={25}
                  className=" group-hover:animate-bounce text-gray-700 dark:text-gray-300 hover:text-red-600"
                />
              </Link> */}

              <WishlistNavIcon />

              {/* Cart */}
              <Link
                href="/cart"
                className="nav-link-RS flex items-center space-x-1 group relative"
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-10 h-8 text-gray-700 dark:text-gray-300 transition-transform duration-500 ease-in-out ${
                    isCartHovered ? "animate-back-and-forth" : ""
                  }`}
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  <path d="M19.16 11H8.5"></path>
                  <path d="M11 6h8.72a2 2 0 0 1 2 1.61L23 11"></path>
                </svg>
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                  { cartCount || initialCartCount}
                </span>
              </Link>
              {/* <Link
            href="/cart"
            className="nav-link-RS flex items-center space-x-2 group relative"
          >
            <span>Cart</span>
            <MdShoppingCartCheckout className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:animate-spin" />
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
              3
            </span>
          </Link> */}

              {/* Logout */}
              <span
                onClick={handleLogout}
                className=" cursor-pointer nav-link-RS flex items-center space-x-2 group"
              >
                <span>Logout</span>
                <GrLogout className="w-5 h-5 group-hover:animate-bounce text-gray-700 dark:text-gray-300" />
              </span>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-700 ease-in-out ${
          open ? "min-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-3 font-medium px-5 py-4">
          {/* Main links */}
          <li>
            <Link
              href="/"
              className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/brands"
              className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Brands
            </Link>
          </li>

          {/* Separator */}
          <li className="list-none">
            <div className="h-px bg-gray-300 dark:bg-gray-600 my-2"></div>
          </li>
          {!isAuthenticated && (
            <>
              {/* Login */}
              <li>
                <Link
                  href="/login"
                  className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <span>Login</span>
                  <GrLogin className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:animate-bounce" />
                </Link>
              </li>
              {/* register */}

              <li>
                <Link
                  href="/register"
                  className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <span>Register</span>
                  <GrLogin className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:animate-bounce" />
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              {/* wishList */}
              <li>
                {/* <Link
                  href="/wishlist"
                  className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative"
                >
                  <span>Favorites List</span>
                  <FaHeart
                    size={25}
                    className=" group-hover:animate-bounce text-gray-700 dark:text-gray-300 hover:text-red-600"
                  />
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                    3
                  </span>
                </Link> */}
                <WishlistNavIcon />
              </li>

              {/* Cart */}
              <li>
                <Link
                  href="/cart"
                  className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative"
                >
                  <span>Cart</span>
                  <MdShoppingCartCheckout className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:animate-spin" />
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                   { cartCount || initialCartCount}
                  </span>
                </Link>
              </li>

              {/* Logout */}
              <li>
                <span className=" flex cursor-pointer items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                  <span>Logout</span>
                  <GrLogout className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:animate-bounce" />
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
