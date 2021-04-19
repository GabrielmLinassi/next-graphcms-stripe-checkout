import { useContext, useEffect, useState } from "react";
import { gql, GraphQLClient } from "graphql-request";
import { useCookies } from "react-cookie";

import { useAuth } from "contexts/auth";
import { CartContext } from "contexts/CartProvider";
import { clearCart, removeFromCart } from "reducers/CartReducer";

import { PayButton } from "components/PayBtn";
import Layout from "components/Layout";
import { Total } from "components/Total";
import { CartLayout } from "components/CartLayout";
import { Products } from "components/Products";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CART, REMOVE_ITEM_CART, UPDATE_ITEM_CART } from "queries/queries";
import tw from "twin.macro";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default function Cart() {
  // const [products, setProducts] = useState([]);
  // const { cart, dispatch } = useContext(CartContext);
  // const { user } = useAuth();
  // const [customerId, setCustomerId] = useState();

  /*useEffect(() => {
    if (!user) {
      return;
    }
    setCustomerId(user.sub);
  }, [user]);*/

  /*useEffect(async () => {
    if (cart.length < 1) {
      return;
    }

    const data = await graphcms.request(
      gql`
        query ProductListQuery($slugs: [String!]) {
          products(where: { slug_in: $slugs }) {
            id
            name
            slug
            price
            images(first: 1) {
              url
              width
              height
              fileName
            }
          }
        }
      `,
      {
        slugs: cart.map((x) => x.slug),
      }
    );
    setProducts(data.products);
  }, [cart]);*/

  const [cookies, setCookie] = useCookies(["cart"]);

  const { data, loading, error } = useQuery(GET_CART, {
    variables: {
      id: cookies.cart,
    },
  });

  const [removeItemCart, { data: itemRemoved }] = useMutation(REMOVE_ITEM_CART);

  const [updateItemCart] = useMutation(UPDATE_ITEM_CART);

  useEffect(() => {
    console.log({ itemRemoved });
  }, [itemRemoved]);

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
      <div tw="text-left">
        <b>Cart ID:</b> {data.node.id}
      </div>
      {data.node.lineItems.edges.map(({ node: { id, title, quantity, variant } }) => (
        <div tw="text-left border-2 border-black p-3 my-1">
          <div>
            <b>Item ID:</b> {id}
          </div>
          <div>
            <b>Item Title:</b> {title}
          </div>
          <div>
            <b>Item Quantity:</b> {quantity}
          </div>
          <div>
            <b>Item Price $:</b> {variant.priceV2.amount}
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

  return (
    <Layout>
      {cart?.length ? (
        products.length ? (
          <>
            <Products products={products} cart={cart} removeCartItem={removeFromCart} />
            <div className="flex items-center justify-between mt-5">
              <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
              <div className="flex items-center">
                <Total products={products} cart={cart} customerId={customerId} />
                <PayButton products={cart} />
              </div>
            </div>
          </>
        ) : (
          <CartLayout>
            <div className="text-2xl">Loading...</div>
          </CartLayout>
        )
      ) : (
        <CartLayout>
          <div>Not items in the Cart</div>
        </CartLayout>
      )}
    </Layout>
  );
}
