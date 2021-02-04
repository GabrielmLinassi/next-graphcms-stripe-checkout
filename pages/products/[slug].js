import Image from "next/image";
import Link from "next/link";
import { gql, GraphQLClient } from "graphql-request";
import Layout from "../../components/Layout";
import { formatPrice } from "../../components/helper";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";

/* context */
import { Context } from "contexts/context";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export async function getStaticPaths() {
  const { products } = await graphcms.request(
    gql`
      {
        products {
          name
          slug
        }
      }
    `
  );

  return {
    paths: products.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { product } = await graphcms.request(
    gql`
      query ProductPageQuery($slug: String!) {
        product(where: { slug: $slug }) {
          name
          slug
          price
          description
          images {
            id
            url
            fileName
            height
            width
          }
        }
      }
    `,
    { slug: params.slug }
  );

  return {
    props: {
      product,
    },
  };
}

const ProductPage = ({ product }) => {
  const { slug, name, price, description, images } = product;
  const [quantity, setQuantity] = useState(1);

  return (
    <Layout>
      <Link href="/">
        <a className="inline-flex items-center px-3 py-1 rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700">
          <IconLeft />
          <span className="ml-2">Back</span>
        </a>
      </Link>
      <div className="bg-white text-xl text-center rounded-md shadow-sm p-5 mt-3">
        <div className="flex">
          <div className="flex flex-col">
            {images.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.fileName}
              />
            ))}
          </div>
          <div>
            <div className="text-left">{name}</div>
            <div className="font-bold text-left mt-3">{formatPrice(price)}</div>
            <div className="text-left mt-5">
              <label>Amount</label>
              <input
                type="number"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                value={quantity}
                className="border border-black p-1 w-full"
              />
            </div>
            <PayButton slug={slug} quantity={quantity} />
            <AddCart slug={slug} quantity={quantity} />
          </div>
        </div>
        <div className="mt-3 text-lg">{description}</div>
      </div>
    </Layout>
  );
};

const AddCart = ({ slug, quantity }) => {
  const { addCart } = useContext(Context);

  const handleClick = () => {
    addCart(slug, quantity);
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

const PayButton = ({ slug, quantity }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;

    const session = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        quantity,
      }),
    }).then((res) => res.json());

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="inline-block bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full mt-2"
    >
      Buy
    </button>
  );
};

const IconLeft = () => {
  return (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="arrow-left"
      className="svg-inline--fa fa-arrow-left fa-w-14 w-4 h-4"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
      />
    </svg>
  );
};

export default ProductPage;
