import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { gql, GraphQLClient } from "graphql-request";
import { Context } from "contexts/context";
import { PayButton } from "components/PayBtn";
import Layout from "components/Layout";
import { formatPrice } from "components/helper";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default function Cart() {
  const [products, setProducts] = useState([]);
  const { cart } = useContext(Context);

  useEffect(async () => {
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
        slugs: getSlugs(cart),
      }
    );
    setProducts(data.products);
  }, [cart]);

  return (
    <Layout>
      {cart?.length > 0 ? (
        products.length > 0 ? (
          <>
            <Products products={products} cart={cart} />
            <div className="flex items-center justify-end mt-5">
              <Total products={products} cart={cart} />
              <PayButton products={cart} />
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

const getSlugs = (cart) => cart.map((cartItem) => cartItem.slug);

const CartLayout = ({ children }) => (
  <div className="bg-white text-xl text-center rounded-md shadow-sm p-5 mt-3">
    {children}
  </div>
);

const Products = ({ products, cart }) => {
  const getQuantity = (slug) => {
    const item = cart.find((cartItem) => cartItem.slug === slug);
    return item.quantity;
  };

  return products.map(({ id, slug, name, price, images }) => {
    const { url } = images[0];
    return (
      <CartLayout>
        <div key={id} className="flex items-center gap-5">
          <Image src={url} width={150} height={150} />
          <div className="flex flex-col items-start">
            {getQuantity(slug)} x {name}
            <div className="font-bold">{formatPrice(price)}</div>
          </div>
        </div>
      </CartLayout>
    );
  });
};

const Total = ({ products, cart }) => {
  var total = 0;

  products.forEach((product) => {
    const quantity = cart.find((cartItem) => cartItem.slug === product.slug)
      .quantity;

    total = total + quantity * product.price;
  });

  return (
    <div className="font-bold text-xl mr-5">Total {formatPrice(total)}</div>
  );
};
