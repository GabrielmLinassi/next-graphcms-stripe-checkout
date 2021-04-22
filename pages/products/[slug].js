import { useState } from "react";
import { initializeApollo } from "libs/apollo";
import { useRouter } from "next/router";
import Link from "next/link";

import { formatPrice } from "components/helper";
import { PayButton } from "components/PayBtn";
import Layout from "components/Layout";
import BackBtn from "components/BackBtn";
import Carousel from "components/carousel/Carousel";
import AddCart from "components/AddCartButton";
import Amount from "components/AmountButton";
import { AllProducts, ProductByHandle } from "queries/product";
import { useAddCart } from "components/AddCartButton";

/* --- --- --- */

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: AllProducts,
  });

  const slugs = data.products.edges.map((edge) => ({ params: { slug: edge.node.handle } }));

  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: ProductByHandle,
    variables: {
      handle: params.slug,
    },
  });

  return {
    props: {
      product: data.productByHandle,
    },
  };
}

const ProductPage = ({ product }) => {
  const { id, handle: slug, title: name, description, images, variants } = product;
  const { id: variantId, price } = variants.edges[0].node;

  const router = useRouter();
  const { addToCartHandler } = useAddCart();

  const allImages = images.edges.map((edge) => ({
    id: edge.node.id,
    src: edge.node.originalSrc,
    fileName: edge.node.altText,
  }));

  /* --- --- --- */

  const [quantity, setQuantity] = useState(1);

  return (
    <Layout>
      <BackBtn />
      <div className="bg-white text-xl text-center rounded-md shadow-sm p-5 mt-3 w-full h-full">
        <div className="flex w-full h-full">
          <div className="w-full h-full">
            <Carousel images={allImages.map((image) => image.src)} withThumbs={true} />
          </div>
          <div className="border-l ml-5 pl-5" style={{ width: "100%", height: "100%" }}>
            <div className="text-left">{name}</div>
            <div className="font-bold text-left mt-3">{formatPrice(price)}</div>
            <div className="text-left mt-5">
              <Amount quantity={quantity} setQuantity={setQuantity} />
            </div>
            <div className="mt-5">
              <button
                onClick={() => {
                  addToCartHandler(variantId, quantity);
                  router.push("/checkout");
                }}
              >
                Go to Checkout
              </button>
              <PayButton products={[{ id, quantity }]} full />
            </div>
            <AddCart variantId={variantId} quantity={quantity} />
          </div>
        </div>
        <div className="mt-16 text-lg">{description}</div>
      </div>
    </Layout>
  );
};

export default ProductPage;
