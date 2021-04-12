import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  products: [],
  product: {},
};

// Actions
const productsFound = (data) => ({
  type: "PRODUCTS_FOUND",
  payload: data,
});

// Reducer
export const shopifyReducer = (state, action) => {
  switch (action.type) {
    case "PRODUCTS_FOUND":
      return { ...state, products: action.payload };
    case "PRODUCT_FOUND":
      return { ...state, product: action.payload };
    default:
      return state;
  }
};

// Context
const ShopifyContext = createContext();

function ShopifyProvider({ children }) {
  const [shopify, dispatch] = useReducer(shopifyReducer, initialState);

  async function fetchProduct(id) {
    const response = await fetch(`/api/shopify/product?id=${id}`);
    const product = await response.json();
    dispatch(productFound(product));
  }

  async function fetchProducts() {
    const response = await fetch(`/api/shopify/products`);
    const products = await response.json();
    dispatch(productsFound(products));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ShopifyContext.Provider value={{ shopify, dispatch, fetchProduct, fetchProducts }}>
      {children}
    </ShopifyContext.Provider>
  );
}

const useShopify = () => useContext(ShopifyContext);

export { ShopifyProvider, useShopify };
