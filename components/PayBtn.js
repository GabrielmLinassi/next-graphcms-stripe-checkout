import { useRouter } from "next/router";
import { useAddCart } from "components/AddCartButton";
import tw from "twin.macro";

const PayButton = ({ variantId, quantity }) => {
  const { addToCartHandler } = useAddCart();
  const router = useRouter();

  const handleClick = () => {
    addToCartHandler(variantId, quantity);
    router.push("/checkout");
  };

  return (
    <button
      onClick={handleClick}
      tw="inline-block bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full"
    >
      Buy
    </button>
  );
};

export default PayButton;
