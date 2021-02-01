import Link from "next/link";
import Image from "next/image";
import { gql, GraphQLClient } from "graphql-request";

import Layout from "../components/Layout";
import { formatPrice } from "../components/helper";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export async function getStaticProps() {
  const { products } = await graphcms.request(
    gql`
      {
        products {
          id
          name
          price
          slug
          images {
            id
            url
            fileName
            height
            width
          }
        }
      }
    `
  );

  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }) {
  return (
    <Layout title="NextJS GraphCMS Stripe Checkout">
      <ul className="text-xl bg-white rounded-md shadow-md p-5">
        {products.map(({ id, name, price, slug, images }) => {
          return (
            <li key={id} className="flex items-start gap-5">
              <Image
                src={images[0].url}
                width={images[0].width}
                height={images[0].height}
                alt={images[0].fileName}
              />
              <div>
                <Link key={id} href={`products/${slug}`}>
                  <a>{name}</a>
                </Link>
                <div className="font-bold mt-3">{formatPrice(price)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
