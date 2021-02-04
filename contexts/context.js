import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [cart, setCart] = useState([]);

  // persist context on localStorage
  // useEffect(() => {}, [cart])

  const addCart = (slug, quantity) => {
    setCart([
      ...cart,
      {
        slug,
        quantity,
      },
    ]);
  };

  return (
    <Context.Provider value={{ cart, addCart }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
