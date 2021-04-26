import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_ITEM_CART,
  CREATE_CART,
  ASSOCIATE_CUSTOMER_CART,
  CHECKOUT_SHIPPING_ADDRESS_UPDATE,
  CHECKOUT_SHIPPING_LINE_UPDATE,
} from "queries/queries";
import { useCookies } from "react-cookie";

export const useAddCart = () => {
  const [createCart, { data }] = useMutation(CREATE_CART);
  const [associateCustomerCart, { data: dataAssociateCustomerCart }] = useMutation(
    ASSOCIATE_CUSTOMER_CART
  );
  const [addItemCart] = useMutation(ADD_ITEM_CART);
  const [checkoutShippingAddressUpdate, { data: dataCheckoutShippingAddressUpdate }] = useMutation(
    CHECKOUT_SHIPPING_ADDRESS_UPDATE
  );
  const [checkoutShippingLineUpdate, { data: dataCheckoutShippingLineUpdate }] = useMutation(
    CHECKOUT_SHIPPING_LINE_UPDATE
  );

  /* --- --- --- */
  useEffect(() => {
    if (data?.checkoutCreate) {
      setCookie("cart", data.checkoutCreate.checkout.id, { path: "/" });

      console.log("executing: associateCustomerCart");
      associateCustomerCart({
        variables: {
          checkoutId: data.checkoutCreate.checkout.id,
          customerAccessToken: cookies.customerAccessToken,
        },
      });
    }
  }, [data]);

  useEffect(() => {
    if (dataAssociateCustomerCart?.checkoutCustomerAssociateV2) {
      console.log("executing: checkoutShippingAddressUpdate");
      checkoutShippingAddressUpdate({
        variables: {
          shippingAddress: {
            lastName: "Linassi",
            country: "Brazil",
            address1: "Rua Almirante Barroso, 204",
            zip: "10024",
            city: "Palmitinho",
            province: "RS",
          },
          checkoutId: data.checkoutCreate.checkout.id,
        },
      });
    }
  }, [dataAssociateCustomerCart]);

  useEffect(() => {
    if (dataCheckoutShippingAddressUpdate?.checkoutShippingAddressUpdateV2) {
      console.log("executing: checkoutShippingLineUpdate");
      checkoutShippingLineUpdate({
        variables: {
          checkoutId: data.checkoutCreate.checkout.id,
          shippingRateHandle: "Standard",
        },
      });
    }
  }, [dataCheckoutShippingAddressUpdate]);

  useEffect(() => {
    console.log({ dataCheckoutShippingLineUpdate });
  }, [dataCheckoutShippingLineUpdate]);

  /* --- --- --- */

  const [cookies, setCookie] = useCookies(["cart", "customerAccessToken"]);

  const addToCartHandler = (variantId, quantity) => {
    // If there's not a cart for the session, create a new one
    // else, just add item to the cart
    if (!cookies.cart) {
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

  return { addToCartHandler };
};

const AddCart = ({ variantId, quantity }) => {
  const { addToCartHandler } = useAddCart();

  const handleClick = () => {
    addToCartHandler(variantId, quantity);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-block w-full px-4 py-2 mt-2 text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200"
    >
      Add Cart
    </button>
  );
};

export default AddCart;
