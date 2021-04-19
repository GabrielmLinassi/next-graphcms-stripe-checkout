import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { formatPrice } from "components/helper";
import { PayButton } from "components/PayBtn";
import Layout from "components/Layout";
import BackBtn from "components/BackBtn";
import Carousel from "components/carousel/Carousel";

import { initializeApollo } from "libs/apollo";
import { CartContext } from "contexts/CartProvider";
import { addToCart } from "reducers/CartReducer";
import { AllProducts, ProductByHandle } from "queries/product";
import { ADD_ITEM_CART, CREATE_CART } from "queries/queries";
import { useCookies } from "react-cookie";

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
  const { handle: slug, title: name, description, images, variants } = product;

  const { id: variantId, price } = variants.edges[0].node;

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
              <PayButton products={[{ slug: slug, quantity: quantity }]} full />
            </div>
            <AddCart variantId={variantId} quantity={quantity} />
          </div>
        </div>
        <div className="mt-16 text-lg">{description}</div>
      </div>
    </Layout>
  );
};

const AddCart = ({ variantId, quantity }) => {
  const [createCart, { data }] = useMutation(CREATE_CART);
  const [addItemCart] = useMutation(ADD_ITEM_CART);
  const [cookies, setCookie] = useCookies(["cart"]);

  const addToCartHandler = (variantId, quantity) => {
    // If there's not a cart for the session, create a new one
    // else, just add item to the cart
    if (JSON.stringify(cookies) === "{}") {
      createCart({
        variables: {
          input: {
            lineItems: [
              {
                variantId,
                quantity,
              },
            ],
          },
        },
      });
    } else {
      addItemCart({
        variables: {
          lineItems: [
            {
              variantId,
              quantity,
            },
          ],
          checkoutId: cookies.cart,
        },
      });
    }
  };

  useEffect(() => {
    if (data?.checkoutCreate) {
      setCookie("cart", data.checkoutCreate.checkout.id, { path: "/" });
    }
  }, [data]);

  const handleClick = () => {
    addToCartHandler(variantId, quantity);
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
