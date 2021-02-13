import { createContext, useEffect, useState } from "react";
import produce from "immer";
import { useAuth } from "contexts/auth";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [carts, setCarts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      const syncedCarts = JSON.parse(localStorage.getItem("Carts")) || [];
      const hasUserCart = syncedCarts.find((x) => x.user === user.sub);

      hasUserCart
        ? setCarts(syncedCarts)
        : setCarts(() => {
            return [...syncedCarts, { user: user.sub, items: [] }];
          });
    } else {
      const syncedCarts = JSON.parse(localStorage.getItem("Carts")) || [];
      const hasUserCart = syncedCarts.find((x) => x.user === "");

      hasUserCart ? setCarts(syncedCarts) : setCarts([{ user: "", items: [] }]);
    }
  }, [user]);

  useEffect(() => {
    if (carts.length) {
      localStorage.setItem("Carts", JSON.stringify(carts));

      console.log("carts ==>", carts);

      setCart(() => {
        if (user) {
          const cart = carts.find((cart) => cart.user === user.sub);
          const cartItems = cart.items;
          return cartItems;
        } else {
          const cart = carts.find((cart) => cart.user === "");
          const cartItems = cart.items;
          return cartItems;
        }
      });
    }
  }, [carts]);

  const addCart = (slug, quantity) => {
    if (user) {
      const userCart = carts.find((cart) => cart.user === user.sub);
      const idxUserCart = carts.indexOf(userCart);
      const repeatedItem = userCart.items?.find((item) => item.slug === slug);
      const idxRepeatedItem = userCart.items.indexOf(repeatedItem);

      if (idxRepeatedItem > -1) {
        const newState = produce(carts, (draftState) => {
          draftState[idxUserCart].items[idxRepeatedItem] = {
            slug: slug,
            quantity:
              draftState[idxUserCart].items[idxRepeatedItem].quantity +
              quantity,
          };
        });
        setCarts(newState);
      } else {
        const newState = produce(carts, (draftState) => {
          draftState[idxUserCart].items.push({ slug, quantity });
        });
        setCarts(newState);
      }
    } else {
      const userCart = carts.find((cart) => cart.user === "");
      const idxUserCart = carts.indexOf(userCart);
      const repeatedItem = userCart.items?.find((item) => item.slug === slug);
      const idxRepeatedItem = userCart.items.indexOf(repeatedItem);

      if (idxRepeatedItem > -1) {
        const newState = produce(carts, (draftState) => {
          draftState[idxUserCart].items[idxRepeatedItem] = {
            slug: slug,
            quantity:
              draftState[idxUserCart].items[idxRepeatedItem].quantity +
              quantity,
          };
        });
        setCarts(newState);
      } else {
        const newState = produce(carts, (draftState) => {
          draftState[idxUserCart].items.push({ slug, quantity });
        });
        setCarts(newState);
      }
    }
  };

  const clearCart = () => {
    const userCart = carts.find((cart) => cart.user === user.sub);
    const idxUserCart = carts.indexOf(userCart);

    const newState = produce(carts, (draftState) => {
      draftState[idxUserCart].items = [];
    });
    setCarts(newState);
  };

  const removeCartItem = (slug) => {
    const userCart = carts.find((cart) => cart.user === user.sub);
    const idxUserCart = carts.indexOf(userCart);
    const item = userCart.items.find((item) => item.slug === slug);

    const newState = produce(carts, (draftState) => {
      draftState = [
        ...draftState.slice(0, idxUserCart),
        {
          ...draftState[idxUserCart],
          items: draftState[idxUserCart].items.filter(
            (item) => item.slug !== slug
          ),
        },
        ...draftState.slice(idxUserCart + 1),
      ];
      return draftState;
    });

    setCarts(newState);
  };

  return (
    <Context.Provider value={{ cart, addCart, clearCart, removeCartItem }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
