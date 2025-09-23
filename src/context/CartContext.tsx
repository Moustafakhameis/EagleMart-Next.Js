import { createContext, ReactNode, useState } from "react";

interface CartContextType {
  cartCount: number;
  updateCartCount: (count: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cartCount: 0,
  updateCartCount: () => {},
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  function updateCartCount(newCount: number) {
    setCartCount(newCount);
  }

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
