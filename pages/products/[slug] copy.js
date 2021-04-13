import Image from "next/image";
import { gql, GraphQLClient } from "graphql-request";
import Layout from "../../components/Layout";
import { formatPrice } from "../../components/helper";
import { useContext, useEffect, useState } from "react";
import { PayButton } from "components/PayBtn";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import BackBtn from "components/BackBtn";

/* context */
import { CartContext } from "contexts/CartProvider";
import { addToCart } from "reducers/CartReducer";

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
          <div className="border-l pl-5">
            <div className="text-left">{name}</div>
            <div className="font-bold text-left mt-3">{formatPrice(price)}</div>
            <div className="text-left mt-5">
              <Amount quantity={quantity} setQuantity={setQuantity} />
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
  const { dispatch } = useContext(CartContext);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  const handleClick = () => {
    addToCartHandler({ slug, quantity });
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

const Images = ({ images }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  var settingsMain = {
    slidesToShow: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  };

  const settingsThumbs = {
    slidesToShow: 4,
    asNavFor: ".slider-for",
    dots: false,
    arrows: false,
    centerMode: false,
    swipeToSlide: true,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
  };

  return (
    <div className="flex w-full">
      <Slider
        {...settingsThumbs}
        asNavFor={nav1}
        ref={(slider) => setSlider2(slider)}
      >
        {images.map(({ id, url, fileName }) => (
          <Image key={id} src={url} width={50} height={50} alt={fileName} />
        ))}
      </Slider>
      <Slider
        {...settingsMain}
        asNavFor={nav2}
        ref={(slider) => setSlider1(slider)}
      >
        {images.map(({ id, url, fileName }) => (
          <Image key={id} src={url} width={300} height={300} alt={fileName} />
        ))}
      </Slider>
    </div>
  );
};

const Amount = ({ quantity, setQuantity }) => {
  const [menuAmount, setMenuAmount] = useState(false);
  return (
    <div>
      <label id="listbox-label" className="block text-gray-700">
        Amount
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          onClick={() => setMenuAmount(!menuAmount)}
          aria-labelledby="listbox-label"
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">{quantity}</span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <div
          className={`${
            menuAmount ? "block" : "hidden"
          } absolute mt-1 w-full rounded-md bg-white shadow-lg`}
        >
          <ul
            tabIndex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            <li
              id="listbox-item-0"
              role="option"
              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-purple-300"
              onClick={() => {
                setQuantity(1);
                setMenuAmount(!menuAmount);
              }}
            >
              <div className="flex items-center">
                <span className="ml-3 block font-normal truncate">1</span>
              </div>
            </li>
            <li
              id="listbox-item-1"
              role="option"
              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-purple-300"
              onClick={() => {
                setQuantity(2);
                setMenuAmount(!menuAmount);
              }}
            >
              <div className="flex items-center">
                <span className="ml-3 block font-normal truncate">2</span>
              </div>
            </li>
            <li
              id="listbox-item-1"
              role="option"
              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-purple-300"
              onClick={() => {
                setQuantity(3);
                setMenuAmount(!menuAmount);
              }}
            >
              <div className="flex items-center">
                <span className="ml-3 block font-normal truncate">3</span>
              </div>
            </li>
            <li
              id="listbox-item-1"
              role="option"
              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-purple-300"
              onClick={() => {
                setQuantity(4);
                setMenuAmount(!menuAmount);
              }}
            >
              <div className="flex items-center">
                <span className="ml-3 block font-normal truncate">4</span>
              </div>
            </li>
            <li
              id="listbox-item-1"
              role="option"
              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-purple-300"
              onClick={() => {
                setQuantity(5);
                setMenuAmount(!menuAmount);
              }}
            >
              <div className="flex items-center">
                <span className="ml-3 block font-normal truncate">5</span>
              </div>
            </li>
            <li
              id="listbox-item-1"
              role="option"
              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-purple-300"
              onClick={() => {
                setQuantity(6);
                setMenuAmount(!menuAmount);
              }}
            >
              <div className="flex items-center">
                <span className="ml-3 block font-normal truncate">6</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
