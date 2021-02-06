import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addCart = (slug, quantity) => {
    const idx = cart.findIndex((cartProduct) => cartProduct.slug === slug);
    if (idx !== -1) {
      const repeatedProd = cart[idx];
      setCart([
        ...cart.slice(0, idx),
        { ...repeatedProd, quantity: repeatedProd.quantity + quantity },
        ...cart.slice(idx + 1),
      ]);
    } else {
      setCart([
        ...cart,
        {
          slug,
          quantity,
        },
      ]);
    }
  };

  const clearCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <Context.Provider value={{ cart, addCart, clearCart }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
