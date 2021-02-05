import Layout from "components/Layout";
import { PayButton } from "components/PayBtn";
import { Context } from "contexts/context";
import { gql, GraphQLClient } from "graphql-request";
import { useContext, useEffect, useState } from "react";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default function Cart() {
  const { cart } = useContext(Context);
  const [products, setProducts] = useState([]);

  const getSlugs = (cart) => cart.map((cartItem) => cartItem.slug);

  useEffect(async () => {
    const data = await graphcms.request(
      gql`
        query ProductListQuery($slugs: [String!]) {
          products(where: { slug_in: $slugs }) {
            id
            name
            slug
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
      <div className="bg-white text-xl text-center rounded-md shadow-sm p-5 mt-3">
        {products.map((product) => (
          <div key={product.id}>
            {
              cart.find((cartItem) => {
                return cartItem.slug === product.slug;
              }).quantity
            }{" "}
            x {product.name}
          </div>
        ))}
      </div>
      {cart.length && (
        <div className="flex items-end justify-end mt-5">
          <PayButton products={cart} />
        </div>
      )}
    </Layout>
  );
}
