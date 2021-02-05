import Image from "next/image";
import Link from "next/link";
import { gql, GraphQLClient } from "graphql-request";
import Layout from "../../components/Layout";
import { formatPrice } from "../../components/helper";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { PayButton } from "components/PayBtn";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

/* context */
import { Context } from "contexts/context";
import BackBtn from "components/BackBtn";

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
      <BackBtn />
      <div className="bg-white text-xl text-center rounded-md shadow-sm p-5 mt-3">
        <div className="flex">
          <div className="w-8/12">
            <Images images={images} />
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
            <div className="mt-5">
              <PayButton products={[{ slug: slug, quantity: quantity }]} full />
            </div>
            <AddCart slug={slug} quantity={quantity} />
          </div>
        </div>
        <div className="mt-16 text-lg">{description}</div>
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

const Images = ({ images }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <Image
          key={image.id}
          src={image.url}
          width={300}
          height={300}
          alt={image.fileName}
        />
      ))}
    </Slider>
  );
};

export default ProductPage;
