import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "@apollo/client";
import tw from "twin.macro";

import { CartLayout } from "components/CartLayout";
import { GET_CART, REMOVE_ITEM_CART, UPDATE_ITEM_CART } from "queries/queries";

/* --- --- --- */

export const useCartItem = () => {
  const [cookies, setCookie] = useCookies(["cart"]);
  const { data, loading, error } = useQuery(GET_CART, {
    variables: {
      id: cookies.cart,
    },
  });

  return { data, loading, error };
};

export default function Cart() {
  const { data, loading, error } = useCartItem();

  const [removeItemCart, { data: itemRemoved }] = useMutation(REMOVE_ITEM_CART);
  const [updateItemCart] = useMutation(UPDATE_ITEM_CART);

  const handleRemove = (itemId, checkoutId) => {
    removeItemCart({
      variables: {
        lineItemIds: [itemId],
        checkoutId: checkoutId,
      },
    });
  };

  const adjustQnty = ({ id, variantId, quantity, checkoutId, type }) => {
    updateItemCart({
      variables: {
        lineItems: [
          {
            id,
            variantId,
            quantity: type === "inc" ? quantity + 1 : quantity - 1,
          },
        ],
        checkoutId,
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <CartLayout>
      {data.node.lineItems.edges.map(({ node: { id, title, quantity, variant } }) => (
        <div tw="text-left border-2 border-black p-3 my-1">
          <div>
            <b>Item:</b> {title}
          </div>
          <div>
            <b>Quantity:</b> {quantity}
          </div>
          <div>
            <b>Price $:</b> {variant.priceV2.amount}
          </div>
          <div tw="flex gap-1">
            <button onClick={() => handleRemove(id, data.node.id)} tw="bg-red-500 px-4 py-2">
              Remove Item
            </button>
            <button
              onClick={() =>
                adjustQnty({
                  id: id,
                  variantId: variant.id,
                  quantity: quantity,
                  checkoutId: data.node.id,
                  type: "dec",
                })
              }
              tw="border border-black px-4 py-2"
            >
              Decrease 1
            </button>
            <button
              onClick={() =>
                adjustQnty({
                  id: id,
                  variantId: variant.id,
                  quantity: quantity,
                  checkoutId: data.node.id,
                  type: "inc",
                })
              }
              tw="border border-black px-4 py-2"
            >
              Increment 1
            </button>
          </div>
        </div>
      ))}
      <div tw="text-left">
        <b>Total $:</b> {data.node.lineItemsSubtotalPrice.amount}
      </div>
    </CartLayout>
  );
}
