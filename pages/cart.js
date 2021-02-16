import { useContext, useEffect, useState } from "react";
import { gql, GraphQLClient } from "graphql-request";

import { useAuth } from "contexts/auth";
import { CartContext } from "contexts/CartProvider";
import { clearCart, removeFromCart } from "reducers/CartReducer";

import { PayButton } from "components/PayBtn";
import Layout from "components/Layout";
import { Total } from "components/Total";
import { CartLayout } from "components/CartLayout";
import { Products } from "components/Products";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default function Cart() {
  const [products, setProducts] = useState([]);
  const { cart, dispatch } = useContext(CartContext);
  const { user } = useAuth();
  const [customerId, setCustomerId] = useState();

  useEffect(() => {
    if (!user) {
      return;
    }
    setCustomerId(user.sub);
  }, [user]);

  useEffect(async () => {
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
  }, [cart]);

  return (
    <Layout>
      {cart?.length ? (
        products.length ? (
          <>
            <Products
              products={products}
              cart={cart}
              removeCartItem={removeFromCart}
            />
            <div className="flex items-center justify-between mt-5">
              <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
              <div className="flex items-center">
                <Total
                  products={products}
                  cart={cart}
                  customerId={customerId}
                />
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
