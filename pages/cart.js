import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { gql, GraphQLClient } from "graphql-request";
import { Context } from "contexts/context";
import { PayButton } from "components/PayBtn";
import Layout from "components/Layout";
import { formatPrice } from "components/helper";
import { useAuth } from "contexts/auth";
import Link from "next/link";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default function Cart() {
  const [products, setProducts] = useState([]);
  const { cart, clearCart, removeCartItem } = useContext(Context);
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
        slugs: getSlugs(cart, customerId),
      }
    );
    setProducts(data.products);
  }, [cart]);

  return (
    <Layout>
      {cart?.length > 0 ? (
        products.length > 0 ? (
          <>
            <Products
              products={products}
              cart={cart}
              removeCartItem={removeCartItem}
            />
            <div className="flex items-center justify-between mt-5">
              <button onClick={() => clearCart()}>Clear Cart</button>
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

const getSlugs = (cart, customerId) => {
  // get the slugs for the correct customerId
  const slugs = cart.map((x) => x.slug);
  return slugs;
};

const CartLayout = ({ children }) => (
  <div className="bg-white text-xl text-center rounded-md shadow-sm p-5 mt-3">
    {children}
  </div>
);

const Products = ({ products, cart, removeCartItem }) => {
  const getQuantity = (slug) => {
    const product = cart.find((x) => x.slug === slug);
    const quantity = product?.quantity || 0;
    return quantity;
  };

  return products.map(({ id, slug, name, price, images }) => {
    const { url } = images[0];
    return (
      <CartLayout key={id}>
        <div className="flex items-center gap-5">
          <Image src={url} width={150} height={150} />
          <div className="flex flex-col items-start">
            {getQuantity(slug)} x {name}
            <div className="font-bold">{formatPrice(price)}</div>
            <a onClick={() => removeCartItem(slug)}>Remove Item</a>
          </div>
        </div>
      </CartLayout>
    );
  });
};

const Total = ({ products, cart }) => {
  var total = 0;

  products.forEach((product) => {
    const item = cart.find((cartItem) => cartItem.slug === product.slug);
    const quantity = item?.quantity || 0;
    total = total + quantity * product.price;
  });

  return (
    <div className="font-bold text-xl mr-5">Total {formatPrice(total)}</div>
  );
};
