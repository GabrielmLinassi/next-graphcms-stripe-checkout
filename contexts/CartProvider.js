import { createContext, useReducer } from "react";
import { cartReducer, initializer } from "reducers/CartReducer";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], initializer);

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
