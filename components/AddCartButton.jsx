import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ITEM_CART, CREATE_CART } from "queries/queries";
import { useCookies } from "react-cookie";

const AddCart = ({ variantId, quantity }) => {
  const [createCart, { data }] = useMutation(CREATE_CART);
  const [addItemCart] = useMutation(ADD_ITEM_CART);
  const [cookies, setCookie] = useCookies(["cart"]);

  const addToCartHandler = (variantId, quantity) => {
    // If there's not a cart for the session, create a new one
    // else, just add item to the cart
    if (JSON.stringify(cookies) === "{}") {
      createCart({
        variables: {
          input: {
            lineItems: [
              {
                variantId,
                quantity,
              },
            ],
          },
        },
      });
    } else {
      addItemCart({
        variables: {
          lineItems: [
            {
              variantId,
              quantity,
            },
          ],
          checkoutId: cookies.cart,
        },
      });
    }
  };

  useEffect(() => {
    if (data?.checkoutCreate) {
      setCookie("cart", data.checkoutCreate.checkout.id, { path: "/" });
    }
  }, [data]);

  const handleClick = () => {
    addToCartHandler(variantId, quantity);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-500 rounded-md px-4 py-2 w-full mt-2"
    >
      Add Cart
    </button>
  );
};

export default AddCart;
