"use client";

import { CartContextProvider } from "_/context/CartContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function MySessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </SessionProvider>
    </>
  );
}
