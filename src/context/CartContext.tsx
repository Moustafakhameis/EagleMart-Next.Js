import { createContext, ReactNode, useState, useEffect } from "react";
import { getUserCart } from "_/app/_services/cart.service";

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

  useEffect(() => {
    getUserCart().then((res) => {
      setCartCount(res?.numOfCartItems ?? 0);
    }).catch((err) => console.error(err));
  }, []);

  function updateCartCount(newCount: number) {
    setCartCount(newCount);
  }

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
