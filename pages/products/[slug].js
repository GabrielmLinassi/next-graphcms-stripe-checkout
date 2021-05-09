import { useState } from "react";

import api from "pages/api/utils/api";

import PayButton from "components/PayBtn";
import Layout from "components/Layout";
import BackBtn from "components/BackBtn";
import Carousel from "components/carousel/Carousel";
import AddCart from "components/AddCartButton";
import Amount from "components/AmountButton";

export async function getStaticPaths() {
  const { data } = await api.get("/products?limit=250");
  const slugs = data.data.map((prod) => ({ params: { slug: prod.id } }));

  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await api.get(`/products/${params.slug}`);

  return {
    props: {
      product: data,
    },
  };
}

const ProductPage = ({ product }) => {
  const { id, name, description, price, assets } = product;
  const { formatted: priceFormatted } = price;

  const allImages = assets.map((asset) => ({
    id: asset.id,
    src: asset.url,
    fileName: asset.filename,
  }));

  const [quantity, setQuantity] = useState(1);

  return (
    <Layout>
      <BackBtn />
      <div className="p-5 mt-3 text-xl text-center bg-white rounded-md shadow-sm ">
        <div className="flex w-full h-full">
          <div className="w-full h-full">
            <Carousel images={allImages.map((image) => image.src)} withThumbs={true} />
          </div>
          <div className="pl-5 ml-5 border-l" style={{ width: "100%", height: "100%" }}>
            <div className="text-left">{name}</div>
            <div className="mt-3 font-bold text-left">{priceFormatted}</div>
            <div className="mt-5 text-left">
              <Amount quantity={quantity} setQuantity={setQuantity} />
            </div>
            <div className="mt-5">
              <PayButton variantId={id} quantity={quantity} />
            </div>
            <AddCart variantId={id} quantity={quantity} />
          </div>
        </div>
        <div className="text-lg">{description}</div>
      </div>
    </Layout>
  );
};

export default ProductPage;
