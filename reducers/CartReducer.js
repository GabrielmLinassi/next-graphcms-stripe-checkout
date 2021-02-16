const initialState = [];

export const initializer = (initialValue = initialState) => {
  return initialValue;
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state.find((item) => item.slug === action.item.slug)
        ? state.map((item) =>
            item.slug === action.item.slug
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          )
        : [...state, { ...action.item, quantity: 1 }];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.slug !== action.item.slug);

    case "DECREMENT_QUANTITY":
      return state.find((item) => item.slug === action.item.slug)?.quantity ===
        1
        ? state.filter((item) => item.slug !== action.item.slug)
        : state.map((item) =>
            item.slug === action.item.slug
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          );

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

export const addToCart = (item) => ({
  type: "ADD_TO_CART",
  item,
});

export const removeFromCart = (item) => ({
  type: "REMOVE_FROM_CART",
  item,
});

export const decrementItemQuantity = (item) => ({
  type: "DECREMENT_QUANTITY",
  item,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});
